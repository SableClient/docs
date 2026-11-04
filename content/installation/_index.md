+++
title = "Install Sable"
description = "Get Sable for your device."
weight = 1

[extra]
hide_page_list = true
+++

{{<install_hero />}}

{% <disclosure summary="All platforms & alternative options" hint="Direct downloads, web app, package repositories, and nightly builds"> %}

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
[Flathub](https://flathub.org/apps/moe.sable.client), [AUR](https://aur.archlinux.org/packages/sable-bin), [Nix, apt or dnf](#package-repositories) or [stable release](https://git.sable.moe/SableClient/sable-next/releases/latest)
{% </platform_card> %}
{% <platform_card icon="android-logo" title="Android"> %}
[Google Play](https://play.google.com/store/apps/details?id=moe.sable.client), [IzzyOnDroid](https://apt.izzysoft.de/packages/moe.sable.client) or [APK](https://git.sable.moe/SableClient/sable-next/releases/latest)
{% </platform_card> %}
{% <platform_card icon="device-mobile" title="iPhone or iPad"> %}
[Apple TestFlight](https://testflight.apple.com/join/PT2DSC3f) (recommended), [AltStore](https://intradeus.github.io/http-protocol-redirector?r=altstore://source?url=https://git.sable.moe/SableClient/sable-next/releases/download/latest/altstore-source.json) or [SideStore](https://intradeus.github.io/http-protocol-redirector?r=sidestore://source?url=https://git.sable.moe/SableClient/sable-next/releases/download/latest/altstore-source.json)
{% </platform_card> %}
{% </platform_grid> %}

[All release downloads on Git](https://git.sable.moe/SableClient/sable-next/releases/latest)

## Install the web app
Open [app.sable.moe](https://app.sable.moe/) in your browser, then use the menu to
**Install app** or **Add to Home Screen**.
Nightly web versions are available at [dev.sable.moe](https://dev.sable.moe/) or [next.sable.moe](https://next.sable.moe/)

## Package repositories

Sable publishes its own packages, so your package manager keeps it up to date.

### Arch Linux
Install `sable-bin` or `sable-nightly-bin` from the AUR with your preferred helper:
```sh
# Stable
paru -S sable-bin
# Nightly
paru -S sable-nightly-bin
```
### Nix
Available as a flake from our git, replace `nix run` with `nix profile add` to install.
```sh
# Stable
nix run "git+https://git.sable.moe/SableClient/sable-next?ref=refs/tags/latest#sable-desktop"
# Dev
nix run git+https://git.sable.moe/SableClient/sable-next#sable-desktop
```

### Debian and Ubuntu

```sh
# Stable
sudo curl https://git.sable.moe/api/packages/SableClient/debian/repository.key -o /etc/apt/keyrings/forgejo-SableClient.asc
echo "deb [signed-by=/etc/apt/keyrings/forgejo-SableClient.asc] https://git.sable.moe/api/packages/SableClient/debian stable main" | sudo tee /etc/apt/sources.list.d/sable.list
sudo apt update && sudo apt install sable
# Nightly
sudo curl https://git.sable.moe/api/packages/SableClient/debian/repository.key -o /etc/apt/keyrings/forgejo-SableClient.asc
echo "deb [signed-by=/etc/apt/keyrings/forgejo-SableClient.asc] https://git.sable.moe/api/packages/SableClient/debian nightly main" | sudo tee /etc/apt/sources.list.d/sable.list
sudo apt update && sudo apt install sable-nightly
```

### Fedora, RHEL and openSUSE

```sh
# Stable
sudo dnf config-manager addrepo --from-repofile=https://git.sable.moe/api/packages/SableClient/rpm/stable.repo
sudo dnf install sable
# Nightly
sudo dnf config-manager addrepo --from-repofile=https://git.sable.moe/api/packages/SableClient/rpm/nightly.repo
sudo dnf install sable-nightly
```

### Homebrew

`brew install --cask SableClient/sable/sable` uses the GitHub tap. To use the
Forgejo mirror instead:

```sh
brew tap SableClient/sable https://git.sable.moe/SableClient/homebrew-sable.git
```

### IzzyOnDroid

Use an F-Droid client, like [Neo Store](https://github.com/NeoApplications/Neo-Store)
or [Droid-ify](https://droidify.app/), to install Sable from the
[IzzyOnDroid repository](https://apt.izzysoft.de/packages/moe.sable.client).

## Nightly builds

Nightlies have the newest changes. They're rougher. Bugs and half-finished
features are normal.

| Platform | Nightly |
| --- | --- |
| Web | [next.sable.moe](https://next.sable.moe/) or [dev.sable.moe](https://dev.sable.moe/) |
| Desktop | [Release downloads](https://git.sable.moe/SableClient/sable-next/releases) |
| Android | [Obtainium setup](https://git.sable.moe/SableClient/sable-next/releases/download/nightly/obtainium.json) or [APK](https://git.sable.moe/SableClient/sable-next/releases) |
| iPhone or iPad | [TestFlight Beta](https://testflight.apple.com/join/PT2DSC3f), [AltStore source](https://git.sable.moe/SableClient/sable-next/releases/download/nightly/altstore-source.json) or [SideStore source](https://git.sable.moe/SableClient/sable-next/releases/download/nightly/altstore-source.json) |
| Linux | [Nightly Flatpak setup](https://sableclient.github.io/sable-next/sable-next-nightly.flatpakrepo) |

On Linux, add the remote and install the nightly Flatpak:

```sh
flatpak remote-add --if-not-exists sable-next-nightly https://sableclient.github.io/sable-next/sable-next-nightly.flatpakrepo
flatpak install sable-next-nightly moe.sable.next.electron.Nightly
```

On Android or iOS, add the source link in AltStore, SideStore, or Obtainium, or join TestFlight, then
install Sable from there.

## Notes for iOS

Join the public beta via [Apple TestFlight](https://testflight.apple.com/join/PT2DSC3f) for simple installation and automatic updates.

If you prefer sideloading, you can use AltStore or SideStore with an Apple account. With a free Apple ID, refresh the app every seven days.

## Switching builds

Before you jump between stable, nightly, or another build, read the
[upgrade notes](https://github.com/SableClient/sable-next/blob/main/docs/v1-v2-migration.md).

## Host Sable yourself

Want Sable on your own domain? Release archives include a web build you can
extract into your own web root. See the
[example Caddyfile](https://github.com/SableClient/sable-next/blob/main/Caddyfile)
in the app repository.

For custom names, logos, themes and login options, see
[website branding](@/installation/branding.md). To configure accounts across web,
desktop and mobile, use [homeserver configuration](@/installation/homeserver-configuration.md).

To keep your Matrix stores on your own server and stay synced while the browser
is closed, use [server mode](./server-mode/).

{% </disclosure> %}
