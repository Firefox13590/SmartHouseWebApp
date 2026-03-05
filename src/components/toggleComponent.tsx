import type { IToggleProp } from "../definitions/interfaces";

import './toggleComponent.css'


export default function Toggle(props: IToggleProp) {
    // console.log(props);
    const sliderId = 'cc-slider_' + props.name.replace('_', '-');


    return (
        <div className="ds-item">
            <h4>
                {props.name.replace("_", " - ")}
            </h4>
            {/* <img
                src={LightIcon}
                className={`${props.name.split("_")[0]} ${props.value ? "active" : ""}`}
            /> */}
            <input type="checkbox" name={sliderId} id={sliderId} defaultChecked={props.value} />
            <label htmlFor={sliderId} className="slider-container">
                <div className="slider"></div>
            </label>
        </div>
    )
}

