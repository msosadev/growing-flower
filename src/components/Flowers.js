import { auth, db } from "../config/firebase";
import { useEffect, useState } from "react";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Flowers() {
    const [flowers, setFlowers] = useState([]);
    const [updatedIndexesStr, setUpdatedIndexesStr] = useState("");
    const [newIndexesStr, setNewIndexesStr] = useState("");
    const [updatedPaletteStr, setUpdatedPaletteStr] = useState("");
    const [newPaletteStr, setNewPaletteStr] = useState("");
    const [userId, setUserId] = useState("");
    const flowersCollectionRef = collection(db, "flowers");


    async function addNewFlower() {
        try {
            const newIndexes = newIndexesStr.split(",");
            const newPalette = newPaletteStr.split(",");
            const newFlower = { indexes: newIndexes, palettes: newPalette, userId: auth.currentUser.uid }
            addDoc(flowersCollectionRef, newFlower);
            getFlowerList();
        } catch (error) {
            console.error(error);
        }
    }

    // async function removeFlower(id) {
    //     try {
    //         const documentReference = doc(flowersCollectionRef, id);
    //         deleteDoc(documentReference);
    //         getFlowerList();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    async function updateFlower(id, property, newValue) {
        try {
            const documentReference = doc(flowersCollectionRef, id);
            const updatedDoc = {}
            updatedDoc[property] = newValue.split(",");
            updateDoc(documentReference, updatedDoc);
            getFlowerList();
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

            setFlowers(filteredData);
        } catch (error) {
            console.error("Error fetching flowers:", error);
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getFlowerList();
                setUserId(user.uid);
            } else {
                setFlowers([]);
            }
        });

        return () => unsubscribe();
    }, []);

    return (userId ?
        <div>
            <div>
                <h1>Add a Flower:</h1>
                <div className="flex flex-col max-w-52">
                    <input type="text" placeholder="Indexes" onChange={(e) => { setNewPaletteStr(e.target.value) }} />
                    <input type="text" placeholder="Palettes" onChange={(e) => { setNewIndexesStr(e.target.value) }} />
                    <button className="bg-blue-300" onClick={addNewFlower}>Set Flower</button>
                </div>
            </div>
            <br></br>
            <hr></hr>
            <div>
                <h1>Flowers</h1>
                <div className="grid grid-cols-4">
                    {flowers.map((flower) => (
                        <>
                            <h2>{flower.indexes}</h2>
                            <h2>{flower.palettes}</h2>
                            <div>
                                <input type="text" placeholder="Indexes" onChange={(e) => setUpdatedIndexesStr(e.target.value)} />
                                <button onClick={() => updateFlower(flower.id, "indexes", updatedIndexesStr)}>Update Indexes</button>
                            </div>
                            <div>
                                <input type="text" placeholder="Palettes" onChange={(e) => setUpdatedPaletteStr(e.target.value)} />
                                <button onClick={() => updateFlower(flower.id, "palettes", updatedPaletteStr)}>Update Indexes</button>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
        : <h1>Not logged in</h1>);
}

export default Flowers;