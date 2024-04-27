import { useOverlay } from './useOverlay';
import { Alert } from '@/components';

type AlertOptions = {
  type?: 'confirm' | 'alert';
  message: string;
  confirmText?: string;
  cancelText?: string;
};

export const useAlert = () => {
  const { open } = useOverlay();

  const openAlert = ({
    type = 'confirm',
    message,
    confirmText = '확인',
    cancelText = '취소',
  }: AlertOptions): Promise<boolean> =>
    new Promise((resolve) => {
      open(({ close, opened }) =>
        opened ? (
          <Alert
            type={type}
            message={message}
            confirmText={confirmText}
            cancelText={cancelText}
            resolve={resolve}
            close={close}
          />
        ) : null,
      );
    });

  return { open: openAlert };
};
