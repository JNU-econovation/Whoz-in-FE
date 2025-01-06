import React from "react";
import { Input, Button, Container } from "../../components/StyledComponents/AuthStyles";

const AuthInfo = ({ loginid, setLoginId, password, setPassword, confirmPassword, setConfirmPassword, onNext }) => {
    return (
        <Container>
            <Input
                type="text"
                placeholder="ID (로그인 아이디)"
                value={loginid}
                onChange={(e) => setLoginId(e.target.value)}
            />
            <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Input
                type="password"
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button onClick={onNext}>다음</Button>
        </Container>
    );
};

export default AuthInfo;
