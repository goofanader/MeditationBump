function Game(gameScreen) {
    this.gameScreen = gameScreen;
    this.actors = [];
}

Game.prototype.addActor = function(actor) {
    this.actors.push(actor);
};

Game.prototype.update = function() {
    this.gameScreen.update();
};