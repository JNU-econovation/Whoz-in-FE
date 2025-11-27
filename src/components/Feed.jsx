import React from 'react';
import styled from 'styled-components';
import FeedCard from './FeedCard';

const FeedContainer = styled.section`
  padding: 1rem 0;
`;

const CardScroller = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  gap: 1rem;
  padding: 0 1rem 0 1rem;
  scroll-snap-type: x mandatory;
  scroll-padding-left: 1rem;
  &::-webkit-scrollbar { display: none; }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const AddFeedButton = styled.button`
  flex-shrink: 0;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px dashed rgba(0, 0, 0, 0.2);
  background-color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: rgba(0, 0, 0, 0.3);
  font-size: 2.5rem;
  font-weight: 200;
  line-height: 1;
`;

const Feed = ({ posts, onSelectFeed, onAddFeedClick, onHandClick }) => {
    return (
        <FeedContainer>
            <CardScroller>
                <AddFeedButton onClick={onAddFeedClick}>+</AddFeedButton>

                {posts.map((post) => (
                    <FeedCard
                        key={post.id}
                        post={post}
                        onHandClick={(e) => {
                            e.stopPropagation();
                            onHandClick(post.id); // 부모 함수 호출
                        }}
                        onCardClick={() => onSelectFeed(post)} // 부모 함수 호출
                    />
                ))}
            </CardScroller>
        </FeedContainer>
    );
};

export default Feed;