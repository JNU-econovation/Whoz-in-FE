import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaAngleLeft } from "react-icons/fa" // react-icons 패키지 사용
import { Input, Button, Container } from "../components/StyledComponents/AuthStyles"
// 스타일 선언


const Join = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")

    const handleJoin = () => {
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.")
            return
        }

        // TODO: 회원가입 로직 구현&통신... 일단 콘솔로그 찍는걸로
        console.log("ID:", username)
        console.log("비밀번호:", password)
        console.log("이메일:", email)
        alert("회원가입이 완료되었습니다!")

        // 가입 완료 후 로그인 페이지로 이동
        navigate("/")
    }

    //TODO: 아이디, 비밀번호 형식 지정하고 이메일 정규식 넣기
    return (
        <Container>

       
                <Input type="text" placeholder="ID" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                <Button onClick={handleJoin}>회원가입</Button>
           
        </Container>
    )
}

export default Join
