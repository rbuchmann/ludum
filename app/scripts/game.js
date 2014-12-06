
var velocity = 0;
var cursors;

function preload() {
}

function create() {
}

function update() {
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

module.exports = {
  create: function(){
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

    cursors = game.input.keyboard.createCursorKeys();

    return game;  
  }
}
