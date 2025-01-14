import './App.css';
import Flower from './components/Flower';
import useRunningTime from './hooks/useRunningTime';
import pot from './images/pots/pot_1.svg';
import colors from './colors.json';

function App() {
  const runningTime = useRunningTime();
  
  return (
    <div className="App">
      <h1>Growing flower</h1>

      <div className="plant-wrapper">
        <div style={{ height: runningTime }} className='stem'>
        </div>

        {Array.from({ length: 8 }, (_, index) => {
          const randomIndex = Math.floor((Math.random() * 8) + 1);          
          return  <Flower index={index} randomIndex={randomIndex} runningTime={runningTime} palette={colors[index]} />
        })
      }

        <img className="pot" src={pot} alt="A pot"></img>
      </div>
    </div>
  );
}

export default App;
