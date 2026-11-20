+++
title = "Server Mode"
description = "Run Sable on your own server and keep syncing when the browser is closed."
weight = 2
+++

Sable can run on a server you control. In server mode, your Matrix stores and encryption keys live on the server, and your accounts keep syncing when the browser is closed. You open Sable in any browser, sign in to the server, then sign in to Matrix.

One server can host several people, each with their own login. You need a host that runs Docker and a domain with HTTPS.

> **Note:** The server holds your encryption keys and can read your messages while it is running. Whoever runs the server can access every user's data, so protect the host and its data directory.

# Running with Docker

Generate a password hash for the server login:

```sh
docker run --rm -it git.sable.moe/sableclient/sable-next-server:latest hash-password
```

Create a data directory and start the server:

```sh
mkdir -p sable-server-data
sudo chown 10001:10001 sable-server-data
docker run -d --name sable-server --restart unless-stopped \
  -p 127.0.0.1:18008:18008 \
  -v "$PWD/sable-server-data:/var/lib/sable" \
  -e SABLE_SERVER_PUBLIC_URL=https://sable.example.org \
  -e SABLE_SERVER_USERNAME=sable \
  -e SABLE_SERVER_PASSWORD_HASH='your Argon2id hash' \
  git.sable.moe/sableclient/sable-next-server:latest
```

Keep the password hash in quotes, since it contains `$`. The `latest` tag follows stable releases, which are also tagged with their full and major.minor versions. Nightly images use the `dev` tag and a short commit SHA.

Back up the data directory regularly. It holds the Matrix stores and encryption keys.

The image health check calls `/healthz` on port `18008`. If you change the listening port, override the health check too.

# Building from Source

To build the image yourself, run this from the app repository and use `sable-server` instead of the published image name:

```sh
docker build -f packaging/server/Dockerfile -t sable-server .
```

To run without Docker, install the build tools listed in the [README](https://git.sable.moe/SableClient/sable-next/src/branch/main/README.md), then build the frontend and the server:

```sh
pnpm install
pnpm run build:server
cargo build --release -p sable-server
target/release/sable-server hash-password
```

Create `sable-server.toml`:

```toml
listen_addr = "127.0.0.1:18008"
public_url = "https://sable.example.org"
data_dir = "./sable-server-data"
username = "sable"
password_hash = "$argon2id$v=19$m=19456,t=2,p=1$..."
frontend_dir = "./dist"
```

Start it with `target/release/sable-server --config sable-server.toml`. Without `--config`, it reads `sable-server.toml` from the working directory. The file is optional when the required values come from environment variables.

The Matrix account stores are created next to `data_dir`, so its parent folder must be writable and backed up too.

# Configuration

Environment variables override the matching TOML fields. Paths are relative to the working directory unless absolute.

| Environment variable | TOML field | Default | Description |
| --- | --- | --- | --- |
| `SABLE_SERVER_LISTEN_ADDR` | `listen_addr` | `127.0.0.1:18008` | Address and port to listen on. The image sets `0.0.0.0:18008`. |
| `SABLE_SERVER_PUBLIC_URL` | `public_url` | `http://127.0.0.1:18008` | Origin the browser opens, without a path. HTTP is only allowed for loopback. |
| `SABLE_SERVER_CLIENT_IP_SOURCE` | `client_ip_source` | `ConnectInfo` | Where rate limiting reads the client address. |
| `SABLE_SERVER_DATA_DIR` | `data_dir` | `sable-server-data` | Persistent data. The image sets `/var/lib/sable/data`. |
| `SABLE_SERVER_ALLOWED_PRIVATE_CIDRS` | `allowed_private_cidrs` | `[]` | Private addresses or ranges every user may reach. |
| `SABLE_SERVER_MAX_ACTIVE_USERS` | `max_active_users` | `128` | Most users loaded at once, including the first account. |
| `SABLE_SERVER_USERNAME` | `username` | `sable` | Username of the first account. |
| `SABLE_SERVER_PASSWORD_HASH` | `password_hash` | None | Argon2id hash for the first account, from `hash-password`. |
| `SABLE_SERVER_OIDC_ISSUER` | `oidc_issuer` | None | OpenID Connect issuer URL. |
| `SABLE_SERVER_OIDC_CLIENT_ID` | `oidc_client_id` | None | OpenID Connect client ID. |
| `SABLE_SERVER_OIDC_CLIENT_SECRET` | `oidc_client_secret` | None | OpenID Connect client secret. |
| `SABLE_SERVER_OIDC_AUTO_PROVISION` | `oidc_auto_provision` | `false` | Create an account on a person's first OIDC login. |
| `SABLE_SERVER_FRONTEND_DIR` | `frontend_dir` | `dist` | The server-mode frontend. The image sets `/srv/sable`. |

If you change `listen_addr` and leave `public_url` unset, it becomes `http://<listen_addr>`, which only works on loopback. Set an HTTPS origin for container and proxy setups.

In a Compose file, write each `$` in the password hash as `$$`, even inside quotes:

```yaml
environment:
  SABLE_SERVER_PASSWORD_HASH: '$$argon2id$$v=19$$m=19456,t=2,p=1$$...'
```

# HTTPS and Reverse Proxy

Server mode needs HTTPS outside of local testing, otherwise browsers won't keep the login cookie. For example, with Caddy:

```caddyfile
sable.example.org {
    reverse_proxy 127.0.0.1:18008
}
```

Set `SABLE_SERVER_PUBLIC_URL` to the address you open in your browser. The default `ConnectInfo` uses the address of the direct connection and ignores forwarded headers. Behind a proxy, set `SABLE_SERVER_CLIENT_IP_SOURCE` to the header your proxy sets, e.g. `RightmostXForwardedFor`, so rate limiting sees the real client addresses.

# Managing Users

The first account comes from the configuration. Add more people from the command line:

```sh
docker exec -it sable-server sable-server add-user alice
```

The command asks for a password. Use `list-users`, `disable-user`, `enable-user` and `set-user-password` the same way. Disabling a user signs them out right away.

To remove a user, stop the server and run `remove-user` in a temporary container with the same data volume and configuration. Add `--delete-data` to also delete their stores and keys.

Each user keeps syncing after their browser disconnects, until they are disabled or the server stops. Their Matrix credentials and data live under `data_dir/users/USER_ID`. Users are kept apart inside one process, not by separate sandboxes.

Each user can have 16 WebSocket connections, 16 concurrent requests and two uploads at once. The whole server allows 256 connections, 128 requests, four uploads and eight password checks. A user over their limit gets an error, while uploads wait for the server to free up. Signing out always works.

Older server versions can still use the first account's stores, but don't know about other users. Back up the data directory before upgrading or rolling back.

> **Note:** Browser data, including push notification tokens, is shared by everyone using the same browser profile. On shared computers, give each person their own profile.

# Signing In with OIDC

The server login can go through an OpenID Connect provider. Set:

- `SABLE_SERVER_OIDC_ISSUER`
- `SABLE_SERVER_OIDC_CLIENT_ID`
- `SABLE_SERVER_OIDC_CLIENT_SECRET`

Register `https://sable.example.org/_sable/oidc/callback` as the redirect URL with your provider. The issuer and the provider's endpoints must use HTTPS outside local testing. Add approved people with `add-oidc-user SUBJECT`, or set `SABLE_SERVER_OIDC_AUTO_PROVISION=true` to create accounts on first login. Accounts are tied to the issuer and subject, never matched by email. Disabled or removed accounts are not created again. The password hash is optional when everyone signs in with OIDC.

This only covers the server login. Matrix login is separate. If your homeserver uses OAuth, register the same public address with it.

# Private Homeservers

By default, the server won't connect to private network addresses. To reach a homeserver on your local network, allow its address:

```sh
SABLE_SERVER_ALLOWED_PRIVATE_CIDRS='["192.168.1.10/32"]'
```

Every server user can then reach any port on that address, so only allow networks you trust all of them with.
