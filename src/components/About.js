import React,{ useState} from 'react'

export default function About() {

     const [myStyle, setMyStyle] = useState(
    {
      color:'white',
      backgroundColor:'black'
    }

)
const [btnText, setBtnText] = useState("Light Mode");

  const togleStyle = ()=>{
  if(myStyle.color === 'white'){
    setMyStyle({
      color:'black',
      backgroundColor:'white',
       border:'2px solid black'
    })
    setBtnText("Dark Mode");
  }
  else{
    setMyStyle({
      color:'white',
      backgroundColor:'black',
    border:'1px solid white'
    })
    setBtnText("Light Mode");
  }
}

  
  return (
    <>
    <div classNameName='container' style={myStyle}>
      <h1 classNameName='my-3'>About Us</h1>
      <div className="accordion accordion-flush" id="accordionFlushExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed"  style={myStyle} pe="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        <b>Accordion Item #1</b>
      </button>
    </h2>
    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the first item’s accordion body.</div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" style={myStyle} pe="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
        <b>Accordion Item #2</b>
      </button>
    </h2>
    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the second item’s accordion body. Let’s imagine this being filled with some actual content.</div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" style={myStyle} pe="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        <b>Accordion Item #3</b>
      </button>
    </h2>
    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the third item’s accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
    </div>
  </div>
</div>

    </div>

       <div>
            <button onClick={togleStyle} className="btn btn-primary my-2">{btnText}</button> 
      </div> 
   </>
  )
}
