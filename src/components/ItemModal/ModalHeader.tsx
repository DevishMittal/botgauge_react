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
            <div className="header-content-left">
                <h2 className="modal-title">Add Items</h2>
                <div className="tabs-container">
                    <button
                        className={`tab-button ${activeTab === 'vegetables' ? 'active' : ''}`}
                        onClick={() => onTabChange('vegetables')}
                    >
                        <img src="/icons/vegetables.svg" alt="" className="tab-icon" />
                        <span>Vegetables</span>
                        <span className="count-badge">{getCount('vegetables')}</span>
                    </button>

                    <button
                        className={`tab-button ${activeTab === 'fruits' ? 'active' : ''}`}
                        onClick={() => onTabChange('fruits')}
                    >
                        <img src="/icons/fruits.svg" alt="" className="tab-icon" />
                        <span>Fruits</span>
                        <span className="count-badge">{getCount('fruits')}</span>
                    </button>
                </div>
            </div>
            <button className="close-btn" onClick={onClose} aria-label="Close">
                &times;
            </button>
        </div>
    );
};
