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
  const [svgBlob, updateSvgBlob] = useState("");

  function convertSvg(text: string){
    updateText(text);
    const result = convertToSvg(text);
    updateSvg(result.svg)
    updateSvgWidth(result.box.right);

    var data = new Blob([result.svg], {type: 'image/svg+xml'});
    var url = window.URL.createObjectURL(data);
    updateSvgBlob(url);
  }

  return (
    <div className="App">

      <div className="logo">
        <h1>not-uml</h1>
        <p>A shorthand for designing UI flows</p>
      </div>

      <textarea value={text} onChange={(e) => convertSvg(e.target.value)}></textarea>
      <div id="instructions">
        <h4>How to</h4>
        <p><b>Views</b> start with "<code>-&gt;</code>"</p>
        <p><b>Actions</b> start with "<code>-</code>"</p>
        <p>Indent actions under the parent view. Indent views under actions when taking the action will lead to the view.</p>
      </div>

      <div className="chart-container">
        <div style={{width: svgWidth + "px"}} dangerouslySetInnerHTML={{ __html: svg }} />
      </div>
      <a title="Download SVG" id="download-button" download="chart.svg" href={svgBlob}><span>Download</span></a>
    </div>
  );
}

export default App;
