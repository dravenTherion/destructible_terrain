let lastCalledTime = 0,
    fpsTotal = [],
    delta = 0;

function renderFps()
{    
    if(!lastCalledTime) {
        lastCalledTime = Date.now();
        fpsTotal = [0];
    }
    else
    {
        delta = (Date.now() - lastCalledTime)/1000;

        lastCalledTime = Date.now();
        fpsTotal.push(1/delta);
            
        if(fpsTotal.length > 50)
            fpsTotal.shift();
    }
        
    
    return Math.round(fpsTotal.reduce((total, num)=>{return total + num;}) / fpsTotal.length);    
}

module.exports = renderFps;