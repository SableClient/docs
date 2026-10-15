+++
title = "Welcome to Sable"
description = "An almost stable Matrix client"
sort_by = "weight"

[extra]
home = true
hide_page_list = true
+++

{{<hero title="Welcome to Sable" lead="An almost stable Matrix client" />}}

{% <link_grid class="home-links"> %}
{{<link_card href="/installation/" icon="download-simple" title="Install Sable" description="Web app or download for your device." class="home-card" />}}
{{<link_card href="/features/" icon="book-open" title="Feature guides" description="Threads, notifications, personas, and more." class="home-card" />}}
{{<link_card href="/matrix-guide/" icon="tree-structure" title="New to Matrix?" description="Accounts, servers, and rooms." class="home-card" />}}
{% </link_grid> %}

{% <help note="For account issues (password, login), ask whoever runs your homeserver."> %}
{{<icon_link href="https://matrix.to/#/#sable:sable.moe" icon="chat-text" label="Ask in #sable:sable.moe" />}}
{{<icon_link href="https://git.sable.moe/SableClient/sable-next/issues" icon="bug" label="Report a bug" />}}
{% </help> %}
