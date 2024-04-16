import { css } from '@styled-system/css';
import { Button, Overlay, Typography } from '@/components';

type AlertProps = {
  message: string;
  confirmText?: string;
  cancelText?: string;
  resolve: (value: boolean) => void;
  close: () => void;
};

export const Alert = ({ message, confirmText = '확인', cancelText = '취소', resolve, close }: AlertProps) => (
  <Overlay>
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
  </Overlay>
);

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
