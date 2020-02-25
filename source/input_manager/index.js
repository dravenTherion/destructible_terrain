const Input = require('./input');

class InputManager{
    
    constructor(inputs, attachment){
        
        this.addInputs(inputs);
        this.attach(attachment);        
        
        const handler = (event)=>{
            
            let input = this.inputs[event.button !== undefined ? event.button : event.keyCode];
            
            if(input){
                
                input.isDown = event.type.toLowerCase().indexOf('down') != -1 ? true : false;
                
                if(input.events.indexOf(event.type) != -1){
                    
                    // if a callback is manually set, use it
                    // otherwise look for a method in the manager with the same name as the input and use it instead
                    const callback = input.callback ? input.callback : this[input.name];
                     
                    if(callback)
                        callback.call(this, input, event, ...(input.arguments ? input.arguments : []));
                
                }
                
            }
            
        }
        
        window.addEventListener('click', handler);
        window.addEventListener('mouseup', handler);
        window.addEventListener('mousedown', handler);
        window.addEventListener('contextmenu', handler);
        
        window.addEventListener('keypress', handler);
        window.addEventListener('keyup', handler);
        window.addEventListener('keydown', handler);
        
    }
    
    // attach inputs to this manager
    addInputs(){        
    
        if(!arguments.length || arguments[0] === undefined)
            return;
        
        if(!this.inputs)
            this.inputs = {};
        
        for(let ctr = 0; ctr < arguments.length; ctr++)
            if(arguments[ctr] instanceof Input){
                
                let input = arguments[ctr];
                
                this.inputs[input.value] = input;
                
            }
        
    }
    
    // get input by name
    getInput(name){
        
        for(let key in this.inputs){
            
            let input = this.inputs[key];
            
            if(input.name === name)
                return input;
        }
        
    }

    // get input by name
    removeInput(name){
        
        let deleted = false;
        
        for(let key in this.inputs){
            
            let input = this.inputs[key];
            
            if(input.name === name)
            {    
                delete this.inputs[key];
                deleted = true;
                break;
            }
        }
        
        return deleted;
        
    }
    
    // attach object to this manager
    attach(attachment){
        
        if(attachment === undefined)
            return;
        
        this.attachment = attachment;
    }
    
}

module.exports = InputManager;