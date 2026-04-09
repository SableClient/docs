+++
title = "Polls"
weight = 9
+++

Sable supports Matrix polls ([MSC3381](https://github.com/matrix-org/matrix-spec-proposals/pull/3381)), letting you ask questions and collect votes directly inside a room.

![A poll in the Sable timeline showing answer options with vote counts and an End Poll button](/img/polls-example.png)

> **Note:** Polls are currently disabled by default. They can be enabled by setting `"features": { "polls": true }` in your server's `config.json`.

# Creating a Poll

Type `/poll` in any room's message box and press Enter (or select the suggestion from the command list). The **Create Poll** dialog will open.

Fill in:

- **Question** — what you want to ask (up to 340 characters)
- **Options** — at least 2 and at most 20 answer choices (each up to 340 characters); blank options are ignored when sent
- **Results visibility** — *Show live results* (disclosed, results visible while voting) or *Hide until closed* (undisclosed, results hidden until the poll ends)
- **Voter visibility** — choose whether voter names are shown next to each answer in the results
- **Poll duration** — optionally set an expiry time (1 hour, 12 hours, 24 hours, 48 hours, 1 week, or a custom date and time); the poll automatically closes when the time is reached

Click **Create Poll** to post it to the room.

# Voting

Click an answer button to cast your vote. In a *disclosed* poll you can see the current vote counts and percentages update immediately. Click a selected option again to remove your vote; in a single-choice poll selecting a different option automatically moves your vote.

# Ending a Poll

If you created the poll or have moderator permissions in the room, an **End Poll** button appears at the bottom of the poll. Ending the poll locks voting and shows final results to everyone, including in *undisclosed* polls.

# Results

Once a poll is ended (or for disclosed polls, at any time) each answer shows:

- A fill bar indicating the share of votes
- The percentage and raw vote count
- A tick mark next to the option(s) you voted for
- An expandable voter list (if the poll creator enabled voter visibility)

The footer shows the total number of unique voters plus the poll status ("Poll ended", "Poll expired", or "Results hidden until closed"), and the time remaining if a duration was set.
