import React, { useState } from "react";

export function useStepper() {
    const [step, setStep] = useState(0);
    const increaseStep = () => setStep((s) => s + 1);
    const decreaseStep = () => setStep((s) => s - 1);

    return {
        step,
        onNext: increaseStep,
        onPrev: decreaseStep,
    };
}
export default function Stepper({ step, children, onNext, onPrev }) {
    const totalLength = children.length;

    //{children[step]} 은 지금 스텝에 해당하는 애를 보여주는 것임
    //React.cloneElement는 각 엘리먼트들로 prop을 넘겨줌으로서 props를 직접 넘기는 행위에서 벗어날수 있음
    return React.cloneElement(children[step], {
        onNext,
        onPrev,
    });
}
