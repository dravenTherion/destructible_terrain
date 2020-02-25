(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports=function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);const i=function(){const t={};function e(t,e){this.id=Date.now(),this.name="",this.x=t||0,this.y=e||0,this.type=this.baseType="point"}function n(t,n,i,r){this.width=i||0,this.height=r||0,e.call(this,t,n),this.type=this.baseType="box"}return t.point=e,t.box=n,t.circ=function(t,e,i){this.radius=i,n.call(this,t,e,2*i,2*i),this.type=this.baseType="circle"},t.dist2Points=function(t,e,n,i){let r=n-t,s=i-e;return Math.sqrt(r*r+s*s)},t.angle=function(t,e){return 180*Math.atan2(e,t)/Math.PI},t.vector=function(t,n){let i=n*Math.PI/180;return new e(t*Math.cos(i),t*Math.sin(i))},t.POINT="point",t.BOX="box",t.CIRC="circle",t}(),r=(i.point,i.box),s=i.circ,o=i.dist2Points,h=i.angle,u=i.vector;var l=i;const d=function(){const t={};return t.testRect=function(t,e){let n=t.y+t.height<e.y,i=t.y>e.y+e.height,r=t.x>e.x+e.width,s=t.x+t.width<e.x;return!(n||i||r||s)},t.testCirc=function(t,e){let n=e.x+e.radius-(t.x+t.radius),i=e.y+e.radius-(t.y+t.radius);return e.radius+t.radius>=Math.sqrt(n*n+i*i)},t}(),c=d.testRect,f=d.testCirc;var a=d;var p=function(){const t={},e=10,n=5;function i(t,e){this.parent=null,this.level=t,this.bounds=e,this.nodes=[],this.children=[]}return i.prototype.clear=function(){let t=this.nodes.length;this.children=[];for(let e=0;e<t;e++)if(this.nodes[e]){let t=this.nodes[e];t.clear(),t=null}this.nodes=[]},i.prototype.split=function(){let t=this.bounds.width/2,e=this.bounds.height/2,n=this.bounds.x,s=this.bounds.y;this.nodes[0]=new i(this.level+1,new r(n,s,t,e)),this.nodes[1]=new i(this.level+1,new r(n+t,s,t,e)),this.nodes[2]=new i(this.level+1,new r(n,s+e,t,e)),this.nodes[3]=new i(this.level+1,new r(n+t,s+e,t,e)),this.nodes[0].parent=this,this.nodes[1].parent=this,this.nodes[2].parent=this,this.nodes[3].parent=this},i.prototype.getQuadrant=function(t){let e=[],n=this.bounds.x+this.bounds.width/2,i=this.bounds.y+this.bounds.height/2,r=t.x<n||t.x+t.width<n,s=t.x>n||t.x+t.width>n,o=t.y<i||t.y+t.height<i,h=t.y>i||t.y+t.height>i;return r&&(o&&e.push(0),h&&e.push(2)),s&&(o&&e.push(1),h&&e.push(3)),e},i.prototype.insert=function(t){if(this.nodes.length){let e=this.getQuadrant(t);for(let n=0;n<e.length;n++)this.nodes[e[n]].insert(t)}else if(this.children.push(t),this.children.length>e&&this.level<n){this.nodes.length||this.split();let t=this.children.length;for(let e=0;e<t;e++)this.insert(this.children[e]);this.children=[]}},i.prototype.retrieve=function(t,e){if(this.nodes.length){let n=this.getQuadrant(e);for(let i=0;i<n.length;i++)this.nodes[n[i]].retrieve(t,e)}t.push.apply(t,this.children)},i.prototype.delete=function(t){if(this.nodes.length){let e=this.getQuadrant(t);for(let n=0;n<e.length;n++)this.nodes[e[n]]&&this.nodes[e[n]].delete(t)}else{for(let e=0;e<this.children.length;e++)if(t.id==this.children[e].id){this.parent,this.children[e]=null,this.children.splice(e,1);break}}},Object.defineProperties(t,{maxChildren:{get:function(){return e},set:function(t){e=t}},maxLevel:{get:function(){return n},set:function(t){n=t}}}),t.node=i,t}();n.d(e,"Geom",(function(){return l})),n.d(e,"Box",(function(){return r})),n.d(e,"Circ",(function(){return s})),n.d(e,"dist2Points",(function(){return o})),n.d(e,"angle",(function(){return h})),n.d(e,"vector",(function(){return u})),n.d(e,"Collision",(function(){return a})),n.d(e,"testRect",(function(){return c})),n.d(e,"testCirc",(function(){return f})),n.d(e,"QT",(function(){return p}))}]);
},{}],2:[function(require,module,exports){
// Get DOM
const _getDom = (s) => {
    
    var nodeList = !this.tagName || this.length ? window.document.querySelectorAll(s) : this.querySelectorAll(s); 

    return nodeList.length > 1 || !nodeList.length ? nodeList : nodeList[0];
    
}

Element.prototype.find = _getDom;

module.exports.$ = _getDom;
},{}],3:[function(require,module,exports){
const {$} = require('./dom');
const {randRange} = require('./math');


module.exports.$ = $;
module.exports.randRange = randRange;
},{"./dom":2,"./math":4}],4:[function(require,module,exports){
// Get random Number between 2 values
function _randRange(min, max, isInt) {
    
    let rnd = Math.random() * (max - min + 1) + min;
        
    if(isInt)
        rnd = Math.floor(rnd);
        
    return rnd;
}

module.exports.randRange = _randRange;
},{}],5:[function(require,module,exports){
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
},{"./input":6}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
// Helpers
const {$} = require('./helpers/');
const {drawRect, drawCirc} = require('./renderer/helpers');

// Quadtree Components
const {Geom, QT, testRect} = require('qt-js');

// Player Components
const Player = require('./objects/player/');
const PlayerInput = require('./objects/player/player_input');
const PlayerAnimator = require('./objects/player/player_animator');

// Bullet Components
const Bullet = require('./objects/bullet');

// Terrain
const Terrain = require('./terrain/');

// Managers
const {ObjectManager, BulletManager} = require('./objects/managers/');
const Input = require('./input_manager/input')


// World

var World = (function(){
    

    const _debug = {mode: false};
    
    const _playerWidth = 50,
          _playerHeight = 100,
          _player = new Player(0, 0, _playerWidth, _playerHeight, 0, 5, 10, 35, 1),
          _playerInputManager = new PlayerInput(),
          _playerAnimator = new PlayerAnimator(),
          
          _objectManager = new ObjectManager(),
          _bulletManager = new BulletManager();
    
    
    let _this   = {},
        
        _tl,
        
        _world,
        _worldCTX,
        _worldBounds,
        _worldTree,
        
        _terrain,
        _terrainBgCTX,
                
        _data,
        
        _bullets = [],        
        
        _lastCalledTime = 0,
        _fpsTotal = [],
        _delta = 0;
    
    
    function _init(){
        
    
        _tl             = TweenMax;    
        //_tl.ticker.fps(40);
                
        _world          = $('#world');
        
        _world.width    = window.innerWidth;
        _world.height   = window.innerHeight;
        
        _worldCTX       = _world.getContext('2d');
            
        _worldBounds    = new Geom.box(0 , 0, _world.width, _world.height);
        _worldTree      = new QT.node(0, _worldBounds);
        
        _data = $('#data');
        
        
        _initTerrain();
        _initManagers();
        _initPlayer();
        
    }
    
    // initialize terrain
    function _initTerrain(){
        
        const terrainFgCanvas  = $('#terrain_foreground'),
              terrainBgCanvas = $('#terrain_background'),
              terrainImg     = $('#terrain_image'),
              logoImg = $('#logo'),
              instructionsImg = $('#instructions');
        
        const bgComposite = document.createElement('canvas'),
              bgCompositeContext = bgComposite.getContext('2d');
        
        
        bgComposite.width = 
        terrainBgCanvas.width  = 
        terrainFgCanvas.width  = _world.width;
        
        bgComposite.height =
        terrainBgCanvas.height = 
        terrainFgCanvas.height = _world.height;                        
        
        bgCompositeContext.drawImage(terrainImg, 0, bgComposite.height - terrainImg.height);
        bgCompositeContext.drawImage(logoImg, 50, 35);
        bgCompositeContext.drawImage(instructionsImg, _world.width * 0.5 - instructionsImg.width * 0.5, _world.height * 0.4 - instructionsImg.height * 0.5);
        
        
        _terrain = new Terrain(_world.width, _world.height);        
        _terrain.buildFromImage(terrainFgCanvas, bgComposite, 'foreground', true);
        _terrain.buildFromImage(terrainBgCanvas, bgComposite, 'background', false);
        
        
        const terranBgContext = _terrain.getLayer('background').context;
                
        terranBgContext.globalCompositeOperation = 'source-atop';
        
        terranBgContext.fillStyle = 'rgba(0, 0, 0, 0.5)';
        terranBgContext.fillRect(0, 0, _world.width, _world.height);
        
        terranBgContext.globalCompositeOperation = 'destination-out';
        
    }
    
    // initialize managers
    function _initManagers(){
        
        // initialize object manager
        
        _objectManager.setBounds(_worldBounds);
        _objectManager.setTree(_worldTree);
        _objectManager.setTerrain(_terrain);
        _objectManager.setDebugDestination(_world);
        
        // initialize bullet manager
        
        _bulletManager.setBounds(_worldBounds);
        _bulletManager.setTree(_worldTree);
        _bulletManager.setTerrain(_terrain);
        _bulletManager.setBulletDestination(_world);
        _bulletManager.setDebugDestination(_world);
        
        const spriteSheet = $('#spritesheet');
        _bulletManager.setBulletSource(spriteSheet);
        
        _bulletManager.buildPool(30);
        _bulletManager.buildParticlePool(50);
        
    }
    
    // initialize player
    function _initPlayer(){
        
        _player.x = 160;
        _player.y = 200;                        
        
        
        // initialize player input manager
        
        _playerInputManager.attach(_player);
        _playerInputManager.addInputs(
        
            new Input('attack', 0, 'mousedown', null, [_bulletManager]),
            new Input('inventory', 2, 'contextmenu'),

            new Input('moveLeft', 65, 'keydown, keyup'),    
            new Input('moveRight', 68, 'keydown, keyup'),
            
            new Input('jump', 32, 'keydown, keyup'),
            
            new Input('reload', 82, 'keyup'),
            
            new Input('debug', 71, 'keyup', (input, event)=>{
                
                if(event.altKey)
                {
                    _objectManager.debugMode = _objectManager.debugMode ? false : true;
                    _bulletManager.debugMode = _bulletManager.debugMode ? false : true;
                    
                    _worldCTX.clearRect(0, 0, _world.width, _world.height);
                }
                
            })
        
        );
        
        
        // initialize player animation
        
        const spriteSheet = $('#spritesheet');
        
        _playerAnimator.setDestination(_world);
        _playerAnimator.setSource(spriteSheet);
        
        _playerAnimator.attach(_player);
        
        
        _worldTree.insert(_player);    
        _objectManager.add(_player, _playerAnimator);
        
    }

    // rendering
    function _render(){
        
        let collisionCount  = 0;
        
        const charList = _objectManager.list,
              bulList = _bulletManager.list,
              parList = _bulletManager.particleManager.list;
    

        //_clearCanvas(charList, bulList, parList);                
        
        _worldCTX.clearRect(0, 0, _world.width, _world.height);
        _worldTree.clear();
            

        // update players' quadtree location 
        for(let ctr; ctr < charList.length; ctr++)
            _worldTree.insert(charList[ ctr ].object);
        
        
        collisionCount += _bulletManager.update().collisions;
        collisionCount += _objectManager.update().collisions;
        
        
        if(!_lastCalledTime) {
            _lastCalledTime = Date.now();
            _fpsTotal = [0];
        }
        else
        {
            _delta = (Date.now() - _lastCalledTime)/1000;

            _lastCalledTime = Date.now();
            _fpsTotal.push(1/_delta);
            
            if(_fpsTotal.length > 50)
                _fpsTotal.shift();
        }
        
        _data.innerHTML = Math.round(_fpsTotal.reduce((total, num)=>{return total + num;}) / _fpsTotal.length) + ' fps <br />' + collisionCount + ' collisions';
    }
    
    // clear canvas
    function _clearCanvas(){
        
        for(let ctr = 0; ctr < arguments.length; ctr++)
        {
            let arg = arguments[ctr];
                        
            if(Array.isArray(arg))
                for(let ctr2 = 0; ctr2 < arg.length; ctr2++)
                {
                    let obj = arg[ctr2].object,
                        marginX = obj.width * 1.5,
                        marginY = obj.height * 0.75;

                    if(obj.active)
                    {
                        _worldCTX.clearRect(
                                            obj.x - marginX, 
                                            obj.y - marginY, 
                                            obj.width + marginX * 2, 
                                            obj.height + marginY * 2
                                            );


                        if(_objectManager.debugMode)
                            drawRect(_worldCTX, obj.x - marginX, obj.y - marginY, obj.width + marginX * 2, obj.height + marginY * 2, 'tranparent', 'purple');
                    }
                }
        }
        
    }
    
    
    function _start(){
        _tl.ticker.addEventListener('tick', _render);
        $('#bg').classList.remove('paused');
    }

    function _stop(){
        _tl.ticker.removeEventListener('tick', _render);
        $('#bg').classList.add('paused');
    }
    
    
    _this.init      = _init;
    
    _this.start     = _start;
    _this.stop      = _stop;    
    
    return _this;
    
})();


window.addEventListener('load', (e)=>{
    
    World.init();
    World.start();
    
    window.addEventListener('blur', (e)=>{World.stop()});
    window.addEventListener('focus', (e)=>{World.start()});
    
});
},{"./helpers/":3,"./input_manager/input":6,"./objects/bullet":8,"./objects/managers/":10,"./objects/player/":14,"./objects/player/player_animator":15,"./objects/player/player_input":16,"./renderer/helpers":18,"./terrain/":20,"qt-js":1}],8:[function(require,module,exports){
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
},{"qt-js":1}],9:[function(require,module,exports){
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
},{"./../../helpers/":3,"./../../renderer/animator":17,"./../../renderer/helpers":18,"./../../renderer/sprite":19,"./../bullet/":8,"./manager":11,"./particle_manager":13,"qt-js":1}],10:[function(require,module,exports){
const Manager = require('./manager');
const ObjectManager = require('./object_manager');
const BulletManager = require('./bullet_manager');
const ParticleManager = require('./particle_manager');

module.exports.Manager = Manager;
module.exports.ObjectManager = ObjectManager;
module.exports.BulletManager = BulletManager;
module.exports.ParticleManager = ParticleManager;
},{"./bullet_manager":9,"./manager":11,"./object_manager":12,"./particle_manager":13}],11:[function(require,module,exports){
const {drawCirc, drawRect} = require('./../../renderer/helpers');

class Manager{
    
    constructor(bounds, tree, terrain, debugDestination){
        
        this.setBounds(bounds);
        this.setTree(tree);
        this.setTerrain(terrain);
        this.setDebugDestination(debugDestination);
        
        this.list = [];
        
        this.debugMode = false;
        
    }
    
    // set bounds where the object can move in
    setBounds(bounds){
        
        this.bounds = bounds;
        
    }
    
    // set the collision tree
    setTree(tree){
        
        this.tree = tree;
    
    }
    
    // set terrain
    setTerrain(terrain){
        
        this.terrain = terrain;
        
    }
        
    // set debug output canvas
    setDebugDestination(debugDestination){
        
        if(!debugDestination)
            return;
            
        this.debugDestination = debugDestination;
        this.debugContext = this.debugDestination.getContext('2d');
    }
    
    // add a new object to the manager
    add(object, animator){
        
        this.list.push({object: object, animator: animator});
        
    }
    
    // update the objects in the manager
    update(){
        
        // code here...
        
    }
    
    // draw the debug info the manager
    drawDebug(obj, color){
    
        if(this.debugContext)
        {
            const context = this.debugContext;
            
            drawRect(context, obj.x, obj.y, obj.width, obj.height, 'transparent', color || '#FF0000'); 
        }
        
    }
    
}

module.exports = Manager;
},{"./../../renderer/helpers":18}],12:[function(require,module,exports){
const {drawRect} = require('./../../renderer/helpers');

const Manager = require('./manager');


class ObjectManager extends Manager{
    
    // update the objects in the manager
    update(){
        
        const   bounds = this.bounds,
                terrain = this.terrain,
                list = this.list;
        
        let collisions = 0;
        
        
        for(let ctr = 0; ctr < list.length; ctr++)
        {
            const obj = list[ctr].object,
                  objAnimator = list[ctr].animator;
            
            if(obj.x + obj.xSpeed > bounds.width - obj.width || obj.x + obj.xSpeed < 0)
                obj.xSpeed = 0;

            if(obj.airborne)
                obj.ySpeed = obj.ySpeed + obj.weight < obj.ySpeedMax ? obj.ySpeed + obj.weight : obj.ySpeedMax;
            else
                obj.ySpeed = obj.ySpeedMin;
                        
            
            collisions += obj.move(terrain.edgeTree, obj.x + obj.xSpeed, obj.y + obj.ySpeed).count;
            
            
            if(objAnimator)
                objAnimator.render();

            
            if(this.debugMode)
                this.drawDebug(obj);
        }
        
        // return update data
        return {collisions: collisions};
        
    }
    
    // draw the debug rects of the objects in the manager
    drawDebug(obj){
        
        if(this.debugContext)
        {
            const context = this.debugContext;
            
            drawRect(context, obj.x, obj.y, obj.width, obj.height, 'transparent', '#000'); 
                
            drawRect(context, obj.hitboxY.x, obj.hitboxY.y, obj.hitboxY.width, obj.hitboxY.height, 'transparent', '#FF0000', 1);
            drawRect(context, obj.x + obj.width * 0.5, obj.hitboxY.y, 1, obj.hitboxY.height, 'transparent', '#FF0000', 1);
                
            drawRect(context, obj.hitboxX.x, obj.hitboxX.y, obj.hitboxX.width, obj.hitboxX.height, 'transparent', '#0000FF', 1);    
        }
        
    }
    
}

module.exports = ObjectManager;
},{"./../../renderer/helpers":18,"./manager":11}],13:[function(require,module,exports){
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
},{"./../../helpers/":3,"./../../renderer/helpers":18,"./../bullet/":8,"./manager":11,"qt-js":1}],14:[function(require,module,exports){
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
},{"qt-js":1}],15:[function(require,module,exports){
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
},{"./../../renderer/animator":17,"./../../renderer/sprite":19,"qt-js":1}],16:[function(require,module,exports){
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
        
        this.lookUpThreshold = -55;
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
},{"./../../helpers/":3,"./../../input_manager/":5,"./../../input_manager/input":6,"./../bullet":8,"qt-js":1}],17:[function(require,module,exports){
class Animator{
    
    constructor(destination, source){
        
        this.setDestination(destination);
        this.source = source;
        
        this.sprites = {};
        this.spriteActive = null;
        this.spriteState = 0;
        
        this.lockRotate = false;
        
    }
    
    // set destination canvas to draw on
    setDestination(destination){
        
        if(destination === undefined)
            return;
        
        this.destination = destination;
        this.context = destination.getContext('2d');
        
    }
    
    // set image source to draw from
    setSource(source){
        
        if(source === undefined)
            return;
        
        this.source = source;
        
    }
    
    // add sprite
    addSprite(name, sprite){
        
        this.sprites[name] = sprite;
        
        if(this.spriteActive === null)
            this.spriteActive = name;
        
    }
    
    // remove sprite
    removeSprite(name){
        
        delete this.sprites[name];
        
    }
    
    getSprite(sprite){
        
        const name = sprite || this.spriteActive;
        
        return this.sprites[name];
    }
    
    // attach object
    attach(object){
        
        this.attachment = object;
        
        this.centerX = object.x + object.width * 0.5;
        this.centerY = object.y + object.height * 0.5;
        
    }
    
    // render animator
    render(){
        
        if(this.attachment === undefined)
            return;
        
        
        const context = this.context,
              attachment = this.attachment,
              rotation = attachment.rotation || 0;
    
        
        this.centerX = attachment.x + attachment.width * 0.5;
        this.centerY = attachment.y + attachment.height * 0.5;
        
        
        const x = this.centerX,
              y = this.centerY,
              key = this.spriteActive;
        
        
        let sprite = Array.isArray(this.sprites[key]) ? this.sprites[key][this.spriteState] : this.sprites[key];
            
        if(sprite.step)
        {
            sprite.step();
            

            context.save();
                
                
            context.translate(x - sprite.frameWidth * 0.5, y - sprite.frameHeight * 0.5);
        
            this.flipSprite(
                            sprite.flipX ? -1 : 1, 
                            sprite.flipY ? -1 : 1, 
                            sprite.transformOffsetX, 
                            sprite.transformOffsetY
                            );
            
            if(!this.lockRotate)
                this.rotateSprite(rotation, sprite.transformOffsetX, sprite.transformOffsetY);
            
            context.drawImage(this.source, sprite.frameOffsetX, sprite.frameOffsetY + sprite.frameHeight * sprite.framesCurr, sprite.frameWidth, sprite.frameHeight, 0, 0, sprite.frameWidth, sprite.frameHeight);
            
            if(!this.lockRotate)
                this.rotateSprite(-rotation, sprite.transformOffsetX, sprite.transformOffsetY);
                
                
            context.restore();
        }      
        
    }
    
    // flip active sprite
    flipSprite(x, y, transformOriginX, transformOriginY){
        
        const context = this.context;
        
        context.translate(transformOriginX, transformOriginY);
        context.scale(x, y);
        context.translate(-transformOriginX, -transformOriginY);
        
    }
    
    // rotate active sprite
    rotateSprite(angle, transformOriginX, transformOriginY){
        
        const context = this.context;
        
        // translate the position to the trnsform origin
        context.translate(transformOriginX, transformOriginY);
        
        // rotate the sprite by angle in radians
        context.rotate(angle * 0.01745329251994329576923690768489);
        
        // revert translated position
        context.translate(-transformOriginX, -transformOriginY);
        
    }
    
    
}

module.exports = Animator;
},{}],18:[function(require,module,exports){
// rendering
    
    function _drawRect(dest, x, y, width, height, fillColor, strokeColor, lineWidth){
        
        const destination = dest || _worldCTX;
        
        if(fillColor)
            destination.fillStyle = fillColor;
        
        destination.fillRect(x, y, width, height);
        
        if(strokeColor)
        {
            destination.strokeStyle = strokeColor;
            destination.lineWidth = lineWidth || 1;
            destination.strokeRect(x, y, width, height);
        }
    }
    
    function _drawCirc(dest, x, y, radius, fillColor, strokeColor, lineWidth){
        
        const destination = dest || _worldCTX;
        
        destination.beginPath();
        destination.arc(x, y, radius, 0, 2 * Math.PI, false);
        
        if(fillColor)
            destination.fillStyle = fillColor;
        
        destination.fill();
        
        if(strokeColor)
        {
            destination.strokeStyle = strokeColor;
            destination.lineWidth = lineWidth || 1;
            destination.stroke();
        }
        
        destination.closePath();
    }
    


module.exports.drawRect = _drawRect;
module.exports.drawCirc = _drawCirc;
},{}],19:[function(require,module,exports){
const priVars = new WeakMap();

class Sprite{
    
    constructor(frameOffsetX, frameOffsetY, frameWidth, frameHeight, framesMax, framesCurr, transformOffsetX, transformOffsetY, paused, loop, reverse, flipX, flipY){
        
        const priv = {
            framesCurr: framesCurr,
            framesMax: framesMax
        };
        
        priVars.set(this, priv);
                
        this.frameOffsetX = frameOffsetX || 0;
        this.frameOffsetY = frameOffsetY || 0;
                
        this.frameWidth  =  frameWidth || 0;
        this.frameHeight =  frameHeight || 0;
        
        this.transformOffsetX = transformOffsetX || 0;
        this.transformOffsetY = transformOffsetY || 0;
        
        this.paused = paused || paused === undefined ? true : false;
        this.loop = !loop || loop === undefined ? false : true;
        this.reverse = !reverse || reverse === undefined ? false : true;
        
        this.flipX = !flipX || flipX === undefined ? false : true;
        this.flipY = !flipY || flipY === undefined ? false : true;
        
    }
    
    get framesMax(){
        return priVars.get(this).framesMax;
    }
    
    get framesCurr(){
        return priVars.get(this).framesCurr; 
    }
    
    set framesCurr(frame){
    
        if(this.paused)
            return;
        
        const priv = priVars.get(this);
        
        
        if((frame >= priv.framesMax || frame <= 0) && !this.loop)
        {
            if(!this.reverse)
                priv.framesCurr = 0;
            else
                priv.framesCurr = this.framesMax-1;
            
            this.paused = true;
            
            return;
        }
        else
            priv.framesCurr = frame < priv.framesMax && frame > 0 ? frame : frame < 0 ? priv.framesMax - 1 : 0;    
        
    }
    
    step(frames){
        
        const frameStep = frames || 1;
        
        if(!this.reverse)
            this.framesCurr += frameStep;
        else
            this.framesCurr -= frameStep;
        
    }
    
}

module.exports = Sprite;
},{}],20:[function(require,module,exports){
const {QT, Box, Circ, testCirc} = require('qt-js');
const {drawCirc} = require('./../renderer/helpers');

const TerrainPx = require('./terrain_px');

const priVars = new WeakMap();


class Terrain{
    
    constructor(width, height){
        
        this.width = width;
        this.height = height;
        
        this.bounds = new Box(0, 0, width, height);
        
        // contains all pixels of the terrain
        this.masterTree = new QT.node(0, this.bounds);
        
        // contains all edge pixels of the terrain
        this.edgeTree = new QT.node(0, this.bounds);
                        
        
        // terrain layers
        const priv = {
            layers: {},
            count: 0
        }
        
        priVars.set(this, priv); 
        
    }
    
    // build terrain data from image
    buildFromImage(canvas, image, layerName, buildNewTree){
        
        const name = layerName || 'layer_' + this.totalLayers;
        
        this.addLayer(canvas, name);
        
        
        const layer = this.getLayer(name),
              context = layer.context;
        
        context.drawImage(image, 0, this.height - image.height);
        
        const buildTree = buildNewTree ? true : false;
        
        if(buildTree)
        {        
            this.masterTree.clear();
            this.edgeTree.clear();
            
            const data = context.getImageData(0, 0, this.width, this.height).data,
                  size = 1;

            for(let y = 0; y < this.height; y+=size)
                for(let x = 0; x < this.width; x+=size)
                {
                    let index = (y * this.width + x) * 4;

                    if(data[index + 3])
                    {
                        let px = new TerrainPx(x, y, [data[index], data[index + 1], data[index + 2], data[index + 3]]);

                        px.colorIndex = index;

                        this.masterTree.insert(px);                                        


                        // if any of the pixels around the current pixel is transparent, mark it as edge
                        let alphaCount = this.checkIfPixelIsEdge(x, y, data);

                        if(alphaCount > 0)
                        {                        
                            px.isEdge = true;                        
                            this.edgeTree.insert(px);
                        }

                    }

                }

            //context.putImageData(this.imageData, 0, 0);
        }
        
    }
    
    // add terrain layer
    addLayer(canvas, layerName){
        
        const layers = priVars.get(this),
              name = layerName || 'layer_' + layers.count;
        
        layers.count++;
        
        layers.layers[name] = {
                                canvas: canvas, 
                                context: canvas.getContext('2d')
                            };        
    }
    
    // add terrain layer
    removeLayer(layerName){
        
        const layers = priVars.get(this);
        
        layers.count--;
        
        delete layers.layers[layerName];
    
    }
    
    // get terrain layer
    getLayer(layerName){
        
        const layers = priVars.get(this);
        
        return layers.layers[layerName];
        
    }

    // get total layers
    get totalLayers(){
        
        const layers = priVars.get(this);
        
        return layers.count;
        
    }
    
    // punch a hole in the terrain and update the edge tree
    punchHole(x, y, radius, layerName, updateTree){
        
        const name = layerName || 'layer_0',
              layer = this.getLayer(name), 
              context = layer.context,
              
              holeDraw = new Circ(x+2, y+2, radius-2),
              
              // pixels at the ege of the punched hole
              // if updateTree is set to false, returned value will be null
              edgePixels = [];
        
        
        // draw hole
        const comp = context.globalCompositeOperation;
    
        context.globalCompositeOperation = 'destination-out';
        drawCirc(context, holeDraw.x + holeDraw.radius, holeDraw.y + holeDraw.radius, holeDraw.radius, 'black');
        context.globalCompositeOperation = comp;
        
        
        if(updateTree === true)
        {
            
            const data = context.getImageData(0, 0, this.width, this.height).data,
                  holeSelect = new Circ(x, y, radius),

                  // pixels within the hole quadrant
                  terrainPixels = [];


            this.masterTree.retrieve(terrainPixels, holeSelect);

            for(let ctr = terrainPixels.length - 1; ctr >= 0; ctr--)
            {
                let terrainPixel = terrainPixels[ ctr ];

                if(testCirc(holeDraw, terrainPixel))
                {   
                    terrainPixel.colorData[3] = 0;

                    data[terrainPixel.colorIndex + 3] = terrainPixel.colorData[3];

                    terrainPixel.isEdge = false;

                    //terrainPixels[ctr] = null;
                    //terrainPixels.splice(ctr, 1);
                    /**/
                }                
            }

            for(let ctr = terrainPixels.length - 1; ctr >= 0; ctr--)
            {
                let terrainPixel = terrainPixels[ ctr ],
                    x = terrainPixel.x,
                    y = terrainPixel.y;

                if(data[terrainPixel.colorIndex + 3] > 0)
                {                                
                    // if any of the pixels around the current pixel is transparent, mark it as edge
                    let alphaCount = this.checkIfPixelIsEdge(x, y, data);

                    if(alphaCount > 0)
                    {
                        if(!terrainPixel.isEdge)
                        {
                            terrainPixel.isEdge = true;

                            this.edgeTree.insert(terrainPixel);

                            edgePixels.push(terrainPixel);

                            data[terrainPixel.colorIndex + 3] = terrainPixel.colorData[3];
                        }
                    }
                }
            }

        }
        
        return edgePixels.length ? edgePixels : null;
    }
        
    // check if pixel at coordinate is an edge pixel
    checkIfPixelIsEdge(x, y, dataArray){
        
        const xCurr = x,
              yCurr = y,
            
              size = 1;
        
        
        const data = dataArray;
        
        let alphaCount = 0;
        
        for(let y = yCurr - size; y <= yCurr + size; y+=size)
            for(let x = xCurr - size; x <= xCurr + size; x+=size)
            {  
                if((y !== yCurr || x !== xCurr))
                {
                    if(!data[((y * this.width + x) * 4) + 3])
                        alphaCount++;
                }
            }
    
        return alphaCount;
    
    }
    
}

module.exports = Terrain;
},{"./../renderer/helpers":18,"./terrain_px":21,"qt-js":1}],21:[function(require,module,exports){
const {Box} = require('qt-js');

class TerrainPx extends Box{
    
    constructor(x, y, colorData){
        
        super(x, y, 1, 1);
        
        this.radius = 1;
        
        this.isEdge = false;
        this.colorIndex = 0;
        
        this.colorData = colorData;
        
    }
    
}

module.exports = TerrainPx;
},{"qt-js":1}]},{},[7]);
