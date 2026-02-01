import React from 'react';
import type { Item, Category } from '../../types';


interface ModalListProps {
    category: Category;
    items: Item[];
    selectedIds: Set<string>;
    onToggle: (id: string) => void;
    searchText: string;
    onSearchChange: (text: string) => void;
    isAllSelected: boolean;
    onToggleAll: () => void;
}

export const ModalList: React.FC<ModalListProps> = ({
    category,
    items,
    selectedIds,
    onToggle,
    searchText,
    onSearchChange,
    isAllSelected,
    onToggleAll,
}) => {
    const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);

    return (
        <div className="modal-content">
            <h3 className="section-title">Select {categoryTitle}</h3>

            <div className="search-input-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                <span className="search-icon">🔍</span>
            </div>

            <div className="items-list">
                {items.length > 0 && (
                    <div className="item-row select-all-row" onClick={onToggleAll}>
                        <input
                            type="checkbox"
                            className="item-checkbox"
                            checked={isAllSelected}
                            onChange={onToggleAll}
                            onClick={(e) => e.stopPropagation()}
                        />
                        <span className="item-label" style={{ fontWeight: 600 }}>Select All</span>
                    </div>
                )}
                
                {items.length === 0 ? (
                    <div className="empty-state">No items found</div>
                ) : (
                    items.map((item) => (
                        <div
                            key={item.id}
                            className="item-row"
                            onClick={() => onToggle(item.id)}
                        >
                            <input
                                type="checkbox"
                                className="item-checkbox"
                                checked={selectedIds.has(item.id)}
                                onChange={() => onToggle(item.id)}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <span className="item-label">{item.label}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
