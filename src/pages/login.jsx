import React, { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import Join from "./join"

// 스타일 선언 (Styled-Components)
const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px;
    background-color: #fff;
    height: 100vh;
`

const Input = styled.input`
    height: 50px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
    width: 100%;
`

const Button = styled.button`
    background-color: #007bff;
    color: white;
    padding: 15px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #0056b3;
    }
`

const KakaoButton = styled(Button)`
    margin-top: 20px;
    background-color: #fee500;
    color: #3c1e1e;
    font-weight: bold;

    &:hover {
        background-color: #3c1e1e;
        color: #fee500;
    }
`
const JoinButton = styled(Button)`
    margin-top: 20px;
    background-color: transparent;
    color: #616161;
    font-weight: bold;

    &:hover {
        background-color: transparent;
        color: #515151;
    }
`

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function handleLogin() {
        // TODO: 자체 로그인 로직 구현
        console.log("ID:", username)
        console.log("비밀번호:", password)
        // TODO: 로그인 성공 시 메인 페이지로 이동
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
            <Input type="text" placeholder="ID" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>로그인</Button>

            <KakaoButton onClick={handleKakaoLogin}>카카오로 로그인</KakaoButton>

            <JoinButton onClick={handleJoinClick}>회원가입하기</JoinButton>
        </Container>
    )
}

export default Login
