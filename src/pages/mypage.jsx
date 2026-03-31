import React from "react"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import {
    ListContainer,
    ListItem,
} from "../components/StyledComponents/LayoutStyles"
import styled from "styled-components"
import { useMemberInfo } from "../hooks/useMemberInfo"
import { useAuth } from "../context/AuthContext"
import Profile from "../components/users/Profile"
import Block from "../components/users/Block"
import Modals from "../components/modal/Modals"
import { MODAL_TYPES } from "../components/modal/ModalTypes"
import { customFetch } from "../api/customFetch"
import { toast } from "react-toastify"

const MyPageContainer = styled.div`
    padding-top: 4rem;
    padding-bottom: 6rem; 
`;


const MyPage = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { userInfo, clearCurrentMember } = useAuth();
    const memberId = userInfo.memberId;
    const { memberInfo } = useMemberInfo(memberId);
    const [modal, setModal] = React.useState(null);

    const handleLogout = async () => {
        try {
            await customFetch(`${process.env.REACT_APP_BACKEND_BASEURL}/api/v1/logout`, {
                method: "POST",
            });
            clearCurrentMember();
            queryClient.clear();
            setModal(null);
            toast.success("로그아웃되었습니다.");
            navigate("/beta-login", { replace: true });
        } catch (error) {
            setModal(null);
            toast.error(error.message);
        }
    };

    const openLogoutModal = () => {
        setModal({
            type: MODAL_TYPES.CONFIRM,
            message: "정말 로그아웃할까요?",
            onConfirm: handleLogout,
            onCancel: () => setModal(null),
        });
    };

    return (
        <div>
            <MyPageContainer>
                {memberInfo && (
                    <>
                        <Profile profileInfo={memberInfo} isEditable={true} />
                        <Block memberId={memberInfo.id} />
                    </>
                )}
                <ListContainer>
                    <ListItem onClick={() => navigate('device-management')}>기기 관리</ListItem>
                    <ListItem onClick={() => navigate('voc')}>피드백 작성하기</ListItem>
                    <ListItem onClick={openLogoutModal}>로그아웃</ListItem>
                </ListContainer>
            </MyPageContainer>
            <Modals modal={modal} onClose={() => setModal(null)} />
        </div>
    );
};

export default MyPage;
