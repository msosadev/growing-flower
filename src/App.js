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

        {Array.from({ length: 8 }, (_, index) => (
          <div
            style={{
              opacity: runningTime === 0 ? "0" : "",
              "--flower-appear-delay": `${index + 1}s`,
              "--flower-bottom": `${(index + 1) * 100}px`
            }}
            className={`flower ${index % 2 === 0 ? "left" : "right"}`}>
            <ReactSVG src={`/images/flowers/flower_${index + 1}.svg`} />
          </div>
        ))}

        <img className="pot" src={pot} alt="A pot"></img>
      </div>
    </div>
  );
}

export default App;
