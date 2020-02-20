var game = new Phaser.Game(640, 640, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.tilemap('level1', 'assets/haunted house 2.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tileset.png');
    game.load.image('tiles again', 'assets/tileset.png');
    //game.load.json('tiles', 'assets/tiles.json');
    //game.load.json('tiles again', 'assets/tiles again.json');
    game.load.image('dark background', 'assets/dark background.png');
    game.load.image('bkgd_0', 'assets/bkgd_0.png');
    //game.load.image('tiles-1', 'assets/starstruck/tiles-1.png');
    //game.load.spritesheet('ghost_right', 'assets/ghost_flipped.png', 30, 34);
    game.load.spritesheet('ghost', 'assets/fullghost.png', 34, 30, 20);
    game.load.spritesheet('guy', 'assets/guy.png', 28, 49, 18);
   // game.load.spritesheet('dude', 'assets/starstruck/dude.png', 32, 48);
   // game.load.spritesheet('droid', 'assets/starstruck/droid.png', 32, 32);
    game.load.image('starSmall', 'assets/starstruck/star.png');
    game.load.image('starBig', 'assets/starstruck/star2.png');
    game.load.image('background', 'assets/starstruck/background2.png');

}

var map;
var tileset;
var layer;
var player;
var facing = 'left';
var jumpTimer = 0;
var cursors;
var jumpButton;
var bg;
var guy;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //game.stage.backgroundColor = '#000000';

    bg = game.add.tileSprite(0, 0, 640, 640, 'dark background');
    bg.fixedToCamera = true;

    map = game.add.tilemap('level1');

    map.addTilesetImage('tiles again');
    map.addTilesetImage('tiles');
   // map.add.tileSprite(0,0,640,640,'dark background');
   // map.add.tileSprite(0,0,640,640('bkgd_0');
   // map.addTilesetImage('tiles');
   // map.addTilesetImage('tiles again');
    //map.addTilesetImage('tiles again');

    //map.setCollisionByExclusion([ 13, 14, 15, 16, 46, 47, 48, 49, 50, 51 ]);

    
    //layer_bg = map.createLayer('Image Layer 1');
    //layer_fg = map.createLayer('Image Layer 2');
    layer_bl = map.createLayer('castle back');
    layer = map.createLayer('Tile Layer 3');

    //  Un-comment this on to see the collision tiles
    // layer.debug = true;

    layer.resizeWorld();

    game.physics.arcade.gravity.y = 250;

    player = game.add.sprite(32, 32, 'ghost');
    game.physics.enable(player, Phaser.Physics.ARCADE);

    player.body.bounce.y = 0.2;
    player.body.collideWorldBounds = true;
   // player.body.setSize(20, 32, 5,16);

    player.animations.add('left', [0,1,2,3,4,5], 10, true);
    player.animations.add('turn', [6], 20, true);
    player.animations.add('right', [19,17,16,15,14], 10, true);
    player.animations.add('scare', [6, 7, 8, 9, 10, 11, 12, 13], 10, true);
    
    guy = game.add.sprite(300, 44, 'guy');
    game.physics.enable(guy, Phaser.Physics.ARCADE);
    guy.body.bounce.y = 0.2;
    guy.body.collideWorldBounds = true;
    guy.body.setSize(20, 32, 5,16);
    guy.animations.add('guyleft', [0,1,2,3,4,5,6,7], 10, true);
    guy.animations.add('guyright', [15, 16, 14, 13, 12], 10, true);
    guy.play('guyleft');
    var direction = 'left';
    var tween = game.add.tween(guy).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 1000, 1000, true);
    
    game.camera.follow(player);
    
    tween.onLoop.add(way, this);
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}
function way(){
    if(direction == 'left'){
        guy.play('guyright');
        direction = 'right';
    }
    else{
        guy.play('guyleft');
        direction = 'left';
    }
}
function update() {

    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(guy, layer);
    game.physics.arcade.collide(guy, player);
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 0;
            }
            else
            {
                player.frame = 19;
            }

            facing = 'idle';
        }
    }
    
    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -250;
        jumpTimer = game.time.now + 750;
    }
    game.physics.arcade.overlap(player, guy , hit, null, this);

}
function hit(player, guy){
    player.animations.play('scare');
    guy.body.velocity.y = -250;
    guy.kill();
}
function render () {

    // game.debug.text(game.time.physicsElapsed, 32, 32);
    // game.debug.body(player);
    // game.debug.bodyInfo(player, 16, 24);

}
