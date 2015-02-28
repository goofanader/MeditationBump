function stageSetup() {
    var desires = [];
    stage = new createjs.Stage("gameScreen");

    
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
    
    createjs.Touch.enable(stage);
    
    
    game = new Game(stage);

    monk = new Monk(new Vector(0, 0), new Vector(0, 0), 1, 1);
    monk.step(1, 2);
    
    desires.push(new Desire(new Vector(3, 3), new Vector(0, 0), 1, 1));
    desires.push(new Desire(new Vector(300, 3), new Vector(0, 0), 1, 1));

    stage.update();

    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(30);

    function tick(event) {
        // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
        if (update) {
            update = false; // only update once
            stage.update(event);
        }
        for (var i = 0; i < desires.length; i++) {
           desires[i].update(monk);   
        }
    }
}