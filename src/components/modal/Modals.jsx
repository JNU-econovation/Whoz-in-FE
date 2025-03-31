import React, { useEffect } from "react";
import InfoModal from "./InfoModal";
import ConfirmModal from "./ConfirmModal";
import SelectModal from "./SelectModal";
import OkModal from "./OkModal";
import { MODAL_TYPES } from "./ModalTypes";

const Modals = ({ modal, onClose }) => {
    useEffect(() => {
        if (!modal) return;

        const handleKeyDown = (e) => {
            const tag = e.target.tagName;
            if (["INPUT", "TEXTAREA"].includes(tag)) return;

            if (e.key === "Enter") {
                if (modal.type === MODAL_TYPES.OK && modal.onOk) {
                    modal.onOk();
                } else if (modal.type === MODAL_TYPES.CONFIRM && modal.onConfirm) {
                    modal.onConfirm();
                }
            } else if (e.key === "Escape") {
                if (modal.type === MODAL_TYPES.OK && modal.onOk) {
                    modal.onOk();
                } else if (modal.type === MODAL_TYPES.CONFIRM && modal.onCancel) {
                    modal.onCancel();
                } else if (modal.type === MODAL_TYPES.INFO && modal.onClose) {
                    modal.onClose();
                } else {
                    onClose?.();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [modal, onClose]);
    
    if (!modal) return null;

    const MODAL_COMPONENTS = {
        [MODAL_TYPES.INFO]: (
            <InfoModal onClose={modal.onClose ?? onClose}>
                {modal.message}
            </InfoModal>
        ),
        [MODAL_TYPES.CONFIRM]: (
            <ConfirmModal
                message={modal.message}
                onConfirm={modal.onConfirm}
                onCancel={modal.onCancel}
            />
        ),
        [MODAL_TYPES.SELECT]: (
            <SelectModal title={modal.message} actions={modal.actions} />
        ),
        [MODAL_TYPES.OK]: (
            <OkModal
                message={modal.message}
                onOk={modal.onOk ?? onClose}
            />
        ),
    };

    return MODAL_COMPONENTS[modal.type] || null;
};

export default Modals;
