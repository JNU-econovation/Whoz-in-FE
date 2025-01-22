import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Modal from "../../components/Modal";
import { UpperMessage } from "../../components/StyledComponents/LayoutStyles";
import { ContentWrapper, ContentContainer, Input } from "../../components/StyledComponents/LayoutStyles";
import { customFetch } from "../../api/customFetch"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faWifi } from '@fortawesome/free-solid-svg-icons';

const UpperMessageBlack = styled.div`
  color: black;
  font-size: 2rem;
  font-family: 'Pretendard medium', sans-serif;
  font-weight: 400;

`;

const AddButton = styled.button`
  background: #BFBFD5;
  color: white;
  border: none;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  margin-right: 1rem;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s;

  &:hover {
    background: #0056b3;
    transform: scale(1.1);
  }
`;

const UpperContainer = styled.div` // 상단 컨테이너 (상단 메세지 + 추가 버튼)
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  padding-top: 4rem;
`;

const DeviceList = styled.div` // 기기 리스트 컨테이너
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DeviceItem = styled.div` // 기기 개별 아이템
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ebebeb;
  padding: 10px;
  border-radius: 1.5rem;
  position: relative;
  border: ${(props) => (props.selected ? "2px solid blue" : "none")};
  padding: 1rem;
  height: 4rem
`;

const DeviceIdentifier = styled.div` // 기기 정보 (이름+네트워크))
font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  gap: 0.5rem;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &.connected {
      background: #e8f5e9;
      padding: 3px 6px;
      border-radius: 8px;
      color: green;
      font-size: 0.9rem;

    }
  }
  `;

  const IconButton = styled.button`
  background: none;
  color: #595959;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
  transition: color 0.3s, transform 0.2s;

  &:hover {
    color: #717171;
    transform: scale(1.1);
  }
`;

// ModalCloseButton: 모달 닫기 버튼
const ModalCloseButton = styled.button`
  background: #ff5252;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #d32f2f;
  }
`;

// 모달 내 네트워크 정보 스타일
const NetworkInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  padding: 8px;
  background: #f0f0f0;
  border-radius: 5px;
`;

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;

const ManageDevice = () => {
    const [devices, setDevices] = useState([
        {
            device_id: 1,
            device_name: "규민 아이폰",
            connected_ssid: "ECONO_5G",
            mac_per_ssid: {
                ECONO_5G: "00:1A:2B:3C:4D:5E",
                JNU: "00:1A:2B:3C:4D:5F",
                EDUROAM: "00:1A:2B:3C:4D:60",
            },
        },
        {
            device_id: 2,
            device_name: "gyum Mac",
            connected_ssid: "JNU",
            mac_per_ssid: {
                ECONO_5G: "11:2B:3C:4D:5E:6F",
                JNU: "11:2B:3C:4D:5E:70",
            },
        },
        {
            device_id: 3,
            device_name: "규민 아이패드",
            connected_ssid: null,
            mac_per_ssid: {
                ECONO_5G: "22:3C:4D:5E:6F:71",
            },
        },
    ]);

    const [selectedDevice, setSelectedDevice] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            const response = await customFetch(BASE_URL+"/api/v1/devices");
            const data = await response.json();
            setDevices(data.data.devices);
        } catch (error) {
            console.error("기기 목록을 불러오기 실패", error);
        }
    };

    const handleEditClick = (device) => {
        setSelectedDevice(device);
        setShowModal(true);
    };

    const handleDelete = (deviceId) => {
        //삭제 기능 구현하기
    };

    return (
        <ContentWrapper>
            <UpperContainer>    
                <UpperMessageBlack>
                   기기 관리
                </UpperMessageBlack>
                <AddButton onClick={() => window.location.href = process.env.REACT_APP_NETWORK_API_BASEURL + '/device-register'}>+</AddButton>
            </UpperContainer>
            <ContentContainer>
                <DeviceList>
                    {devices.map((device) => (
                        
                        <DeviceItem
                             key={device.device_id}
                            selected={selectedDevice === device}
                            >
                                <DeviceIdentifier>
                                        <span>{device.device_name}</span>
                                        {device.connected_ssid && (   
                                             <span style={{ 
                                                        background: "#e8f5e9", 
                                                        padding: "3px 6px",
                                                        borderRadius: "8px",
                                                        color: "green"
                                                        }}>
                                            <FontAwesomeIcon icon={faWifi} /> {device.connected_ssid}
                                            </span>
)}

                                                    </DeviceIdentifier>
                                                    
                                                    <div>
        <IconButton onClick={() => handleEditClick(device)}>
                    <FontAwesomeIcon icon={faPen} />
                            </IconButton>
                                    <IconButton onClick={() => handleDelete(device.device_id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                                        </IconButton>
                                                            </div>
                                                            </DeviceItem>
                                                        
                    ))}
                </DeviceList>
            </ContentContainer>

            {showModal && selectedDevice && (
                <Modal onClose={() => setShowModal(false)}>
                    <h3>{selectedDevice.device_name}</h3>
                    {Object.entries(selectedDevice.mac_per_ssid).map(([ssid, mac]) => (
                        <div key={ssid} style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                            <span>{ssid}</span>
                            <span style={{ background: "#dbdbdb", padding: "5px", borderRadius: "5px" }}>{mac}</span>
                        </div>
                    ))}
                </Modal>
            )}
        </ContentWrapper>
    );
};



export default ManageDevice;