+++
title = "Message Bookmarks"
weight = 10
+++

> **Experimental feature** — Enable via **Settings → Experimental → Message Bookmarks (MSC4438)**.

Bookmarks let you save individual messages for later reference. Saved bookmarks appear in a dedicated **Bookmarks** page in the sidebar and sync automatically across all your devices.

This feature implements [MSC4438](https://github.com/matrix-org/matrix-spec-proposals/pull/4438). See the [tracking issue](https://github.com/SableClient/Sable/issues/600) for known limitations and progress.

# Bookmarking a Message

Hover over any message and open the message menu (the **⋮** button). Select **Bookmark Message**. The menu item toggles, so selecting it again on an already-bookmarked message removes the bookmark.

# The Bookmarks Page

Click **Bookmarks** in the left sidebar (under Message Search) to open the bookmarks list.

Each bookmark shows:

- The sender's avatar and display name
- The room the message came from
- A preview of the message content
- The timestamp of the original message

Use the **Filter** box at the top to search bookmarks by message text, room name, or sender.

Click **Jump** on any bookmark to navigate directly to that message in its room.

Click the **trash** icon to remove a bookmark (a confirmation dialog will appear).

# Sync Across Devices

Bookmarks are stored in your Matrix account data, so they are available on any device you log in to with your account. Changes (adding or removing a bookmark) propagate to other devices automatically via your homeserver.

> **Privacy note:** Bookmark metadata including a short message preview is stored as unencrypted account data on your homeserver, regardless of whether the original room is encrypted. This is a known limitation of the current MSC — see [MSC4438](https://github.com/matrix-org/matrix-spec-proposals/pull/4438) for the ongoing spec discussion.
