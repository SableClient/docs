+++
title = "Alternative to Discord"
weight = 2
template = "index.html"
page_template = "page.html"

[extra]
hide_page_list = true
+++

If you're here because you want something Discord-like without being locked into Discord, start here. If you want to compare Sable against other Matrix clients instead, see [Comparison with other clients](/compare-with-other-clients/).

This page is inspired by the public [Discord Replacers spreadsheet](https://docs.google.com/spreadsheets/u/0/d/14vicw-V9Z5m7ckuburP5wxyDIIb_fFJFEjnxxHk8qRw/htmlview), but it only compares Sable against Discord.

Only implemented features count below. Features that are still in progress are marked with footnotes.

## Messaging

| Feature | Sable | Discord |
|---------|-------|---------|
| Encryption / privacy | Yes[^e2ee] | Variable |
| Channels / rooms | Yes | Yes |
| Channel history | Yes | Yes |
| Persistent channel order | Partial[^166] [^space-lobby-ordering] | Yes |
| Threads | Yes | Yes |
| Attribute search | No | Yes |
| Pinned posts | Yes | Yes |
| Pluralkit-adjacent options | Built-in | With Bots/Apps |
| Direct messages | Yes | Yes |
| Post reactions | Yes | Yes |
| Embed previews | Yes | Yes |
| Text formatting | Yes | Yes |
| Message editing | Yes | Yes |
| Embeddable polls | No | Yes |
| Event management / scheduling | No | Yes |
| Full-text search | Partial[^e2ee-search] | Yes |

## Calls, Media, and Customization

| Feature | Sable | Discord |
|---------|-------|---------|
| Voice calls | Yes | Yes |
| Video calls | Yes | Yes |
| Screen sharing / streaming | Yes | Yes |
| Audio in Screenshare | Platform-Dependent | Platform-Dependent |
| Noise / echo suppression | Yes | Yes |
| Built-in soundboard | Limited[^soundboard] | Yes |
| Custom emotes | Yes | Paid |
| Custom stickers | Yes | Paid |
| File sharing / hosting | Yes[^homeserver-files] | Variable |

## Widgets and Automation

| Feature | Sable | Discord |
|---------|-------|---------|
| Collaborative work | Partial[^widgets] | Variable |
| Bot hooks and / or plugins | Partial[^bots] | Variable |
| In-Call widgets | No | Variable |

## Platform Support

| Feature | Sable | Discord |
|---------|-------|---------|
| Mobile app | Yes[^88][^ios] | Yes |
| Web app | Yes | Yes |
| Desktop app | Yes[^88] | Yes |

## Protocol, Hosting, and Ownership

| Feature | Sable | Discord |
|---------|-------|---------|
| Decentralized / federated | Yes | No |
| Self-hosting available | Yes | No |
| Open source | Yes | No |
| Data-harvesting free | Yes | No |
| KYC safe | Yes | No |

[^e2ee]: Sable supports Matrix end-to-end encryption where the room supports it.
[^166]: Broader ordering work is tracked in [Order by Activity (#166)](https://github.com/SableClient/Sable/issues/166).
[^space-lobby-ordering]: Space room ordering is supported from the Space Lobby today. Separate rooms and DMs do not yet have the same sorting controls.
[^e2ee-search]: End-To-End-Encrypted messages are currently not included in search. This is tracked in [#1821](https://github.com/SableClient/Sable/issues/1821)
[^soundboard]: The current non-experimental call interface ships with a hard-coded set of sounds.
[^homeserver-files]: Files are hosted by the Matrix homeserver the user chooses. Usually, they aren't accessible by URL outside of Matrix, and require login.
[^widgets]: Basic Matrix widget support can cover shared apps, but it is not fully tested yet.
[^bots]: Matrix bots are regular users rather than a client plugin system. Sable adds bot labeling and exposes room apps/widgets when present.
[^88]: Native desktop and mobile builds are tracked in [Add desktop and mobile builds (#88)](https://github.com/SableClient/Sable/issues/88).
[^ios]: iOS is supported, but requires access to AltStore, AltStore PAL or another way to install IPA files.
[^mobile-pwa]: For now, install the web app as a PWA on your phone.
[^desktop-builds]: Native desktop builds are still being worked on.
