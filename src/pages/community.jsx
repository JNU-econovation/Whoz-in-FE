import React, { useState } from "react";
import styled, { css } from "styled-components";
import Feed from "../components/Feed";
import FeedOverlay from "../components/FeedOverlay";
import FeedWriteOverlay from "../components/FeedWriteOverlay";
import { ContentWrapper as OriginalContentWrapper } from "../components/StyledComponents/LayoutStyles";

const hallOfFameData = {
    monthly_connection_time: [
        { rank: 1, name: "26기 최규민", record: "150시간" },
        { rank: 2, name: "27기 라이언", record: "145시간" },
        { rank: 3, name: "26기 초코", record: "130시간" },
    ],
    consecutive_attendance_days: [
        { rank: 1, name: "26기 김민준", record: "90일" },
        { rank: 2, name: "28기 나자신", record: "88일" }, // 사용자가 2등인 경우
        { rank: 3, name: "28기 박도윤", record: "85일" },
    ],
    cumulative_connection_time: [
        { rank: 1, name: "25기 정하준", record: "1250시간" },
        { rank: 2, name: "24기 강지후", record: "1100시간" },
        { rank: 3, name: "26기 최규민", record: "1050시간" },
    ],
    cumulative_attendance_days: [
        { rank: 1, name: "25기 윤서아", record: "365일" },
        { rank: 2, name: "24기 임도현", record: "350일" },
        { rank: 3, name: "26기 김민준", record: "340일" },
    ],
};

const myStatsData = {
    name: "28기 나자신",
    monthly_connection_time: { rank: 15, record: "102시간" },
    consecutive_attendance_days: { rank: 2, record: "88일" },
    cumulative_connection_time: { rank: 22, record: "880시간" },
    cumulative_attendance_days: { rank: 31, record: "290일" },
};


const dummyPosts = [
    {
        id: 1,
        author: '26기 최규민',
        timestamp: '5분 전',
        content: '샐러드 드실 분? 6시까지 받습니다. hh님이 머슬커피 샐러드의 함께주문에 초대했어요. 원하는 메뉴를 6시까지 받습니다. hh님이 머슬커피 샐러드의 함께주문에 초대했어요. 원하는 메뉴를 담아주세요',
        participants: 5,
        participantNames: ['김민준', '이서연', '박도윤', '최아린', '정하준'],
        isNew: true,
    },
];


const CommunityContainer = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ContentWrapper = styled(OriginalContentWrapper)`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(80deg, #b5d8f6 0%, #85a5ea 100%);
  z-index: -1;
`;

const TabController = styled.div`
  display: flex;
  background-color: #f0f2f5;
  border-radius: 28px;
  padding: 5px;
  flex-shrink: 0;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 10px 0;
  border: none;
  border-radius: 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  ${({ isActive }) =>
    isActive
        ? css`
            background-color: #ffffff;
            color: #2a86ff;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          `
        : css`
            background-color: transparent;
            color: #8e8e93;
          `}
`;

const WhitePanelContainer = styled.div`
  position: relative;
  flex: 1;
  background-color: white;
  border-radius: 30px 30px 0 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ScrollArea = styled.div`
  padding: 0.5rem;
  position: relative;
  overflow-x: hidden;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c4c4c4;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f0f2f5;
  }
`;

const HallOfFameContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  padding-bottom: 3rem; //하단 네비바 고려
`;

const RankingSection = styled.div`
  padding: 0rem 0.5rem 0.5rem 0;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 1.1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RankingList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const MedalContainer = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem;
  font-weight: 700;
  position: relative;
  
  ${({ rank }) => {
    if (rank === 1) return css`background-color: #FFD700;`;
    if (rank === 2) return css`background-color: #C0C0C0;`;
    if (rank === 3) return css`background-color: #CD7F32;`;
    return '';
}}

  &::before {
    content: 'V';
    position: absolute;
    top: -8px;
    font-size: 1rem;
    color: #A9A9A9;
    transform: scaleY(0.7);
  }
`;

const RankItem = styled.li`
  display: grid;
  grid-template-columns: 40px 1fr auto; 
  align-items: center;
  gap: 1rem;
  font-size: 1rem;

  .rank-badge-container {
    justify-self: center; 
    font-size: 1rem;
    font-weight: 600;
    color: #8E8E93;
  }
  
  .rank-name {
    justify-self: start;
    font-weight: 600;
    color: #333;

    ${({ isMe }) => isMe && css`
        color: #2A86FF;
    `}
  }

  .rank-record {
    justify-self: end;
    font-weight: 600;
    color: #555;

     ${({ isMe }) => isMe && css`
        color: #2A86FF;
    `}
  }
`;

const ThinSeparator = styled.div`
    height: 1px;
    background-color: #f0f0f0;
    margin: 0.5rem 0;
`;


const Medal = ({ rank }) => (
    <MedalContainer rank={rank}>{rank}</MedalContainer>
);

const RankingCard = ({ title, rankingData, myStat }) => {
    const isUserInTop3 = rankingData.some(user => user.name === myStatsData.name);

    return (
        <RankingSection>
            <CardTitle>{title}</CardTitle>
            <RankingList>
                {rankingData.map(user => (
                    <RankItem key={user.rank} isMe={user.name === myStatsData.name}>
                        <div className="rank-badge-container">
                            <Medal rank={user.rank} />
                        </div>
                        <span className="rank-name">{user.name}</span>
                        <span className="rank-record">{user.record}</span>
                    </RankItem>
                ))}

                {!isUserInTop3 && (
                    <RankItem isMe>
                        <div className="rank-badge-container">{myStat.rank}</div>
                        <span className="rank-name">{myStatsData.name}</span>
                        <span className="rank-record">{myStat.record}</span>
                    </RankItem>
                )}
            </RankingList>
        </RankingSection>
    );
};

const HallOfFameContent = () => {
    return (
        <HallOfFameContainer>
            <RankingCard
                title="월간 접속 시간"
                rankingData={hallOfFameData.monthly_connection_time}
                myStat={myStatsData.monthly_connection_time}
            />
            <ThinSeparator />
            <RankingCard
                title="연속 출석 일수"
                rankingData={hallOfFameData.consecutive_attendance_days}
                myStat={myStatsData.consecutive_attendance_days}
            />
            <ThinSeparator />
            <RankingCard
                title="누적 접속 시간"
                rankingData={hallOfFameData.cumulative_connection_time}
                myStat={myStatsData.cumulative_connection_time}
            />
            <ThinSeparator />
            <RankingCard
                title="누적 출석 일수"
                rankingData={hallOfFameData.cumulative_attendance_days}
                myStat={myStatsData.cumulative_attendance_days}
            />
        </HallOfFameContainer>
    );
};


const AnnouncementsContent = () => (
    <div>
        <h3>📢 공지사항 준비중입니다.</h3>
    </div>
);


const Community = () => {
    const [posts, setPosts] = useState(dummyPosts);
    const [selectedFeed, setSelectedFeed] = useState(null);
    const [isWriteOverlayOpen, setWriteOverlayOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('hallOfFame');

    const handleAddFeedClick = () => setWriteOverlayOpen(true);
    const handlePostSubmit = (newContent) => {
        const newPost = {
            id: Date.now(),
            author: '28기 나자신',
            timestamp: '방금 전',
            content: newContent,
            participants: 1,
            participantNames: ['나자신'],
            isNew: true,
        };
        setPosts([newPost, ...posts]);
    };
    const handleHandClick = (postId) => {
        setPosts(posts.map(p =>
            p.id === postId ? { ...p, participants: p.participants + 1, participantNames: [...p.participantNames, '나'] } : p
        ));
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'hallOfFame': return <HallOfFameContent />;
            case 'announcements': return <AnnouncementsContent />;
            default: return null;
        }
    };

    return (
        <CommunityContainer>
            <PersistentBackground />
            <ContentWrapper>
                <Feed
                    posts={posts}
                    onSelectFeed={setSelectedFeed}
                    onAddFeedClick={handleAddFeedClick}
                    onHandClick={handleHandClick}
                />
                <WhitePanelContainer>
                    <TabController>
                        <TabButton
                            isActive={activeTab === 'hallOfFame'}
                            onClick={() => setActiveTab('hallOfFame')}
                        >
                            명예의 전당
                        </TabButton>
                        <TabButton
                            isActive={activeTab === 'announcements'}
                            onClick={() => setActiveTab('announcements')}
                        >
                            공지
                        </TabButton>
                    </TabController>
                    <ScrollArea>{renderTabContent()}</ScrollArea>
                    {selectedFeed && <FeedOverlay post={selectedFeed} onClose={() => setSelectedFeed(null)} />}
                    <FeedWriteOverlay
                        isOpen={isWriteOverlayOpen}
                        onClose={() => setWriteOverlayOpen(false)}
                        onPostSubmit={handlePostSubmit}
                    />
                </WhitePanelContainer>
            </ContentWrapper>
        </CommunityContainer>
    );
};

const PersistentBackground = React.memo(() => <Background />);

export default Community;