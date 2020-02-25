const {Geom, Circ, Point, testCirc} = require('qt-js');

class Bullet extends Circ{
    
    constructor(x, y, radius, weight, damageRadius, maxCollisions){
                
        let bulRadius = radius || 5,
            dmgRadius = damageRadius || bulRadius,
            bulWeight = weight || 0;
    
        super(x - bulRadius, y - bulRadius, bulRadius);
        
        // set speed parameters
        this.xSpeed = 0;
        this.ySpeed = 0;
        
        this.weight = bulWeight;
        
        // set position parameters
        this.rotation = 0;
        
        // set damage parameters
        this.damageRadius = dmgRadius;
        this.color = null;
        
        // set status
        this.active = false;
        this.visible = true;
        this.maxCollisions = maxCollisions || 0;
        this.collisions = 0;
        
    }
    
    // check if bullet path has collided with an object within a tree
    hitTest(newX, newY, tree){
        
        let collider,
            hitStatus   = false,
            
            dist = Geom.dist2Points(this.x, this.y, newX, newY),
        
            stepCount = Math.ceil(dist / this.radius),
            
            stepX = (this.radius / dist) * this.xSpeed,
            stepY = (this.radius / dist) * this.ySpeed;
                    
        const tmpRect = new Geom.circ(this.x, this.y, this.radius);
        
        for(let ctr = 0; ctr < stepCount; ctr++)
        {
            const colliders = []; 
            
            tree.retrieve(colliders, tmpRect);

            for(let ctr = 0; ctr < colliders.length; ctr++)
            {
                collider = colliders[ctr];
                
                collider.radius = 0.5;

                if(collider.isEdge)
                    if(testCirc(tmpRect, collider))
                    {
                        hitStatus = true;
                        break;
                    }
            }
            
            tmpRect.x += stepX;
            tmpRect.y += stepY;
            
            if(hitStatus)
            {
                this.collisions = this.collisions >= this.maxCollisions ? this.maxCollisions : this.collisions + 1;
                break;
            }
        }
        
        return hitStatus ? tmpRect : null;   
    }
    
    // dealDamage
    dealDamage(terrain){
        
        const hole = this.damageRadius * 0.65,
              edgePixels = terrain.punchHole((this.x + this.radius) - this.damageRadius, (this.y + this.radius) - this.damageRadius, this.damageRadius, 'foreground', true);
        
        if(terrain.getLayer('background'))
            terrain.punchHole((this.x + this.radius) - hole, (this.y + this.radius) - hole, hole, 'background');
        
        if(this.damageRadius > this.radius && this.collisions < this.maxCollisions)
            this.damageRadius -= (this.damageRadius - this.radius) * (this.collisions / this.maxCollisions) * 0.5;
        
        
        return edgePixels;
    }
    
    // move bullet across space
    move(newX, newY, tree){
        
        let hit = this.hitTest(newX, newY, tree);
        
        this.rotation = Geom.angle(newX - this.x, newY - this.y);
        
        this.x = newX;
        this.y = newY;
        
        return hit;

    }
    
}


module.exports = Bullet;