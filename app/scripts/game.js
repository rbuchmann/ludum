

function preload() {
}

function create() {
}

function update() {
}

module.exports = {
  create: function(){
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
    return game;  
  }
}
