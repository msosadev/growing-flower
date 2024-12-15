import './App.css';
import useRunningTime from './hooks/useRunningTime';

function App() {
  const runningTime = useRunningTime();

  return (
    <div className="App">
      <h1>Growing flower</h1>
      <div style={{ height: runningTime }} className='plant'>{runningTime}</div>
    </div>
  );
}

export default App;
