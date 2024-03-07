# voila_topbar

[![Github Actions Status](https://github.com/voila-dashboards/voila-topbar/workflows/Build/badge.svg)](https://github.com/voila-dashboards/voila-topbar/actions/workflows/build.yml)
[![PyPI - Version](https://img.shields.io/pypi/v/voila_topbar)](https://pypi.org/project/voila-topbar/)
[![Conda Version](https://img.shields.io/conda/vn/conda-forge/voila_topbar.svg)](https://anaconda.org/conda-forge/voila_topbar)

![vl3](https://github.com/voila-dashboards/voila-topbar/assets/4451292/d8bcf47c-5661-41bc-b0da-35624e28d33c)

`voila_topbar` is a Voila extension that adds a top bar to the dashboards and the tree page. The top bar can contain a logo, a title, a theme selector and a kernel status indicator.

To configure the top bar, you can use the `voila.json` file with the following content:

```js
// voila.json
{
  "VoilaConfiguration": {
    "extension_config": {
      "voila_topbar": {
        "background": "red",
        "textColor": "blue",
        "title": "My title",
        "icon": "link-to-the-icon-file",
        "kernelActivity": true,
        "themeToggle": true
      }
    }
  }
}

```

## Requirements

- JupyterLab >= 4.0.0

## Install

To install the extension, execute:

```bash
pip install voila_topbar
```

or

```bash
conda install -c conda-forge voila_topbar
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall voila_topbar
```

or

```bash
conda remove voila_topbar
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the voila_topbar directory
# Install package in development mode
pip install -e "."
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall voila_topbar
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `voila_topbar` within that folder.

### Packaging the extension

See [RELEASE](RELEASE.md)
