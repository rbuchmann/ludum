var velocity = 0;
var cursors;
var playerAlive = false;
var game;
var mouse;
var mouseCursor;

var bee = require('./bee');
var player = require('./player');

function preload() {
//  game.load.image('zombee', 'assets/zombee.jpg');
  game.load.image('ant', 'images/cursor2.png');
  game.load.image('cursor1', 'images/cursor1.png');
  game.load.image('cursor2', 'images/cursor2.png');
}

function create() {
  cursors = game.input.keyboard.createCursorKeys();
  mouse = game.input.mousePointer;
  mouseCursor = game.add.sprite(mouse.x - 16, mouse.y - 16, 'cursor1');
  game.physics.startSystem(Phaser.Physics.ARCADE);
  playerAlive = true;
  bee.init(game);
  player.init(game);
  player.addPlayer(100, 100);
//  bee.addBee(200, 500);
}

function update() {
  mouseCursor.x = mouse.x - 16;
  mouseCursor.y = mouse.y - 16;
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
    game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
  },
  game: game
};
