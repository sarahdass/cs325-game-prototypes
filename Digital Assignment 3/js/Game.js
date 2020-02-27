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
    this.map = null;
    this.layer = null;
    this.sink_layer = null;
    this.floor = null;
    this.player = null;
    this.player_has = null;
    this.facing = 'left';
    this.catnum = 0;
	this.score = 0;
    this.x = 0;
    this.y = 0;
    
    this.cat1 = null;
	this.cat2 = null;
	this.cat3 = null;
	this.cat4= null;
	this.cat5 = null;
	
    this.cat1_wants = null;
    this.cat1_has = false;
    this.cat1_think = null;
    this.cat1_spri = null;
	this.spri = null;
	//this.spri = this.add.sprite(this.x, this.y, 'pink');
    //this.cat1 = new Cat();//this.cat1_wants, this.cat1_has, this.cat1_think, this.cat1_spri);
    /*this.cat2 = new Cat(wants, false, think, spri, null,0);
    this.cat3 = new Cat(wants, false, think, spri, null,0);
    this.cat4 = new Cat(wants, false, think, spri, null,0);
    this.cat5 = new Cat(wants, false, think, spri, null,0);*/


    
    this.redfish;
    this.bluefish;
    this.redfishthere = true;
    this.bluefishthere = true;
    this.num_cats = 4;
	this.timenum = 0;
    /*function makecat();
    function angrycat();
    function feed();
    function collect();*/
    //this.createcats();
    
    
    //this.bouncy = null;
};

BasicGame.Game.prototype = {

    create: function () {

        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        // Create a sprite at the center of the screen using the 'logo' image.
        //this.bouncy = this.game.add.sprite( this.game.world.centerX, this.game.world.centerY, 'logo' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        //this.bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        //this.game.physics.enable( this.bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        //this.bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        //var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        //var text = this.game.add.text( this.game.world.centerX, 15, "Build something amazing.", style );
        //text.anchor.setTo( 0.5, 0.0 );
        
        // When you click on the sprite, you go back to the MainMenu.
        //this.bouncy.inputEnabled = true;
        //this.bouncy.inputEnabled = true;
        //this.bouncy.events.onInputDown.add( function() { this.quitGame(); }, this );
        //this.add( function() { this.quitGame(); }, this );
        //this.add( function() {this.createcats(); }, this);
		this.scoreString = 'Score : ';
		this.scoreText = this.add.text(10, 10, this.scoreString + this.score, { font: '34px Arial', fill: '#81217E' });

		function Cat(spri,has,wants, think,timer){
            this.wants = wants;
            this.has = false;
            this.think = think;
            this.timer = timer;
			this.spri = spri;
		};
        this.physics.arcade.sortDirection = Phaser.Physics.Arcade.SORT_NONE;
        this.stage.backgroundColor = '#BFF068';
        this.map = this.game.add.tilemap('kitchen');
        
        this.map.addTilesetImage('corner96x160');
        this.map.addTilesetImage('counter98x128');
        this.map.addTilesetImage('fridge128x256');
        this.map.addTilesetImage('oven96x128');
        this.map.addTilesetImage('sink128x96');
        this.map.addTilesetImage('Floor Texture');
        
        this.map.setCollisionByExclusion([0, -1]);
        this.floor = this.map.createLayer('Tile Layer 1');
        this.layer = this.map.createLayer('kitchen counter');
        this.sink_layer = this.map.createLayer('sink');
        
        
        this.layer.cameraOffset.set(0, 0);
        this.layer.resizeWorld();
        this.map.setCollisionBetween(1, 9999, true, this.layer);
        

        
        this.cursors = this.input.keyboard.createCursorKeys();
        /*this.makecat(this.cat1, this.cat1.spri);
        this.makecat(this.cat2, this.cat2.spri);
        this.makecat(this.cat3, this.cat3.spri);
        this.makecat(this.cat4, this.cat4.spri);
        this.makecat(this.cat5, this.cat5.spri);*/
        
        
        // fish
        
        //redfish
        this.catnum = this.game.rnd.integerInRange(1, 3);
        this.x = this.rnd.integerInRange(320, 700);
        this.y = this.rnd.integerInRange(320, 700);
        this.redfish = this.add.sprite(this.x, this.y, 'redfish');
		this.physics.enable(this.redfish, Phaser.Physics.ARCADE);
        //bluefish
        //this.catnum = this.game.rnd.integerInRange(1, 3);
        this.x = this.rnd.integerInRange(320, 700);
        this.y = this.rnd.integerInRange(320, 700);
        this.bluefish = this.add.sprite(this.x, this.y, 'bluefish');
		
		this.physics.enable(this.bluefish, Phaser.Physics.ARCADE);

        

		//cat1
		this.catnum = this.game.rnd.integerInRange(1, 3);
		this.x = this.rnd.integerInRange(200, 500);
        this.y = this.rnd.integerInRange(270, 400);
		if(this.catnum == 1){
				this.spri = this.add.sprite(this.x, this.y, 'pink');
            }
        else if(this.catnum == 2){
                this.spri = this.add.sprite(this.x, this.y, 'grey');        
            }
        else if(this.catnum == 3){
                this.spri = this.add.sprite(this.x, this.y, 'brown');
        }            
		this.catnum = this.rnd.integerInRange(1,2);
        if(this.catnum == 1){
            this.wants = 'redfish';
            this.think = this.add.sprite(this.x, this.y-40, 'redfishbubble');
        }
        else{
            this.wants = 'bluefish';
            this.think = this.add.sprite(this.x, this.y-40, 'bluefishbubble');
        }
        this.physics.enable(this.spri, Phaser.Physics.ARCADE);
        this.spri.body.collideWorldBounds = true;
        this.spri.animations.add('down', [8,9,10,11], 10, true);
        this.spri.animations.add('left', [4, 5, 6, 7], 10, true);
        this.spri.animations.add('up', [12,13,14,15,16], 10, true);
        this.spri.animations.add('right', [0,1,2,3], 10, true);
        
        this.timer = this.time.create(false);
        this.catnum = this.rnd.integerInRange(10000, 60000);
		this.has = null;
        //this.timer.loop(this.catnum, this.angrycat(this.spri), this);
		this.cat1 = new Cat(this.spri,this.has, this.wants, this.think, this.timer);

		//cat2
		this.catnum = this.game.rnd.integerInRange(1, 3);
		this.x = this.rnd.integerInRange(500, 700);
        this.y = this.rnd.integerInRange(370, 700);
		if(this.catnum == 1){
				this.spri2 = this.add.sprite(this.x, this.y, 'pink');
            }
        else if(this.catnum == 2){
                this.spri2 = this.add.sprite(this.x, this.y, 'grey');        
            }
        else if(this.catnum == 3){
                this.spri2 = this.add.sprite(this.x, this.y, 'brown');
        }            
		this.catnum = this.rnd.integerInRange(1,2);
        if(this.catnum == 1){
            this.wants2 = 'redfish';
            this.think2 = this.add.sprite(this.x, this.y-40, 'redfishbubble');
        }
        else{
            this.wants2 = 'bluefish';
            this.think2 = this.add.sprite(this.x, this.y-40, 'bluefishbubble');
        }
        this.physics.enable(this.spri2, Phaser.Physics.ARCADE);
        this.spri2.body.collideWorldBounds = true;
        this.spri2.animations.add('down', [8,9,10,11], 10, true);
        this.spri2.animations.add('left', [4, 5, 6, 7], 10, true);
        this.spri2.animations.add('up', [12,13,14,15,16], 10, true);
        this.spri2.animations.add('right', [0,1,2,3], 10, true);
        
        this.timer = this.time.create(false);
        this.catnum = this.rnd.integerInRange(10000, 60000);
		this.has2 = null;
		this.cat2 = new Cat(this.spri2,this.has2, this.wants2, this.think2, this.timer);
		//cat3
		this.catnum = this.game.rnd.integerInRange(1, 3);
		this.x = this.rnd.integerInRange(200, 500);
        this.y = this.rnd.integerInRange(270, 500);
		if(this.catnum == 1){
				this.spri3 = this.add.sprite(this.x, this.y, 'pink');
            }
        else if(this.catnum == 2){
                this.spri3 = this.add.sprite(this.x, this.y, 'grey');        
            }
        else if(this.catnum == 3){
                this.spri3 = this.add.sprite(this.x, this.y, 'brown');
        }            
		this.catnum = this.rnd.integerInRange(1,2);
        if(this.catnum == 1){
            this.wants3 = 'redfish';
            this.think3 = this.add.sprite(this.x, this.y-40, 'redfishbubble');
        }
        else{
            this.wants3 = 'bluefish';
            this.think3 = this.add.sprite(this.x, this.y-40, 'bluefishbubble');
        }
        this.physics.enable(this.spri3, Phaser.Physics.ARCADE);
        this.spri3.body.collideWorldBounds = true;
        this.spri3.animations.add('down', [8,9,10,11], 10, true);
        this.spri3.animations.add('left', [4, 5, 6, 7], 10, true);
        this.spri3.animations.add('up', [12,13,14,15,16], 10, true);
        this.spri3.animations.add('right', [0,1,2,3], 10, true);
        
        this.timer = this.time.create(false);
        this.catnum = this.rnd.integerInRange(10000, 60000);
		this.has3= null;
		this.cat3 = new Cat(this.spri3,this.has3, this.wants3, this.think3, this.timer);
		//cat4
		this.catnum = this.game.rnd.integerInRange(1, 3);
		this.x = this.rnd.integerInRange(200, 500);
        this.y = this.rnd.integerInRange(270, 500);
		if(this.catnum == 1){
				this.spri4 = this.add.sprite(this.x, this.y, 'pink');
            }
        else if(this.catnum == 2){
                this.spri4 = this.add.sprite(this.x, this.y, 'grey');        
            }
        else if(this.catnum == 3){
                this.spri4 = this.add.sprite(this.x, this.y, 'brown');
        }            
		this.catnum = this.rnd.integerInRange(1,2);
        if(this.catnum == 1){
            this.wants4 = 'redfish';
            this.think4 = this.add.sprite(this.x, this.y-40, 'redfishbubble');
        }
        else{
            this.wants4 = 'bluefish';
            this.think4 = this.add.sprite(this.x, this.y-40, 'bluefishbubble');
        }
        this.physics.enable(this.spri4, Phaser.Physics.ARCADE);
        this.spri4.body.collideWorldBounds = true;
        this.spri4.animations.add('down', [8,9,10,11], 10, true);
        this.spri4.animations.add('left', [4, 5, 6, 7], 10, true);
        this.spri4.animations.add('up', [12,13,14,15,16], 10, true);
        this.spri4.animations.add('right', [0,1,2,3], 10, true);
        
        this.timer = this.time.create(false);
        this.catnum = this.rnd.integerInRange(10000, 60000);
		this.has4 = null;
		this.cat4 = new Cat(this.spri4,this.has4, this.wants4, this.think4, this.timer);


        this.cat1.timer.start();
		this.cat2.timer.start();
        /*this.cat2.timer.start();
        this.cat3.timer.start();
        this.cat4.timer.start();
        this.cat5.timer.start();*/
		//player
        this.player = this.add.sprite(300, 300, 'girl');
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('down', [0,1,2,3,], 10, true);
        this.player.animations.add('left', [4, 5, 6, 7], 10, true);
        this.player.animations.add('up', [8, 9, 10, 11], 10, true);
        this.player.animations.add('right', [12, 13, 14, 15], 10, true);

    },

    update: function () {
		if(this.time.now > 15000){
			this.timenum = 250;
		}
		else if(this.time.now > 30000){
			this.timenum = 500;
		}

		function feed(player_has, cat,num_cats){
			if(cat.has == true){
				return 0;
			}
			if(player_has == cat.wants){
				cat.has == true;
				cat.think.kill();
				return 1;
			}
			else if((player_has != cat.wants) && cat.has == false && (player_has != null)){
				angrycat(cat.spri, cat.think, num_cats);
				return 2;
			}
			return 0;
		};
		function angrycat(spri,think,num_cats){
            spri.animations.play('right');
            spri.body.velocity.x = 400;
            spri.kill();
            think.kill();
            num_cats--;
		};

        this.physics.arcade.collide(this.player, this.layer);
        this.cat1.spri.animations.play('up');
        this.cat2.spri.animations.play('down');
        this.cat3.spri.animations.play('up');
        this.cat4.spri.animations.play('down');
        /*this.cat5.spri.animations.play('up');*/
        if (this.cursors.left.isDown){
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
        else if (this.cursors.up.isDown){
            this.player.body.velocity.y = -150;
            
            if(this.facing != 'up'){
               this.player.animations.play('up');
               this.facing = 'up';
            }
        }
        else if(this.cursors.down.isDown){
            this.player.body.velocity.y = 150;
            if(this.facing != 'down'){
                this.player.animations.play('down');
                this.facing = 'down';
            }
        }
        else
        {
            if (this.facing != 'idle')
            {
                this.player.animations.stop();

                if (this.facing == 'left')
                {
                    this.player.frame = 4;
                }
                else if(this.facing == 'right')
                {
                    this.player.frame = 12;
                }
                else if(this.facing == 'up'){
                    this.player.frame = 8;
                }
                else{
                    this.player.frame = 0;
                }

                this.facing = 'idle';
                this.player.body.velocity.y = 0;
                this.player.body.velocity.x = 0;
                
            }
        }
        if(this.bluefishthere == false && (this.player_has != 'bluefish')){
            this.x = this.rnd.integerInRange(250, 700);
            this.y = this.rnd.integerInRange(250, 700);

            this.bluefish = this.add.sprite(this.x, this.y, 'bluefish');
			this.physics.enable(this.bluefish, Phaser.Physics.ARCADE);
			this.bluefishthere = true;
        }
        if(this.redfishthere == false && (this.player_has != 'redfish')){
              this.x = this.rnd.integerInRange(250, 700);
              this.y = this.rnd.integerInRange(250, 700);
              this.redfish = this.add.sprite(this.x, this.y, 'redfish');
			this.physics.enable(this.redfish, Phaser.Physics.ARCADE);
			this.redfishthere = true;
        }
		if(this.physics.arcade.overlap(this.player, this.redfish)==true){
			if(this.player_has != 'redfish'){
				this.player_has = 'redfish';
				this.redfish.kill();
				this.redfishthere = false;
			}
		}
		if(this.physics.arcade.overlap(this.player, this.bluefish)==true){
			if(this.player_has != 'bluefish'){
				this.player_has = 'bluefish';
				this.bluefish.kill();
				this.bluefishthere = false;
			}
		}
        if(this.physics.arcade.overlap(this.player, this.cat1.spri) == true){
			this.num = feed(this.player_has, this.cat1, this.num_cats)
            if(this.num != 0){
				this.num_cats--;
				this.cat1.has = true;
				this.player_has = null;
				if(this.num == 2){
					this.score -= 500;
				}
				else{
					this.score += 1000 - this.timenum;
				}
				this.scoreText.text = this.scoreString + this.score;
			}
        }
		if(this.physics.arcade.overlap(this.player, this.cat2.spri) == true){
			this.num = feed(this.player_has, this.cat2, this.num_cats)
            if(this.num != 0){
				this.num_cats--;
				this.cat2.has = true;
				this.player_has = null;
				if(this.num == 2){
					this.score -= 500;
				}
				else{
					this.score += 1000 - this.timenum;
				}
				this.scoreText.text = this.scoreString + this.score;
			}
        }
		if(this.physics.arcade.overlap(this.player, this.cat3.spri) == true){
			this.num = feed(this.player_has, this.cat3, this.num_cats)
            if(this.num != 0){
				this.num_cats--;
				this.cat3.has = true;
				this.player_has = null;
				if(this.num == 2){
					this.score -= 500;
				}
				else{
					this.score += 1000  - this.timenum;
				}
				this.scoreText.text = this.scoreString + this.score;
			}        }
		if(this.physics.arcade.overlap(this.player, this.cat4.spri) == true){
  			this.num = feed(this.player_has, this.cat4, this.num_cats)
            if(this.num != 0){
				this.num_cats--;
				this.cat4.has = true;
				this.player_has = null;
				if(this.num == 2){
					this.score -= 500;
				}
				else{
					this.score += 1000 - this.timenum;
				}
				this.scoreText.text = this.scoreString + this.score;
			}
        }
        /*if(this.physics.arcade.overlap(this.player, this.cat2.spri) == true){
            feed(this.player, this.cat2);
        }
        if(this.physics.arcade.overlap(this.player, this.cat3.spri) == true){
            feed(this.player, this.cat3);
        }
        if(this.physics.arcade.overlap(this.player, this.cat4.spri) == true){
            feed(this.player, this.cat4);
        }
        if(this.physics.arcade.overlap(this.player, this.cat5.spri) == true){
            feed(this.player, this.cat5);
        }*/
        if(this.num_cats == 0){
			this.stateText = this.add.text(this.world.centerX,this.world.centerY,this.scoreString + this.score+'\nClick Girl To Quit', { font: '64px Arial', fill: '#81217E' });
			this.stateText.anchor.setTo(0.5, 0.5);
			
			this.player.inputEnabled = true;
			this.player.events.onInputDown.add( function() { this.quitGame(); }, this )
        }

    },



    angrycat: function(spri,think){
            this.spri.animations.play('right');
            this.spri.body.velocity.x = 400;
            this.spri.kill();
            this.think.kill();
            this.num_cats--;
    },
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //this.bouncy.rotation = this.game.physics.arcade.accelerateToPointer( this.bouncy, this.game.input.activePointer, 500, 500, 500 );

    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
		
        this.state.start('endState');

    },


};
