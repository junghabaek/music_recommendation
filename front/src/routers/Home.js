import React from "react";
import { genreState } from "../state/atoms";
import { useRecoilState } from "recoil";

const Home = ({ history }) => {
    const [genre, setGenre] = useRecoilState(genreState);

    const onClick = () => {
        setGenre({
            genre: "",
            music_genre: "",
        });

        history.push("/service");
    };

    return (
        <div>
            <h1>신개념 OST 기반 영화추천 서비스</h1>

            <p>문득 길을 걷다 OST를 듣고 영화가 떠오른 기억이 있으신가요?</p>

            <button onClick={onClick}>음악추천받기</button>
        </div>
    );
};

export default Home;
