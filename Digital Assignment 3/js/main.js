"use strict";

function make_main_game_state( game )
{
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/phaser.png' );
    }
    
    var bouncy;
    
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
        var skey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        text.anchor.setTo( 0.5, 0.0 );
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
        
        skey.isDown.addOnce(this.end, this);
    }
    function end(){
        game.state.start('menu');
    }
    
    return { "preload": preload, "create": create, "update": update };
}


function endState(game) {

	function create() {
        var name = game.add.text(80, 80, 'End of game', {font: '50px Arial', fill: '#ffffff' });
        var start = game.add.text(25, 25, 'Press S to go to menu', {font: '25px Arial', fill: '#ffffff' });
        var skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
        skey.isDown.addOnce(this.startGame, this);
    }

	function startGame(pointer) {
		this.state.start('menu');
	}
};
function menuState(game) {
  function create(){
    var name = game.add.text(80, 80, 'Game', { font: '84px Arial', fill: '#fff' });
    var start = game.add.text(80, game.world.height-80, 'Press S to start', { font: '25px Arial', fill: '#ffffff' });
    var skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    skey.isDown.addOnce(this.start, this);
  }
  function start(){
    game.state.start('main');
  }
};
window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );
    game.state.add('menu', menuState(game));
    game.state.add( "main", make_main_game_state( game ) );
    game.state.add('end', endState(game));
    
    game.state.start( "menu" );
};
