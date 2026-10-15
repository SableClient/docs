+++
title = "Install Sable"
description = "Get Sable for your device."
weight = 1

[extra]
hide_page_list = true
+++

{% <platform_grid> %}
{% <platform_card icon="browser" title="Web"> %}
[Open app.sable.moe](https://app.sable.moe/)
{% </platform_card> %}
{% <platform_card icon="windows-logo" title="Windows"> %}
[Stable release](https://git.sable.moe/SableClient/sable-next/releases/latest)
{% </platform_card> %}
{% <platform_card icon="apple-logo" title="macOS"> %}
[Stable release](https://git.sable.moe/SableClient/sable-next/releases/latest)

`brew install --cask SableClient/sable/sable`
{% </platform_card> %}
{% <platform_card icon="linux-logo" title="Linux"> %}
[Flathub](https://flathub.org/apps/moe.sable.client), [AUR](https://aur.archlinux.org/packages/sable-bin) or [stable release](https://git.sable.moe/SableClient/sable-next/releases/latest)
{% </platform_card> %}
{% <platform_card icon="android-logo" title="Android"> %}
[Google Play](https://play.google.com/store/apps/details?id=moe.sable.client) or [APK](https://git.sable.moe/SableClient/sable-next/releases/latest)
{% </platform_card> %}
{% <platform_card icon="device-mobile" title="iPhone or iPad"> %}
[AltStore](https://intradeus.github.io/http-protocol-redirector?r=altstore://source?url=https://git.sable.moe/SableClient/sable-next/releases/download/latest/altstore-source.json) or [SideStore](https://intradeus.github.io/http-protocol-redirector?r=sidestore://source?url=https://git.sable.moe/SableClient/sable-next/releases/download/latest/altstore-source.json)
{% </platform_card> %}
{% </platform_grid> %}

[All release downloads](https://git.sable.moe/SableClient/sable-next/releases/latest)

## Install the web app

Open [app.sable.moe](https://app.sable.moe/) in your browser, then use the menu to
**Install app** or **Add to Home Screen**.

## Nightly builds

Nightlies have the newest changes. They're rougher. Bugs and half-finished
features are normal.

| Platform | Nightly |
| --- | --- |
| Web | [next.sable.moe](https://next.sable.moe/) or [dev.sable.moe](https://dev.sable.moe/) |
| Desktop | [Release downloads](https://git.sable.moe/SableClient/sable-next/releases) |
| Android | [Obtainium setup](https://git.sable.moe/SableClient/sable-next/releases/download/nightly/obtainium.json) or [APK](https://git.sable.moe/SableClient/sable-next/releases) |
| iPhone or iPad | [AltStore source](https://git.sable.moe/SableClient/sable-next/releases/download/nightly/altstore-source.json) or [SideStore source](https://git.sable.moe/SableClient/sable-next/releases/download/nightly/altstore-source.json) |
| Linux | [Nightly Flatpak setup](https://sableclient.github.io/sable-next/sable-next-nightly.flatpakrepo) |

On Linux, add the remote and install the nightly Flatpak:

```sh
flatpak remote-add --if-not-exists sable-next-nightly https://sableclient.github.io/sable-next/sable-next-nightly.flatpakrepo
flatpak install sable-next-nightly moe.sable.next.Nightly
```

On Android or iOS, add the source link in AltStore, SideStore, or Obtainium, then
install Sable from there.

## Notes for iOS

You need AltStore or SideStore and an Apple account. With a free Apple ID, refresh
the app every seven days.

## Switching builds

Before you jump between stable, nightly, or another build, read the
[upgrade notes](https://github.com/SableClient/sable-next/blob/main/docs/v1-v2-migration.md).

## Host Sable yourself

Want Sable on your own domain? Release archives include a web build you can
extract into your own web root. See the
[example Caddyfile](https://github.com/SableClient/sable-next/blob/main/Caddyfile)
in the app repository.
