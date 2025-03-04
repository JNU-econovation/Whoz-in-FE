import React, { useEffect, useState } from "react"
import MemberStatusList from "../components/MemberStatusList"
import styled from "styled-components"
import SnowAnimation from "../components/StyledComponents/SnowyEffect"
// TODO: 멤버 활성 상태 통신 api 구현 및 연결
import { ContentContainer, ContentWrapper } from "../components/StyledComponents/LayoutStyles"
import { customFetch } from "../api/customFetch"
import { UpperMessage } from "../components/StyledComponents/LayoutStyles"
import VOCBanner from "../components/VOC배너.png"

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 150vh;
    background: linear-gradient(80deg, #b5d8f6 0%, #dab5f6 100%);

    z-index: -1;
`
const FloatingBanner = styled.img`
    position: fixed;
    bottom: 6.8rem;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 800px;
    z-index: 1000;
`

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL

const Main = () => {
    const [members, setMembers] = useState([]) // 멤버 리스트 상태
    const [activeCount, setActiveCount] = useState()
    const [registrationNeeded, setRegistrationNeeded] = useState(false) // 기기 등록 여부
    const [isLoading, setIsLoading] = useState(true) // 멤버 리스트 요청 중인지 여부

    const fetchMembers = async () => {
        try {
            const response = await customFetch(`${BASE_URL}/api/v1/members?page=1&size=100&sortType=asc`)
            const data = await response.json()
            setIsLoading(false)

            if (data.error_code === "3060") {
                // 기기 등록 필요할 때 3060
                setRegistrationNeeded(true)
                return
            }

            setRegistrationNeeded(false)

            const members = data.data.members
            if (members) {
                setMembers(members)
                const activeMembers = members.filter((member) => member.is_active).length
                setActiveCount(activeMembers)
            }
        } catch (error) {
            console.error("멤버 목록 불러오기 실패:", error)
        }
    }

    useEffect(() => {
        fetchMembers() // 최초 데이터 요청
        const interval = setInterval(fetchMembers, 60000)
        return () => clearInterval(interval)
    }, [])

    return (
        <>
            <PersistentBackground />
            <ContentWrapper>
                <UpperMessage style={{ visibility: isLoading ? "hidden" : "visible" }}>
                    {registrationNeeded ? (
                        <>
                            현재 동방에
                            <br />
                            누가 있을까요?
                        </>
                    ) : (
                        <>
                            현재 동방에
                            <br />
                            <b>{activeCount}</b>명 있습니다 
                        </>
                    )}
                </UpperMessage>

                <MemberStatusList members={members} registrationNeeded={registrationNeeded} />
                </ContentWrapper>
            <a href="/mypage/voc">
                <FloatingBanner src={VOCBanner} alt="VOC 배너" />
            </a>
        </>
    )
}

const PersistentBackground = React.memo(() => <Background>{<SnowAnimation count={40} />}</Background>)

export default Main
