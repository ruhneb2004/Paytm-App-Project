import { atom } from "recoil";

export const tokenAtom = atom({
  key: "tokenValue",
  default: "",
});
export const firstNameAtom = atom({
  key: "firstNameAtom",
  default: "",
});

export const lastNameAtom = atom({
  key: "lastNameAtom",
  default: "",
});
export const showModalAtom = atom({
  key: "showModal",
  default: false,
});
export const recipientUserIdAtom = atom({
  key: "recipientUserId",
  default: "",
});
export const recipientFirstNameAtom = atom({
  key: "recipientFirstNameAtom",
  default: "",
});
