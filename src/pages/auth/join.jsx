import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthInfo from "./AuthInfo";
import MemberInfo from "./MemberInfo";
import members from "../../data/sampleData";
import axios from 'axios';

const Join = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    //const initialStep = query.get("step") === "2" ? 2 : 1;

    //const [step, setStep] = useState(initialStep);
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
        // setStep(2);
        navigate("/join?step=2"); // step=2로 쿼리 파라미터 바꿔봐

    };

    const handleJoin = () => {
        const newMember = {
            id: members.length,
            loginid,
            password,
            name,
            generation,
            position,
        };

        members.push(newMember);
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
    };

    const handleSocialJoin = async () => {
        const newMember = {
            name,
            generation,
            position,
        };
    console.log(name, generation, position);
    axios.interceptors.request.use(config => {
        console.log('Request Config:', config);
        return config;
      });

    
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_BASEURL + '/api/v1/signup/oauth', 
                newMember,
                {
                    withCredentials: true
                  }
            );
            if (response.status === 200 || response.status === 201) {
                alert("회원가입이 완료되었습니다!");
                navigate("/login");
            } else {
                alert("회원가입에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error("회원가입 중 오류가 발생했습니다:", error);
            alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    const step = query.get("step");
    const social = query.get("social");

    return (
        <div>
            {step === "1" ? (
                <AuthInfo
                    loginid={loginid}
                    setLoginId={setLoginId}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    onNext={handleNext}
                />
            ) : step === "2" ? (
                <MemberInfo
                    name={name}
                    setName={setName}
                    generation={generation}
                    setGeneration={setGeneration}
                    position={position}
                    setPosition={setPosition}
                    onJoin={social === "true" ? handleSocialJoin : handleJoin}
                />
            ) : (
                <div>잘못된 접근입니다.</div>
            )}
        </div>
    );
};

export default Join;