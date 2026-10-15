+++
title = "Commands"
weight = 1
+++

## Messages

| Command | Description | Usage |
| --- | --- | --- |
| `/me` | Send the message as an action | `/me <action>` |
| `/notice` | Send the message as a notice | `/notice <message>` |
| `/shrug` | Append <code>¯\_(ツ)_/¯</code> to the message | `/shrug [message]` |
| `/tableflip` | Append (╯°□°）╯︵ ┻━┻ to the message | `/tableflip [message]` |
| `/unflip` | Append ┬─┬ ノ( ゜-゜ノ) to the message | `/unflip [message]` |
| `/rainbow` | Send the message in rainbow colours | `/rainbow <message>` |
| `/rainbowme` | Send an action in rainbow colours | `/rainbowme <action>` |
| `/html` | Send a message written as HTML | `/html <span data-mx-color="#ff0000">red</span>` |
| `/gif` | Search and send a GIF | `/gif [search]` |
| `/bugreport` | Open the bug report form | `/bugreport` |

## Gestures

| Command | Description | Usage |
| --- | --- | --- |
| `/hug` | Send a hug | `/hug [@user:server]` |
| `/cuddle` | Send a cuddle | `/cuddle [@user:server]` |
| `/wave` | Send a wave | `/wave [@user:server]` |
| `/poke` | Send a poke | `/poke [@user:server]` |
| `/headpat` | Send a headpat | `/headpat [@user:server]` |

## Rooms and people

| Command | Description | Usage |
| --- | --- | --- |
| `/join` | Join a room by address | `/join <#room:server>` |
| `/knock` | Ask to join a room | `/knock <#room:server> [reason]` |
| `/leave` | Leave this room | `/leave` |
| `/invite` | Invite someone to this room | `/invite <@user:server>` |
| `/disinvite` | Withdraw an invitation | `/disinvite <@user:server> [@user:server…]` |
| `/startdm` | Open a direct message with someone | `/startdm <@user:server> [@user:server…]` |
| `/converttodm` | Mark this room as a direct message | `/converttodm [@user:server]` |
| `/converttoroom` | Mark this direct message as an ordinary room | `/converttoroom` |
| `/ignore` | Hide everything from someone, on every device | `/ignore <@user:server> [@user:server…]` |
| `/unignore` | Stop hiding someone | `/unignore <@user:server> [@user:server…]` |

## Moderation

| Command | Description | Usage |
| --- | --- | --- |
| `/kick` | Remove someone from this room | `/kick <@user:server\|@*:server> [@user:server\|@*:server…] [reason]` |
| `/ban` | Ban someone from this room | `/ban <@user:server\|@*:server> [@user:server\|@*:server…] [reason]` |
| `/unban` | Lift a ban on someone | `/unban <@user:server> [reason]` |
| `/acl` | Manage this room's server access list | `/acl [-a server] [-d server] [-ra server] [-rd server]` |
| `/delete` | Redact recent messages from selected users | `/delete <@user:server\|@*:server> [-past 1d\|2h\|5m\|30s] [-t event.type] [-r reason]` |

## Profile and room

| Command | Description | Usage |
| --- | --- | --- |
| `/nick` | Change your display name everywhere | `/nick <name>` |
| `/myroomnick` | Change your display name in this room only | `/myroomnick <name>` |
| `/myroomavatar` | Change your avatar in this room only | `/myroomavatar mxc://…` |
| `/color` | Set your name colour in this room | `/color [light\|dark] <#rrggbb\|reset>` |
| `/scolor` | Set your name colour across this space | `/scolor [light\|dark] <#rrggbb\|reset>` |
| `/pronoun` | Set your pronouns in this room | `/pronoun <pronouns\|reset>` |
| `/spronoun` | Set your pronouns across this space | `/spronoun <pronouns\|reset>` |
| `/roomname` | Change this room's name | `/roomname <name>` |
| `/topic` | Change this room's topic | `/topic <topic>` |

## Location

| Command | Description | Usage |
| --- | --- | --- |
| `/location` | Share a set of coordinates | `/location <latitude> <longitude>` |
| `/sharemylocation` | Share where this device is | `/sharemylocation` |

## Widgets

| Command | Description | Usage |
| --- | --- | --- |
| `/addwidget` | Add a widget to this room | `/addwidget <url> [name]` |

## Personas

| Command | Description | Usage |
| --- | --- | --- |
| `/addpmp` | Add or update a per-message profile | `/addpmp <id> [name=Name] [avatar=mxc://…]` |
| `/delpmp` | Delete a per-message profile | `/delpmp <id>` |
| `/usepmp` | Send as a per-message profile in this room | `/usepmp <id\|reset\|off> [expiry]` |
| `/pmpproxy` | Add a shorthand trigger to a per-message profile | `/pmpproxy <id> <prefix>text<suffix>` |

## Encryption

| Command | Description | Usage |
| --- | --- | --- |
| `/discardsession` | Discard this room's outbound encryption session so the next message uses a new key | `/discardsession` |

## Developer tools

These only work when developer tools are enabled in settings.

| Command | Description | Usage |
| --- | --- | --- |
| `/rawmsg` | Send a raw message event | `/rawmsg <JSON object>` |
| `/raw` | Send a raw room or state event | `/raw <type> <JSON object> [-s state key]` |
| `/rawacc` | Merge global account data | `/rawacc <type> <JSON object>` |
| `/delacc` | Remove a key from global account data | `/delacc <type> <key>` |

