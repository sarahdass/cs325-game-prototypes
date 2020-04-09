"use strict";

GameStates.makeGame = function (game) {
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
	this.facing = 'left';
	this.jumped = false;
	this.colliding = false;
	this.colliding2 = false
	return{

		create: function () {
			this.music = this.add.audio('level1music');
			this.music.play();
			this.physics.arcade.sortDirection = Phaser.Physics.Arcade.SORT_NONE;
			
			this.stage.backgroundColor = '#BFF068';
			this.map = this.game.add.tilemap('level 1 map');
			this.map.addTilesetImage('level 1');
			this.map.setCollisionByExclusion([0, -1]);
			this.bg = this.map.createLayer('background');
			this.bg.alpha = .88;
			this.layer = this.map.createLayer('walking layer');
			this.layer.cameraOffset.set(0, 0);
			this.layer.resizeWorld();
			this.map.setCollisionBetween(1, 9999, true, this.layer);
			
			this.player = this.add.sprite(200, 400, 'girl');
			this.physics.enable(this.player, Phaser.Physics.ARCADE);
			this.player.body.collideWorldBounds = true;
			this.player.animations.add('down', [0, 1, 2, 3], 10, true);
			this.player.animations.add('left', [4, 5, 6 ,7], 10, true);
			this.player.animations.add('up', [8,9,10,11], 10, true);
			this.player.animations.add('right', [12,13,14,15], 10, true);
			
			this.star = this.add.sprite(1500, 0, 'star');
			this.physics.enable(this.star, Phaser.Physics.ARCADE);
			this.star.body.collideWorldBounds = true;
			
			this.box1 = this.add.sprite(100, 300, 'box');
			this.physics.enable(this.box1, Phaser.Physics.ARCADE);
			this.box1.body.drag.setTo(600, 0);
			this.box1.body.collideWorldBounds = true;
			game.physics.arcade.enable([this.box1],[this.player]);
			this.box1.body.onCollide = new Phaser.Signal();
			this.box1.body.onCollide.add(this.moveBox, this);
			
			this.box2 = this.add.sprite(450, 300, 'box');
			this.physics.enable(this.box2, Phaser.Physics.ARCADE);
			this.box2.body.drag.setTo(600, 0);
			this.box2.body.collideWorldBounds = true;
			game.physics.arcade.enable([this.box2],[this.player]);
			this.box2.body.onCollide = new Phaser.Signal();
			this.box2.body.onCollide.add(this.moveBox2, this);
			
			this.cursors = this.input.keyboard.createCursorKeys();
			this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			
			
			game.camera.follow(this.player);
			this.physics.arcade.gravity.y = 500;
		},
		moveBox: function(){
			this.player.body.velocity.y = 0;
			if(this.space.isDown){
				//this.box1.body.drag.setTo(0, 0);
				this.box1.body.velocity.x = this.player.body.velocity.x;
			}
			this.colliding = true;
			
		},
		moveBox2: function(){
			this.player.body.velocity.y = 0;
			if(this.space.isDown){
				//this.box2.body.drag.setTo(0, 0);
				this.box2.body.velocity.x = this.player.body.velocity.x;
			}
			this.colliding2 = true;
			
		},
		update: function () {
			this.physics.arcade.collide(this.player, this.layer);
			this.physics.arcade.collide(this.star, this.layer);
			this.physics.arcade.collide(this.box1, this.layer);
			this.physics.arcade.collide(this.box1, this.player);
			this.physics.arcade.collide(this.box2, this.layer);
			this.physics.arcade.collide(this.box2, this.player);
			this.player.body.velocity.x = 0;
			this.box1.body.drag.setTo(600, 0);
			if (this.cursors.left.isDown)
			{
				this.player.body.velocity.x = -150;

				if (this.facing != 'left')
				{
					this.player.animations.play('left');
					this.facing = 'left';
				}
				if(this.space.isDown && this.colliding == true){
					//this.box1.body.drag.setTo(0, 0);
					this.box1.body.velocity.x = this.player.body.velocity.x;	
				}
				if(this.space.isDown && this.colliding2 == true){
					//this.box2.body.drag.setTo(0, 0);
					this.box2.body.velocity.x = this.player.body.velocity.x;	
				}
				this.jumped = false;
			}
			else if (this.cursors.right.isDown)
			{	
				this.player.body.velocity.x = 150;

				if (this.facing != 'right')
				{
					this.player.animations.play('right');
					this.facing = 'right';
				}
				if(this.space.isDown && this.colliding == true){
					this.box1.body.drag.setTo(0, 0);
					this.box1.body.velocity.x = this.player.body.velocity.x;	
				}
				if(this.space.isDown && this.colliding2 == true){
					this.box2.body.drag.setTo(0, 0);
					this.box2.body.velocity.x = this.player.body.velocity.x;	
				}
				this.jumped = false;
			}

			else{
				if(this.facing != 'idle')
				{
					this.player.animations.stop();

					if (this.facing == 'left')
					{
						this.player.frame = 4;
					}
					else
					{
						this.player.frame = 12;
					}
					this.facing = 'idle';
					this.jumped = false;
					this.colliding = false;
					this.colliding2 = false;
				}
			}
	if (this.cursors.up.isDown && (this.player.body.onFloor() || this.colliding == true
		|| this.colliding2 == true))// && this.time.now > this.jumpTimer)// )
			{
				this.player.frame = 0;
				this.player.body.velocity.y = -350;
				this.jumpTimer = this.time.now + 750;
			}
			if(this.physics.arcade.overlap(this.star, this.player) == true){
				this.quitGame();
			}
			
		
		
		},

		quitGame: function () {
			this.music.stop();
			//  Here you should destroy anything you no longer need.
			//  Stop music, delete sprites, purge caches, free resources, all that good stuff.

			//  Then let's go back to the main menu.
			this.state.start('endGame');

		}
	};
};
