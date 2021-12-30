import { atom, selector } from "recoil";

export const loginState = atom({
    key: "login",
    default: false,
});

export const genreState = atom({
    key: "genre",
    default: {},
});

export const filterMovieState = atom({
    key: "filterMovie",
    default: [],
});
