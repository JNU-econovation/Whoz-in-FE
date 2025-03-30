import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import Modals from "../../components/modal/Modals"
import { MODAL_TYPES } from "../../components/modal/ModalTypes"
import { UpperMessage, UpperContainer } from "../../components/StyledComponents/LayoutStyles"
import { ContentWrapper, ContentContainer } from "../../components/StyledComponents/LayoutStyles"
import { customFetch } from "../../api/customFetch"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrash, faWifi } from "@fortawesome/free-solid-svg-icons"

const AddButton = styled.button`
    background: #8b8baa;
    color: white;
    border: none;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-right: 1rem;
    font-size: 1.8rem;
    font-weight: bold;
    margin:2rem;
    margin-top:4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition:
        background 0.3s ease,
        transform 0.2s;
`

const DeviceList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const DeviceItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ebebeb;
    padding: 1rem;
    border-radius: 1.5rem;
    height: 4rem;
`

const DeviceIdentifier = styled.div`
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
`

const IconButton = styled.button`
    background: none;
    color: #595959;
    border: none;
    font-size: 18px;
    cursor: pointer;
    margin-left: 10px;
    transition:
        color 0.3s,
        transform 0.2s;

    &:hover {
        color: #717171;
        transform: scale(1.1);
    }
`

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL

const ManageDevice = () => {
    const [devices, setDevices] = useState([])
    const [selectedDevice, setSelectedDevice] = useState(null)
    const [modal, setModal] = useState(null)
    const [isChecking, setIsChecking] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        fetchDevices()
    }, [])

    const fetchDevices = async () => {
        try {
            const response = await customFetch(BASE_URL + "/api/v1/devices")
            const data = await response.json()
            setDevices(data.data.devices)
        } catch (error) {
            console.error("기기 목록을 불러오기 실패", error)
        }
    }

    const handleEditClick = (device) => {
        setSelectedDevice(device)
        setModal({
            type: MODAL_TYPES.INFO,
            message: (
                <>
                    <h3>{device.device_name}</h3>
                    {Object.entries(device.mac_per_ssid).map(([ssid, mac]) => (
                        <div
                            key={ssid}
                            style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}
                        >
                            <span>{ssid}</span>
                            <span style={{ background: "#dbdbdb", padding: "5px", borderRadius: "5px" }}>{mac}</span>
                        </div>
                    ))}
                </>
            ),
            onClose: () => setModal(null)
        });
    }

    const onClickDeleteButton = (deviceId, deviceName) => {
        setModal({
            type: MODAL_TYPES.CONFIRM,
            message: `'${deviceName}' 기기를 삭제하시겠어요?`,
            onConfirm: () => {
                setModal(null)
                deleteDevice(deviceId)
            },
            onCancel: () => {
                setModal(null)
            }
        })
    }

    const deleteDevice = async (deviceId) => {
        try {
            const response = await customFetch(`${BASE_URL}/api/v1/device`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ device_id: deviceId }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "기기 삭제 실패");
            }

            fetchDevices(); // 기기 목록 다시 불러오기

        } catch (error) {
            console.error("기기 삭제 에러:", error);
        }
    };


    const redirectDeviceRegister = async () => {
        setModal({
            type: MODAL_TYPES.CONFIRM,
            message: "현재 동아리방의 와이파이(JNU, eduroam, ECONO_5G) 중 하나에 연결되어있나요?",
            onConfirm: proceedDeviceRegister,
            onCancel: () => {
                setModal(null)
            }
        })
    }

    const proceedDeviceRegister = async () => {
        try {
            const [networkApiUrlResponse, tokenResponse] = await Promise.all([
                customFetch(`${BASE_URL}/api/v1/internal-access-url?room=jeonsanwon`, { method: "GET" }),
                customFetch(`${BASE_URL}/api/v1/device-register-token`, { method: "POST" })
            ]);
            const [networkApiBody, tokenBody] = await Promise.all([
                networkApiUrlResponse.json(),
                tokenResponse.json()
            ]);
            if (networkApiBody.error_code === "7001") {
                setModal({
                    type: MODAL_TYPES.OK,
                    message: "현재 동아리방 서버가 작동하지 않습니다.....",
                    onOk: () => setModal(null)
                });
                return;
            }
            setModal(null);
            window.location.href = `${networkApiBody.data}/device-register?device_register_token=${tokenBody.data}`;
        } catch (error) {
            console.error("오류 발생:", error.message);
            setModal({
                type: MODAL_TYPES.OK,
                message: "알 수 없는 오류가 발생했습니다.",
                onOk: () => setModal(null)
            });
        } finally {
            setIsChecking(false);
        }
    };

    return (
        <ContentWrapper>
            <UpperContainer>
                <UpperMessage>기기 관리</UpperMessage>
                <AddButton onClick={redirectDeviceRegister}>+</AddButton>
            </UpperContainer>
            <ContentContainer>
                <DeviceList>
                    {devices.map((device) => (
                        <DeviceItem key={device.device_id} selected={selectedDevice === device}>
                            <DeviceIdentifier>
                                <span>{device.device_name}</span>
                                {device.connected_ssid && (
                                    <span
                                        style={{
                                            background: "#e8f5e9",
                                            padding: "3px 6px",
                                            borderRadius: "8px",
                                            color: "green",
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faWifi} /> {device.connected_ssid}
                                    </span>
                                )}
                            </DeviceIdentifier>

                            <div>
                                <IconButton onClick={() => handleEditClick(device)}>
                                    <FontAwesomeIcon icon={faPen} />
                                </IconButton>
                                <IconButton onClick={() => onClickDeleteButton(device.device_id, device.device_name)}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </IconButton>
                            </div>
                        </DeviceItem>
                    ))}
                </DeviceList>
            </ContentContainer>

            <Modals modal={modal} onClose={() => setModal(null)} />
        </ContentWrapper>
    )
}

export default ManageDevice
