const {randRange} = require('./../../helpers/');

const {Geom} = require('qt-js');

const Bullet = require('./../bullet');

const InputManager = require('./../../input_manager/');
const Input = require('./../../input_manager/input');


class PlayerInput extends InputManager{
    
    constructor(inputs, player){
        
        super(inputs, player);  
        
        this.mouseX = window.innerWidth;
        this.mouseY = window.innerHeight;
        
        this.lookUpThreshold = -60;
        this.lookDownThreshold = 55;
        
        this.angleLock = false;
        
        const handler = (event)=>{
                        
            if(this.attachment !== undefined)
            {
                
                const player = this.attachment,
                      centerX = player.x + player.width * 0.5,
                      centerY = player.y + player.height * 0.5 - player.armElevation,
                      
                      lookUpThreshold = this.lookUpThreshold,
                      lookDownThreshold = this.lookDownThreshold,
                      
                      x = this.mouseX,
                      y = this.mouseY;
                
                
                player.direction = x < player.x + player.width * 0.5 ? -1 : 1;  
                
                
                let angleLook = player.direction * (player.direction > 0 ? Geom.angle(x - centerX, y - centerY) : Geom.angle(centerX - x, centerY - y));
                       
                angleLook = angleLook < lookUpThreshold ? lookUpThreshold : angleLook > lookDownThreshold ? lookDownThreshold : angleLook;
                
                
                if(angleLook !== player.angleLook && !this.angleLock)
                {
                    TweenMax.killTweensOf(player);
                    TweenMax.to(player, 0.15, {angleLook: angleLook, ease: Cubic.easeOut});   
                }
                
            }
            
        }
        
        
        TweenMax.ticker.addEventListener('tick', handler);
        
        window.addEventListener('mousemove', (event)=>{
            
            this.mouseX = event.pageX;
            this.mouseY = event.pageY;
            
        });
    
    }
        
    // move left
    moveLeft(input){
        
        const player = this.attachment;
        player.xSpeed = input.isDown ? -5 : 0;
        
    }

    // move right
    moveRight(input){
        
        const player = this.attachment;
        player.xSpeed = input.isDown ? 5 : 0;
        
    }

    // jump
    jump(input){
        
        const attachment = this.attachment;
        
        if(!attachment.airborne && !attachment.hasJumped)
        {
            attachment.hasJumped = true;
            attachment.airborne = true;
            attachment.ySpeed = -30;
        }
        else if(!input.isDown)
        {
            attachment.hasJumped = false;
        }
        
    }

    // attack
    attack(input, event, bulletManager){
        
        if(!this.attachment.canShoot)
            return;
        
        const player = this.attachment,              
              force = 30,
              spread = randRange(-1, 1),
        
              eX = event.pageX,
              eY = event.pageY,
             
              angle =  this.attackAngle + spread,
              
              armVectors = Geom.vector(player.armLength, angle - (player.direction * 5)),
              
              origin = new Geom.point(
                                        player.x + player.width * 0.5 + armVectors.x - (player.direction * 10), 
                                        (player.y + player.height * 0.5) + armVectors.y - player.armElevation - 2
                                    ),
              
              target = new Geom.point(eX, eY),              
              vectors = Geom.vector(force, angle),
              
              item = bulletManager.getAvailableBullet(),
              
              bullet = item.object,
              animator = item.animator,
              sprite = animator.getSprite(),
              
              damageRadius = randRange(15, 20, true);
        
        
        bullet.color = '#77fdff | #dfffff | #07c2ff | #008cdd';
        bullet.weight = 0;
        bullet.lockRotate = true;
        
        bullet.x = origin.x;
        bullet.y = origin.y;
                
        bullet.ox = origin.x;
        bullet.oy = origin.y;
        
        bullet.xSpeed = vectors.x;
        bullet.ySpeed = vectors.y;
        
        bullet.damageRadius = damageRadius;
        
        bullet.collisions = 0;
        bullet.maxCollisions = 1;
        
        bullet.rotation = angle;
        
        bullet.active = true;
        bullet.visible = false;
        
    
        sprite.paused = false;
        sprite.framesCurr = 0;
        sprite.reverse = player.direction > 0 ? false : true;
        
        
        player.isShooting = true;
        
        
        this.angleLock = true;
        
        setTimeout((e)=>{    
            this.angleLock = false;
        }, 100);
        
    }
    
    get attackAngle(){
        
        const player = this.attachment,
              direction = player.direction,
              angleLook = player.angleLook;
        
        let angle = ((direction < 0 ) ? direction * angleLook - 180: angleLook);
        
        angle = angle > 50 ? 50 : angle < -228 ? -228 : angle;
            
        
        return angle;
        
    }

    // open menu
    inventory(input, event){
        
        event.preventDefault();        
        const player = this.attachment;

        player.x = event.pageX - player.width * 0.5;
        player.y = event.pageY;
        
    }
    
    
    // move right
    reload(event){
        
        console.log('reload');
        
    }
    
    
    // toggle debug mode
    debug(input, event, debug){
        
        if(event.altKey)
        {
            debug.mode = debug.mode ? false : true;
        }
        
    }
    
    
}

module.exports = PlayerInput;