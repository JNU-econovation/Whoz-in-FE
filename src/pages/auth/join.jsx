import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthInfo from "./AuthInfo";
import MemberInfo from "./MemberInfo.jsx";
import members from "../../data/sampleData";


const Join = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const initialStep = query.get("step") === "2" ? 2 : 1;

    const [step, setStep] = useState(initialStep);
    const [loginid, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [generation, setGeneration] = useState("");
    const [position, setPosition] = useState("");

    const handleNext = () => {
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        setStep(2);
    };

    const handleJoin = () => {
        const newMember = {
            id: members.length,
            name,
            loginid,
            password,
            generation,
            position,
        };

        members.push(newMember);
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
    };

    return step === 1 ? (
        <AuthInfo
            loginid={loginid}
            setLoginId={setLoginId}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            onNext={handleNext}
        />
    ) : (
        <MemberInfo
            name={name}
            setName={setName}
            generation={generation}
            setGeneration={setGeneration}
            position={position}
            setPosition={setPosition}
            onJoin={handleJoin}
        />
    );
};

export default Join;