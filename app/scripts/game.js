var velocity = 0;
var cursors;
var playerAlive = false;
var game;
var mouse;
var mouseCursor;

var bee = require('./bee');
var player = require('./player');
var level = require('./level');

function preload() {
  game.load.image('zombee', 'assets/zombee/zombee_0.png');
//  game.load.image('zombee', 'assets/zombee.jpg');
  game.load.image('ant', 'assets/antball.png');
  game.load.image('cursor1', 'images/cursor1.png');
  game.load.image('cursor2', 'images/cursor2.png');
}

var points = [[0, 0], [100, 0], [50, 100]];


function create() {
  cursors = game.input.keyboard.createCursorKeys();
  mouse = game.input.mousePointer;
  game.world.setBounds(0, 0, 3000, 3000); 
  game.physics.startSystem(Phaser.Physics.P2JS);
  game.physics.p2.gravity.y = 1000;
  game.physics.p2.setImpactEvents(true);
  game.physics.p2.restitution = 0.8;
  playerAlive = true;
  player.init(game);
  player.addPlayer(100, 100);
  level.init(game, player);
  bee.init(game);
  bee.addBee(300, 200);
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
  player.move(velocity, 0);
  bee.updateBees();
}

module.exports = {
  create: function(){
    game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
  },
  game: game
};
