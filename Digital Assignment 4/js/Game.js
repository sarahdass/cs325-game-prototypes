"use strict";

BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    /*
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    
    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    */
    
    // For optional clarity, you can initialize
    // member variables here. Otherwise, you will do it in create().
    this.bouncy = null;
};

BasicGame.Game.prototype = {

    create: function () {
		//add player
		this.player = this.add.sprite(300, 300, 'chicken');
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('down', [6,7,8], 10, true);
        this.player.animations.add('left', [9,10,11], 10, true);
        this.player.animations.add('up', [0,1,2], 10, true);
        this.player.animations.add('right', [3,4,5], 10, true);
		
		//add tile map
		this.physics.arcade.sortDirection = Phaser.Physics.Arcade.SORT_NONE;
        this.stage.backgroundColor = '#BFF068';
        this.map = this.game.add.tilemap('barn');
        this.map.addTilesetImage('bridge1');
        this.map.addTilesetImage('bridge2');
        this.map.setCollisionByExclusion([0, -1]);
        this.floor = this.map.createLayer('foreground');
        this.layer = this.map.createLayer('Tile Layer 1');
        this.front = this.map.createLayer('front beams');
		this.middle = this.map.createLayer('middle beams');
		this.back = this.map.creatLayer('back beams');
		this.bg = this.map.createLayer('background');
        this.layer.cameraOffset.set(0, 0);
        this.layer.resizeWorld();
        this.map.setCollisionBetween(1, 9999, true, this.layer);
		
		
        //this.bouncy.inputEnabled = true;
        //this.bouncy.events.onInputDown.add( function() { this.quitGame(); }, this );
    },

    update: function () {
		this.physics.arcade.collide(this.player, this.layer);
		
    },

    quitGame: function () {

        this.state.start('MainMenu');

    }

};
