import { atom, selector } from "recoil";

export const loginState = atom({
    key: "login",
    default: false,
});
