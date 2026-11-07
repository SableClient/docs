+++
title = "Website Branding"
description = "Customize a self-hosted Sable website."
weight = 3
+++

If you host Sable yourself, you can change its name, logo, theme and login options
through `config.json`. To apply branding to accounts on your homeserver, see
[homeserver configuration](@/installation/homeserver-configuration.md).

# Configuration

Copy the [default config.json](https://github.com/SableClient/sable-next/blob/main/static/config.json)
and add the fields you need:

```json
{
  "branding": {
    "appName": "Acme Chat",
    "logoUrl": "/branding/logo.svg",
    "faviconUrl": "/branding/favicon.png",
    "themeUrl": "/branding/acme.sable.css"
  },
  "links": {
    "help": "https://help.example.org",
    "privacy": "https://example.org/privacy",
    "terms": [{ "text": "Terms of use", "url": "https://example.org/terms" }],
    "supportRoom": "#help:example.org",
    "bugReport": "https://example.org/report"
  },
  "auth": {
    "disableRegistration": true,
    "deviceDisplayName": "Acme Chat web"
  },
  "settingsDefaults": { "theme": "system" },
  "settingsLocked": { "urlPreviews": false }
}
```

Serve `config.json` at the root of the website. With the web container, mount it
and the branding assets:

```yaml
services:
  sable:
    image: git.sable.moe/sableclient/sable-next:latest
    ports:
      - "127.0.0.1:8080:8080"
    volumes:
      - ./config.json:/app/config.json:ro
      - ./branding:/app/branding:ro
    restart: unless-stopped
```

Put an HTTPS reverse proxy in front of the container. Reload the page after
changing `config.json`, and make sure your web server does not cache it
indefinitely. The file is public, so do not put secrets in it.

# Branding and Links

`branding.appName` changes the name in the interface and page titles. About
still credits Sable. The logo, favicon and theme can use a path on your website
or an HTTP(S) URL. Themes use the same `.sable.css` format as imported themes.
Users can still apply their own themes and CSS.

Help, privacy and terms links appear in the login footer. The support room
appears on the home page, and the bug report URL replaces the default issue
tracker. Set `hideCommunityLinks` to `true` to hide Sable's community links,
supporter awards and theme catalogue.

# Login and Settings

- `auth.disableRegistration` hides account creation. Disable registration on
  the homeserver too if it must be enforced.
- `auth.ssoRedirect` accepts `immediate` or `loginPage`. It starts SSO when the
  server offers one SSO or OIDC provider and no password login; `loginPage`
  limits this to the login screen. Browsers may block the popup.
- `hideUsernamePasswordFields` hides password login fields.
- `auth.deviceDisplayName` names new sessions in device lists. It defaults to
  the application name.
- `auth.logoutRedirectUrl` opens after the last account signs out.
- `settingsDefaults` supplies preferences until the user chooses a value.
- `settingsLocked` sets preferences users cannot change. Removing a lock restores
  their previous choice. These values are not synced between devices.

For the available preference names and values, see
[preferences.svelte.ts](https://github.com/SableClient/sable-next/blob/main/src/lib/settings/preferences.svelte.ts).
Settings locked by your website also apply when an account loads homeserver
configuration.

# Installed App Names and Icons

To change the installed web app name and icons, replace `manifest.webmanifest`
and the relevant files in `icons/`. Browser theme colours and the iOS home screen
name also use tags in `src/app.html`, which requires rebuilding the web client.
Desktop and mobile app names and launcher icons require a custom build.

See the [web hosting guide](/installation/self-hosting/)
for push, GIFs, calls and other configuration options.
