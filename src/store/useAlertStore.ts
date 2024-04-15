import { create } from 'zustand';

type ModalOptions = {
  message?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
};

type State = {
  opened: boolean;
  options: ModalOptions;
};

type Actions = {
  open: (options: ModalOptions) => void;
  close: () => void;
};

type ModalStore = State & Actions;

export const useAlertStore = create<ModalStore>((set) => ({
  opened: false,
  options: {},
  open: (options) => set({ opened: true, options }),
  close: () => set({ opened: false, options: {} }),
}));
