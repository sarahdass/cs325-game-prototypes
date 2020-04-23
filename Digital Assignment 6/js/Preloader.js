"use strict";

GameStates.makePreloader = function(game){
	var background = null;
	var preloadBar = null;

	var ready = false;

	return {

		preload: function () {
			background = this.add.sprite(0, 0, 'leafbg');
			preloadBar = this.add.sprite(300, 400, 'preloaderBar');
			game.load.setPreloadSprite(preloadBar);
			
			game.load.spritesheet('girl', 'assets/girl.png', 77, 64);
			game.load.tilemap('level 1 map', 'assets/level 1.json', null, Phaser.Tilemap.TILED_JSON);
			game.load.tilemap('level 2 map', 'assets/level 2 map.json', null, Phaser.Tilemap.TILED_JSON);
			game.load.image('level 1', 'assets/level 1.png');
			game.load.image('level 2', 'assets/level 2.png');
			game.load.image('sky', 'assets/sky.png');
			game.load.image('level 2 foreground', 'assets/level 2 foreground.png');
			game.load.image('star', 'assets/Blue Star.png');
			game.load.image('box', 'assets/box.jpg');
			game.load.image('bigbox', 'assets/bigbox.jpg');
			game.load.image('endgame', 'assets/endgame.jpg');
			game.load.image('menu', 'assets/menu.jpg'); 
			game.load.image('titlePage', 'assets/title.jpg');
			game.load.image('key', 'assets/key.png');
			game.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
			game.load.atlas('controlButton', 'assets/control_button.png', 'assets/play_button.json');
			game.load.image('controls', 'assets/controls.png');
			game.load.audio('level1music', ['assets/Troubled Forest.mp3']);
			game.load.audio('menuMusic', ['assets/forestismagic.mp3']);
			game.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
			game.load.audio('level2music', ['assets/012_Sirens_in_Darkness.mp3']);
			game.load.image( 'logo', 'assets/phaser.png' );
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
			
			if (this.cache.isSoundDecoded('menuMusic') && ready == false)
			{
				this.ready = true;
				this.state.start('MainMenu');
			}

		}
	};
};
