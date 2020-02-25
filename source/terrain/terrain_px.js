const {Box} = require('qt-js');

class TerrainPx extends Box{
    
    constructor(x, y, colorData){
        
        super(x, y, 1, 1);
        
        this.radius = 1;
        
        this.isEdge = false;
        this.colorIndex = 0;
        
        this.colorData = colorData;
        
    }
    
}

module.exports = TerrainPx;