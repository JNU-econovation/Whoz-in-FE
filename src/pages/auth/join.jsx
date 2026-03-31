import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import MemberInfo from "./MemberInfo"
import axios from "axios"
import { customFetch } from "../../api/customFetch"

const Join = () => {
    const navigate = useNavigate();
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
