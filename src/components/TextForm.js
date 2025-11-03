import React, { useState }from 'react'

export default function TextForm(props) {

  const [text, setText] = useState('');

  const handleUpClick = ()=>{
    let newText = text.toUpperCase();
    setText(newText)
  }
  const handleLoClick = ()=>{
    let newText = text.toLowerCase();
    setText(newText)
  }
  const handleClearClick = ()=>{
    let newText = '';
    setText(newText)
  }
  const handleCoChange = ()=>{
    navigator.clipboard.writeText(text);
  }

  const handleExtraSpaces = ()=>{
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "))
  }

const handleOnChange = (event)=>{
  setText(event.target.value);
}

  return (
    <>
    <div className='container'>
        <h1>{props.heading}</h1>
      <div className="mb-3">
  <textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="6"/>
     </div>
  <button className="btn btn-primary mx-2" onClick={handleUpClick}>Convert to Uppercase</button>
  <button className="btn btn-primary mx-2" onClick={handleLoClick}>Convert to Lowercase</button>
  <button className="btn btn-primary mx-2" onClick={handleClearClick}>Clear</button>
  <button className="btn btn-primary mx-2" onClick={handleCoChange}>Copy</button>
  <button className="btn btn-primary mx-2" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
    </div>

    <div className="container my-2">
      <h2>Your text summary</h2>
      <p> {text.split(" ").length} words and {text.length} characters!</p>
      <p>Preview</p>
      <p>{text}</p>
    </div>
    </>
  )
}
