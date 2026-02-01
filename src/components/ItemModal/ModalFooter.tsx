import React from 'react';

interface ModalFooterProps {
    onCancel: () => void;
    onSave: () => void;
    disableSave?: boolean;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
    onCancel,
    onSave,
    disableSave = false,
}) => {
    return (
        <div className="modal-footer">
            <button className="btn btn-cancel" onClick={onCancel}>
                Cancel
            </button>
            <button
                className="btn btn-save"
                onClick={onSave}
                disabled={disableSave}
            >
                Save
            </button>
        </div>
    );
};
