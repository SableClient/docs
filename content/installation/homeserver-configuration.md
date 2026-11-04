+++
title = "Homeserver Configuration"
description = "Configure Sable for accounts on your homeserver."
weight = 4
+++

You can set branding and preferences for accounts on your homeserver by serving
a `/.well-known/sable` file. Sable reads it on web, desktop and mobile.

The configuration follows the account. Switching accounts changes the branding
and settings too. To customize a self-hosted website instead, see
[website branding](@/installation/branding.md).

# Hosting the File

For an account like `@alice:example.org`, put the file at
`https://example.org/.well-known/sable`. This stays on `example.org` even if your
Matrix API runs on `matrix.example.org`. Include the port if your Matrix server
name has one.

During login, Sable uses the homeserver address you enter. After signing in, it
uses the server name from your Matrix ID.

Serve the file over HTTPS with `Content-Type: application/json` and
`Access-Control-Allow-Origin: *` so web clients can read it. The file is public;
do not include credentials or secrets.

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
    "supportRoom": "#help:example.org"
  },
  "auth": { "disableRegistration": true },
  "settingsDefaults": { "theme": "system" },
  "settingsLocked": { "sendReadReceipts": false }
}
```

The fields use the same format as the website's `config.json`. In this example,
`/branding/logo.svg` points to `https://example.org/branding/logo.svg`. Theme
files fetched from another domain also need CORS headers.

# Supported Options

- `branding`: `appName`, `logoUrl`, `faviconUrl`, `themeUrl`.
- `links`: `help`, `privacy`, `terms`, `supportRoom`, `bugReport`.
- `auth`: `ssoRedirect`, `disableRegistration`, `logoutRedirectUrl`,
  `deviceDisplayName`.
- `hideUsernamePasswordFields` and `hideCommunityLinks`.
- `settingsDefaults` and `settingsLocked`, limited to `theme`,
  `hideTypingIndicators`, `sendTypingNotifications`, `sendReadReceipts`,
  `hideReadReceipts` and `urlPreviews`.

Locking `sendReadReceipts` to `false` disables public receipts and hides receipt
indicators and controls for that account. Removing the lock restores the user's
previous settings.

This file cannot change the homeserver list, account switching, push, GIF, embed
or call services. Changing app launcher names and icons requires a custom build.

# Defaults and Locked Settings

Account branding and links replace the website or app defaults. Login
restrictions and settings locked by a self-hosted website still apply.

For preferences, website locks take priority over account locks. Your own
choices take priority over account defaults, which take priority over website
and built-in defaults. Remote settings are not saved as your choices or synced
to other devices.

# Updating the Configuration

Sable saves a copy for offline use and checks for changes when you sign in or
switch accounts, once per homeserver per app session. Requests time out after
five seconds. If a request fails or the file is invalid, Sable keeps the saved
copy. Missing configuration does not stop you signing in.

To remove the configuration, serve `{}` or return HTTP 404/410. Sable clears its
saved copy on the next check. Signing out of the last account restores the
website or app defaults.
