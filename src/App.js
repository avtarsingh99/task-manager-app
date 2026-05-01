import './App.css';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import TaskSummary from './components/TaskSummary';
import FilterControls from './components/FilterControls';

function App() {
  return (
    <div className="App">
    <header className='app-header'>
      <h1>Task Manager App</h1>
      <p>Built with React Context API & useReducer</p>
      </header>
      <main className='app-main'>
      <div className='sidebar'>
      <TaskInput />
      </div>
      <div className='filter-info'>
      <TaskSummary />
      <FilterControls />
      <TaskList />
      </div>
      </main>
    </div>
  );
}

export default App;
