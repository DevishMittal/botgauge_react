# BotGauge React Assignment
- Deployed at: https://botgauge-react.vercel.app/
## Features

- **Categorized Selection**: Independent tabs for Fruits and Vegetables.
- **Search Filtering**: Real-time search with **debouncing** for performance.
- **Persistent Selection**: Selections are maintained while switching tabs.
- **Instant Updates**: Selection counts update immediately.
- **Clean UI**: Responsive modal with sticky header/footer and scrollable list.

## Tech Stack

- **React** 
- **TypeScript**
- **Vite**
- **CSS** 

## Project Structure

```
src/
├── components/
│   └── ItemModal/
│       ├── ItemModal.tsx       # Main container (Smart Component)
│       ├── ItemModal.css       # Component-specific styles
│       ├── ModalHeader.tsx     # Pure presentation component for tabs
│       ├── ModalList.tsx       # Pure presentation component for the list
│       └── ModalFooter.tsx     # Pure presentation component for actions
├── hooks/
│   ├── useSelection.ts         # Custom hook encapsulating all business logic
│   └── useDebounce.ts          # Hook for debouncing search input
├── data/
│   └── items.ts                # Mock data source
└── types/
    └── index.ts                # Shared type definitions
```

## Architecture Decisions

1.  **Separation of Concerns (Logic vs. View)**:
    - All state management and logic (filtering, toggling, counts) is extracted into `useSelection` hook.
    - `ItemModal` acts as the "Controller" connecting the hook to the UI.
    - `ModalHeader`, `ModalList`, and `ModalFooter` are "Dumb" functional components that only render props.

2.  **State Management**:
    - `selectedIds`: A `Set` is used (wrapped in a new Set for React immutability) for O(1) lookups during rendering.
    - `activeTab`: Simple string state.
    - `searchText`: Managed locally but coupled with the hook to filter generic lists.

3.  **Performance**:
    - `useMemo` is used for filtering items and preventing unnecessary re-calculations of the derived lists.
    - `useCallback` is used for handlers to maintain referential equality.
    - `Debouncing` is used for search input.

4.  **Extensibility**:
    - The `ItemModal` accepts `itemsData` as a prop, making it decoupled from the specific mock data file.

## How to Run

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start the dev server:
    ```bash
    npm run dev
    ```

