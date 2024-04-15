import { css } from '@styled-system/css';
import { flex } from '@styled-system/patterns';
import { Button, Typography } from '@/components';
import { useAlertStore } from '@/store';

export const Alert = () => {
  const alertStore = useAlertStore();

  if (!alertStore.opened) {
    return null;
  }

  const confirmText = alertStore.options.confirmText || '확인';
  const cancelText = alertStore.options.cancelText || '취소';

  return (
    <div role="dialog" aria-modal="true" className={overlayStyles}>
      <article className={modalStyles}>
        <Typography variant="subtitle" className={messageStyles}>
          {alertStore.options.message}
        </Typography>
        <section className={buttonContainerStyles}>
          <Button className={buttonStyles} variant="solid" colorScheme="gray" onClick={alertStore.options.onClose}>
            {cancelText}
          </Button>
          <Button className={buttonStyles} variant="solid" colorScheme="teal" onClick={alertStore.options.onConfirm}>
            {confirmText}
          </Button>
        </section>
      </article>
    </div>
  );
};

const overlayStyles = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 'modal',
});

const modalStyles = flex({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  flexDirection: 'column',
  gap: '10px',
  padding: '20px',
  borderRadius: '4px',
  backgroundColor: 'white',
});

const messageStyles = flex({
  width: '320px',
  padding: '12px 6px 20px 6px',
  lineHeight: '1.5',
  whiteSpace: 'pre-wrap',
});

const buttonContainerStyles = flex({
  flexDirection: 'row',
  gap: '10px',
  justifyContent: 'flex-end',
});

const buttonStyles = css({ width: '100%', minWidth: '80px' });
