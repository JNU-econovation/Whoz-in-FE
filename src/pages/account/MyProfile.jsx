import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ContentContainer } from '../../components/StyledComponents/LayoutStyles';
import { customFetch } from '../../api/customFetch';
import basicProfilepic from '../../components/기본프로필.png'; 

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 3rem;
    border-radius: 0.625rem;
    position: relative;
`;

const ProfileImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 5rem;
    height: 5rem;
    margin-right: 1rem;
`;

const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    position: relative;
`;

const ImageManageButton = styled.div`
    position: absolute;
    top: 3rem;
    left: 3rem;
    width: 2rem;
    height: 2rem;
    background: #e4e4e4;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background: #999999;
    }
`;

const FileInput = styled.input`
    display: none;
`;

const Menu = styled.div`
    position: absolute;
    bottom: 2.5rem;
    right: 0;
    background: white;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 0.3125rem;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
`;

const MenuItem = styled.button`
    background: none;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    width: 100%;
    text-align: left;
    transition: background 0.3s;

    &:hover {
        background: #f0f0f0;
    }
`;

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;

const MyProfile = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [profileInfo, setProfileInfo] = useState({});
    const [menuOpen, setMenuOpen] = useState(false);

    const fetchProfile = async () => {
        try {
            const response = await customFetch(BASE_URL + '/api/v1/member');
            const data = await response.json();
            if (data.data) {
                setProfileInfo({
                    name: data.data.name || '',
                    generation: data.data.generation !== undefined ? data.data.generation : '',
                    position: data.data.position || '',
                    statusMessage: data.data.statusMessage || '',
                });
            }
        } catch (error) {
            console.error('프로필 정보 가져오기 실패:', error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
        setMenuOpen(false);
    };

    const handleDeleteImage = () => {
        setProfilePic(null);
        setMenuOpen(false);
    };

    return (
            <ProfileContainer>
                <ProfileImageContainer>
                    <ProfileImage src={profilePic || basicProfilepic} alt="프로필 이미지" />
                    <ImageManageButton onClick={() => setMenuOpen(!menuOpen)}>+</ImageManageButton>
                    {menuOpen && (
                        <Menu>
                            <label>
                                <MenuItem as="span">이미지 업로드</MenuItem>
                                <FileInput type="file" accept="image/*" onChange={handleImageChange} />
                            </label>
                            {profilePic && <MenuItem onClick={handleDeleteImage}>이미지 삭제</MenuItem>}
                        </Menu>
                    )}
                </ProfileImageContainer>
                <div>
                    <b>{profileInfo.generation ? `${profileInfo.generation}기 ` : ''}{profileInfo.name}</b>
                    <p>{profileInfo.position && `분야: ${profileInfo.position}`}</p>
                    <div>상태메세지:{profileInfo.statusMessage && <p>{profileInfo.statusMessage}</p>}</div>
                </div>
            </ProfileContainer>
    );
};

export default MyProfile;
