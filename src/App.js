import './App.css';
import Flower from './components/Flower';
import useRunningTime from './hooks/useRunningTime';
import pot from './images/pots/pot_1.svg';
import colors from './colors.json';

function App() {
  const runningTime = useRunningTime();
  function updateLocalStorage(key, value) {
    if (localStorage.getItem(key)) {
      const array = localStorage.getItem(key).split(',');
      array.push(value);
      localStorage.setItem(key, array);
    } else {
      localStorage.setItem(key, [value]);
    }
  }

  function setRandomValue(currentIndex, maxIndex, localStorageKey) {
    const randomVlower = Math.floor((Math.random() * maxIndex) + 1);
    if (!localStorage.getItem(localStorageKey) || !localStorage.getItem(localStorageKey).split(',')[currentIndex]) {
      updateLocalStorage(localStorageKey, randomVlower);
    }
  }

  return (
    <div className="App flex flex-col-reverse h-screen overflow-y-scroll pb-8">
      <div className="flex flex-col items-center relative">
        <div className='flex-1'></div>

        <div style={{ height: runningTime }} className='stem w-2 duration-1000 rounded-t-full transition-all'>
        </div>

        {Array.from({ length: Math.floor(runningTime / 60) }, (_, index) => {
          setRandomValue(index, 8, "flowers");
          setRandomValue(index, 8, "palettes");
          return <Flower
            key={index}
            index={index}
            flowerIndex={localStorage.getItem('flowers').split(',')[index]}
            runningTime={runningTime}
            palette={colors[localStorage.getItem('palettes').split(',')[index]]}
          />
        })
        }

        <img className="pot" src={pot} alt="A pot"></img>
      </div>
    </div>
  );
}

export default App;
