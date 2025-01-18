import './App.css';
import Flower from './components/Flower';
import useRunningTime from './hooks/useRunningTime';
import pot from './images/pots/pot_1.svg';
import colors from './colors.json';
import { useState } from 'react';

function generateRandomValue() {
  return Math.floor((Math.random() * 8) + 1)
}

function checkDate(month, day) {
  // Get today's date
  const today = new Date();

  if (today.getMonth() === month && today.getDate() === day) {
    return true;
  } else {
    return false;
  }
}

// START ------------------------------------------------------------------

function App() {
  const runningTime = useRunningTime();
  const [specialFlower, setSpecialFlower] = useState(false);
  let missingItems;
  const flowersKey = "flowers"
  const palettesKey = "palettes"
  let savedFlowers = [];
  let savedPalettes = [];
  const flowersToRender = Math.floor(runningTime / 60);

  // const renderFirstFlower = flowersToRender > 0;

  if (!localStorage.getItem(flowersKey)) {
    // If it's January 19 set special flower ixora
    checkDate(0, 19) ? localStorage.setItem(flowersKey, "ixora") : localStorage.setItem(flowersKey, generateRandomValue());
    localStorage.setItem(palettesKey, generateRandomValue());
    setSpecialFlower(true);
    missingItems = 0;
  } else if (localStorage.getItem(flowersKey)) {
    savedFlowers = localStorage.getItem(flowersKey).split(',');
    savedPalettes = localStorage.getItem(palettesKey).split(",");
    missingItems = flowersToRender - savedFlowers.length;

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

        {savedFlowers.map((flowerIndex, index) => {
          if ((index + 1) <= flowersToRender) {
            return <Flower key={index} index={index} flowerIndex={flowerIndex} runningTime={runningTime} palette={colors[savedPalettes[index]]} />
          }
        })}

        <img className="pot" src={pot} alt="A pot"></img>
      </div>
    </div>
  );
}

export default App;
