export class CanvasContext {
    staticContext: CanvasRenderingContext2D;
    hybridContext: CanvasRenderingContext2D;
    dynamicContext: CanvasRenderingContext2D;
    
    constructor(staticContext: CanvasRenderingContext2D, hybridContext: CanvasRenderingContext2D, dynamicContext: CanvasRenderingContext2D) {
        this.staticContext = staticContext;
        this.hybridContext = hybridContext;
        this.dynamicContext = dynamicContext;
    }
}