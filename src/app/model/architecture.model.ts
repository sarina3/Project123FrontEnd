export class Architecture {
    header?: string;
    id: number;
    trainPercentage?: number;
    testPercentage?: number;
    accuracy?: number;
    networkType?: string;
    trainDatasetName?: string;
    testDatasetName?: string;
    numberOfLayers?: number;
    layers:LayerInfo[];
}

export class LayerInfo{
    kernelSizeX?: number;
    kernelSizeY?: number;
    inputSizeY?: number;
    inputSizeX?: number;
    number?:number;
}
