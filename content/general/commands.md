+++
title = "Commands"
weight = 1
+++

## General Commands

### /poll

Create a poll in the current room

Usage: `/poll`

Opens the **Create Poll** dialog where you can enter a question, answer options, visibility settings, and an optional expiry time.

> Polls must be enabled in `config.json` (`"features": { "polls": true }`).

### /me

Describing what you're doing

Usage: `/me [someText]`

Example: `/me eating some delicious bananas`

### /notice

Send a message as notice (`m.notice`)

Usage: `/notice [someText]`

Examle: `/notice cats are cute`

## administrative commands

### /kick

kick a user from the current room (*you need to have the appropriate permission*)

Usage: `/kick [someUser]`

Example: `/kick @bad_guy:example.org`

### /ban

ban (*kick and they can't rejoin*) a user from the current room (*you need to have the appropriate permission*)

Usage: `/ban [someUser]`

Example: `/ban @bad_guy:example.org`

### /unban

lift the ban for a specific user (*they can be invited, and then join again*)

Usage: `/unban [someUser]`

Example: `/unban @not_so_bad_guy:example.org`

### /invite

invite a user to a room

Usage: `/invite [someUser]`

Example: `/invite @nice_guy:example.org`

### /disinvite

cancel the invite to a user for a room

Usage: `/disinvite [someUser]`

Example: `/disinvite @not_so_nice_guy:example.org`

### /leave

leave the current room

Usage: `/leave`

Example: `/leave`

### /startdm

start a dm with a specified user

Usage: `/startdm [someUser]`

Example: `/startdm @yumi:example.org`

### /ignore

ignore a user (*aka block them*)

Usage: `/ignore [someUser, ...]`

Example: `/ignore @bad_guy1:example.org @bad_guy2:example.org`

### /unignore

unblock a user

Usage: `/unignore [someUser, ...]`

Example: `/unignore @not_so_bad_guy1:example.org @not_so_bad_guy2:example.org`

*This Site is still a work in progress*
