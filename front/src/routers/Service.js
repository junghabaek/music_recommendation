import React, { useState } from "react";
import MovieGenre from "../component/MovieGenre";
import MusicGenre from "../component/MusicGenre";

const Service = () => {
    const [changeGenre, setChangeGenre] = useState(true);
    return (
        <div>
            <h1>Sound of movie</h1>

            {changeGenre ? (
                <div>
                    <MovieGenre setChangeGenre={setChangeGenre} />
                </div>
            ) : (
                <div>
                    <MusicGenre setChangeGenre={setChangeGenre} />
                </div>
            )}
        </div>
    );
};

export default Service;
