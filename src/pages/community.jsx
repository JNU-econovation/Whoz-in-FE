import React, { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import FeedOverlay from "../components/FeedOverlay"
import FeedWriteOverlay from "../components/FeedWriteOverlay"
import {
    ContentWrapper as OriginalContentWrapper,
    UpperMessage,
} from "../components/StyledComponents/LayoutStyles"
import { customFetch } from "../api/customFetch"
import RankingView, { RANKING_CONFIG } from "./RankingView"

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;

const dummyPosts = [
    {
        id: 1,
        author: '26기 최규민',
        timestamp: '5분 전',
        content: '샐러드 드실 분? 6시까지 받습니다. hh님이 머슬커피 샐러드의 함께주문에 초대했어요.',
        participants: 5,
        participantNames: ['김김김', '김김김', '김김김', '김김김', '김김김'],
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
  height: 100%;
  overflow-y: auto;

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

const FixedHeaderArea = styled.div`
  height: 10rem; // Main.js와 동일한 값이어야 함
  min-height: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-shrink: 0;
`;


const AnnouncementsContent = () => (
    <div>
        <h3>📢 공지사항 준비중입니다.</h3>
    </div>
);

const Community = () => {
    const [posts, setPosts] = useState(dummyPosts);
    const [selectedFeed, setSelectedFeed] = useState(null);
    const [isWriteOverlayOpen, setWriteOverlayOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('ranking');

    // 랭킹 데이터 상태 관리
    const [rankings, setRankings] = useState(null);
    const [isRankingLoading, setIsRankingLoading] = useState(false);

    // API 호출 함수
    useEffect(() => {
        const fetchRankings = async () => {
            setIsRankingLoading(true);
            try {
                const categoriesParam = RANKING_CONFIG.map(c => c.type).join(',');

                const response = await customFetch(`${BASE_URL}/api/v1/rankings?categories=${categoriesParam}`);
                const json = await response.json();

                if (json.body && json.body.rankings) {
                    setRankings(json.body.rankings);
                } else if (json.data && json.data.rankings) {
                    setRankings(json.data.rankings);
                }

            } catch (error) {
                console.error("Failed to fetch rankings:", error);
            } finally {
                setIsRankingLoading(false);
            }
        };

        if (activeTab === 'ranking') {
            fetchRankings();
        }
    }, [activeTab]);

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

    const handleRankingFilterChange = async (type, generation) => {
        const query = generation
            ? `categories=${type}&generation=${generation}`
            : `categories=${type}`;

        try {
            const response = await customFetch(`${BASE_URL}/api/v1/rankings?${query}`);
            const json = await response.json();
            const newData = json.data.rankings[type];

            setRankings(prev => ({
                ...prev,
                [type]: newData
            }));
        } catch (error) {
            console.error("Filter update failed", error);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'ranking':
                return (
                    <RankingView
                        rankings={rankings}
                        loading={isRankingLoading}
                        onFilterChange={handleRankingFilterChange}
                    />
                );
            case 'announcements':
                return <AnnouncementsContent />;
            default:
                return null;
        }
    };

    return (
        <CommunityContainer>
            <PersistentBackground />
            <ContentWrapper>
                <FixedHeaderArea>
                    <UpperMessage>
                        커뮤니티
                    </UpperMessage>
                    {/*<Feed*/}
                    {/*    posts={posts}*/}
                    {/*    onSelectFeed={setSelectedFeed}*/}
                    {/*    onAddFeedClick={handleAddFeedClick}*/}
                    {/*    onHandClick={handleHandClick}*/}
                    {/*/>*/}
                </FixedHeaderArea>
                <WhitePanelContainer>
                    <TabController>
                        <TabButton
                            isActive={activeTab === 'ranking'}
                            onClick={() => setActiveTab('ranking')}
                        >
                            랭킹
                        </TabButton>
                        <TabButton
                            // isActive={activeTab === 'announcements'}
                            // onClick={() => setActiveTab('announcements')}
                        >
                            준비중
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
