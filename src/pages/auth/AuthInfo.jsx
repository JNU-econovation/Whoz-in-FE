import React, { useState } from "react";
import { Input, Button, Container } from "../../components/StyledComponents/AuthStyles";
import MemberInfo from "./MemberInfo";
const AuthInfo = ({ loginid, setLoginId, password, setPassword, confirmPassword, setConfirmPassword, onNext }) => {
    const [error, setError] = useState("");

    const handleNextClick = () => {
        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }
        setError("");
        onNext();
    };

    const isDisabled = !loginid || !password || !confirmPassword;

    return (
        <Container>
            <Input
                type="text"
                placeholder="ID (로그인 아이디)"
                aria-label="로그인 아이디 입력"
                value={loginid}
                onChange={(e) => setLoginId(e.target.value)}
            />
            <Input
                type="password"
                placeholder="비밀번호"
                aria-label="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Input
                type="password"
                placeholder="비밀번호 확인"
                aria-label="비밀번호 확인 입력"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <div style={{ color: "red", fontSize: "0.8rem" }}>{error}</div>}
            <Button onClick={handleNextClick} disabled={isDisabled}>
                다음
            </Button>
        </Container>
    );
};

export default AuthInfo;
