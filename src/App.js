import { useEffect, useState } from 'react';
import './App.css';
import Flower from './components/Flower';
import useRunningTime from './hooks/useRunningTime';
import pot from './images/pots/pot_1.svg';
import colors from './colors.json';
import windowBackground from './background.png'; // Adjust the path as needed
import Settings from './components/Settings';
import Flowers from './components/Flowers';
import { auth, db } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

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
  const flowersKey = "flowers"
  const palettesKey = "palettes"
  const [flowersToRender, setFlowersToRender] = useState([]);
  const [palettesToRender, setPalettesToRender] = useState([]);
  const [stemBg, setStemBg] = useState([]);
  const quantityOfFlowersToShow = Math.floor(runningTime / 60);
  const [selectedImage, setSelectedImage] = useState(windowBackground);
  
  // Flowers Local Storage setup
  useEffect(() => {
    let savedFlowers = [];
    let savedPalettes = [];
    let missingItems;

    if (!localStorage.getItem(flowersKey)) {
      // If it's January 19 set special flower ixora
      checkDate(0, 19) ? localStorage.setItem(flowersKey, "ixora") : localStorage.setItem(flowersKey, generateRandomValue(8));
      localStorage.setItem(palettesKey, generateRandomValue(8));
      missingItems = 0;
    } else if (localStorage.getItem(flowersKey)) {
      savedFlowers = localStorage.getItem(flowersKey).split(',');
      savedPalettes = localStorage.getItem(palettesKey).split(",");
      missingItems = quantityOfFlowersToShow - savedFlowers.length;

      for (let i = 0; i < missingItems; i++) {
        savedFlowers.push(generateRandomValue(8));
        savedPalettes.push(generateRandomValue(colors.length - 1));
      }

      setFlowersToRender(savedFlowers);
      setPalettesToRender(savedPalettes);
      localStorage.setItem(flowersKey, savedFlowers);
      localStorage.setItem(palettesKey, savedPalettes);
    }
  }, [])

  const handleImageChange = (event) => {
    const fileImage = event.target.files[0];
    if (fileImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setSelectedImage(base64String);
        localStorage.setItem('windowImage', base64String);
      };
      reader.readAsDataURL(fileImage);
    }
  };

  useEffect(() => {
    const windowImage = localStorage.getItem('windowImage');
    if (windowImage) {
      setSelectedImage(windowImage);
    }
  }, []);


  // Set stem background color
  useEffect(() => {
    if (flowersToRender.length < 1 || palettesToRender.length < 1) return;
    
    let stemColors = [];
    flowersToRender.forEach((flower, index) => {
      let colorIndex = palettesToRender[index];
      let position = (flowersToRender.length - index) * 60;
      let color = colors[colorIndex].stemFill;
      let gradientValue = `${color} ${position}px`;
      stemColors.push(gradientValue);
    });
    
    setStemBg(stemColors.reverse());
  }, [flowersToRender, palettesToRender])

  // Firebase -----------------------------------------------------------------

  const [userId, setUserId] = useState("");
  const flowersCollectionRef = collection(db, "flowers");

  async function updateFlower(id, property, newValue) {
    try {
      const documentReference = doc(flowersCollectionRef, id);
      const updatedDoc = {}
      updatedDoc[property] = newValue;
      updateDoc(documentReference, updatedDoc);
    } catch (error) {
      console.error(error);
    }
  }

  async function getFlowerList() {
    try {
      if (!auth.currentUser) return;

      const flowersQuery = query(flowersCollectionRef, where("userId", "==", auth.currentUser.uid));
      const data = await getDocs(flowersQuery);
      const filteredData = data.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));

      filteredData.forEach(flower => {
        updateFlower(flower.id, "flowers", flowersToRender);
        updateFlower(flower.id, "palettes", palettesToRender);
      })
    } catch (error) {
      console.error("Error fetching flowers:", error);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!flowersToRender || !palettesToRender || !userId) return;
    getFlowerList();

  }, [flowersToRender, userId]);

  return (
    <>
      <Settings selectedImage={selectedImage} handleImageChange={handleImageChange} />
      <div className="App bg-yellow-100 relative flex flex-col-reverse h-screen overflow-y-auto pb-24">

        <div style={{ backgroundImage: `url(${selectedImage})` }} className='window border-[24px] bg-center border-[#7E4E2D] [box-shadow:inset_0_0_0_16px_#4B260E] bg-cover absolute left-1/2 transform -translate-x-1/2 bottom-16 h-[80vh] w-80'>

        </div>
        <div className="flex drop-shadow-md flex-col items-center relative">

          <div style={{ height: runningTime, background: `linear-gradient(${stemBg.reverse().join(",")})` }} className='stem w-2 duration-1000 rounded-t-full transition-all'>
          </div>

          {flowersToRender.map((flowerIndex, index) => {
            if ((index + 1) <= quantityOfFlowersToShow) {
              return <Flower key={index} index={index} flowerIndex={flowerIndex} runningTime={runningTime} palette={colors[palettesToRender[index]]} />
            }
          })}

          <img className="pot" src={pot} alt="A pot"></img>
        </div>
      </div>
    </>
  );
}

export default App;
