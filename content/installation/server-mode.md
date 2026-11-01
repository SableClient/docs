+++
title = "Server Mode"
description = "Run Sable and its Matrix stores on your own server."
weight = 2
+++

Sable can run on a server you control. In server mode, your Matrix stores and encryption keys live on the server, and your accounts keep syncing when the browser is closed. You open Sable in any browser, sign in to the server, then sign in to Matrix.

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

Keep the password hash in quotes, since it contains `$`. The `latest` tag follows stable releases, and nightly images use the `dev` tag.

Back up the data directory regularly. It holds the Matrix stores and encryption keys.

# HTTPS and Reverse Proxy

Server mode needs HTTPS outside of local testing, otherwise browsers won't keep the login cookie. For example, with Caddy:

```caddyfile
sable.example.org {
    reverse_proxy 127.0.0.1:18008
}
```

Set `SABLE_SERVER_PUBLIC_URL` to the address you open in your browser. Behind a proxy, also set `SABLE_SERVER_CLIENT_IP_SOURCE` to the header your proxy sets, e.g. `RightmostXForwardedFor`, so rate limiting sees the real client addresses.

# Managing Users

The first account comes from the configuration. Add more people from the command line:

```sh
docker exec -it sable-server sable-server add-user alice
```

The command asks for a password. Use `list-users`, `disable-user`, `enable-user` and `set-user-password` the same way. Disabling a user signs them out right away.

To remove a user, stop the server and run `remove-user` with the same data volume. Add `--delete-data` to also delete their stores and keys.

> **Note:** Browser data, including push notification tokens, is shared by everyone using the same browser profile. On shared computers, give each person their own profile.

# Signing In with OIDC

The server login can go through an OpenID Connect provider. Set:

- `SABLE_SERVER_OIDC_ISSUER`
- `SABLE_SERVER_OIDC_CLIENT_ID`
- `SABLE_SERVER_OIDC_CLIENT_SECRET`

Register `https://sable.example.org/_sable/oidc/callback` as the redirect URL with your provider. Add approved people with `add-oidc-user SUBJECT`, or set `SABLE_SERVER_OIDC_AUTO_PROVISION=true` to create accounts on first login. The password hash is optional when everyone signs in with OIDC.

This only covers the server login. Matrix login is separate. If your homeserver uses OAuth, register the same public address with it.

# Private Homeservers

By default, the server won't connect to private network addresses. To reach a homeserver on your local network, allow its address:

```sh
SABLE_SERVER_ALLOWED_PRIVATE_CIDRS='["192.168.1.10/32"]'
```

Every server user can then reach any port on that address, so only allow networks you trust all of them with.

# More Options

All options can also go in a `sable-server.toml` file, and you can build the server from source instead of using Docker. See the [server mode guide](https://github.com/SableClient/sable-next/blob/main/docs/server.md) in the app repository for the full list.
