const {randRange} = require('./../../helpers/');

const {drawCirc} = require('./../../renderer/helpers');

const {Geom, dist2Points, testRect} = require('qt-js');

const Manager = require('./manager');
const ParticleManager = require('./particle_manager');

const Bullet = require('./../bullet/');
const Animator = require('./../../renderer/animator');
const Sprite = require('./../../renderer/sprite');

class BulletManager extends Manager{
    
    constructor(bounds, tree, terrain, bulletOutputCanvas, debugOutputCanvas){
        
        super(bounds, tree, terrain, debugOutputCanvas);
        
        this.setBulletDestination(bulletOutputCanvas);
        
        this.particleManager = null;
        
        this.currentIndex = 0;
        this.explosionIndex = 0;
        
        this.listImpact = [];
    }
    
    // set destination canvas to draw bullets on
    setBulletDestination(destination){
        
        if(destination === undefined)
            return;
        
        this.canvas = destination;
        this.context = destination.getContext('2d');
        
    }

    // set image source
    setBulletSource(source){
        
        if(source === undefined)
            return;
        
        this.source = source;
        
    }
    
    // initialize bullet pool
    buildPool(number){
        
        if(this.source === undefined)
            return;
        
        const list = this.list;
        
        for(let ctr = 0; ctr < number; ctr++)
        {
            const bullet = new Bullet(),                  
                  animatorBullet = new Animator(this.canvas, this.source),
                  
                  explosion = new Geom.point(),
                  animatorExplosion = new Animator(this.canvas, this.source);
            
            
            bullet.active = false;
            bullet.visible = false;
            
            animatorBullet.addSprite('bullet1', new Sprite(602, 0, 20, 20, 1, 0, 10, 10, true, true));
            animatorBullet.attach(bullet);
            
            
            explosion.width = 1;
            explosion.height = 1;
            explosion.active = false;
            
            animatorExplosion.addSprite('explosion1', new Sprite(622, 0, 30, 30, 11, 0, 15, 15, true, false));
            animatorExplosion.attach(explosion);
            
            
            this.add(bullet, animatorBullet);
            this.listImpact.push({object: explosion, animator: animatorExplosion});
        }
        
    }
    
    // initialize particle pool
    buildParticlePool(number){
        
        this.particleManager = new ParticleManager(this.bounds, this.tree, this.terrain, this.canvas, this.debugDestination);
        this.particleManager.buildPool(50);

    }
    
    // get curernt bullet
    getAvailableBullet(){
        
        const index = this.currentIndex;
        
        this.currentIndex++;
        this.currentIndex = this.currentIndex >= this.list.length ? 0 : this.currentIndex;
        
        return this.list[index];        
    }
    
    // update the bullets in the manager
    update(){
        
        const bounds = this.bounds,
              terrain = this.terrain,
              edgeTree = terrain.edgeTree,
              context = this.context,
              contextTerrain = this.terrain.getLayer('background').context,
              bullets = this.list,
              explosions = this.listImpact,
              particleManager = this.particleManager;
        
        
        let collisions = 0;
        
        for(let ctr = 0; ctr < bullets.length; ctr++)
        {
            
            const bullet = bullets[ctr].object,
                  bulletAnimator = bullets[ctr].animator,
                  
                  explosion = explosions[this.explosionIndex].object,
                  explosionAnimator = explosions[this.explosionIndex].animator;
            
                  
            if(bullet.active)
            {
                const hit = bullet.move(bullet.x + bullet.xSpeed, bullet.y + (bullet.ySpeed += bullet.weight), edgeTree);
                
                if(hit !== null)
                {   
                    bullet.x = hit.x;
                    bullet.y = hit.y;
                    
                    let edgePixels = bullet.dealDamage(terrain),
                        edgeCount = edgePixels && edgePixels.length > 5 ? edgePixels.length : 20;
                    
                    if(bullet.collisions >= bullet.maxCollisions)
                        bullet.active = false;
                    
                    if(edgeCount)
                    {
                        let speed = Math.sqrt(bullet.xSpeed * bullet.xSpeed + bullet.ySpeed * bullet.ySpeed);
                
                        particleManager.activateParticles(Math.floor(edgeCount * 0.15), bullet.color, bullet.x, bullet.y, bullet.rotation, speed, 45, 5);
                    }
                    
                    
                    explosion.x = bullet.x;
                    explosion.y = bullet.y;
                    explosion.active = true;
                    
                    explosionAnimator.getSprite().paused = false;
                    
                    this.explosionIndex++;
                    this.explosionIndex = this.explosionIndex >= explosions.length ? 0 : this.explosionIndex;
                    
                    
                    collisions += edgeCount + 1;
                }
                else if(!testRect(bullet, bounds))
                {
                    bullet.active = false; 
                }
                else
                {
                    if(!bullet.visible)
                    {
                        if(Math.abs(dist2Points(bullet.ox, bullet.oy, bullet.x, bullet.y)) > 50)
                            bullet.visible = true;
                    }
                    else
                        bulletAnimator.render();

                    drawCirc(contextTerrain, bullet.x, bullet.y, bullet.damageRadius, 'black'); 
                }
                
                if(this.debugMode)
                    this.drawDebug(bullet, '#11ef00');
            }
            
        }
        
        
        for(let ctr = 0; ctr < explosions.length; ctr++)
        {
            const explosion = explosions[ctr].object,
                  explosionAnimator = explosions[ctr].animator;
            
            if(explosion.active)
            {
                explosionAnimator.render();
                
                if(explosionAnimator.getSprite().paused)
                    explosion.active = false;
            }
            
        }
        
        
        particleManager.update();
        
        return {collisions: collisions};
        
    }
        
}


module.exports = BulletManager;