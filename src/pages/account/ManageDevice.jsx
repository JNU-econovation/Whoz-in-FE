import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import Modal from "../../components/Modal";
import { UpperMessage } from "../../components/StyledComponents/LayoutStyles";
import {
    ContentWrapper,
    ContentContainer,
} from "../../components/StyledComponents/LayoutStyles";
import { customFetch } from "../../api/customFetch"

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
  gap: 10px;
`;

const DeviceItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #d3d3d3;
  padding: 10px;
  border-radius: 5px;
  position: relative;
  border: ${(props) => (props.selected ? "2px solid blue" : "none")};
`;

const DeviceName = styled.div`
  font-size: 16px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
`;

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL;

const ManageDevice = () => {
    const [devices, setDevices] = useState([]);
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
                        <DeviceItem key={device.device_id} selected={selectedDevice === device}>
                            <DeviceName>
                                {device.device_name}
                            </DeviceName>
                            {device.connected_ssid ? `📶${device.connected_ssid}` : ``}
                            <div>
                                <IconButton onClick={() => handleEditClick(device)}>✏️</IconButton>
                                <IconButton onClick={() => handleDelete(device.device_id)}>❌</IconButton>
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