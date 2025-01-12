import './App.css';
import useRunningTime from './hooks/useRunningTime';
import pot from './images/pots/pot_1.svg';
import { ReactSVG } from 'react-svg'

function App() {
  const runningTime = useRunningTime();

  return (
    <div className="App">
      <h1>Growing flower</h1>

      <div className="plant-wrapper">
        <div style={{ height: runningTime }} className='stem'>
        </div>
        <div style={runningTime === 0 ? {display: "none"} : {}} className="flower left"><ReactSVG src="/images/flowers/flower_1.svg" /></div>
        <img className="pot" src={pot} alt="A pot"></img>
      </div>
    </div>
  );
}

export default App;
