const {randRange} = require('./../../helpers/');

const {Geom} = require('qt-js');

const {drawCirc, drawRect} = require('./../../renderer/helpers');

const {dist2Points, testRect} = require('qt-js');

const Manager = require('./manager');

const Bullet = require('./../bullet/');

class ParticleManager extends Manager{
    
    constructor(bounds, tree, terrain, particleOutputCanvas, debugOutputCanvas){
        
        super(bounds, tree, terrain, debugOutputCanvas);
        
        this.setParticleDestination(particleOutputCanvas);
        
        this.currentIndex = 0;
        
    }
    
    // set destination canvas to draw bullets on
    setParticleDestination(destination){
        
        if(destination === undefined)
            return;
        
        this.canvas = destination;
        this.context = destination.getContext('2d');
        
    }
    
    // initialize bullet pool
    buildPool(number){
                
        const list = this.list;
        
        for(let ctr = 0; ctr < number; ctr++)
        {
            const particle = new Bullet();
            
            particle.radius = 1.5;
            particle.weight = 0.5;
            particle.active = false;
            
            this.add(particle);
        }
        
    }
    
    // get current bullet
    getAvailableParticles(count, color){
        
        const particles = [];
        
        for(let ctr = 0; ctr < count; ctr++)
        {
            let particle = this.list[this.currentIndex].object;
            
            particle.color = color;
            particles.push(particle);
            
            this.currentIndex++;
            this.currentIndex = this.currentIndex >= this.list.length ? 0 : this.currentIndex;
        }
        
        return particles;
        
    }
    
    
    // activate a number of particles
    activateParticles(count, color, x, y, angle, speed, spread, maxCollisions){
        
        const particles = this.getAvailableParticles(count, color),
              colors = color.replace(/ /g, '').split('|');
              
        
        
        for(let ctr = 0, ctrColor = 0; ctr < particles.length; ctr++)
        {
            let particle = particles[ctr],
                newAngle = angle + (90 - angle) * 2 + randRange(-spread, spread),
                speedRange = randRange(15, 25) * 0.01,
                vectors = Geom.vector(speed * speedRange, newAngle);
            
            particle.color = colors[ctrColor];
            ctrColor = ctrColor == colors.length ? 0 : ctrColor + 1;
            
            particle.xSpeed = vectors.x;
            particle.ySpeed = -vectors.y;
            
            particle.x = x + particle.xSpeed;
            particle.y = y + particle.ySpeed;
            
            particle.maxCollisions = maxCollisions;
            particle.collisions = 0;
            
            particle.active = true;
            
        }
        
        
    }
    
    
    // update the bullets in the manager
    update(){
        
        const bounds = this.bounds,
              terrain = this.terrain,
              edgeTree = terrain.edgeTree,
              context = this.context,
              particles = this.list;
        
        let collisions = 0;
        
        for(let ctr = 0; ctr < particles.length; ctr++)
        {
            
            const particle = particles[ctr].object,
                  color = particle.color;
            
            if(particle.active)
            {   
                const x = particle.x,
                      y = particle.y, 
                      hit = particle.move(x + particle.xSpeed, y + (particle.ySpeed += particle.weight), edgeTree);
                
                if(hit !== null)
                {   
                    particle.x = hit.x;
                    particle.y = hit.y;
                    
                    if(particle.collisions >= particle.maxCollisions)
                        particle.active = false;
                    else
                    {
                        let angle = particle.rotation,
                            speed = Math.sqrt(particle.xSpeed * particle.xSpeed + particle.ySpeed * particle.ySpeed),
                            newAngle = angle + (90 - angle) * 2,
                            speedRange = randRange(15, 25) * 0.01,
                            vectors = Geom.vector(speed * speedRange, newAngle);
                        
                        if((vectors.y > 0 && y < hit.y) || (vectors.y < 0 && y > hit.y))
                            vectors.y = 2;
                        
                        
                        particle.xSpeed = x > hit.x ? vectors.x : -vectors.x;
                        particle.ySpeed = y > hit.y ? vectors.y : -vectors.y;
                        
                        particle.x += particle.xSpeed;
                        particle.y += particle.ySpeed;
                        
                    }
                    
                    collisions++;
                }
                else if(!testRect(particle, bounds))
                {
                    particle.active = false; 
                }
                else
                {
                    context.lineWidth = 2;
                    context.strokeStyle = particle.color;
                    
                    context.beginPath();
                    context.moveTo(x, y);
                    context.lineTo(particle.x, particle.y);
                    context.closePath();
                    
                    context.stroke();
                    
                    //drawCirc(context, particle.x, particle.y, particle.radius * 1.5, particle.color); 
                }
                
                if(this.debugMode)
                    this.drawDebug(particle);
            }
        }
        
        return {collisions: collisions};
        
    }
    
}


module.exports = ParticleManager;