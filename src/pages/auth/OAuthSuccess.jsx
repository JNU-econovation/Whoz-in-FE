import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAndUpdateMemberCache } from '../../api/storeMemberInfo';
import { customFetch } from '../../api/customFetch';
import { useAuth } from '../../context/AuthContext';


const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;

const OAuthSuccess = () => {
    const navigate = useNavigate();
    const { syncMemberId } = useAuth();

    useEffect(() => {
        //is_registered 추출
        const params = new URLSearchParams(window.location.search);
        const isRegistered = params.get("is-registered");
        const handleLoginSuccess = async () => {
            try {
                const apiUrl = `${BASE_URL}/api/v1/member`;
                const response = await customFetch(apiUrl);
                const json = await response.json();
                const memberId = json?.data?.member_id;

                if (memberId) {
                    syncMemberId(memberId);
                    await fetchAndUpdateMemberCache(memberId);
                }

            } catch (error) {
                console.error("로그인 후 사용자 정보를 처리하는 중 오류 발생:", error);
                // 에러 발생 시 예외 처리 (예: 에러 페이지로 이동)
            }
        };

        if (isRegistered === "false") {
            // 회원가입이 안 된 상태라면 추가 정보 페이지로 이동
            navigate("/join?step=2&social=true");
            console.log("false");
        } else {
            // 이미 가입된 경우 메인 페이지로 이동
            navigate("/main");

            handleLoginSuccess();
        }

    }, [navigate, syncMemberId]);

    return <div>로그인 상태 확인 중...</div>;
};

export default OAuthSuccess;
