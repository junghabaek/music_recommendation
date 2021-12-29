import { atom, selector } from "recoil";

export const loginState = atom({
    key: "login",
    default: false,
});

export const genreState = atom({
    key: "login",
    default: {
        genre: "",
        music_genre: "",
    },
});
