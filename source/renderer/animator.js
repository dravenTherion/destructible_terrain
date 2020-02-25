class Animator{
    
    constructor(destination, source){
        
        this.setDestination(destination);
        this.source = source;
        
        this.sprites = {};
        this.spriteActive = null;
        this.spriteState = 0;
        
        this.lockRotate = false;
        
    }
    
    // set destination canvas to draw on
    setDestination(destination){
        
        if(destination === undefined)
            return;
        
        this.destination = destination;
        this.context = destination.getContext('2d');
        
    }
    
    // set image source to draw from
    setSource(source){
        
        if(source === undefined)
            return;
        
        this.source = source;
        
    }
    
    // add sprite
    addSprite(name, sprite){
        
        this.sprites[name] = sprite;
        
        if(this.spriteActive === null)
            this.spriteActive = name;
        
    }
    
    // remove sprite
    removeSprite(name){
        
        delete this.sprites[name];
        
    }
    
    getSprite(sprite){
        
        const name = sprite || this.spriteActive;
        
        return this.sprites[name];
    }
    
    // attach object
    attach(object){
        
        this.attachment = object;
        
        this.centerX = object.x + object.width * 0.5;
        this.centerY = object.y + object.height * 0.5;
        
    }
    
    // render animator
    render(){
        
        if(this.attachment === undefined)
            return;
        
        
        const context = this.context,
              attachment = this.attachment,
              rotation = attachment.rotation || 0;
    
        
        this.centerX = attachment.x + attachment.width * 0.5;
        this.centerY = attachment.y + attachment.height * 0.5;
        
        
        const x = this.centerX,
              y = this.centerY,
              key = this.spriteActive;
        
        
        let sprite = Array.isArray(this.sprites[key]) ? this.sprites[key][this.spriteState] : this.sprites[key];
            
        if(sprite.step)
        {
            sprite.step();
            

            context.save();
                
                
            context.translate(x - sprite.frameWidth * 0.5, y - sprite.frameHeight * 0.5);
        
            this.flipSprite(
                            sprite.flipX ? -1 : 1, 
                            sprite.flipY ? -1 : 1, 
                            sprite.transformOffsetX, 
                            sprite.transformOffsetY
                            );
            
            if(!this.lockRotate)
                this.rotateSprite(rotation, sprite.transformOffsetX, sprite.transformOffsetY);
            
            context.drawImage(this.source, sprite.frameOffsetX, sprite.frameOffsetY + sprite.frameHeight * sprite.framesCurr, sprite.frameWidth, sprite.frameHeight, 0, 0, sprite.frameWidth, sprite.frameHeight);
            
            if(!this.lockRotate)
                this.rotateSprite(-rotation, sprite.transformOffsetX, sprite.transformOffsetY);
                
                
            context.restore();
        }      
        
    }
    
    // flip active sprite
    flipSprite(x, y, transformOriginX, transformOriginY){
        
        const context = this.context;
        
        context.translate(transformOriginX, transformOriginY);
        context.scale(x, y);
        context.translate(-transformOriginX, -transformOriginY);
        
    }
    
    // rotate active sprite
    rotateSprite(angle, transformOriginX, transformOriginY){
        
        const context = this.context;
        
        // translate the position to the trnsform origin
        context.translate(transformOriginX, transformOriginY);
        
        // rotate the sprite by angle in radians
        context.rotate(angle * 0.01745329251994329576923690768489);
        
        // revert translated position
        context.translate(-transformOriginX, -transformOriginY);
        
    }
    
    
}

module.exports = Animator;