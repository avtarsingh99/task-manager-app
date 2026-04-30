import React from 'react'
import { useTaskContext } from '../context/TaskContext';

export default function FilterControls() {

  const { state, setFilter, setSearch } = useTaskContext();

  return (
    <div className='filter-controls'>
      <div className='search-section'>
      <label>Search tasks here:</label>
        <input
          className='search-input'
          onChange={e => setSearch(e.target.value)}
          placeholder='Search tasks....' />
      </div>
      <div className='filter-section'>
        <label>Filters: </label>
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
