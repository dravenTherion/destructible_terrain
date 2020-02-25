const priVars = new WeakMap();

class Sprite{
    
    constructor(frameOffsetX, frameOffsetY, frameWidth, frameHeight, framesMax, framesCurr, transformOffsetX, transformOffsetY, paused, loop, reverse, flipX, flipY){
        
        const priv = {
            framesCurr: framesCurr,
            framesMax: framesMax
        };
        
        priVars.set(this, priv);
                
        this.frameOffsetX = frameOffsetX || 0;
        this.frameOffsetY = frameOffsetY || 0;
                
        this.frameWidth  =  frameWidth || 0;
        this.frameHeight =  frameHeight || 0;
        
        this.transformOffsetX = transformOffsetX || 0;
        this.transformOffsetY = transformOffsetY || 0;
        
        this.paused = paused || paused === undefined ? true : false;
        this.loop = !loop || loop === undefined ? false : true;
        this.reverse = !reverse || reverse === undefined ? false : true;
        
        this.flipX = !flipX || flipX === undefined ? false : true;
        this.flipY = !flipY || flipY === undefined ? false : true;
        
    }
    
    get framesMax(){
        return priVars.get(this).framesMax;
    }
    
    get framesCurr(){
        return priVars.get(this).framesCurr; 
    }
    
    set framesCurr(frame){
    
        if(this.paused)
            return;
        
        const priv = priVars.get(this);
        
        
        if((frame >= priv.framesMax || frame <= 0) && !this.loop)
        {
            if(!this.reverse)
                priv.framesCurr = 0;
            else
                priv.framesCurr = this.framesMax-1;
            
            this.paused = true;
            
            return;
        }
        else
            priv.framesCurr = frame < priv.framesMax && frame > 0 ? frame : frame < 0 ? priv.framesMax - 1 : 0;    
        
    }
    
    step(frames){
        
        const frameStep = frames || 1;
        
        if(!this.reverse)
            this.framesCurr += frameStep;
        else
            this.framesCurr -= frameStep;
        
    }
    
}

module.exports = Sprite;