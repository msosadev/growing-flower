import './App.css';
import Flower from './components/Flower';
import useRunningTime from './hooks/useRunningTime';
import pot from './images/pots/pot_1.svg';
import colors from './colors.json';

function App() {
  const runningTime = useRunningTime();
  
  return (
    <div className="App flex flex-col-reverse h-screen overflow-y-scroll pb-8">
      <div className="flex flex-col items-center relative">
        <div className='flex-1'></div>

        <div style={{ height: runningTime }} className='stem w-2 duration-1000 rounded-t-full transition-all'>
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
