
var velocity = 0;
var cursors;
var playerAlive = false;

function preload() {
}

function create() {
  cursors = game.input.keyboard.createCursorKeys();
  playerAlive = true;
}

function update() {
  if (playerAlive) {
    if (cursors.left.isDown) {
      velocity = -100;
    }
    else if (cursors.right.isDown) {
      velocity = 100;
    }
    else {
      velocity = 0;
    }
  }
}

module.exports = {
  create: function(){
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    return game;  
  }
}
