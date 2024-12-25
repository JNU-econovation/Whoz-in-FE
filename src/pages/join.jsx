import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaAngleLeft } from "react-icons/fa" 
import { Input, Button, Container } from "../components/StyledComponents/AuthStyles"
import styled from "styled-components"
// 스타일 선언

const ScrollContainer = styled.div`

    flex-direction: column;
    overflow: hidden;
    transition: all 0.7s ease;
    transform: ${({ showSecondStep }) => (showSecondStep ? "translateY(-100%)" : "translateY(0)")}; /* 첫 번째 페이지는 아래로, 두 번째 페이지는 위로 */
    height: 100%;
`

const Join = () => {
    const navigate = useNavigate()

    // 첫번째 페이지에서 받을 정보
    const [name, setName] = useState("")  
    const [loginid, setLoginId] = useState("")  
    const [password, setPassword] = useState("")  
    const [confirmPassword, setConfirmPassword] = useState("")  

    // 스크롤 넘어가고 받을 정보
    const [showSecondStep, setShowSecondStep] = useState(false)
    const [Generation, setGeneration] = useState("") // 기수
    const [field, setField] = useState("") // 분야


    const handleJoin = () => {
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.")
            return
        }

        // TODO: 회원가입 로직 구현&통신... 일단 콘솔로그 찍는걸로
        console.log("이름:", name)
        console.log("ID:", loginid)
        console.log("비밀번호:", password)
        alert("회원가입이 완료되었습니다!")

        // 가입 완료 후 로그인 페이지로 이동
        navigate("/")
    }

    const handleNext = () => {
        if (!name || !loginid || !password || !confirmPassword) {
            alert("아직 입력하지 않은 값이 있습니다.")
            return
        }
        setShowSecondStep(true)
    }

    const handlePrevious = () => {
        setShowSecondStep(false)
    }

    return (
        <Container>
            <ScrollContainer showSecondStep={showSecondStep}>
            <Input
                    type="text"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <Button onClick={handleNext}>다음</Button>

                {/* 두 번째 페이지 */}
                {showSecondStep && (
                    <>
                    
                    <Button onClick={handlePrevious}>
                            <FaAngleLeft /> 이전
                        </Button>

                        <div>
                            <label htmlFor="classNumber">기수</label>
                            <select
                                id="classNumber"
                                value={Generation}
                                onChange={(e) => setGeneration(e.target.value)}
                            >
                                {[...Array(18).keys()].map((i) => (
                                    <option key={i} value={28 - i}>
                                        {28 - i}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="field">분야</label>
                            <select
                                id="field"
                                value={field}
                                onChange={(e) => setField(e.target.value)}
                            >
                                <option value="">선택하세요</option>
                                <option value="field1">BE</option>
                                <option value="field2">FE</option>
                                <option value="field3">AOS</option>
                                <option value="field4">iOS</option>
                                <option value="field5">AI</option>
                                <option value="field5">GAME</option>
                            </select>
                        </div>

                        <Button onClick={handleJoin}>회원가입</Button>
                    </>
                )}
            </ScrollContainer>
        </Container>
    )
}

export default Join