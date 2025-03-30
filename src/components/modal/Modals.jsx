import React from "react";
import InfoModal from "./InfoModal";
import ConfirmModal from "./ConfirmModal";
import SelectModal from "./SelectModal";
import OkModal from "./OkModal";
import { MODAL_TYPES } from "./ModalTypes";

const Modals = ({ modal, onClose }) => {
    if (!modal) return null;

    const MODAL_COMPONENTS = {
        [MODAL_TYPES.INFO]: (
            <InfoModal onClose={onClose}>
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
