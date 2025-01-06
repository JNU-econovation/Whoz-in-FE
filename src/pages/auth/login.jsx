import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Input, Button, KakaoButton, JoinButton } from "../../components/StyledComponents/AuthStyles"
import styled from "styled-components"

const LoginButtonContainer = styled.div`
    display: flex;            
    justify-content: space-around;  
    width: 100%;
    margin-top: 1rem;
    
`
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
        const REST_API_KEY = '';
        const REDIRECT_URI = '';
        const KauthLink = process.env.REACT_APP_KAUTH_LINK; 

        window.location.href = KauthLink;
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
            <LoginButtonContainer>
                <Button onClick={handleLogin}>로그인</Button>
                <KakaoButton onClick={handleKakaoLogin}>카카오</KakaoButton>
            </LoginButtonContainer>
            <JoinButton onClick={handleJoinClick}>회원가입하기</JoinButton>
        </Container>
    )
}

export default Login
