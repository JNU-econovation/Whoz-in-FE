import React, { useState } from 'react';
import styled from 'styled-components';
import { ContentContainer } from '../../components/StyledComponents/LayoutStyles';

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
    const [profilePic, setProfilePic] = useState(null); // 프로필 사진 상태
    const [loginid, setloginid] = useState("홍길동"); // 예시로 등록된 이름

    // 프로필 사진 변경 함수
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result); // 선택된 이미지 URL을 상태로 설정
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
                <p>등록된 이름: {loginid}</p>
            </ProfileContainer>
        </ContentContainer>
    );
};

export default MyProfile;
