const {QT, Box, Circ, testCirc} = require('qt-js');
const {drawCirc} = require('./../renderer/helpers');

const TerrainPx = require('./terrain_px');

const priVars = new WeakMap();


class Terrain{
    
    constructor(width, height){
        
        this.width = width;
        this.height = height;
        
        this.bounds = new Box(0, 0, width, height);
        
        // contains all pixels of the terrain
        this.masterTree = new QT.node(0, this.bounds);
        
        // contains all edge pixels of the terrain
        this.edgeTree = new QT.node(0, this.bounds);
                        
        
        // terrain layers
        const priv = {
            layers: {},
            count: 0
        }
        
        priVars.set(this, priv); 
        
    }
    
    // build terrain data from image
    buildFromImage(canvas, image, layerName, buildNewTree){
        
        const name = layerName || 'layer_' + this.totalLayers;
        
        this.addLayer(canvas, name);
        
        
        const layer = this.getLayer(name),
              context = layer.context;
        
        context.drawImage(image, 0, this.height - image.height);
        
        const buildTree = buildNewTree ? true : false;
        
        if(buildTree)
        {        
            this.masterTree.clear();
            this.edgeTree.clear();
            
            const data = context.getImageData(0, 0, this.width, this.height).data,
                  size = 1;

            for(let y = 0; y < this.height; y+=size)
                for(let x = 0; x < this.width; x+=size)
                {
                    let index = (y * this.width + x) * 4;

                    if(data[index + 3])
                    {
                        let px = new TerrainPx(x, y, [data[index], data[index + 1], data[index + 2], data[index + 3]]);

                        px.colorIndex = index;

                        this.masterTree.insert(px);                                        


                        // if any of the pixels around the current pixel is transparent, mark it as edge
                        let alphaCount = this.checkIfPixelIsEdge(x, y, data);

                        if(alphaCount > 0)
                        {                        
                            px.isEdge = true;                        
                            this.edgeTree.insert(px);
                        }

                    }

                }

            //context.putImageData(this.imageData, 0, 0);
        }
        
    }
    
    // add terrain layer
    addLayer(canvas, layerName){
        
        const layers = priVars.get(this),
              name = layerName || 'layer_' + layers.count;
        
        layers.count++;
        
        layers.layers[name] = {
                                canvas: canvas, 
                                context: canvas.getContext('2d')
                            };        
    }
    
    // add terrain layer
    removeLayer(layerName){
        
        const layers = priVars.get(this);
        
        layers.count--;
        
        delete layers.layers[layerName];
    
    }
    
    // get terrain layer
    getLayer(layerName){
        
        const layers = priVars.get(this);
        
        return layers.layers[layerName];
        
    }

    // get total layers
    get totalLayers(){
        
        const layers = priVars.get(this);
        
        return layers.count;
        
    }
    
    // punch a hole in the terrain and update the edge tree
    punchHole(x, y, radius, layerName, updateTree){
        
        const name = layerName || 'layer_0',
              layer = this.getLayer(name), 
              context = layer.context,
              
              holeDraw = new Circ(x+2, y+2, radius-2),
              
              // pixels at the ege of the punched hole
              // if updateTree is set to false, returned value will be null
              edgePixels = [];
        
        
        // draw hole
        const comp = context.globalCompositeOperation;
    
        context.globalCompositeOperation = 'destination-out';
        drawCirc(context, holeDraw.x + holeDraw.radius, holeDraw.y + holeDraw.radius, holeDraw.radius, 'black');
        context.globalCompositeOperation = comp;
        
        
        if(updateTree === true)
        {
            
            const data = context.getImageData(0, 0, this.width, this.height).data,
                  holeSelect = new Circ(x, y, radius),

                  // pixels within the hole quadrant
                  terrainPixels = [];


            this.masterTree.retrieve(terrainPixels, holeSelect);

            for(let ctr = terrainPixels.length - 1; ctr >= 0; ctr--)
            {
                let terrainPixel = terrainPixels[ ctr ];

                if(testCirc(holeDraw, terrainPixel))
                {   
                    terrainPixel.colorData[3] = 0;

                    data[terrainPixel.colorIndex + 3] = terrainPixel.colorData[3];

                    terrainPixel.isEdge = false;

                    //terrainPixels[ctr] = null;
                    //terrainPixels.splice(ctr, 1);
                    /**/
                }                
            }

            for(let ctr = terrainPixels.length - 1; ctr >= 0; ctr--)
            {
                let terrainPixel = terrainPixels[ ctr ],
                    x = terrainPixel.x,
                    y = terrainPixel.y;

                if(data[terrainPixel.colorIndex + 3] > 0)
                {                                
                    // if any of the pixels around the current pixel is transparent, mark it as edge
                    let alphaCount = this.checkIfPixelIsEdge(x, y, data);

                    if(alphaCount > 0)
                    {
                        if(!terrainPixel.isEdge)
                        {
                            terrainPixel.isEdge = true;

                            this.edgeTree.insert(terrainPixel);

                            edgePixels.push(terrainPixel);

                            data[terrainPixel.colorIndex + 3] = terrainPixel.colorData[3];
                        }
                    }
                }
            }

        }
        
        return edgePixels.length ? edgePixels : null;
    }
        
    // check if pixel at coordinate is an edge pixel
    checkIfPixelIsEdge(x, y, dataArray){
        
        const xCurr = x,
              yCurr = y,
            
              size = 1;
        
        
        const data = dataArray;
        
        let alphaCount = 0;
        
        for(let y = yCurr - size; y <= yCurr + size; y+=size)
            for(let x = xCurr - size; x <= xCurr + size; x+=size)
            {  
                if((y !== yCurr || x !== xCurr))
                {
                    if(!data[((y * this.width + x) * 4) + 3])
                        alphaCount++;
                }
            }
    
        return alphaCount;
    
    }
    
}

module.exports = Terrain;