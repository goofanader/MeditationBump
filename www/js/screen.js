var stage;

function stageSetup() {
    stage = new createjs.Stage("gameScreen");

    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
    
    
    var circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 10);
    circle.x = stage.canvas.width/2;
    circle.y = stage.canvas.height/2;
    stage.addChild(circle);
    stage.update();
    // the pressmove event is dispatched when the mouse moves after a mousedown on the target until the mouse is released.
    circle.on("mousedown", function (evt) {
    this.parent.addChild(this);
    this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
});

    circle.on("pressmove", function (evt) {
       this.x = evt.stageX + this.offset.x;
       this.y = evt.stageY + this.offset.y;
       // indicate that the stage should be updated on the next tick:
       update = true;
    });

    createjs.Ticker.addEventListener("tick", tick);

    function tick(event) {
        // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
        if (update) {
            update = false; // only update once
            stage.update(event);
        }
    }
}