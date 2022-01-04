import React from "react";
import RadarChart from "../component/RadarChart";
import PageLayout from "../component/PageLayout";
import { useRecoilState, useRecoilValue } from "recoil";
import { resultMovieState } from "../state/atoms";

const ResultPage = () => {
    const movieData = useRecoilValue(resultMovieState);
    console.log(movieData);
    return (
        <PageLayout>
            <RadarChart />
        </PageLayout>
    );
};

export default ResultPage;
