import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Overlay from './Overlay';
import FeedProfile from './FeedProfile';

const WriteContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem 1.25rem;
  box-sizing: border-box;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
`;

const SubmitButton = styled.button`
  background-color: #2a86ff;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;

  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'auto' : 'none')};
  transition: opacity 0.2s ease;
`;

const ContentTextarea = styled.textarea`
  width: 100%;
  flex-grow: 1;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  padding: 1rem;
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  resize: none;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  box-sizing: border-box;

  &::placeholder {
    color: #b0b0b0;
  }

  &:focus {
    border-color: #2a86ff;
    box-shadow: 0 0 0 2px rgba(42, 134, 255, 0.2);
  }
`;


const FeedWriteOverlay = ({ isOpen, onClose, onPostSubmit }) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setContent('');
        }
    }, [isOpen]);

    const handleSubmit = () => {
        if (content.trim()) {
            onPostSubmit(content);
            onClose();
        }
    };

    return (
        <Overlay isOpen={isOpen} onClose={onClose}>
            <WriteContainer>
                <Header>
                    <Title>새 피드 작성</Title>
                    <SubmitButton onClick={handleSubmit} disabled={!content.trim()}>
                        게시
                    </SubmitButton>
                </Header>

                <FeedProfile author="28기 나자신" timestamp="지금" />

                <ContentTextarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="동방에 있는 사람들에게 할 말이 있나요?"
                />
            </WriteContainer>
        </Overlay>
    );
};

export default FeedWriteOverlay;