
"use strict";

GameStates.makeMainMenu = function(game) {

	var music = null;
	var playButton = null;
	var controlButton = null;
	function startGame(pointer) {

		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		game.music.stop();

		//	And start the actual game
		game.state.start('Level 2');

	}
	function controls(pointer){
		game.state.start('controls');
	}

	return {

		create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)

			game.music = this.add.audio('menuMusic');
			game.music.play();

			game.add.sprite(0, 0, 'menu');

			playButton = game.add.button( 303, 350, 'playButton', startGame, this, 'over', 'out', 'down');
			controlButton = game.add.button(303, 430, 'controlButton', controls, this, 'over', 'out', 'down');

		},

		update: function () {

		//	Do some nice funky main menu effect here

		}


	};
};
