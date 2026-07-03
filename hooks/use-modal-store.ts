import { ServerWithMembersWithProfile } from "@/types";
import { create } from "zustand";

export type ModalType =
  | "createServer"
  | "editServer"
  | "createChannel"
  | "editChannel"
  | "invite"
  | "initialSetup"
  | "memebers"
  | null;

interface ModalData {
  server?: ServerWithMembersWithProfile;
}
interface ModalState {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ type, data, isOpen: true }),
  onClose: () => set({ type: null, isOpen: false }),
}));
