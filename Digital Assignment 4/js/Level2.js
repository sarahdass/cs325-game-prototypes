"use strict";

GameStates.makeLevel2 = function(game) {

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
	return {

		create: function () {
			this.music = this.add.audio('levelone');
			this.music.play();
			
			//add tile map
			this.physics.arcade.sortDirection = Phaser.Physics.Arcade.SORT_NONE;
			this.stage.backgroundColor = '#B0F8F2';
			this.map = this.game.add.tilemap('outside');
			this.map.addTilesetImage('grass');
			this.map.addTilesetImage('BridgeTiles');
			
			this.bg_trees = this.map.createLayer('bg trees');
			this.bg_bg = this.map.createLayer('bg bg');
			this.layer11 = this.map.createLayer('Tile Layer 11');
			this.background = this.map.createLayer('background');
			this.rocks = this.map.createLayer('rocks');
			this.trees = this.map.createLayer('trees');
			this.flower = this.map.createLayer('flower');
			this.bg= this.map.createLayer('bg');
			this.layer = this.map.createLayer('walking layer');
			this.vines = this.map.createLayer('vines');
			this.grass = this.map.createLayer('grass');
			
			
			this.map.setCollisionByExclusion([0, -1]);
			this.layer.cameraOffset.set(0, 0);
			this.layer.resizeWorld();
			this.map.setCollisionBetween(1, 9999, true, this.layer);
			
			//add player
			this.player = this.add.sprite(200, 400, 'chicken');
			this.physics.enable(this.player, Phaser.Physics.ARCADE);
			this.player.body.collideWorldBounds = true;
			this.player.animations.add('down', [6,7,8], 10, true);
			this.player.animations.add('left', [9,10,11], 10, true);
			this.player.animations.add('up', [0,1,2], 10, true);
			this.player.animations.add('right', [3,4,5], 10, true);
			
			this.box1 = this.add.sprite(350, 300, 'big_crate');
			this.physics.enable(this.box1, Phaser.Physics.ARCADE);
			this.box1.body.drag.setTo(600, 0);
			//this.box1.body.setFriction(.7, 0);
			this.box1.body.collideWorldBounds = true;
			//this.box1.body.bounce.set(1.25);
			this.box2 = this.add.sprite(150, 100, 'crate');
			this.physics.enable(this.box2, Phaser.Physics.ARCADE);
			this.box2.body.drag.setTo(600, 0);
			this.box2.body.collideWorldBounds = true;
			
			/*this.box3 = this.add.sprite(600, 400, 'crate');
			this.physics.enable(this.box3, Phaser.Physics.ARCADE);
			this.box3.body.drag.setTo(600, 0);
			this.box3.body.collideWorldBounds = true;*/
			
			this.star = this.add.sprite(725, 0, 'star');
			this.physics.enable(this.star, Phaser.Physics.ARCADE);
			this.star.body.collideWorldBounds = true;
			
			this.cursors = this.input.keyboard.createCursorKeys();
			this.jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			
			this.physics.arcade.gravity.y = 500;
			//this.bouncy.inputEnabled = true;
			//this.bouncy.events.onInputDown.add( function() { this.quitGame(); }, this );
		},

		update: function () {
			this.physics.arcade.collide(this.player, this.layer);
			this.physics.arcade.collide(this.box1, this.player);
			this.physics.arcade.collide(this.box2, this.player);
			this.physics.arcade.collide(this.box1, this.box2);
			//this.physics.arcade.collide(this.box3, this.player);
			this.physics.arcade.collide(this.box1, this.layer);
			this.physics.arcade.collide(this.box2, this.layer);
			//this.physics.arcade.collide(this.box3, this.layer);
			this.physics.arcade.collide(this.star, this.layer);
			//this.physics.arcade.collide(this.star, this.player);
			this.player.body.velocity.x = 0;
			
			

			if (this.cursors.left.isDown)
			{
				this.player.body.velocity.x = -150;

				if (this.facing != 'left')
				{
					this.player.animations.play('left');
					this.facing = 'left';
				}
			}
			else if (this.cursors.right.isDown)
			{
				this.player.body.velocity.x = 150;

				if (this.facing != 'right')
				{
					this.player.animations.play('right');
					this.facing = 'right';
				}
			}

			else{
				if(this.facing != 'idle')
				{
					this.player.animations.stop();

					if (this.facing == 'left')
					{
						this.player.frame = 9;
					}
					else
					{
						this.player.frame = 3;
					}
					this.facing = 'idle';
				}
			}
			if (this.cursors.up.isDown && (this.player.body.onFloor() 
				|| this.physics.arcade.overlap(this.box1, this.player)
			|| this.physics.arcade.overlap(this.box2, this.player)))
			//|| this.physics.arcade.overlap(this.box3, this.player)))// && this.time.now > this.jumpTimer)// )
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
			this.player.kill();
			this.box1.kill();
			this.box2.kill();
			//this.box3.kill();
			this.state.start('MainMenu');

		}

	};
};
