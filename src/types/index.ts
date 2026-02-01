export type Category = 'vegetables' | 'fruits';

export interface Item {
    id: string;
    label: string;
}

export interface ItemsData {
    fruits: Item[];
    vegetables: Item[];
}
