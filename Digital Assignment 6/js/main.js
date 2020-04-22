"use strict";

window.onload = function() {

	//	Create your Phaser game and inject it into the 'game' div.
	//	We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
	var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );

	//	Add the States your game has.
	//	You don't have to do this in the html, it could be done in your Boot state too, but for simplicity I'll keep it here.
	game.state.add('Boot', GameStates.makeBoot(game));
	game.state.add('Preloader', GameStates.makePreloader(game));
	game.state.add('MainMenu', GameStates.makeMainMenu(game));
	game.state.add('Game', GameStates.makeGame(game));
	game.state.add('Level 2', GameStates.makeLevel2(game));
	game.state.add('endGame', GameStates.makeendGame(game));
	game.state.add('controls', GameStates.makecontrols(game));
	//	Now start the Boot state.
	game.state.start('Boot');

};
