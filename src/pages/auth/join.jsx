import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthInfo from "../auth/AuthInfo";
import MemberInfo from "../auth/MemberInfo";
import { useAuth } from "../../context/AuthContext";

const Join = () => {
    const { authInfo, setAuthInfo } = useAuth(); // AuthContext 사용
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const step = query.get("step");
    const social = query.get("social");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleNext = () => {
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // AuthContext에 ID 저장
        setAuthInfo((prev) => ({ ...prev, loginid: authInfo.loginid }));
        navigate("/join?step=2");
    };

    const handleJoin = () => {
        alert("회원가입이 완료되었습니다!");
        navigate("/profile");
    };

    return (
        <div>
            {step === "1" ? (
                <AuthInfo
                    loginid={authInfo.loginid}
                    setLoginId={(id) => setAuthInfo((prev) => ({ ...prev, loginid: id }))}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    onNext={handleNext}
                />
            ) : step === "2" ? (
                <MemberInfo
                    name={authInfo.name}
                    setName={(name) => setAuthInfo((prev) => ({ ...prev, name }))}
                    generation={authInfo.generation}
                    setGeneration={(gen) => setAuthInfo((prev) => ({ ...prev, generation: gen }))}
                    position={authInfo.position}
                    setPosition={(pos) => setAuthInfo((prev) => ({ ...prev, position: pos }))}
                    onJoin={handleJoin}
                />
            ) : (
                <div>잘못된 접근입니다.</div>
            )}
        </div>
    );
};

export default Join;
