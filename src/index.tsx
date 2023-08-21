import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { IThemeManager } from '@jupyterlab/apputils';
import { ReactWidget } from '@jupyterlab/ui-components';
import { Kernel } from '@jupyterlab/services';
import { ITopbarConfig, TopbarElement } from './widget';
import * as React from 'react';
import { PageConfig } from '@jupyterlab/coreutils';
/**
 * Initialization data for the voila_topbar extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'voila_topbar:plugin',
  description: 'A Voila extension',
  autoStart: true,
  requires: [IThemeManager],
  activate: (app: JupyterFrontEnd, themeManager: IThemeManager) => {
    if (app.name !== 'Voila') {
      return;
    }
    const kernelConnection = (app as any)?.widgetManager?.kernel as
      | Kernel.IKernelConnection
      | undefined;
    const extensionConfig = JSON.parse(PageConfig.getOption('extensionConfig'));
    const config = extensionConfig['voila_topbar'] as ITopbarConfig | undefined;

    const widget = ReactWidget.create(
      <TopbarElement
        config={config}
        themeManager={themeManager}
        kernelConnection={kernelConnection}
      />
    );
    widget.id = 'voila-topbar-element';
    app.shell.add(widget, 'top');
    if (widget.parent) {
      widget.parent.node.style.boxShadow =
        'rgba(0 0 0 / 20%) 0 2px 4px -1px, rgba(0 0 0 / 14%) 0 4px 5px 0, rgba(0 0 0 / 12%) 0 1px 10px 0';
    }
  }
};

export default plugin;
