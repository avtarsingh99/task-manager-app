import React, { useState } from 'react'
import { useTaskContext } from '../context/TaskContext';

export default function FilterControls() {

  const { state, setFilter, setSearch } = useTaskContext();
  const [searchValue, setSearchValue] = useState('');

  function handleSearch(e) {
    setSearchValue(e.target.value);
    setSearch(e.target.value);
  }

  function handleClear() {
    setSearchValue('');
    setSearch('');
  }

  return (
    <div className='filter-controls'>
      <div className='search-section'>
      <div className='search-wrapper'>
        <input
          className='search-input'
          value={searchValue}
          onChange={handleSearch}
          placeholder='Search tasks....' />
          {searchValue && (
            <button className='search-clear' onClick={handleClear}>X</button>
          )}
      </div>
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
