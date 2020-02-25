const {Geom, Box, testRect} = require('qt-js');

class Character extends Box{
    
    constructor(x, y, width, height, xSpeedMin, xSpeedMax, ySpeedMin, ySpeedMax, xAccel, yAccel, weight){
        
        super(x, y, width, height);
        
        // set X hitbox to helf the height of the character
        this.hitboxX = new Box(x, y, width, height * 0.65); 
        
        // set Y hitbox to half the width of the character and then center it
        this.hitboxY = new Box(x, y, width * 0.75, height);
        this.hitboxY.x = this.width * 0.5 - this.hitboxY.width * 0.5;
        
        // set movement parameters
        this.weight = weight || 2;
        
        this.xSpeed = 0;
        this.ySpeed = 0;
        
        this.xSpeedMin = xSpeedMin || 5;
        this.ySpeedMin = ySpeedMin || 10;
        
        this.xSpeedMax = xSpeedMax || 0;
        this.ySpeedMax = ySpeedMax || 0;
        
        this.xAccel = xAccel || 0;
        this.yAccel = yAccel || 0;
        
        this.heightTreshold = 35;
        this.angleThreshold = 65;
        
        // position parameters
        this.angleLook = 0;
        this.angleStand = 0;
        
        this.armLength = 30;
        this.armElevation = 30;
        
        // set status
        this.active = true;
        this.direction = 1;
        
        this.canMove = true;
        
        this.airborne = true;
        this.hasJumped = false;
        
        this.isShooting = false;
        this.canShoot = true;
        
    }
    
    // get character bounds
    bounds(){
        return {
                x: this.x, 
                y: this.y, 
                width: this.width, 
                height: this.height,
                left: this.x,
                right: this.x + this.width,
                top: this.y,
                bottom: this.y + this.height
                }
    }
    
    // move character hit boxes
    moveHitBox(x, y){
        
        this.hitboxX.x = x;
        this.hitboxX.y = this.y;
        
        this.hitboxY.x = x + this.width * 0.5 - this.hitboxY.width * 0.5;
        this.hitboxY.y = y;
        
    }
    
    // check if character has collided with terrain
    terrainHitTest(collideList){
        
        let leftMost = new Geom.point(),
            rightMost = new Geom.point(),
            topMost = new Geom.point(),
            bottomMost = new Geom.point(),
            angle = 0;

        let init    = false,
            yDist   = NaN,
            xDist   = NaN;
        
        let hNearest = null,
            vNearest = null;
        
        let sides = {
                        left: false,
                        top: false,
                        right: false,
                        bottom: false
                   };
        
        let hitCount = 0;
    
        
        for(let ctr = collideList.length-1; ctr >= 0; ctr--)
        {
            let collider = collideList[ctr];
            
            if(collider.isEdge)
            {
                if(testRect(this.hitboxY, collider))
                {
                    if(!init)
                    {
                        // initialize the leftmost, topmost, rightmost and bottommost colliders to the first successful hit
                        
                        init = true;
                        
                        bottomMost.x = topMost.x = rightMost.x = leftMost.x = collider.x;
                        bottomMost.y = topMost.y = rightMost.y = leftMost.y = collider.y;
                    }
                    else
                    {    
                        // if the current collider is further to the left compared to the current leftmost collider, replace it with the current collider                         
                        if(collider.x <= leftMost.x)
                        {
                            leftMost.x = collider.x;
                            leftMost.y = collider.y;
                        }
                        
                        // if the current collider is further to the right compared to the current rightmost collider, replace it with the current collider
                        if(collider.x >= rightMost.x)
                        {
                            rightMost.x = collider.x;
                            rightMost.y = collider.y;
                        }
                        
                        // if the current collider is further to the top compared to the current topmost collider, replace it with the current collider
                        if(collider.y <= topMost.y)
                        {
                            topMost.x = collider.x;
                            topMost.y = collider.y;
                        }
                        
                        // if the current collider is further to the bottom compared to the current bottommost collider, replace it with the current collider
                        if(collider.y >= bottomMost.y)
                        {
                            bottomMost.x = collider.x;
                            bottomMost.y = collider.y;
                        }
                    }
                    
                    
                    // get the y distance of the current collider to the center of this object
                    let tmpDist = Math.floor((collider.y + collider.height * 0.5) - (this.y + this.height * 0.5));
                    
                    // if the current collider's distance is less than the previous distance
                    // or if the previous is not a number, replace the previous distance with the current
                    if(Math.abs(tmpDist) < Math.abs(yDist) || isNaN(yDist))
                    {
                        yDist     = tmpDist;
                        vNearest  = collider;
                    }
                
                    if(yDist < 0)
                        sides.top = true;
                    else
                        sides.bottom = true;
            
                    
                    hitCount++;
                }
            

                if(testRect(this.hitboxX, collider))
                {
                    // get the x distance of the current collider to the center of this object
                    let tmpDist = Math.floor((collider.x + collider.width * 0.5) - (this.x + this.width * 0.5));
                    
                    // if the current collider's distance is less than the previous distance
                    // or if the previous is not a number, replace the previous distance with the current
                    if(Math.abs(tmpDist) < Math.abs(xDist) || isNaN(xDist))
                    {
                        xDist      = tmpDist;
                        hNearest   = collider;
                    }

                    if(xDist < 0)
                        sides.left = true;
                    else
                        sides.right = true;
                    
                    
                    hitCount++;
                }
            }
        }
        
        
        this.angleStand = angle = Geom.angle(rightMost.x - leftMost.x, rightMost.y - leftMost.y);
        
        return {
                sides: sides,                               // which sides have collided
                hNearest: hNearest,                         // nearest collider on either left or right
                vNearest: vNearest,                         // nearest collider on either top or bottom
                angle: angle,                               // angle of the surface hit for the yHitbox
                hDist: Math.abs(rightMost.x - leftMost.x),  // horizontal distance of the leftmost and rightmost colliders for yHitbox
                vDist: Math.abs(bottomMost.y - topMost.y),  // vertical distance of the leftmost and rightmost colliders for yHitbox
                count: hitCount                             // number of collisions    
                };
        
    }
    
    // move character along a terrain tree
    move(tree, newX, newY){
        
        const collideBounds = this.bounds();
            
        if(this.ySpeed > 0)
            collideBounds.height += this.ySpeed;
            
        
        const collideList = [];
        
        tree.retrieve(collideList, collideBounds);
                        
        this.moveHitBox(newX, newY);
            
        const hit = this.terrainHitTest(collideList),
              isAngleValid = (this.xSpeed >= 0 && hit.angle > -this.angleThreshold) || (this.xSpeed <= 0 && hit.angle < this.angleThreshold); 
        
            
        if((hit.vDist < this.heightTreshold || this.airborne) && isAngleValid)
        {    
            if(!hit.sides.top && !hit.sides.bottom)
            {
                this.airborne = true;
                this.y = newY;
            }
            else
            {
                if(hit.sides.bottom && !hit.sides.top)
                {
                    this.airborne = false;
                    this.y = hit.vNearest.y - this.height;                    
                }
                else if(hit.sides.top && !hit.sides.bottom)
                {
                    let tmpY = hit.vNearest.y + hit.vNearest.height;
                    
                    this.ySpeed = 10;
                
                    if(tmpY <= this.y || hit.vDist < 13)
                        this.y = tmpY;
                }
                else
                    this.airborne = false;
            }
          
            if(!hit.sides.left && !hit.sides.right)
                this.x = newX;
            else if(!this.airborne && this.xSpeed !== 0)
            {   
                if(hit.sides.right && !hit.sides.left)
                    this.x = hit.hNearest.x - this.width;
                else if(hit.sides.left && !hit.sides.right)
                    this.x = hit.hNearest.x + hit.hNearest.width;    
            }
        }
        else if(hit.sides.bottom && !hit.sides.top)
            this.airborne = false;
            
        
        if((hit.vDist < 25 || this.airborne) && isAngleValid && !hit.sides.left && !hit.sides.right)
            this.canMove = true;
        else
            this.canMove = false;
        
        
        return hit;
        
    }
    
}

module.exports = Character;