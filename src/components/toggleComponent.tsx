import type { IDataState, IToggleProp } from "../definitions/interfaces";

import LightIcon from "../assets/images/ampoule.png";


export default function Toggle(props: IDataState){
    const [name, value] = Object.entries(props);

    console.log(props);
    console.log(name, value);


    return(
        <div className="ds-item"
        // key={"state-" + props.id}
        style={{
            border: "1px solid grey",
            borderRadius: "10px",
            width: "40vw"
        }}>
            <h4
            style={{
                textTransform: "capitalize",
            }}>
                {/* {props.id.replace("_", " - ")} */}
                e
            </h4>
            {/* <img src={LightIcon} className={`${props.id.split('_')[0]} ${props.value ? "active" : ""}`}/> */}
            <img src={LightIcon} className='light'/>
        </div>
    )
}

