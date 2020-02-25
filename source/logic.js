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
    
    window.addEventListener('mousemove', (e)=>{
    
        $('#pointer').style.left = e.pageX + 'px'; 
        $('#pointer').style.top = e.pageY + 'px'; 
        
    });
    
});