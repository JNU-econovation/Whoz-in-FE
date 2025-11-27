import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import basicProfilePic from './기본프로필.png';

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProfileImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #f0f0f0;
  object-fit: cover;
`;

const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const AuthorName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  color: #333;
`;

const Timestamp = styled.div`
  font-size: 0.75rem;
  color: #888;
`;

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;


const FeedProfile = ({ author, timestamp, profileImageUrl }) => {
    const [profilePic, setProfilePic] = useState(basicProfilePic);

    useEffect(() => {
        if (profileImageUrl) {
            const fullImageUrl = `${BASE_URL}${profileImageUrl}`;
            setProfilePic(fullImageUrl);
        } else {
            setProfilePic(basicProfilePic);
        }
    }, [profileImageUrl]);

    return (
        <AuthorInfo>
            <ProfileImage src={profilePic} alt={`${author}의 프로필 이미지`} />
            <AuthorDetails>
                <AuthorName>{author}</AuthorName>
                <Timestamp>{timestamp}</Timestamp>
            </AuthorDetails>
        </AuthorInfo>
    );
};

export default FeedProfile;