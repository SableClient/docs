+++
title = "Self-hosting"
description = "Run your own web client."
weight = 3
+++

The web client runs in the browser and connects directly to a Matrix homeserver.
For a deployment that keeps Matrix stores on the server, see [server mode](/installation/server-mode/).

# Grab a build

You can get plain builds for release versions on our Forgejo releases page. Look 
for an artifact like `sable-2.X.X-web.tar.gz`. Note that for recent builds
(especially Nightly) our CI may not have finished building just yet.

## Docker

Run the published image:

```sh
docker run -d --name sable --restart unless-stopped \
  -p 127.0.0.1:8080:8080 \
  git.sable.moe/sableclient/sable-next:latest
```

The image listens on port 8080. Put an HTTPS reverse proxy in front of it. The
`dev` tag contains the nightly build.

To build the image locally, install the project tools as described in the
[README](https://git.sable.moe/SableClient/sable-next/src/branch/main/README.md), then run:

```sh
pnpm install
pnpm build
docker build -f packaging/docker/Dockerfile -t sable-web .
```

# Configuration

The web client fetches `config.json` at runtime. Copy [the default file](https://git.sable.moe/SableClient/sable-next/src/branch/main/static/config.json),
edit it, and mount it read-only at `/app/config.json` in the container:

```yaml
services:
  sable:
    image: git.sable.moe/sableclient/sable-next:latest
    ports:
      - '127.0.0.1:8080:8080'
    volumes:
      - ./config.json:/app/config.json:ro
    restart: unless-stopped
```

The web image does not translate environment variables into client settings.
The configuration is public to browsers, so do not put secrets in it. Reload
the page after changing it.

This example shows the supported fields. Omit the ones you do not need.

```json
{
  "homeserverList": ["matrix.example.org", "matrix.org"],
  "defaultHomeserver": 0,
  "allowCustomHomeservers": true,
  "featuredCommunities": {
    "servers": ["matrix.example.org"]
  },
  "pushNotificationDetails": {
    "pushNotifyUrl": "https://push.example.org/_matrix/push/v1/notify",
    "vapidPublicKey": "your-public-vapid-key",
    "webPushAppID": "your.web.app.id",
    "nativePushAppID": "your.android.app.id",
    "iosPushAppID": "your.ios.app.id",
    "unifiedPushGatewayUrl": "https://push.example.org/_matrix/push/v1/notify",
    "unifiedPushEmbeddedServerUrl": "https://push.example.org"
  },
  "embeds": {
    "serviceUrl": "https://embeds.example.org"
  },
  "supporterAwards": {
    "serviceUrl": "https://awards.example.org",
    "keys": {
      "1": "your-43-character-ed25519-public-key"
    }
  },
  "gifs": {
    "provider": "tenor",
    "proxyUrl": "gifs.example.org",
    "klipyApiKey": "your-klipy-key",
    "tenorApiKey": "your-tenor-key",
    "giphyApiKey": "your-giphy-key"
  },
  "calls": {
    "livekitServiceUrl": "https://livekit.example.org"
  },
  "searchSharing": {
    "stunServers": ["stun:stun.example.org:3478"]
  },
  "disableAccountSwitcher": false,
  "hideUsernamePasswordFields": false,
  "settingsDefaults": {
    "theme": "system",
    "urlPreviews": false,
    "hour24Clock": false
  }
}
```

- `homeserverList` supplies the login choices. Empty or missing lists use the
  built-in list. `defaultHomeserver` is a zero-based index into that list;
  `null` leaves the default empty. `allowCustomHomeservers` defaults to `true`.
- `featuredCommunities.servers` lists homeservers for room discovery; it defaults
  to an empty list.
- `pushNotificationDetails` requires all three of `pushNotifyUrl`,
  `vapidPublicKey` and `webPushAppID`. Without them, the push configuration is
  ignored. The other fields are optional and configure native or UnifiedPush
  clients. See the [Sygnal guide](https://git.sable.moe/SableClient/sable-next/src/branch/main/docs/sygnal-setup.md).
- `embeds.serviceUrl` enables the embed service when it is an HTTP(S) URL.
- `supporterAwards` requires an HTTP(S) service URL and at least one 43-character
  unpadded base64 or base64url Ed25519 public key, indexed by key ID.
- `gifs.provider` accepts `klipy`, `tenor` or `giphy`, defaulting to `tenor`.
  GIF search also needs `proxyUrl` (a Matrix server name, without a scheme) and
  the API key for the selected provider.
- `calls.livekitServiceUrl` provides a fallback LiveKit service URL.
- `searchSharing.stunServers` lists the STUN servers used to share search history between
  devices. It defaults to `stun:stun.sable.moe:3478`. An empty list keeps transfers on the
  local network.
- `disableAccountSwitcher` and `hideUsernamePasswordFields` default to `false`.
- `settingsDefaults` sets initial client preferences. Existing user choices take
  precedence. The example shows three settings; all accepted preference names,
  defaults, value sets and numeric ranges are defined in
  [preferences.svelte.ts](https://git.sable.moe/SableClient/sable-next/src/branch/main/src/lib/settings/preferences.svelte.ts). Invalid
  values are ignored or, for numeric ranges, clamped.

The shipped `config.json` includes Sable's service endpoints. Remove or replace
them if you do not intend to use them.

# Further configuration

- To brand your deployment, see [Website Branding](/installation/branding/).
- To make your homeserver configure Sable instead, see [Homeserver Configuration](/installation/homeserver-configuration/)
