+++
title = "Installation"
weight = 0
template = "index.html"
page_template = "page.html"
+++

# Getting started
The web app is available at [app.sable.moe](https://app.sable.moe/) and gets updated on frequently, as soon as a feature is deemed stable.

You can also download our desktop app for windows and linux from [releases](https://github.com/SableClient/Sable/releases/latest).

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
