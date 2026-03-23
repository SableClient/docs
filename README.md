# Sable Docs
Documentation for Sable features, cosmetics, and utilities.

## Contributing
Sable uses [Zola](https://www.getzola.org/), a lightweight, no-dependency, single-binary static site generator, for our documentation.

### Local Development
To install Zola, see the [official installation guide](https://www.getzola.org/documentation/getting-started/installation/).

Once installed, run the following command in the root directory to start a local preview server:

```Bash
zola serve # starts a server on http://127.0.0.1:1111
```
To see pages marked as `draft = true`, use `zola serve --drafts`.

### Writing Content
Documentation goes in the `/content` directory.

Zola uses TOML (wrapped in +++) for frontmatter. Ensure every new .md file starts and ends with triple pluses.
Every folder inside /content needs an _index.md file to be rendered as a section. If you create a new category, add an _index.md there first.
You can place images or files directly in the same folder as your markdown file; Zola will handle the relative paths automatically.

## Deployment
The site is automatically built and deployed via GitHub Actions when changes are merged into main. To test a production build locally:

```Bash
zola build # builds to /public folder
```
