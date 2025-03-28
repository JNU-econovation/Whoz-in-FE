import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { ListContainer, ListItem } from '../components/StyledComponents/LayoutStyles';
import styled from 'styled-components';
import MyProfile from './account/MyProfile';  

const MyPageContainer = styled.div`
    padding-top: 4rem;
`;
// TODO: 프로필 통신 코드
const MyPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <MyPageContainer>
                <MyProfile />
                <ListContainer>
<<<<<<< HEAD
=======
                    {/*<ListItem onClick={() => navigate('profile')}>프로필</ListItem>*/}
>>>>>>> 734ed8c09db31eef7e2cafe515c429019436333d
                    <ListItem onClick={() => navigate('device-management')}>내 기기 관리</ListItem>
                    {/* <ListItem onClick={() => navigate('setting')}>앱 설정</ListItem> 
                        <ListItem onClick={() => navigate('profile')}>프로필</ListItem> */}
                    <ListItem onClick={() => navigate('voc')}>피드백 작성하기</ListItem> 
                </ListContainer>
            </MyPageContainer>
        </div>
    );
};

export default MyPage;