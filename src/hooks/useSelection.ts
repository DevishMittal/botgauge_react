import { useState, useMemo, useCallback } from 'react';
import type { Category, ItemsData } from '../types';
import { useDebounce } from './useDebounce'; 

export const useSelection = (itemsData: ItemsData) => {
    const [activeTab, setActiveTab] = useState<Category>('vegetables'); //check for active tab
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set()); //set because faster than array o(1)
    const [searchText, setSearchText] = useState(''); 

    const debouncedSearchText = useDebounce(searchText, 300); //debounce the search text 

    const currentItems = useMemo(() => {
        return itemsData[activeTab]; 
    }, [itemsData, activeTab]); //useMemo to cache the current items

    //Filter items based on DEBOUNCED search text 
    //Applies only to active category
    const filteredItems = useMemo(() => {
        if (!debouncedSearchText.trim()) return currentItems;
        const lowerSearch = debouncedSearchText.toLowerCase();
        return currentItems.filter(item =>
            item.label.toLowerCase().includes(lowerSearch)
        );
    }, [currentItems, debouncedSearchText]);

    //Toggle Selection
    const toggleSelection = useCallback((id: string) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    }, []);

    //Select All / Deselect All for current filtered items
    //Applies only to active category
    // "Applies only to active category" - usually Select All applies to visible items or all items in category. 
    // Standard pattern: Select all items in the CURRENT filtered view (or category if no search).
    const toggleSelectAll = useCallback(() => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            const allSelected = filteredItems.every(item => prev.has(item.id));

            if (allSelected) {
                // Deselect all visible
                filteredItems.forEach(item => newSet.delete(item.id));
            } else {
                // Select all visible
                filteredItems.forEach(item => newSet.add(item.id));
            }
            return newSet;
        });
    }, [filteredItems]);

    //Switch Tab
    const handleTabChange = useCallback((tab: Category) => {
        setActiveTab(tab);
        setSearchText('');
    }, []);

    //Get counts for tabs
    const getSelectedCount = useCallback((category: Category) => {
        return itemsData[category].filter(item => selectedIds.has(item.id)).length;
    }, [itemsData, selectedIds]);

    //Get all selected items for final submission
    const getSelectedItems = useCallback(() => {
        const allItems = [...itemsData.fruits, ...itemsData.vegetables];
        return allItems.filter(item => selectedIds.has(item.id));
    }, [itemsData, selectedIds]);

    const isAllSelected = filteredItems.length > 0 && filteredItems.every(item => selectedIds.has(item.id));

    return {
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
    };
};
