const {drawRect} = require('./../../renderer/helpers');

const Manager = require('./manager');


class ObjectManager extends Manager{
    
    // update the objects in the manager
    update(){
        
        const   bounds = this.bounds,
                terrain = this.terrain,
                list = this.list;
        
        let collisions = 0;
        
        
        for(let ctr = 0; ctr < list.length; ctr++)
        {
            const obj = list[ctr].object,
                  objAnimator = list[ctr].animator;
            
            if(obj.x + obj.xSpeed > bounds.width - obj.width || obj.x + obj.xSpeed < 0)
                obj.xSpeed = 0;

            if(obj.airborne)
                obj.ySpeed = obj.ySpeed + obj.weight < obj.ySpeedMax ? obj.ySpeed + obj.weight : obj.ySpeedMax;
            else
                obj.ySpeed = obj.ySpeedMin;
                        
            
            collisions += obj.move(terrain.edgeTree, obj.x + obj.xSpeed, obj.y + obj.ySpeed).count;
            
            
            if(objAnimator)
                objAnimator.render();

            
            if(this.debugMode)
                this.drawDebug(obj);
        }
        
        // return update data
        return {collisions: collisions};
        
    }
    
    // draw the debug rects of the objects in the manager
    drawDebug(obj){
        
        if(this.debugContext)
        {
            const context = this.debugContext;
            
            drawRect(context, obj.x, obj.y, obj.width, obj.height, 'transparent', '#000'); 
                
            drawRect(context, obj.hitboxY.x, obj.hitboxY.y, obj.hitboxY.width, obj.hitboxY.height, 'transparent', '#FF0000', 1);
            drawRect(context, obj.x + obj.width * 0.5, obj.hitboxY.y, 1, obj.hitboxY.height, 'transparent', '#FF0000', 1);
                
            drawRect(context, obj.hitboxX.x, obj.hitboxX.y, obj.hitboxX.width, obj.hitboxX.height, 'transparent', '#0000FF', 1);    
        }
        
    }
    
}

module.exports = ObjectManager;