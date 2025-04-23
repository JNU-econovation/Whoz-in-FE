import React, { useEffect, useState, useRef } from "react"
import MemberStatusList from "../components/MemberStatusList"
import styled from "styled-components"
import SnowAnimation from "../components/StyledComponents/SnowyEffect"
import { ContentContainer, ContentWrapper } from "../components/StyledComponents/LayoutStyles"
import { customFetch } from "../api/customFetch"
import { UpperMessage } from "../components/StyledComponents/LayoutStyles"
import VOCBanner from "../components/VOC배너.png"
import ProfileOverlay from "../components/ProfileOverlay"

const MainContainer = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: linear-gradient(80deg, #b5d8f6 0%, #85a5ea 100%);
    z-index: -1;
`

const WhitePanelContainer = styled.div`
  position: relative;
  height: calc(100vh);
`;

const WhitePanel = styled.div`
  background-color: white;
  border-radius: 30px 30px 0 0;
  padding: 1rem;
`;

const ScrollArea = styled(WhitePanel)`
  position: relative;
  height: calc(100vh - 300px);
  overflow-y: auto;
`;

const FloatingBanner = styled.img`
    position: fixed;
    bottom: 7.1rem;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    max-width: 800px;
    z-index: 1000;
`

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL

const Main = () => {
    const [members, setMembers] = useState([])                          // 멤버 리스트 상태
    const [activeCount, setActiveCount] = useState()                    // 현재 동방에 있는 사람 수
    const [registrationNeeded, setRegistrationNeeded] = useState(false) // 기기 등록 '필요' 여부
    const [isLoading, setIsLoading] = useState(true)                    // 로딩 상태 (멤버 리스트 요청 중인지 여부)
    const [selectedMemberId, setSelectedMemberId] = useState(null);     // 프로필을 보기 위해 선택된 멤버

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
        <MainContainer>
            <PersistentBackground />
            <ContentWrapper>
                <UpperMessage style={{ visibility: isLoading ? "hidden" : "visible" }}>
                    현재 동방에<br />
                    {registrationNeeded ? "누가 있을까요?" :
                     activeCount === 0 ? "아무도 없습니다 " :
                     <><b>{activeCount}</b>명 있습니다</>}
                </UpperMessage>

                <WhitePanelContainer>
                    <ScrollArea>
                        <MemberStatusList members={members} registrationNeeded={registrationNeeded} onSelectMember={setSelectedMemberId} />
                    </ScrollArea>

                    {selectedMemberId && (
                        <ProfileOverlay
                            memberId={selectedMemberId}
                            onClose={() => setSelectedMemberId(null)}
                        />
                    )}
                </WhitePanelContainer>
            </ContentWrapper>
        </MainContainer>
    )
}

const PersistentBackground = React.memo(() => <Background>{/*<SnowAnimation count={40} />*/}</Background>)

export default Main
