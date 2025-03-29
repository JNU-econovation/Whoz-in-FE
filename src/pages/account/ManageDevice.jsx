import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import Modal from "../../components/Modal"
import ActionModal from "../../components/ActionModal"
import { UpperMessage, UpperContainer } from "../../components/StyledComponents/LayoutStyles"
import { ContentWrapper, ContentContainer, Input } from "../../components/StyledComponents/LayoutStyles"
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
    // 기기 리스트 컨테이너
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const DeviceItem = styled.div`
    // 기기 개별 아이템
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ebebeb;
    padding: 10px;
    border-radius: 1.5rem;
    position: relative;
    padding: 1rem;
    height: 4rem;
`

const DeviceIdentifier = styled.div`
    // 기기 정보 (이름+네트워크))
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


// 모달 내 네트워크 정보 스타일
const NetworkInfo = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    padding: 8px;
    background: #f0f0f0;
    border-radius: 5px;
`

const BASE_URL = process.env.REACT_APP_BACKEND_BASEURL

const ManageDevice = () => {
    const [devices, setDevices] = useState([])
    const [selectedDevice, setSelectedDevice] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [confirmModalVisible, setConfirmModalVisible] = useState(false)
    const [isChecking, setIsChecking] = useState(false) // 요청 중 여부
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
        setShowModal(true)
    }

    const handleDelete = (deviceId) => {
        //삭제 기능 구현하기
    }


    const redirectDeviceRegister = async () => {
        if (isChecking) return
        setIsChecking(true)

        setConfirmModalVisible(true) // 모달 표시
    }

    const proceedDeviceRegister = async () => {
        try {
            // 네트워크 API URL 요청, 기기 등록 토큰 요청
            const [networkApiUrlResponse, tokenResponse] = await Promise.all([
                customFetch(`${BASE_URL}/api/v1/internal-access-url?room=jeonsanwon`, { method: "GET" }),
                customFetch(`${BASE_URL}/api/v1/device-register-token`, { method: "POST" })
            ]);
            const [networkApiBody, tokenBody] = await Promise.all([
                networkApiUrlResponse.json(),
                tokenResponse.json()
            ]);
            if (networkApiBody.error_code === "7001") {
                alert("현재 동아리방 서버가 작동하지 않습니다.....");
                return;
            }
            // 기기 등록 페이지로 이동
            window.location.href = `${networkApiBody.data}/device-register?device_register_token=${tokenBody.data}`;
        } catch (error) {
            console.error("오류 발생:", error.message);
            alert("알 수 없는 오류가 발생했습니다.")
        } finally {
            setIsChecking(false); // 버튼 다시 활성화
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
                               {} <IconButton onClick={() => handleDelete(device.device_id)}>
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
                        <div
                            key={ssid}
                            style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}
                        >
                            <span>{ssid}</span>
                            <span style={{ background: "#dbdbdb", padding: "5px", borderRadius: "5px" }}>{mac}</span>
                        </div>
                    ))}
                </Modal>
            )}

            {confirmModalVisible && (
                <ActionModal
                    title="현재 동아리방의 와이파이(JNU, eduroam, ECONO_5G) 중 하나에 연결되어있나요?"
                    actions={[
                        { label: "취소", onClick: () => { setConfirmModalVisible(false); setIsChecking(false) } },
                        { label: "확인", onClick: proceedDeviceRegister },
                    ]}
                />
            )}
        </ContentWrapper>
    )
}

export default ManageDevice
