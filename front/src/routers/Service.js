import MovieGenre from "../component/MovieGenre";
import MusicGenre from "../component/MusicGenre";
import FilterMovie from "../component/FilterMovie";
import Stepper, { useStepper } from "../component/useStepper";
import PageLayout from "../component/PageLayout.jsx";

const Service = ({ history }) => {
    const { step, onNext, onPrev } = useStepper(); //커스텀 훅 만든 것

    return (
        <div>
            <PageLayout title="Muvie and chill">
                <Stepper step={step} onNext={onNext} onPrev={onPrev}>
                    <MovieGenre />
                    <MusicGenre />
                    <FilterMovie />
                    <div>
                        나랑 결과보러 가지 않을래
                        <button onClick={() => history.push("/")}>
                            눌러봐
                        </button>
                    </div>
                </Stepper>
            </PageLayout>
        </div>
    );
};

export default Service;