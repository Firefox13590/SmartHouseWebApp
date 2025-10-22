import { Link } from 'react-router';

import firebaseLogo from "../assets/images/firebase.webp";
import settingsIcon from "../assets/images/settings.png";
import graphIcon from "../assets/images/graph.png";

import '../assets/styles/App.css';



function App() {
  return (
    <>
    <h1>Smart House Web App</h1>

    <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "100px",

      marginTop: "100px",
    }}>
      <Link to={"/controls"} className='home-link'>
        <img src={settingsIcon} alt="Settings icon" className='link-icon dark'/>
        <p>Set settings</p>
      </Link>

      <Link to={"/details"} className='home-link'>
        <img src={graphIcon} alt="Graph icon" className='link-icon dark'/>
        <p>See graphs</p>
      </Link>

      <Link to={"/assistant"} className='home-link'>
        <img src={firebaseLogo} alt="Firebase logo" className='link-icon'/>
        <p>Open Assistant</p>
      </Link>
    </div>
    </>
  )
}

export default App
