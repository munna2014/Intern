import { useState } from "react";
import "./App.css";
import About from "./components/About";
import Navbar from "./components/Navbar";
import TextForm from "./components/TextForm";
import Alert from "./components/Alert";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState('light');// Whether dark mode is enabled or not
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type

    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);

    }

  
  const togleMode = () => { 
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#3e4d5a';
      showAlert("Dark mode has been enabled", "success");
      document.title = 'Textutils - Dark Mode';

    }
    else {
      setMode('light');
      document.body.style.backgroundColor = '#ffffffff';
      showAlert("Light mode has been enabled", "success");
      document.title = 'Textutils - Light Mode';
    }
  }
  return (
    <>
    <Router>
       <Navbar title="Textutils"  mode={mode} togleMode={togleMode} aboutText="About-Textutils" />
       <Alert alert={alert}/>
      <div className="container my-3">

        <Routes>

          <Route exact path="/about" element={<About mode={mode}/>} />
      
          <Route exact path="/" element={<TextForm showAlert={showAlert} heading="Enter your text here!" mode={mode} />} />

        </Routes>
        
      </div>
    
    </Router>
     </>
  );
}

export default App;
