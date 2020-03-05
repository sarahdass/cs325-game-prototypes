"use strict";


GameStates.makePreloader = function(game) {

	var background = null;
	var preloadBar = null;

	var ready = false;

	return {

		preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
			background = this.add.sprite(0, 0, 'preloaderBackground');
			preloadBar = this.add.sprite(300, 400, 'preloaderBar');

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
			game.load.setPreloadSprite(preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
			game.load.image('titlePage', 'assets/title.jpg');
			game.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
			game.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
			game.load.audio('levelone', 'assets/Casual game track.mp3');
			game.load.audio('menu', 'assets/gone_fishin_by_memoraphile_CC0.mp3');
			//this.load.image('rainbow', 'assets/rainbow1.jpg');
			game.load.image('mountain', 'assets/mountain.jpg');
			//	+ lots of other required assets here
			game.load.image( 'logo', 'assets/phaser.png' );
			
			game.load.spritesheet('chicken', 'assets/chicken.png', 64, 64);
			game.load.image('crate', 'assets/cratetex.png');
			game.load.image('BridgeTiles', 'assets/BridgeTiles.png');
			game.load.image('dark_bridgetiles', 'assets/dark_bridgetiles.png');
			game.load.image('tilesetOpenGame', 'assets/tilesetOpenGame.png');
			game.load.image('grass', 'assets/grass.png');
			game.load.tilemap('barn', 'assets/barn.json', null, Phaser.Tilemap.TILED_JSON);
			game.load.image('star', 'assets/Blue Star.png');
			game.load.spritesheet('dog', 'assets/dog_brown.png', 136, 80);
			game.load.tilemap('outside', 'assets/outside.json', null, Phaser.Tilemap.TILED_JSON);
			game.load.image('big_crate', 'assets/big_crate.png');
		},	

		create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
			preloadBar.cropEnabled = false;

		},

		update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		
			if (game.cache.isSoundDecoded('titleMusic') && ready == false)
			{
				ready = true;
				game.state.start('MainMenu');
			}

		}	
	};
};
