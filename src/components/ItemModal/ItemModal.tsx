import React from 'react';
import './ItemModal.css';
import { ModalHeader } from './ModalHeader';
import { ModalList } from './ModalList';
import { ModalFooter } from './ModalFooter';
import { useSelection } from '../../hooks/useSelection';
import type { ItemsData } from '../../types';



interface ItemModalProps { 
    isOpen: boolean;
    onClose: () => void;
    itemsData: ItemsData;
}

export const ItemModal: React.FC<ItemModalProps> = ({
    isOpen,
    onClose,
    itemsData,
}) => {
    const {
        activeTab,
        searchText,
        selectedIds,
        filteredItems,
        setSearchText,
        handleTabChange,
        toggleSelection,
        toggleSelectAll,
        isAllSelected,
        getSelectedCount,
        getSelectedItems,
    } = useSelection(itemsData);

    if (!isOpen) return null;

    const handleSave = () => {
        const selected = getSelectedItems();
        console.log('Selected Items:', selected);
        onClose(); 
    };
    const isSaveDisabled = selectedIds.size === 0;

    return (
        <div className="modal-overlay">
            <div className="modal-container">

                <ModalHeader
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    getCount={getSelectedCount}
                    onClose={onClose}
                />

                <ModalList
                    category={activeTab}
                    items={filteredItems}
                    selectedIds={selectedIds}
                    onToggle={toggleSelection}
                    searchText={searchText}
                    onSearchChange={setSearchText}
                    isAllSelected={isAllSelected}
                    onToggleAll={toggleSelectAll}
                />

                <ModalFooter
                    onCancel={onClose}
                    onSave={handleSave}
                    disableSave={isSaveDisabled}
                />

            </div>
        </div>
    );
};
