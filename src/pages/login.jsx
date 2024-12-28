import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Input, Button, KakaoButton, JoinButton } from "../components/StyledComponents/AuthStyles"

const Login = () => {
    const [loginid, setloginid] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handleLogin() {
        // TODO: 자체 로그인 로직 구현
        console.log("ID:", loginid)
        console.log("비밀번호:", password)
        // TODO: 로그인 성공 시 메인 페이지로 이동
        //TODO: 기기등록 확인 로직 추가
        navigate("/main")
    }

    const handleKakaoLogin = () => {
        // TODO: 카카오 로그인 로직 구현, 가입 정보 없으면 alert -> 회원 가입
        console.log("카카오 로그인 클릭")
        // TODO: 로그인 성공 시 메인 페이지로 이동
    }

    const handleJoinClick = () => {
        navigate("/join") // 회원가입 페이지로 이동
    }

    return (
        <Container>
            <Input type="text" placeholder="ID" value={loginid} onChange={(e) => setloginid(e.target.value)} />
            <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>로그인</Button>

            <KakaoButton onClick={handleKakaoLogin}>카카오로 로그인</KakaoButton>

            <JoinButton onClick={handleJoinClick}>회원가입하기</JoinButton>
            <div>! WhozIn은 PC 환경에서의 회원가입을 권장합니다.</div>
        </Container>
    )
}

export default Login
