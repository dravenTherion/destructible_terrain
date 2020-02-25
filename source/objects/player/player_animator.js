const {Geom} = require('qt-js');

const Animator = require('./../../renderer/animator');
const Sprite = require('./../../renderer/sprite');


class PlayerAnimator extends Animator{
    
    constructor(destination, source){
        
        super(destination, source);
        
        this.bounceBody = [{val: 0}, {val: 0}, {val: 0}];
        this.bounceAnimation = [];
        
        // create the bounce animations for the upper body for when the player is 
        // standing still or running
        this.bounceAnimation.push(new TimelineMax({paused: true}).to(this.bounceBody[0], 1, {val: 5, ease: Sine.easeInOut, repeat: 1, yoyo: true}));
        this.bounceAnimation.push(new TimelineMax({paused: true}).to(this.bounceBody[1], 0.5, {val: -5, ease: Sine.easeInOut, repeat: 4, yoyo: true}));
        
        this.xBounceAdjust = 0.75;
        this.yBounceAdjust = 22;
        
        
        // add the sprite animations for the player parts
        this.addSprite('body', new Sprite(0, 0, 92, 138, 25, 0, 44, 78, true, false));
        this.addSprite('armBack', new Sprite(92, 0, 92, 138, 25, 0, 40, 53, true, false));
        this.addSprite('armFront', new Sprite(184, 0, 92, 138, 25, 0, 40, 53, true, false));
        this.addSprite('legs',[
                                    new Sprite(276, 0, 92, 138, 30, 0, 44, 78, false, true), 
                                    new Sprite(368, 0, 92, 138, 30, 0, 44, 78, false, true),
                                    new Sprite(460, 0, 92, 138, 15, 0, 44, 78, true, false)
                                ]);
        
        this.addSprite('flash', new Sprite(552, 0, 50, 50, 8, 0, 82, 13, true, false));
        
        this.centerX = 0;
        this.centerY = 0;
        
        this.xDrawAdjust = 5;
        this.yDrawAdjust = 0;
        
    }
    
    
    render(){
        
        if(this.attachment === undefined)
            return;
        
        this.centerX = player.x + player.width * 0.5;
        this.centerY = player.y + player.height * 0.5;
     
        
        const source = this.source,
              context = this.context,
              player = this.attachment,
              
              parts = this.sprites,
              body = parts.body,
              armBack = parts.armBack,
              armFront = parts.armFront,
              
              // select the leg sprite based on the player movement state
              legsState = ((player.xSpeed !== 0) && !player.airborne) && player.canMove ? 1 : (player.airborne) ? 2: 0,
              legs = parts.legs[legsState],
              angleLegs = player.direction * player.angleStand * 0.6,
              
              
              flash = parts.flash;             
        
        
        if(!player.airborne)
            this.bounceAnimation[legsState].totalProgress(legs.framesCurr / legs.framesMax);
        
        
        const direction = player.direction,
              xAdj = this.xDrawAdjust * (direction < 0 ? -1 : 1),
              yAdj = this.yDrawAdjust,
              x = (this.centerX - body.frameWidth * 0.5) + (direction < 0 ? body.frameWidth : 0) + xAdj, 
              y = this.centerY - body.frameHeight * 0.5 + yAdj,
              
              // body bouncing adjusment
              bodyBounceAdj = this.bounceBody[legsState].val,        
              vectorsBodyBounce = Geom.vector(bodyBounceAdj, angleLegs * (player.direction < 0) ? 1 : -1),
              vectorYAdj = this.yBounceAdjust,
              vectorXAdj = this.xBounceAdjust,
              
              flashVectors = Geom.vector(player.armLength + 50, player.angleLook);
        
                
        vectorsBodyBounce.y *= player.angleStand > 0 ? vectorYAdj : player.angleStand < 0 ? -vectorYAdj : 1;
        
        
        // play the leg animation
        if(!player.airborne)
        {
            // if the player is running towards the direction it is facing play the leg animation in its normal direction
            // else reverse it
            if((direction > 0 && player.xSpeed > 0) || (direction < 0 && player.xSpeed < 0))
                legs.reverse = false
            else
                legs.reverse = true;
                
            legs.step();  
        }
        else
        {
            // play the leg jump animation
            if(legs.paused && player.ySpeed <= 0)
            {
                legs.reverse = false;
                legs.framesCurr = 0;
                legs.paused = false;
            }
            else
            {
                // during the jump, while the player is rising play the animation in the normal direction
                // while falling play it in reverse
                if(player.ySpeed < 0)
                    legs.reverse = false;
                else
                    legs.reverse = true;
             
                legs.step();
            }
        }
        
        
        // play the shooting animation
        if(player.isShooting && player.canShoot && armFront.paused && body.paused && armBack.paused)
        {
            armBack.paused = 
            armFront.paused = 
            body.paused = 
            flash.paused = false;
            
            player.canShoot = false;
        }
        else if(!player.canShoot && armFront.paused && body.paused && armBack.paused)
        {
            player.canShoot = true;
            player.isShooting = false;
        }
                
        if(!body.paused && !armBack.paused && !armFront.paused)
        {
            body.step();
            armFront.step();
            armBack.step();
            flash.step(2);
        }

        
        context.save();
        
        // translate the animator to the current position of the player
        context.translate(x, y);
        
        // flip the animator to the current direction of the player
        context.scale(direction, 1);
        
        // rotate and draw the player legs based on the angle of the terrain
        this.rotateSprite(angleLegs, legs.transformOffsetX, legs.transformOffsetY);
        context.drawImage(source, legs.frameOffsetX, legs.frameHeight * legs.framesCurr, legs.frameWidth, legs.frameHeight, 0, 0, legs.frameWidth, legs.frameHeight);
        this.rotateSprite(-angleLegs, legs.transformOffsetX, legs.transformOffsetY);
        
        // animate the upper body based on the bounce animation of the legs
        context.translate(vectorsBodyBounce.y, vectorsBodyBounce.x * vectorXAdj);
        
        // rotate and draw the player arm (behind the body) based on the angle of the target
        this.rotateSprite(player.angleLook * 0.95, armBack.transformOffsetX, armBack.transformOffsetY);
        context.drawImage(source, armBack.frameOffsetX, armBack.frameHeight * armBack.framesCurr, armBack.frameWidth, armBack.frameHeight, 0, 0, armBack.frameWidth, armBack.frameHeight);
        this.rotateSprite(-player.angleLook * 0.95, armBack.transformOffsetX, armBack.transformOffsetY);
        
        // revert the uppper body animation translation
        context.translate(-vectorsBodyBounce.y, -vectorsBodyBounce.x * vectorXAdj);
        
        
        // animate the upper body based on the bounce animation of the legs
        context.translate(vectorsBodyBounce.y, vectorsBodyBounce.x);
        
        // rotate and draw the player arm (behind the body) based on the angle of the target
        this.rotateSprite(player.angleLook * 0.25, body.transformOffsetX, body.transformOffsetY);
        context.drawImage(source, body.frameOffsetX, body.frameHeight * body.framesCurr, body.frameWidth, body.frameHeight, 0, 0, body.frameWidth, body.frameHeight);
        this.rotateSprite(-player.angleLook * 0.25, body.transformOffsetX, body.transformOffsetY);
        
        // revert the uppper body animation translation
        context.translate(-vectorsBodyBounce.y, -vectorsBodyBounce.x);
        
        
        // animate the upper body based on the bounce animation of the legs
        context.translate(vectorsBodyBounce.y, vectorsBodyBounce.x * vectorXAdj);
        
        // rotate and draw the player arm (behind the body) based on the angle of the target
        this.rotateSprite(player.angleLook, armFront.transformOffsetX, armFront.transformOffsetY);
        context.drawImage(source, armFront.frameOffsetX, armFront.frameHeight * armFront.framesCurr, armFront.frameWidth, armFront.frameHeight, 0, 0, armFront.frameWidth, armFront.frameHeight);
        
        
        if(!flash.paused)
        {
            // draw the muzzle flash of the gun
            context.translate(flash.transformOffsetX, flash.transformOffsetY);   
            context.drawImage(source, flash.frameOffsetX, flash.frameOffsetY + flash.frameHeight * flash.framesCurr, flash.frameWidth, flash.frameHeight, 0, 0, flash.frameWidth, flash.frameHeight);
        }
        
        
        context.restore();
        
    }        
    
}


module.exports = PlayerAnimator;