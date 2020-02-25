const {drawCirc, drawRect} = require('./../../renderer/helpers');

class Manager{
    
    constructor(bounds, tree, terrain, debugDestination){
        
        this.setBounds(bounds);
        this.setTree(tree);
        this.setTerrain(terrain);
        this.setDebugDestination(debugDestination);
        
        this.list = [];
        
        this.debugMode = false;
        
    }
    
    // set bounds where the object can move in
    setBounds(bounds){
        
        this.bounds = bounds;
        
    }
    
    // set the collision tree
    setTree(tree){
        
        this.tree = tree;
    
    }
    
    // set terrain
    setTerrain(terrain){
        
        this.terrain = terrain;
        
    }
        
    // set debug output canvas
    setDebugDestination(debugDestination){
        
        if(!debugDestination)
            return;
            
        this.debugDestination = debugDestination;
        this.debugContext = this.debugDestination.getContext('2d');
    }
    
    // add a new object to the manager
    add(object, animator){
        
        this.list.push({object: object, animator: animator});
        
    }
    
    // update the objects in the manager
    update(){
        
        // code here...
        
    }
    
    // draw the debug info the manager
    drawDebug(obj, color){
    
        if(this.debugContext)
        {
            const context = this.debugContext;
            
            drawRect(context, obj.x, obj.y, obj.width, obj.height, 'transparent', color || '#FF0000'); 
        }
        
    }
    
}

module.exports = Manager;