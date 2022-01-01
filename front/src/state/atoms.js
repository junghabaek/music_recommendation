import { atom, selector } from "recoil";

export const loginState = atom({
    key: "login",
    default: false,
});

export const genresState = atom({
    key: "genres",
    default: {},
});

export const filterMovieState = atom({
    key: "filterMovie",
    default: [],
});

export const previewTrackState = atom({
    key: "previewTrack",
    default: [],
});
