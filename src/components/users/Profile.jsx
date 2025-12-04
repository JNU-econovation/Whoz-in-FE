import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import basicProfilepic from '../../components/기본프로필.png';
import { customFetch } from '../../api/customFetch';
import { FaCamera, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 3rem;
    border-radius: 0.625rem;
    position: relative;
`;

const ProfileImageContainer = styled.div`
  position: relative;
  width: 5rem;
  height: 5rem;
  margin-right: 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const ProfileInfoContainer = styled.div`
    margin-top: 1rem;
`;


const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-color: #fff; /* 투명 PNG 배경을 위한 처리 */
`;

const ImageOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    color: white;
    border-radius: 50%;
    z-index: 1;
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
    transition: opacity 0.3s ease;
`;

const OverlayButton = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  font-size: 0.8rem;
  transition: color 0.3s ease;
  &:hover { color: #ddd; }
  svg {
    font-size: 1.2rem;
    margin-bottom: 0.25rem;
  }
`;

const DeleteButton = styled(OverlayButton).attrs({ as: 'div' })``;

const FileInput = styled.input`
    display: none;
`;

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;

const Profile = ({ profileInfo = {}, isEditable = false, onClose }) => {
    const [profilePic, setProfilePic] = useState(basicProfilepic);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        if (profileInfo?.profile_image_url) {
            const fullImageUrl = `${BASE_URL}${profileInfo.profile_image_url}`;
            setProfilePic(fullImageUrl);
        } else {
            setProfilePic(basicProfilepic);
        }
    }, [profileInfo]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const uploadImageToServer = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await customFetch(`${BASE_URL}/api/v1/members/image`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('이미지 업로드에 실패했습니다.');
            }
            toast.success("프로필 이미지가 변경되었습니다!");
            return true;
        } catch (error) {
            toast.error(error.message);
            setProfilePic(profileInfo?.profile_image_url ? `${BASE_URL}${profileInfo.profile_image_url}` : basicProfilepic);
            return false;
        }
    };

    const handleImageChange = (e) => {
        if (!isEditable) return;
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            // 파일 읽기가 끝나면 실행될 로직
            reader.onloadend = async () => {
                const tempImageUrl = reader.result;
                const isSuccess = await uploadImageToServer(file);
                if (isSuccess) {
                    setProfilePic(tempImageUrl);
                }
            };
            reader.readAsDataURL(file);
        }
        setMenuOpen(false);
    };

    const handleImageDelete = async (e) => {
        e.stopPropagation();
        try {
            const response = await customFetch(`${BASE_URL}/api/v1/members/image`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('이미지 삭제에 실패했습니다.');
            }
            setProfilePic(basicProfilepic);
            toast.success("성공적으로 삭제되었습니다!");
            setMenuOpen(false);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const toggleMenu = () => {
        if (isEditable) {
            setMenuOpen(prev => !prev);
        }
    }

    return (
        <ProfileContainer>
            <ProfileImageContainer ref={menuRef} onClick={toggleMenu}>
                <ProfileImage src={profilePic} alt="프로필 이미지" />
                {isEditable && (
                    <ImageOverlay isOpen={menuOpen}>
                        <OverlayButton>
                            <FaCamera />
                            변경
                            <FileInput
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </OverlayButton>
                        <DeleteButton onClick={handleImageDelete}>
                            <FaTrashAlt />
                            삭제
                        </DeleteButton>
                    </ImageOverlay>
                )}
            </ProfileImageContainer>
            <ProfileInfoContainer>
                <div>
                    <b>{profileInfo?.generation ? `${profileInfo.generation}기 ` : ''}{profileInfo?.name || ''}</b>
                    <p>{profileInfo?.position ? `분야: ${profileInfo.position}` : ''}</p>
                    <div>{profileInfo?.statusMessage && <p>{profileInfo.statusMessage}</p>}</div>
                </div>
            </ProfileInfoContainer>

            {onClose && <button onClick={onClose}>닫기</button>}
        </ProfileContainer>
    );
};

export default Profile;