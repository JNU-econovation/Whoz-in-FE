import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthInfo from "./AuthInfo";
import MemberInfo from "./MemberInfo";
import axios from 'axios';
import { customFetch } from "../../api/customFetch"

const Join = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    //const [step, setStep] = useState(initialStep);
    const [loginid, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [generation, setGeneration] = useState("");
    const [position, setPosition] = useState("");



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
            const response = await customFetch(
                process.env.REACT_APP_BACKEND_BASEURL + "/api/v1/signup/oauth",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newMember),
                }
            );
            if (response.ok) {
                alert("회원가입이 완료되었습니다!");
                navigate("/main");
            } else {
                alert("회원가입에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
    };

    const social = query.get("social");

    return (
        <div>
                <MemberInfo
                    name={name}
                    setName={setName}
                    generation={generation}
                    setGeneration={setGeneration}
                    position={position}
                    setPosition={setPosition}
                    onJoin={handleSocialJoin}
                />
        </div>
    );
};

export default Join;