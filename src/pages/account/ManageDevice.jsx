import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Modal from "../../components/Modal";
import { UpperMessage } from "../../components/StyledComponents/LayoutStyles";
import { ContentWrapper, ContentContainer, Input } from "../../components/StyledComponents/LayoutStyles";
import { customFetch } from "../../api/customFetch"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

const UpperMessageBlack = styled.div`
  color: black;
  font-size: 2rem;
  font-family: 'Pretendard medium', sans-serif;
  font-weight: 400;

`;

const AddButton = styled.button`
  background: #d3d3d3;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-right: 1rem;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const UpperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  padding-top: 4rem;
`;

const DeviceList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DeviceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #e0e0e0;
  padding: 10px;
  border-radius: 1.5rem;
  position: relative;
  border: ${(props) => (props.selected ? "2px solid blue" : "none")};
`;

const DeviceName = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  
`;

const IconButton = styled.button`
  background: none;
  color:white;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
`;

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;

const ManageDevice = () => {
    const [devices, setDevices] = useState([
        {
            device_id: 1,
            device_name: "규민 아이폰",
            connected_ssid: "ECONO_5G",
            mac_per_ssid: {
                HomeWiFi: "00:1A:2B:3C:4D:5E",
                OfficeWiFi: "00:1A:2B:3C:4D:5F",
            },
        },
        {
            device_id: 2,
            device_name: "gyum Mac",
            connected_ssid: "JNU",
            mac_per_ssid: {
                HomeWiFi: "11:2B:3C:4D:5E:6F",
                OfficeWiFi: "11:2B:3C:4D:5E:70",
            },
        },
        {
            device_id: 3,
            device_name: "규민 아이패드",
            connected_ssid: null,
            mac_per_ssid: {
                HomeWiFi: "22:3C:4D:5E:6F:71",
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
                <AddButton onClick={() => navigate("/device-register")}>+</AddButton>
            </UpperContainer>
            <ContentContainer>
                <DeviceList>
                    {devices.map((device) => (
                        <DeviceItem
                            key={device.device_id}
                            selected={selectedDevice === device}
                        >
                            <DeviceName>
                                {device.device_name}
                                {device.connected_ssid ? `📶${device.connected_ssid}` : ""}
                                </DeviceName>
                           
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
                            <span style={{ background: "#d3d3d3", padding: "5px", borderRadius: "5px" }}>{mac}</span>
                        </div>
                    ))}
                </Modal>
            )}
        </ContentWrapper>
    );
};



export default ManageDevice;