import React, { useEffect } from "react";
import { genresState, previewTrackState } from "../state/atoms";
import { useResetRecoilState, useRecoilState } from "recoil";
import PageLayout from "../component/PageLayout";

const Home = ({ history }) => {
    const resetGenre = useResetRecoilState(genresState);

    const onClick = () => {
        resetGenre();

        history.push("/service");
    };

    return (
        <div>
            {/* <HoverEff /> */}
            <PageLayout
                title="음화당, "
                sub="음악을 좋아하는 당신께, 이 영화를 드려요."
            >
                <p>
                    문득 길을 걷다 OST를 듣고 영화가 떠오른 기억이 있으신가요?
                </p>
                <button onClick={onClick}>음악추천받기</button>
            </PageLayout>
        </div>
    );
};

export default Home;
