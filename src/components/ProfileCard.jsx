import React from 'react';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const CardContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 1.5rem 3rem;
    background: #f9f9f9;
    border-radius: 1rem;
    margin: 1rem 3rem 2rem;
    box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
`;

const ProfileImageContainer = styled.div`
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-right: 1.5rem;
`;

const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const IconPlaceholder = styled(FontAwesomeIcon)`
    font-size: 2rem;
    color: #9e9e9e;
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const NameText = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
`;

const GenText = styled.div`
    font-size: 0.9rem;
    color: #777;
`;

const ProfileCard = () => {
    const { authInfo } = useAuth();

    return (
        <CardContainer>
            <ProfileImageContainer>
                {authInfo?.profilePic ? (
                    <ProfileImage
                        src={authInfo.profilePic}
                        alt={`${authInfo.name}의 프로필 이미지`}
                    />
                ) : (
                    <IconPlaceholder icon={faUser} aria-label="기본 프로필 아이콘" />
                )}
            </ProfileImageContainer>
            <InfoContainer>
                <NameText>{authInfo?.name || "이름 정보 없음"}</NameText>
                <GenText>{authInfo?.generation ? `${authInfo.generation}기` : "기수 정보 없음"}</GenText>
            </InfoContainer>
        </CardContainer>
    );
};

export default ProfileCard;
