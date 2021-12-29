import React from "react";
import { useRecoilState } from "recoil";
import { genreState } from "../state/atoms";

const MovieGenre = () => {
    const Colors = [
        { name: "RED", hex: "#ffb598" },
        { name: "ORANGE", hex: "#ffdcaa" },
        { name: "PURPLE", hex: "#d7beff" },
        { name: "CYAN", hex: "#c7f5ed" },
        { name: "BLUE", hex: "#c2dbff" },
    ];
    const [genre, setGenre] = useRecoilState(genreState);

    const onChangeHandle = (e) => {
        setGenre({
            ...genre,
            genre: e.target.value,
        });
    };

    console.log(genre);

    return (
        <div>
            {Colors.map((color) => (
                <div key={color.name}>
                    <input
                        id={color.name}
                        type="radio"
                        name="color-selector"
                        value={color.name}
                        checked={genre.genre === color.name ? true : false}
                        onChange={onChangeHandle}
                    />
                    <label htmlFor={color.name}>{color.name}</label>
                </div>
            ))}
        </div>
    );
};

export default MovieGenre;
