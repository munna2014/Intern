import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase!", "success");
  };
  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lowercase!", "success");
  };
  const handleClearClick = () => {
    let newText = "";
    setText(newText);
    props.showAlert("Text Cleared!", "success");
  };
  const handleCoChange = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("Copied to Clipboard!", "success");
  };

  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra spaces removed!", "success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <div className="container" style={{
              backgroundColor: props.mode === "dark" ? '#3e4d5a' : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "dark" ? "white" : "white",
              color: props.mode === "dark" ? "black" : "black",
              borderWidth: '4px',
            }}
            id="myBox"
            rows="6"
            
          />
        </div>
        <button disabled={text.length===0} className="btn btn-success my-1 mx-2" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button disabled={text.length===0} className="btn btn-success my-1 mx-2" onClick={handleLoClick}>
          Convert to Lowercase
        </button>
        <button disabled={text.length===0} className="btn btn-success my-1 mx-2" onClick={handleClearClick}>
          Clear
        </button>
        <button disabled={text.length===0} className="btn btn-success my-1 mx-2" onClick={handleCoChange}>
          Copy
        </button>
        <button disabled={text.length===0} className="btn btn-success my-1 mx-2" onClick={handleExtraSpaces}>
          Remove Extra Spaces
        </button>
      </div>

      <div className="container my-2" style={{
              backgroundColor: props.mode === "dark" ? '#3e4d5a' : "white",
              color: props.mode === "dark" ? "white" : "black",
            }}>
        <h2>Your text summary</h2>
        <p>
          {" "}
          {text.split(/\s+/).filter((element) => {
            return element.length !== 0;
          }).length} words and {text.length} characters!
        </p>
        <p>Preview</p>
        <p>{text.length > 0 ? text : "Write something to preview!"}</p>
      </div>
    </>
  );
}
