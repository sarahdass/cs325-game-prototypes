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
    this.facing = 'left';
    this.cat1 = null;
    this.cat2 = null;
    this.cat3 = null;
    this.cat4 = null;
    this.cat5 = null;
    
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
        //this.bouncy.events.onInputDown.add( function() { this.quitGame(); }, this );
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
        
        this.player = this.add.sprite(300, 300, 'girl');
        this.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('down', [0,1,2,3,], 10, true);
        this.player.animations.add('left', [4, 5, 6, 7], 10, true);
        this.player.animations.add('up', [8, 9, 10, 11], 10, true);
        this.player.animations.add('right', [12, 13, 14, 15], 10, true);
        
        this.cursors = this.input.keyboard.createCursorKeys();
        
        
        //create 5 seperate cats:
            this.createcats(this.cat1);
            this.createcats(this.cat2);
            this.createcats(this.cat3);
            this.createcats(this.cat4);
            this.createcats(this.cat5);
    },

    update: function () {

        this.physics.arcade.collide(this.player, this.layer);
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
    
    createcats: function(cat){
            this.catnum = this.rnd.integerInRange(1, 3);
            if(this.catnum == 1){
                this.cat1 = this.add.sprite(this.rnd.integerInRange(400, 750), this.rnd.integerInRange(400, 750), 'pink');
            }
            else if(this.catnum == 2){
                this.cat = this.add.sprite(this.rnd.integerInRange(400, 750), this.rnd.integerInRange(400, 750), 'grey');
            }
            else if(this.catnum == 3){
                this.cat = this.add.sprite(this.rnd.integerInRange(400, 750), this.rnd.integerInRange(400, 750), 'brown');
            }
            this.physics.enable(this.cat1, Phaser.Physics.ARCADE);
            this.cat.body.collideWorldBounds = true;
            this.cat.animations.add('down', [8,9,10,11], 10, true);
            this.cat.animations.add('left', [4, 5, 6, 7], 10, true);
            this.cat.animations.add('up', [12,13,14,15,16], 10, true);
            this.cat.animations.add('right', [0,1,2,3], 10, true);
   }
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //this.bouncy.rotation = this.game.physics.arcade.accelerateToPointer( this.bouncy, this.game.input.activePointer, 500, 500, 500 );
    },

    quitGame: function () {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        this.state.start('MainMenu');

    }

};
