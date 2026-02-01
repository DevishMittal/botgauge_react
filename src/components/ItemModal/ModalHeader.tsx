import React from 'react';
import type { Category } from '../../types';


interface ModalHeaderProps {
    activeTab: Category;
    onTabChange: (tab: Category) => void;
    getCount: (category: Category) => number;
    onClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
    activeTab,
    onTabChange,
    getCount,
    onClose,
}) => {
    return (
        <div className="modal-header">
            <div className="header-top">
                <h2 className="modal-title">Add Items</h2>
                <button className="close-btn" onClick={onClose} aria-label="Close">
                    &times;
                </button>
            </div>

            <div className="tabs-container">
                <button
                    className={`tab-button ${activeTab === 'vegetables' ? 'active' : ''}`}
                    onClick={() => onTabChange('vegetables')}
                >
                    <span>Vegetables</span>
                    <span className="count-badge">{getCount('vegetables')}</span>
                </button>

                <button
                    className={`tab-button ${activeTab === 'fruits' ? 'active' : ''}`}
                    onClick={() => onTabChange('fruits')}
                >
                    <span>Fruits</span>
                    <span className="count-badge">{getCount('fruits')}</span>
                </button>
            </div>
        </div>
    );
};
