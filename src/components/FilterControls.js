import React, { useContext } from 'react'
import { TaskContext } from '../context/TaskContext';

export default function FilterControls() {

  const { state, setFilter } = useContext(TaskContext);


  return (
    <div className='filter-controls'>
      <div className='filter-section'>
        <div className='filter-buttons'>
          {['all', 'completed', 'pending'].map(f => (
            <button
              key={f}
              className={state.filter === f ? 'active' : ''}
              onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
