import { IThemeManager } from '@jupyterlab/apputils';
import * as React from 'react';
import { Kernel } from '@jupyterlab/services';
import { ProgressCircle } from './kernelStatus';

interface IProps {
  config: {
    background?: string;
    title?: string;
    themeToggle?: boolean;
  };
  themeManager: IThemeManager;
  kernelConnection?: Kernel.IKernelConnection;
}

export function TopbarElement(props: IProps): JSX.Element {
  const [themeOptions, setThemeOptions] = React.useState<string[]>([
    ...props.themeManager.themes
  ]);
  const [kernelBusy, setkernelBusy] = React.useState<0 | 100>(100);
  React.useEffect(() => {
    const cb = (sender: IThemeManager, args: any) => {
      if (args.newValue.length > 0) {
        return;
      }
      setThemeOptions([...props.themeManager.themes]);
    };
    props.themeManager.themeChanged.connect(cb);
    const kernelCb = (sender: any, status: any) => {
      const progress = status === 'busy' ? 0 : 100;
      setkernelBusy(progress);
    };
    if (props.kernelConnection) {
      props.kernelConnection.statusChanged.connect(kernelCb);
    }

    return () => {
      props.themeManager.themeChanged.disconnect(cb);
      if (props.kernelConnection) {
        props.kernelConnection.statusChanged.disconnect(kernelCb);
      }
    };
  }, [props.themeManager, props.kernelConnection]);

  const onThemeChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const theme = e.currentTarget?.value;
      if (theme) {
        props.themeManager.setTheme(theme);
      }
    },
    [props.themeManager]
  );

  const themeSelect = React.useMemo(() => {
    return (
      <select className="voila-topbar-theme" onChange={onThemeChange}>
        {themeOptions.map(el => {
          return (
            <option key={el} value={el}>
              {el}
            </option>
          );
        })}
      </select>
    );
  }, [themeOptions, onThemeChange]);
  return (
    <React.Fragment>
      <div className="voila-topbar-title">
        {props.config.title ?? 'Voila Dashboard'}
      </div>
      {themeSelect}
      <ProgressCircle progress={kernelBusy} width={50} height={50} />
    </React.Fragment>
  );
}
