var menuState = {
  create: function(){
    var name = game.add.text(80, 80, 'Game', {font: '50px Arial', fill: '#ffffff' });
    var start = game.add.text(80, game.world.height-80, 'Press S to start', {font: '25px Arial', fill: '#ffffff' });
    var skey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    skey.isDown.addOnce(this.start, this);
  },
  start: function() {
    game.state.start('main');
  }
};
