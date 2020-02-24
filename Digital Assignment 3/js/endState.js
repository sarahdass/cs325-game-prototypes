
var endState = function (game) {

};

endState = {

	create: function () {
    var name = game.add.text(80, 80, 'End of game', {font: '50px Arial', fill: '#ffffff' });
    var start = game.add.text(25, 25, 'Press S to go to menu, {font: '25px Arial', fill: '#ffffff' });
    var skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    skey.isDown.addOnce(this.startGame, this);
  },

	startGame: function (pointer) {

		this.state.start('menu');

	}

};
