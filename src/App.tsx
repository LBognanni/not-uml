import React, { useState } from "react";
import './App.css';
import { convertToSvg } from "./services/svg";

function App() {

  const [text, updateText] = useState(`What they see
- What they do
 -> What they see next
  - What they do next
`);
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

      <div className="logo">
        <h1>not-uml</h1>
        <p>A shorthand for designing UI flows</p>
      </div>

      <textarea value={text} onChange={(e) => convertSvg(e.target.value)}></textarea>

      <div className="chart-container">
        <div style={{width: svgWidth + "px"}} dangerouslySetInnerHTML={{ __html: svg }} />
      </div>
    </div>
  );
}

export default App;
