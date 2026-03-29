+++
title = "UI Improvements"
weight = 7
+++

Sable includes a number of quality-of-life improvements over its Cinny base.

# Search

Press <kbd>Ctrl</kbd> + <kbd>F</kbd>(or <kbd>⌘</kbd> + <kbd>F</kbd> on macOS) to open Sable's room search. This intercepts the browser's native find-in-page shortcut so you search your Matrix rooms instead of the page source. <kbd>Ctrl</kbd> + <kbd>K</kbd> / <kbd>⌘</kbd> + <kbd>K</kbd> also opens search as before.

![Search modal showing room/DM/space results with keyboard shortcut hint](/img/search-modal.png)

# Autocomplete

The mention and emoji autocomplete menu has been improved:

- The first suggestion is highlighted as soon as the menu opens
- <kbd>Enter</kbd> selects the currently highlighted item
- <kbd>↑</kbd> / <kbd>↓</kbd> navigate the list while keeping typing focus in the message editor
- After completing a mention or emoji, focus returns automatically to the composer

![Emoji autocomplete menu with the first suggestion highlighted as `:smile` is typed](/img/autocomplete.png)

# Volume Persistence

Video and audio message volume is persisted across page loads. Set your preferred volume once and all media players use that level from then on.

# Media & Calls

- **Calls**: Camera and microphone preferences set in the call settings are respected when starting a call from the room header button, not just from the in-room join screen.

# Notifications

- **Mentions-only favicon**: Enable **Favicon Dot: Mentions Only** in notification settings so the tab favicon only changes for mentions, not every unread.

# Account Switcher

A confirmation dialog is shown before signing out of an account in the account switcher, preventing accidental logouts.

# Add Account

A **Cancel** button appears next to "Adding account" in the add-account flow, letting you abort and return to the main app without completing the login.

# Accessibility & Mobile Polish

- **Reduced motion**: Loading spinners complete one full cycle and then stop, respecting the OS reduced-motion preference.
- **Message editor**: Respects the OS/keyboard capitalisation setting on mobile devices (`autoCapitalize="sentences"`).
- **iOS server input**: The server name field no longer autocorrects or restores the old value while you are actively editing it.
- **Theme color**: Browser and PWA theme colors correctly use white (`#ffffff`) in light mode and dark purple (`#1b1a21`) in dark mode.

# URL Preview Scroll Arrows

Link preview cards only show left/right scroll arrows when there is actually content to scroll — no more phantom arrows.
