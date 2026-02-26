import { Link } from 'react-router';

import moduleLogo from "../assets/images/cube.png";
import settingsIcon from "../assets/images/settings.png";
import graphIcon from "../assets/images/graph.png";

import './App.css';



function App() {
    return (
        <main className='App'>
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
                <Link to={"/settings"} className='home-link'>
                    <img src={settingsIcon} alt="Settings icon" className='link-icon' />
                    <p>Set settings</p>
                </Link>

                <Link to={"/details"} className='home-link'>
                    <img src={graphIcon} alt="Graph icon" className='link-icon' />
                    <p>See data</p>
                </Link>

                <Link to={"/modules"} className='home-link'>
                    <img src={moduleLogo} alt="Firebase logo" className='link-icon' />
                    <p>See Modules</p>
                </Link>
            </div>
        </main>
    )
}

export default App
