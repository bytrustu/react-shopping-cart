import { css } from '@styled-system/css';
import { Button, Typography } from '@/components';

type AlertProps = {
  message: string;
  confirmText?: string;
  cancelText?: string;
  resolve: (value: boolean) => void;
  close: () => void;
};

export const Alert = ({ message, confirmText = '확인', cancelText = '취소', resolve, close }: AlertProps) => (
  <div className={overlayStyles}>
    <article className={modalStyles}>
      <Typography variant="subtitle" className={messageStyles}>
        {message}
      </Typography>
      <section className={buttonContainerStyles}>
        <Button
          className={buttonStyles}
          variant="solid"
          colorScheme="gray"
          onClick={() => {
            resolve(false);
            close();
          }}
        >
          {cancelText}
        </Button>
        <Button
          className={buttonStyles}
          variant="solid"
          colorScheme="teal"
          onClick={() => {
            resolve(true);
            close();
          }}
        >
          {confirmText}
        </Button>
      </section>
    </article>
  </div>
);

const overlayStyles = css({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
});

const modalStyles = css({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  padding: '20px',
  borderRadius: '4px',
  backgroundColor: 'white',
});

const messageStyles = css({
  width: '320px',
  padding: '12px 6px 20px 6px',
  lineHeight: '1.5',
  whiteSpace: 'pre-wrap',
});

const buttonContainerStyles = css({
  display: 'flex',
  flexDirection: 'row',
  gap: '10px',
  justifyContent: 'flex-end',
});

const buttonStyles = css({
  width: '100%',
  minWidth: '80px',
});
