+++
title = "Location Sharing"
weight = 8
+++

Sable allows you to create and see pleasant maps for sharing your location.

# Creation

You can share a location by using either the commands /location or /sharemylocation or by tapping the Add button and then selecting Add Location.

When using the /location you can:
  - Input nothing else and just open the location modal
  - Input 2 coordonates for latitude or longitude as numbers
  - Input a geo:, OSM, or an Apple long link, shortened links are not available yet

Within the location sharing modal you have:
  - A button for sharing your current location as given by your device
  - A button pasting your current clipboard that allows you to paste a link
  - The 2 coordonates you are about to share in 2 input boxes
  - A map[^map] where you can move around, then click/tap anywhere to select as the location that is to be shared

# As a message

When someone shares a location the message will show you:
  - The coordonate pair, which you can click in order to copy which eases copying them into your mapping software for navigation or anything else
  - The button to open the location in a new website, taking you to openstreetmap.org at the location that was shared
  - A map[^map] so you can see instantly the location that is shared, that you can move around through

[^map]: The maps are dependend on OpenStreetMaps, and while we are endlessly thankful for the service, it is a 3rd party website. The maps cache the seen locations on your device but whenever a new map tile is required, it creates a request to the external website. As such there are 2 settings for disabling the maps, for [rooms that are unencrypted](http://app.sable.moe/settings/general?focus=show-interactive-map&moe.sable.client.action=settings) and for [ones that are encrypted](http://app.sable.moe/settings/general?focus=show-interactive-map-enc&moe.sable.client.action=settings) alongside the other 3rd party request settings.
