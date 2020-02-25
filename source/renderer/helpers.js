// rendering
    
    function _drawRect(dest, x, y, width, height, fillColor, strokeColor, lineWidth){
        
        const destination = dest || _worldCTX;
        
        if(fillColor)
            destination.fillStyle = fillColor;
        
        destination.fillRect(x, y, width, height);
        
        if(strokeColor)
        {
            destination.strokeStyle = strokeColor;
            destination.lineWidth = lineWidth || 1;
            destination.strokeRect(x, y, width, height);
        }
    }
    
    function _drawCirc(dest, x, y, radius, fillColor, strokeColor, lineWidth){
        
        const destination = dest || _worldCTX;
        
        destination.beginPath();
        destination.arc(x, y, radius, 0, 2 * Math.PI, false);
        
        if(fillColor)
            destination.fillStyle = fillColor;
        
        destination.fill();
        
        if(strokeColor)
        {
            destination.strokeStyle = strokeColor;
            destination.lineWidth = lineWidth || 1;
            destination.stroke();
        }
        
        destination.closePath();
    }
    


module.exports.drawRect = _drawRect;
module.exports.drawCirc = _drawCirc;