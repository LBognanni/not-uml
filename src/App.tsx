import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import { convertToSvg } from "./services/svg";

function App() {

  const [text, updateText] = useState("");
  const [svg, updateSvg] = useState("");
  const [svgWidth, updateSvgWidth] = useState(100);

  function convertSvg(text: string){
    updateText(text);
    const result = convertToSvg(text);
    updateSvg(result.svg)
    updateSvgWidth(result.box.right);
  }

  return (
    <div className="App">


      <textarea value={text} onChange={(e) => convertSvg(e.target.value)}></textarea>

      <div style={{width: svgWidth + "px", overflow: "auto"}} dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
}

export default App;
