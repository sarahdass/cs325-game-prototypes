var loadState{
  preload: function(){
    var loadlabel = game.add.text(80, 150, 'loading...', {font: '30px Ariel', fill: '#ffffff'});
    game.load.image('logo', 'assets/phaser_logo.png');
  },
  create: function(){
    game.state.start.('menu');
  }
};

