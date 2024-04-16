import React, { memo, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

type OverlayProps = {
  render: (props: { close: () => void; opened: boolean }) => React.ReactNode;
  close: () => void;
};

const OverlayComponent = memo(({ render, close }: OverlayProps) => {
  const Component = useMemo(() => render({ close, opened: true }), [render, close]);
  return <>{Component}</>;
});

export const useOverlay = () => {
  const open = (render: (props: { close: () => void; opened: boolean }) => React.ReactNode) => {
    const element = document.createElement('div');
    document.body.appendChild(element);
    const root = createRoot(element);

    const close = () => {
      root.unmount();
      document.body.removeChild(element);
    };

    root.render(<OverlayComponent render={render} close={close} />);

    return close;
  };

  return { open };
};
