import { useState } from 'react';
import './App.css'
import { ItemModal } from './components/ItemModal/ItemModal';
import { ITEMS } from './data/items';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app-container">
      <h1>BotGauge Assignment</h1>
      <button onClick={() => setIsModalOpen(true)}>
        Open Selection Modal
      </button>

      <ItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itemsData={ITEMS}
      />
    </div>
  )
}

export default App
