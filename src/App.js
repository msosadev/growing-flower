import './App.css';
import Flower from './components/Flower';
import useRunningTime from './hooks/useRunningTime';
import pot from './images/pots/pot_1.svg';
import colors from './colors.json';

function updateLocalStorage(key, value) {
  if (localStorage.getItem(key)) {
    const array = parseStorage(key);
    array.push(value);
    localStorage.setItem(key, array);
  } else {
    localStorage.setItem(key, [value]);
  }
}

function parseStorage(key) {
  return localStorage.getItem(key).split(',');
}

function generateRandomValue() {
  return Math.floor((Math.random() * 8) + 1)
}

function setRandomValue(currentIndex, localStorageKey) {
  if (!localStorage.getItem(localStorageKey) || !localStorage.getItem(localStorageKey).split(',')[currentIndex]) {
    updateLocalStorage(localStorageKey, generateRandomValue());
  }
}

function pushToLocalStorage(item, key) {
  if (!localStorage.getItem(key)) {
    updateLocalStorage(key, generateRandomValue());
    return;
  } else {
    const arr = parseStorage(key);
    arr.push(item);
    updateLocalStorage(key, arr);
  }
}

function calculateMissingItems(key, time) {
  return Math.abs(Math.floor((time / 60) - localStorage.getItem(key)?.split(',').length))
}

function initializeLocalStorage(key) {
  if (!localStorage.getItem(key)) {
    updateLocalStorage(key, generateRandomValue())
  }
}

function safeSubtract(a, b) {
  return Math.max(0, a - b);
}

// START ------------------------------------------------------------------

function App() {
  const runningTime = useRunningTime();
  let missingItems;
  const flowersKey = "flowers"
  const palettesKey = "palettes"
  let savedFlowers = [];
  let savedPalettes = [];

  const renderFirstFlower = Math.floor(runningTime / 60) > 0;

  if (renderFirstFlower && !localStorage.getItem(flowersKey)) {
    localStorage.setItem(flowersKey, generateRandomValue());
    localStorage.setItem(palettesKey, generateRandomValue());
    savedFlowers = localStorage.getItem(flowersKey).split(",");
    savedPalettes = localStorage.getItem(palettesKey).split(",");
    missingItems = 0;
  } else if(localStorage.getItem(flowersKey)) {
    savedFlowers = localStorage.getItem(flowersKey).split(',');
    savedPalettes = localStorage.getItem(palettesKey).split(",");
    missingItems = Math.floor(runningTime / 60) - savedFlowers.length;

    for (let i = 0; i < missingItems; i++) {
      savedFlowers.push(generateRandomValue());
      savedPalettes.push(generateRandomValue());
    }

    localStorage.setItem(flowersKey, savedFlowers);
    localStorage.setItem(palettesKey, savedPalettes);
  }


  return (
    <div className="App flex flex-col-reverse h-screen overflow-y-scroll pb-8">
      <div className="flex flex-col items-center relative">

        <div style={{ height: runningTime }} className='stem w-2 duration-1000 rounded-t-full transition-all'>
        </div>

        {/* the animation is broken when using a conditional, make a separate component for the loop */}
        {savedFlowers.map((flowerIndex, index) => {
          return <Flower key={index} index={index} flowerIndex={flowerIndex} runningTime={runningTime} palette={colors[savedPalettes[index]]} />
        })}


        <img className="pot" src={pot} alt="A pot"></img>
      </div>
    </div>
  );
}

export default App;
