
var endState = {
  create: function(){
    var name = game.add.text(80, 80, 'End of game', {font: '50px Ariel', fill: '#ffffff' });
    var start = game.add.text(25, 25, 'Press S to start', {font: '25px Ariel', fill: '#ffffff' });
    var skey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    skey.isDown.addOnce(this.start, this);
  }
  start: function() {
    game.state.start('menu');
  }
};
