+++
title = "Personas"
+++

Personas use *[Per-Message-Profiles](https://github.com/matrix-org/matrix-spec-proposals/pull/4144)* to allow you to switch through your Personas on the go.

The personas are saved in your account, so you have access to them from multiple devices.

## Enabling Personas

To enable the personas Settings tab and select the `Show Personas Tab` Option:

<img src="/img/personas/experimental-pmp-enable.png" alt="Show Personas Tab" height="300px" />

## Creating a Persona

Navigate to the Personas Tab

<img src="/img/personas/persona-settings-tab-position.png" alt="Show Personas Tab" height="300px" />

Then select to add a new persona and fill out the fields

<img src="/img/personas/add_persona.png" alt="Show Personas Tab" height="250px" /><img src="/img/personas/creating-a-persona.png" alt="Show Personas Tab" height="250px" />

You *can* and *should* change the initial id, however it might be advisable to save beforehand.
You can use the same syntax for pronouns as in the account settings, for example: `en:she/her, de:sie/ihr`

Don't forget to hit the save button, before leaving the screen.

## Associating a persona with a room

> **Note:** you will need the profile id for that

just run the command to associate a persona with a room using `/usepmp [profileId]`:

<img src="/img/personas/usepmp.png" alt="Show Personas Tab" height="50px" />

You will then get this confirmation:

<img src="/img/personas/usepmp-confirm.png" alt="Show Personas Tab" height="50px" />

to sever that association, you would just run `/usepmp reset`:

<img src="/img/personas/usepmp-reset.png" alt="Show Personas Tab" height="50px" />

You will then get this confirmation:

<img src="/img/personas/usepmp-reset-confirm.png" alt="Show Personas Tab" height="50px" />

## PK-Compatibility

If you enable PK-Commands a few commands you may know from pluralkit get enable.

<img src="/img/personas/enable-pk-commands.png" alt="Show Personas Tab" height="250px" />

> **Note:** if you want to use shorthands, also enable the `Enable Shorthands` option

### Creating a new member

Syntax: `pk;member new [MemberName]`

Examples:

- `pk;member new Yumi`
- `pk;member new Craig Smith`

### Rename a member

Syntax: `pk;member [OldMemberName] rename [NewMemberName]`

Examples:

- `pk;member "Rain Deer" rename "Micky Mouse"`
- `pk;member "Craig Smith" rename "Craig Johnson"`

### Adding a shorthand

> **Note:** You must include the word `text` in your shorthand pattern exactly as shown in the examples. Replace it with your actual message when you type later. This works the same way as [PluralKit's `proxy`](https://pluralkit.me/guide/#proxying) command

Syntax: `pk;member [MemberName] proxy [text]`

Examples:

- `pk;member John proxy [text]`
- `pk;member Alice proxy ✨:text`
- `pk;member "Craig Johnson" proxy {text}`
- `pk;member Skyler proxy S:text`

### Removing a shorthand

> **Note:** `[text]` is exactly the pattern you entered when adding a shorthand. the word `text` must be contained in it in every case

Syntax: `pk;member [MemberName] proxy remove [text]`

Example: `pk;member Yumi proxy remove [text]`