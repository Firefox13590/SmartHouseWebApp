import { Link } from "react-router"




export default function Controls() {



    return(
        <>
        <Link to={"/"} className="back2home">&lt; Home</Link>

        <h1>Settings</h1>

        <div id="config">
            <div id="config-alarm" className="input-display">
                <p>Set alarm: </p>

                <div
                style={{
                    display: "flex",
                }}>
                    <div>
                        <input type="radio" name="alarm" id="alarm-on" value="on" />
                        <label htmlFor="alarm-on">On</label>
                    </div>

                    <div>
                        <input type="radio" name="alarm" id="alarm-off" value="off" defaultChecked />
                        <label htmlFor="alarm-off">Off</label>
                    </div>
                </div>
            </div>

            <div id="config-capture-timer" className="input-display">
                <p>Capture data every: </p>

                <div
                style={{
                    display: "flex",
                    gap: "5px",
                }}>
                    <select name="select-hour" id="select-hour" defaultValue={0}>
                        <option value={0}>0</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={4}>4</option>
                        <option value={8}>8</option>
                        <option value={12}>12</option>
                    </select>
                    <label htmlFor="select-hour">h</label>

                    <select name="select-minute" id="select-minute" defaultValue={0}>
                        <option value={0}>0</option>
                        <option value={15}>15</option>
                        <option value={30}>30</option>
                    </select>
                    <label htmlFor="select-minute">min</label>
                </div>
            </div>
        </div>
        </>
    )
}