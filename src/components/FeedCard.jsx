import React from 'react';
import styled from 'styled-components';
import FeedProfile from './FeedProfile';

const StyledCard = styled.div`
  flex-shrink: 0;
  width: 230px;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 1.25rem 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  scroll-snap-align: start;
  position: relative;
  cursor: pointer;
`;

const NewBadge = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 10px;
  height: 10px;
  background-color: #ff4d4d;
  border-radius: 50%;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

const Content = styled.p`
  font-size: 0.83rem;
  line-height: 1.4;
  color: #555;
  margin: 0rem 0.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 2.4rem;
`;

const HandButtonContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HandButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  margin: -0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #555;
  transition: transform 0.1s ease;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const FeedCard = ({ post, onHandClick, onCardClick }) => {
    return (
        <StyledCard onClick={onCardClick}>
            {post.isNew && <NewBadge />}
            <CardHeader>
                <FeedProfile
                    author={post.author}
                    timestamp={post.timestamp}
                    profileImageUrl={post.profile_image_url}
                />
                <HandButtonContainer>
                    <HandButton onClick={onHandClick}>
                        {post.participants} ✋
                    </HandButton>
                </HandButtonContainer>
            </CardHeader>
            <Content>{post.content}</Content>
        </StyledCard>
    );
};

export default FeedCard;