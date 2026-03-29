+++
title = "Installation"
weight = 0
template = "index.html"
page_template = "page.html"
+++

# Getting started
The web app is available at [app.sable.moe](https://app.sable.moe/) and gets updated on frequently, as soon as a feature is deemed stable.

Native desktop and mobile builds are still being worked on in [#88](https://github.com/SableClient/Sable/issues/88). For now, use the web app directly, or [install it as a Progressive Web App (PWA) on your phone.](https://www.installpwa.com/from/app.sable.moe)

# Self-hosting
You have a few options for self hosting, you can:
1. Run the prebuilt docker container.
2. Deploy on a site like GitLab Pages. Jae has a [guide here](https://docs.j4.lc/Tutorials/Deploying-Sable-on-GitLab-Pages).
3. Build it yourself.

## Docker

Prebuilt images are published to `ghcr.io/sableclient/sable`.

- `latest` tracks the current `dev` branch image.
- `X.Y.Z` tags are versioned releases.
- `X.Y` tags float within a release line.
- Pushes to `dev` also publish a short commit SHA tag.

Run the latest image with:

```sh
docker run --rm -p 8080:8080 ghcr.io/sableclient/sable:latest
```

Then open `http://localhost:8080`.

If you want to override the bundled [`config.json`](config.json), mount your own
file at `/app/config.json`:

```yaml
services:
  sable:
    image: ghcr.io/sableclient/sable:latest
    ports:
      - '8080:8080'
    volumes:
      - ./config.json:/app/config.json:ro
```

## Build it yourself

To build and serve Sable yourself with nginx, clone this repo and build it:

```sh
pnpm i # Installs all dependencies
pnpm run build # Compiles the app into the dist/ directory
```

After that, you can copy the dist/ directory to your server and serve it.

* In the [`config.json`](config.json), you can modify the default homeservers, feature rooms/spaces, toggle the account switcher, and toggle experimental simplified slilding sync support.

* To deploy on subdirectory, you need to rebuild the app youself after updating the `base` path in [`build.config.ts`](build.config.ts).
    * For example, if you want to deploy on `https://sable.moe/app`, then set `base: '/app'`.

## Injecting config at build time

If you build Sable in a CI/CD pipeline, you can inject `config.json` overrides without
editing the file directly. Set the `CLIENT_CONFIG_OVERRIDES_JSON` environment variable to
a JSON object before running `pnpm run build`; the build script will deep-merge it into the
bundled `config.json`.

```sh
export CLIENT_CONFIG_OVERRIDES_JSON='{"defaultHomeServer": "matrix.example.com"}'
pnpm run build
```

Set `CLIENT_CONFIG_OVERRIDES_STRICT=true` to make the build fail hard if the JSON is
malformed (useful in CI where silent failures are dangerous).

### Feature flag and experiment configuration

The `experiments` block in `config.json` lets server operators define feature flags with
optional percentage-based rollout.  Each key is a free-form experiment name; the value
controls who gets it.

```json
{
  "experiments": {
    "myFeature": {
      "enabled": true,
      "rolloutPercentage": 50,
      "variants": ["treatment-a", "treatment-b"],
      "controlVariant": "control"
    }
  }
}
```

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Master switch; `false` means no users receive the experiment |
| `rolloutPercentage` | number (0–100) | Percentage of users bucketed into the experiment |
| `variants` | string[] | Names for each treatment arm |
| `controlVariant` | string | The variant name given to users outside the rollout |

Bucketing is deterministic and stable: the same user always receives the same variant for
a given experiment key.  You can see your current variant assignments in
**Settings → Developer Tools → Features & Experiments**.

## SW session resync configuration

Sable can automatically resync the Matrix session token held by the service worker in the
background.  This keeps push notifications and background sync working even after long idle
periods where a browser or OS may have killed the service worker.

Add a `sessionSync` block to `config.json` to configure the behaviour:

```json
{
  "sessionSync": {
    "phase1ForegroundResync": true,
    "phase2VisibleHeartbeat": false,
    "phase3AdaptiveBackoffJitter": false,
    "foregroundDebounceMs": 1500,
    "heartbeatIntervalMs": 600000,
    "resumeHeartbeatSuppressMs": 60000,
    "heartbeatMaxBackoffMs": 1800000
  }
}
```

| Field | Type | Default | Description |
|---|---|---|---|
| `phase1ForegroundResync` | boolean | `false` | Push session token to the SW when the app returns to the foreground (debounced) |
| `phase2VisibleHeartbeat` | boolean | `false` | Periodically push the session token while the app is visible |
| `phase3AdaptiveBackoffJitter` | boolean | `false` | Back off exponentially with jitter when heartbeat pushes fail |
| `foregroundDebounceMs` | number | `1500` | Milliseconds to debounce foreground resync events |
| `heartbeatIntervalMs` | number | `600000` | Milliseconds between heartbeat pushes (default: 10 min) |
| `resumeHeartbeatSuppressMs` | number | `60000` | Suppress heartbeat for this many ms immediately after a foreground resync |
| `heartbeatMaxBackoffMs` | number | `1800000` | Maximum backoff interval under phase 3 (default: 30 min) |

Each phase builds on the previous one.  A typical starting deployment enables only
`phase1ForegroundResync`; phases 2 and 3 add more aggressive keep-alive behaviour
suitable for users who leave the app open in a background tab.

### Controlled rollout with experiments

To roll out session sync gradually, combine the `sessionSync` block with an
`experiments.sessionSyncStrategy` entry:

```json
{
  "sessionSync": {
    "phase1ForegroundResync": false,
    "phase2VisibleHeartbeat": false,
    "phase3AdaptiveBackoffJitter": false
  },
  "experiments": {
    "sessionSyncStrategy": {
      "enabled": true,
      "rolloutPercentage": 20,
      "controlVariant": "control",
      "variants": ["session-sync-heartbeat", "session-sync-adaptive"]
    }
  }
}
```

When this experiment is active, users bucketed into `session-sync-heartbeat` get phases 1
and 2; users bucketed into `session-sync-adaptive` get all three phases; users outside the
rollout percentage fall back to the raw `sessionSync` flags.  For a true gradual rollout,
set the `sessionSync` phase flags to `false` (or omit them) so that only experiment
participants get session sync.  Set `rolloutPercentage: 0` or `enabled: false` to disable
the experiment and fall back to the raw `sessionSync` flags for everyone.

See [Feature flag and experiment configuration](#feature-flag-and-experiment-configuration)
for the full experiments schema.
