import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!#$%&'()*+,-./:;<=>?@[]^_`{|}~";

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(passwordGenerator, [
    length,
    numberAllowed,
    charAllowed,
    passwordGenerator,
  ]);

  return (
    <div className="bg-black h-screen w-full">
      <h1 className="font-bold text-3xl text-center pt-5 text-white">
        Password Generator
      </h1>
      <div className="w-full max-w-md h-fit pb-5 mx-auto shadow-md rounded-lg bg-slate-700 mt-20 px-4">
        <div className="flex gap-2 overflow-hidden h-fit w-full">
          <input
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            className="outline-none w-full rounded-lg py-1 px-3 mt-5 text-orange-500"
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 px-3 rounded-lg font-medium text-white mt-5 py-1 hover:bg-blue-800"
          >
            copy
          </button>
        </div>
        <div className="mt-5">
          <div className="text-orange-500 flex gap-1">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setlength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="text-orange-500 flex gap-1">
            <input
              type="checkbox"
              value={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label>Number Allowed</label>
          </div>
          <div className="text-orange-500 flex gap-1">
            <input
              type="checkbox"
              value={numberAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label>Special Character Allowed</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
