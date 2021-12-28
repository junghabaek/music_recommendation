import React, { useState } from "react";
import axios from "axios";
import style from "./Regist.module.css";

const Regist = ({ history }) => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Password2, setPassword2] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [Name, setName] = useState("");
    const [inputOtt, setInputOtt] = useState([]);

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    };

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    };

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    };

    const onPassword2Handler = (event) => {
        //비밀번호를 입력할때마다 password 를 검증하는 함수
        setPasswordError(event.target.value !== Password);
        setPassword2(event.currentTarget.value);
    };

    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log("Email", Email);
        console.log("Password", Password);

        let body = {
            email: Email,
            password: Password,
            password2: Password2,
            userName: Name,
        };

        axios.post("/users/signup", body).then((res) => {
            console.log(res);
            console.log("res.data.userId :: ", res.data.user_id);
            console.log("res.data.result :: ", res.data.result);
        });
        alert("안녕하세요");
    };

    const onClickOtt = (e) => {
        setInputOtt((cur) => [e.target.value, ...cur]);
    };
    console.log(inputOtt);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
            }}
        >
            <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={onSubmitHandler}
            >
                <br />
                <h1>회원가입을 해봅시다.</h1>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>Password</label>
                <input
                    type="password"
                    value={Password}
                    onChange={onPasswordHandler}
                />
                <label htmlFor="user-password-check">Confirm Password</label>
                <input
                    name="user-password-check"
                    type="password"
                    required
                    value={Password2}
                    onChange={onPassword2Handler}
                />
                {passwordError && (
                    <div style={{ color: "red" }}>
                        비밀번호가 일치하지 않습니다.
                    </div>
                )}
                <div className={style.checkbox}>
                    <label htmlFor="Netflix">Netflix</label>
                    <input
                        id="Netflix"
                        value="Netflix"
                        type="checkbox"
                        onClick={onClickOtt}
                    />
                    <label htmlFor="disney">
                        디즈니+
                        <input
                            id="disney"
                            value="disney"
                            type="checkbox"
                            onClick={onClickOtt}
                        />
                    </label>
                    <label>
                        훌루
                        <input type="checkbox" />
                    </label>
                    <label>
                        아마존프라임
                        <input type="checkbox" />
                    </label>
                </div>
                <br />
                <button type="submit" disabled={!Password || !Password2}>
                    회원 가입
                </button>
            </form>
        </div>
    );
};

export default Regist;
