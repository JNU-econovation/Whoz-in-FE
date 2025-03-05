import React, { useState } from 'react';
import styled from 'styled-components';
import { ContentContainer } from '../../components/StyledComponents/LayoutStyles';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ProfileContainer = styled.div`
    text-align: center;
    padding: 1.25rem;
    background: #f9f9f9;
    border-radius: 0.625rem;
    box-shadow: 0 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
`;

const ProfileImageContainer = styled.div`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background: #e0e0e0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    overflow: hidden;
`;

const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const IconPlaceholder = styled(FontAwesomeIcon)`
    font-size: 3.125rem;
    color: #9e9e9e;
`;

const FileInputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
`;

const FileInputLabel = styled.label`
    display: inline-block;
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
    color: #fff;
    background: #7d79a8;
    border: none;
    border-radius: 0.3125rem;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background: #5a5791;
    }
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const DeleteButton = styled.button`
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
    color: #fff;
    background: #d9534f;
    border: none;
    border-radius: 0.3125rem;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background: #c9302c;
    }
`;

const InfoText = styled.p`
    margin: 0.625rem 0;
    font-size: 1rem;
    color: #555;
`;

const MyProfile = () => {
    const { authInfo } = useAuth(); 
    const [profilePic, setProfilePic] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        setProfilePic(null);
    };

    return (
        <ContentContainer>
            <ProfileContainer>
                <h2>프로필</h2>
                <ProfileImageContainer>
                    {profilePic ? (
                        <ProfileImage 
                            src={profilePic} 
                            alt={authInfo?.name ? `${authInfo.name}의 프로필 이미지` : "업로드된 프로필 이미지"} 
                        />
                    ) : (
                        <IconPlaceholder icon={faUser} aria-label="기본 프로필 아이콘" />
                    )}
                </ProfileImageContainer>
                <FileInputContainer>
                    <FileInputLabel htmlFor="file-upload">
                        이미지 업로드
                    </FileInputLabel>
                    <HiddenFileInput 
                        id="file-upload" 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageChange} 
                        aria-label="프로필 이미지 업로드"
                    />
                    {profilePic && (
                        <DeleteButton onClick={handleDeleteImage}>
                            삭제
                        </DeleteButton>
                    )}
                </FileInputContainer>
                <b style={{ marginTop: '1rem', display: 'block' }}>{authInfo?.name || "이름 정보 없음"}</b>
                <InfoText>기수: {authInfo?.generation || "정보 없음"}</InfoText>
                <InfoText>분야: {authInfo?.position || "정보 없음"}</InfoText>
            </ProfileContainer>
        </ContentContainer>
    );
};

export default MyProfile;
