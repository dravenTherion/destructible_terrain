class Input{
    
    constructor(name, value, events, callback, args){
        
        this.name = name;
        this.value = value;
                
        this.setEvents(events);
        
        this.callback = callback;
        this.arguments = args;
        
        
        this.isDown = false;
        
    }
    
    
    setEvents(events){    

        this.events = Array.isArray(events) ? events : events.replace(/ /g, '').split(',');
    
    }
    
}

module.exports = Input;