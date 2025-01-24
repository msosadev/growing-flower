import { useState } from 'react';
import './App.css';
import Flower from './components/Flower';
import useRunningTime from './hooks/useRunningTime';
import pot from './images/pots/pot_1.svg';
import colors from './colors.json';
import windowBackground from './background.png'; // Adjust the path as needed

function generateRandomValue(max) {
  return Math.floor((Math.random() * max) + 1)
}

function checkDate(month, day) {
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
    checkDate(0, 19) ? localStorage.setItem(flowersKey, "ixora") : localStorage.setItem(flowersKey, generateRandomValue(8));
    localStorage.setItem(palettesKey, generateRandomValue(8));
    setSpecialFlower(true);
    missingItems = 0;
  } else if (localStorage.getItem(flowersKey)) {
    savedFlowers = localStorage.getItem(flowersKey).split(',');
    savedPalettes = localStorage.getItem(palettesKey).split(",");
    missingItems = flowersToRender - savedFlowers.length;

    for (let i = 0; i < missingItems; i++) {
      savedFlowers.push(generateRandomValue(8));
      savedPalettes.push(generateRandomValue(colors.length - 1));
    }

    localStorage.setItem(flowersKey, savedFlowers);
    localStorage.setItem(palettesKey, savedPalettes);
  }

  return (
    <div className="App bg-yellow-100 relative flex flex-col-reverse h-screen overflow-y-auto pb-24">
      <div style={{backgroundImage: `url(${windowBackground})`}} className='window border-[24px] border-[#7E4E2D] [box-shadow:inset_0_0_0_16px_#4B260E] bg-[url("https://cdn.pixabay.com/photo/2022/06/15/18/29/landscape-7264427_1280.png")] bg-cover absolute left-1/2 transform -translate-x-1/2 bottom-16 h-[80vh] w-80'>
        
      </div>
      <div className="flex drop-shadow-md flex-col items-center relative">

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
