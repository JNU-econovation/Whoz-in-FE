import React, { useState } from 'react';
import styled from 'styled-components';
import { ContentContainer } from '../../components/StyledComponents/LayoutStyles';
import { useAuth } from '../../context/AuthContext';

const ProfileContainer = styled.div`
    text-align: center;
    margin: 20px;
`;

const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 10px;
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

    return (
        <ContentContainer>
            <ProfileContainer>
                <h2>프로필</h2>
                <ProfileImage src={profilePic || "https://via.placeholder.com/150"} alt="Profile" />
                <div>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>
                <b>{authInfo?.name || "정보 없음"}</b>
                <p>기수:{authInfo?.generation || "정보 없음"}</p>
                <p>분야: {authInfo?.position || "정보 없음"}</p>

            </ProfileContainer>
        </ContentContainer>
    );
};

export default MyProfile;
