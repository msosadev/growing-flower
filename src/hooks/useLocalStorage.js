import { useState } from "react";

/**
 * Custom hook to manage localStorage values.
 * @param {string} key - The key for the localStorage item.
 * @param {*} initialValue - The initial value to use if no value is in localStorage.
 * @returns {[any, function]} - Returns the current value and a function to update it.
 */
function useLocalStorage(key, initialValue) {
  // Get the initial value from localStorage or fallback to the initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  /**
   * Function to update the value in both state and localStorage.
   * @param {*} value - The new value to store.
   */
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Error setting localStorage key:", key, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;

// Usage Example
// import useLocalStorage from './useLocalStorage';
//
// function App() {
//   const [name, setName] = useLocalStorage('name', '');
//
//   return (
//     <div>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Enter your name"
//       />
//       <p>Hello, {name}!</p>
//     </div>
//   );
// }
