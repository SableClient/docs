+++
title = "Contributing"
weight = 3
template = "index.html"
page_template = "page.html"
+++

# Local development
> [!TIP]
> We recommend using a version manager as versions change quickly. [fnm](https://github.com/Schniz/fnm) is a great cross-platform option (Windows, macOS, and Linux). [NVM on Windows](https://github.com/coreybutler/nvm-windows#installation--upgrades) and [nvm](https://github.com/nvm-sh/nvm) on Linux/macOS are also good choices. Use the version defined in [`.node-version`](.node-version).

Execute the following commands to start a development server:
```sh
fnm use --corepack-enabled # Activates the Node version and enables corepack
# If you not using fnm, install corepack manually: npm install --global corepack@latest
corepack install # Installs the pnpm version specified in package.json
pnpm i # Installs all dependencies
pnpm run dev # Serve a development version
```

To build the app:
```sh
pnpm run build # Compiles the app into the dist/ directory
```

# Deployment and infrastructure
Deployment workflows and infrastructure details live in
[`infra/README.md`](https://github.com/SableClient/Sable/blob/dev/infra/README.md).
