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
    function Cat(wants, has, think, sprite, timer){
        this.wants = wants;
        this.has = has;
        this.think = think;
        this.sprite = null;
        this.timer = null;
    };
    this.cat1 = new Cat(null, false, null, null, null);
    this.cat2 = new Cat(null, false, null, null, null);
    this.cat3 = new Cat(null, false, null, null,null);
    this.cat4 = new Cat(null, false, null, null,null);
    this.cat5 = new Cat(null, false, null, null,null);
    this.catnum = 0;
    this.x = 0;
    this.y = 0;
    
    this.redfish;
    this.bluefish;
    this.redfishthere = true;
    this.bluefishthere = true;
    this.num_cats = 5;
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
        this.makecat(this.cat1);
        this.makecat(this.cat2);
        this.makecat(this.cat3);
        this.makecat(this.cat4);
        this.makecat(this.cat5);
        
        
        // fish
        
        //redfish
        this.catnum = this.game.rnd.integerInRange(1, 3);
        this.x = this.rnd.integerInRange(200, 500);
        this.y = this.rnd.integerInRange(180, 500);
        this.redfish = this.add.image(this.x, this.y, 'redfish');
        //bluefish
        this.catnum = this.game.rnd.integerInRange(1, 3);
        this.x = this.rnd.integerInRange(200, 500);
        this.y = this.rnd.integerInRange(180, 500);
        this.bluefish = this.add.image(this.x, this.y, 'bluefish');
        //player
        this.player = this.add.sprite(300, 300, 'girl');
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('down', [0,1,2,3,], 10, true);
        this.player.animations.add('left', [4, 5, 6, 7], 10, true);
        this.player.animations.add('up', [8, 9, 10, 11], 10, true);
        this.player.animations.add('right', [12, 13, 14, 15], 10, true);
        this.cat1.timer.start();
        this.cat2.timer.start();
        this.cat3.timer.start();
        this.cat4.timer.start();
        this.cat5.timer.start();

    },

    update: function () {

        this.physics.arcade.collide(this.player, this.layer);
        this.cat1.animations.play('up');
        this.cat2.animations.play('down');
        this.cat3.animations.play('up');
        this.cat4.animations.play('down');
        this.cat5.animations.play('up');
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
        if(this.bluefishthere == false && (this.player.has != 'bluefish')){
              this.catnum = this.game.rnd.integerInRange(1, 3);
              this.y = this.rnd.integerInRange(180, 500);
              this.bluefish = this.add.image(this.x, this.y, 'bluefish');
        }
        if(this.redfishthere == false && (this.player.has != 'redfish')){
              this.catnum = this.game.rnd.integerInRange(1, 3);
              this.y = this.rnd.integerInRange(180, 500);
              this.redfish = this.add.image(this.x, this.y, 'redfish');
        }
        this.physics.arcade.overlap(this.player, this.redfish, this.collect, null, this);
        this.physics.arcade.overlap(this.player, this.bluefish, this.collect, null, this);
        if(this.physics.arcade.overlap(this.player, this.cat1.sprite) == true){
            feed(this.player, this.cat1);
        }
        if(this.physics.arcade.overlap(this.player, this.cat2.sprite) == true){
            feed(this.player, this.cat2);
        }
        if(this.physics.arcade.overlap(this.player, this.cat3.sprite) == true){
            feed(this.player, this.cat3);
        }
        if(this.physics.arcade.overlap(this.player, this.cat4.sprite) == true){
            feed(this.player, this.cat4);
        }
        if(this.physics.arcade.overlap(this.player, this.cat5.sprite) == true){
            feed(this.player, this.cat5);
        }
        if(this.numcats == 0){
            quitgame();
        }

    },
    collect: function(player, fish){
        if(this.player_has == null && this.fish == this.redfish){
            this.player_has = 'redfish';
            this.fish.kill();
            this.redfishthere = false;
        }
        else if(this.player_has == null && this.fish == this.bluefish){
            this.player_has = 'bluefish';
            this.fish.kill();
            this.bluefishthere = false;
        }
    },
    feed: function(player, cat){
        if(this.player_has == this.cat.wants){
            this.cat.has == true;
            this.player.has == null;
            this.num_cats--;
            this.cat.think.kill();
            
        }
        else if((this.player_has != this.cat.wants) && this.cat.has == false){
            this.angrycat(cat);
        }
    },
    makecat: function(cat){
            this.catnum = this.game.rnd.integerInRange(1, 3);
            this.x = this.rnd.integerInRange(200, 500);
            this.y = this.rnd.integerInRange(700, 750);
            if(this.catnum == 1){
                this.cat.sprite = this.add.sprite(this.x, this.y, 'pink');
            }
            else if(this.catnum == 2){
                this.cat.sprite = this.add.sprite(this.x, this.y, 'grey');
            }
            else if(this.catnum == 3){
                this.cat.sprite = this.add.sprite(this.x, this.y, 'brown');
            }
            this.catnum = this.rnd.integerInRange(1,2);
            if(this.catnum == 1){
                this.cat.wants = 'red';
                this.cat.think = this.add.sprite(this.x, this.y-40, 'redfishbubble');
            }
            else{
                this.cat.wants = 'blue';
                this.cat.think = this.add.sprite(this.x, this.y-40, 'bluefishbubble');
            }
            this.physics.enable(this.cat.sprite, Phaser.Physics.ARCADE);
            this.cat.sprite.body.collideWorldBounds = true;
            this.cat.sprite.animations.add('down', [8,9,10,11], 10, true);
            this.cat.sprite.animations.add('left', [4, 5, 6, 7], 10, true);
            this.cat.sprite.animations.add('up', [12,13,14,15,16], 10, true);
            this.cat.sprite.animations.add('right', [0,1,2,3], 10, true);
        
            this.cat.timer = this.time.create(false);
            this.catnum = this.rnd.integerInRange(10000, 60000);
            this.cat.timer.loop(this.catnum, this.angrycat(cat), this);
    },
    angrycat: function(cat){
            this.cat.sprite.animations.play('right');
            this.cat.sprite.body.velocity.x(400);
            this.cat.sprite.kill();
            this.cat.think.kill();
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
        this.state.start('MainMenu');

    },


};
