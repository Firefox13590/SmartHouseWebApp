


export declare interface controlsConfig{
    alarm: boolean,
    dataCaptureTimer: {
        hour: number,
        minute: number
    }
}

export declare class ControlsConfig {
    public alarm: boolean;
    public dataCaptureTimer: { hour: number; minute: number; };

    public constructor(){
        this.alarm = false;
        this.dataCaptureTimer = {hour: 2, minute: 0};
    }
    public constructor(configs: controlsConfig){
        for(const prop in configs){
            this[prop] = configs[prop];
        }
    }
}
