// Get random Number between 2 values
function _randRange(min, max, isInt) {
    
    let rnd = Math.random() * (max - min + 1) + min;
        
    if(isInt)
        rnd = Math.floor(rnd);
        
    return rnd;
}

module.exports.randRange = _randRange;