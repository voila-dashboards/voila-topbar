import { IThemeManager } from '@jupyterlab/apputils';
import * as React from 'react';

interface IProps {
  config: {
    background?: string;
    title?: string;
    themeToggle?: boolean;
  };
  themeManager: IThemeManager;
}

export function TopbarElement(props: IProps): JSX.Element {
  const [themeOptions, setThemeOptions] = React.useState<string[]>([
    ...props.themeManager.themes
  ]);
  React.useEffect(() => {
    const cb = (sender: IThemeManager, args: any) => {
      if (args.newValue.length > 0) {
        return;
      }
      setThemeOptions([...props.themeManager.themes]);
    };
    props.themeManager.themeChanged.connect(cb);
    return () => void props.themeManager.themeChanged.disconnect(cb);
  }, [props.themeManager]);
  console.log('themeOptions', themeOptions);

  return (
    <React.Fragment>
      <div className="voila-topbar-title">
        {props.config.title ?? 'Voila Dashboard'}
      </div>
    </React.Fragment>
  );
}
