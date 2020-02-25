const {Geom} = require('qt-js');

const Animator = require('./../../renderer/animator');
const Sprite = require('./../../renderer/sprite');


class PlayerAnimator extends Animator{
    
    constructor(destination, source){
        
        super(destination, source);
        
        this.bounceBody = [{val: 0}, {val: 0}, {val: 0}];
        this.bounceAnimation = [];
        
        
        this.bounceAnimation.push(new TimelineMax({paused: true}).to(this.bounceBody[0], 1, {val: 5, ease: Sine.easeInOut, repeat: 1, yoyo: true}));
        this.bounceAnimation.push(new TimelineMax({paused: true}).to(this.bounceBody[1], 0.5, {val: -5, ease: Sine.easeInOut, repeat: 4, yoyo: true}));
        
        
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
        
        this.xBounceAdjust = 0.75;
        this.yBounceAdjust = 22;
        
    }
    
    
    render(){
        
        if(this.attachment === undefined)
            return;
        
     
        const source = this.source,
              context = this.context,
              player = this.attachment,
              
              parts = this.sprites,
              body = parts.body,
              armBack = parts.armBack,
              armFront = parts.armFront,
              legsState = ((player.xSpeed !== 0) && !player.airborne) && player.canMove ? 1 : (player.airborne) ? 2: 0,
              legs = parts.legs[legsState],
              angleLegs = player.direction * player.angleStand * 0.6,
              
              flash = parts.flash;             
        
        
        this.centerX = player.x + player.width * 0.5;
        this.centerY = player.y + player.height * 0.5;
        
        
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
        
        
        if(!player.airborne)
        {
            if((direction > 0 && player.xSpeed > 0) || (direction < 0 && player.xSpeed < 0))
                legs.reverse = false
            else
                legs.reverse = true;
                
            legs.step();  
        }
        else
        {
            if(legs.paused && player.ySpeed <= 0)
            {
                legs.reverse = false;
                legs.framesCurr = 0;
                legs.paused = false;
            }
            else
            {
                if(player.ySpeed < 0)
                    legs.reverse = false;
                else
                    legs.reverse = true;
             
                legs.step();
            }
        }
        
        
        if(player.isShooting && player.canShoot && armFront.paused && body.paused && armBack.paused)
        {
            armBack.paused = 
            armFront.paused = 
            body.paused = 
            flash.paused = false;
            
            //flash.framesCurr = 1;
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
        
        
        context.translate(x, y);
        context.scale(direction, 1);
        
        this.rotateSprite(angleLegs, legs.transformOffsetX, legs.transformOffsetY);
        context.drawImage(source, legs.frameOffsetX, legs.frameHeight * legs.framesCurr, legs.frameWidth, legs.frameHeight, 0, 0, legs.frameWidth, legs.frameHeight);
        this.rotateSprite(-angleLegs, legs.transformOffsetX, legs.transformOffsetY);
        
        
        context.translate(vectorsBodyBounce.y, vectorsBodyBounce.x * vectorXAdj);
        
        this.rotateSprite(player.angleLook * 0.95, armBack.transformOffsetX, armBack.transformOffsetY);
        context.drawImage(source, armBack.frameOffsetX, armBack.frameHeight * armBack.framesCurr, armBack.frameWidth, armBack.frameHeight, 0, 0, armBack.frameWidth, armBack.frameHeight);
        this.rotateSprite(-player.angleLook * 0.95, armBack.transformOffsetX, armBack.transformOffsetY);
        
        context.translate(-vectorsBodyBounce.y, -vectorsBodyBounce.x * vectorXAdj);
        
        
        context.translate(vectorsBodyBounce.y, vectorsBodyBounce.x);
        
        this.rotateSprite(player.angleLook * 0.25, body.transformOffsetX, body.transformOffsetY);
        context.drawImage(source, body.frameOffsetX, body.frameHeight * body.framesCurr, body.frameWidth, body.frameHeight, 0, 0, body.frameWidth, body.frameHeight);
        this.rotateSprite(-player.angleLook * 0.25, body.transformOffsetX, body.transformOffsetY);
        
        context.translate(-vectorsBodyBounce.y, -vectorsBodyBounce.x);
        
        
        context.translate(vectorsBodyBounce.y, vectorsBodyBounce.x * vectorXAdj);
        
        this.rotateSprite(player.angleLook, armFront.transformOffsetX, armFront.transformOffsetY);
        context.drawImage(source, armFront.frameOffsetX, armFront.frameHeight * armFront.framesCurr, armFront.frameWidth, armFront.frameHeight, 0, 0, armFront.frameWidth, armFront.frameHeight);
        
        
        if(!flash.paused)
        {
            context.translate(flash.transformOffsetX, flash.transformOffsetY);   
            context.drawImage(source, flash.frameOffsetX, flash.frameOffsetY + flash.frameHeight * flash.framesCurr, flash.frameWidth, flash.frameHeight, 0, 0, flash.frameWidth, flash.frameHeight);
        }
    
        
        
        context.restore();
        
    }        
    
}


module.exports = PlayerAnimator;