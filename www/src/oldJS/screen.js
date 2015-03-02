

var desires = []; // List of desires on screen.
var gameRunning = false;
var startDesire;
var score = 0;
var scoreText; 
var instructionText;

function stageSetup() {
    // get a reference to the canvas we'll be working with:
    canvas = document.getElementById("gameScreen");
    
    // set canvas width
    canvas.width = window.innerWidth;
    
    // set canvas height
    canvas.height = window.innerHeight;
    
    stage = new createjs.Stage(canvas);
    
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
    
    // Enable touchscreen
    createjs.Touch.enable(stage);
    
    background = new createjs.Container();
    stage.addChild(background);
    
    var img = new Image();
    img.onload = function(){
        // create a new bitmap object, and set image to bitmap
        var bitmap = new createjs.Bitmap(img);
        // set bitmap x location in canvas
        bitmap.x = 0;
        // set bitmap y location in canvas
        bitmap.y = 0;
        
        bitmap.scaleX = canvas.width / img.width;
        bitmap.scaleY = canvas.height / img.height;
        // add the bitmap as a child of the stage. This means it will be drawn any time the stage is updated
        // and that its transformations will be relative to the stage coordinates:
        background.addChild(bitmap);
        // call update on the stage to make it render the current display list to the canvas:
        stage.update();
    };
    // set image source
    img.src = "img/background/Background.png";
    
    // setup sound
    var preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);  
    createjs.Sound.initializeDefaultPlugins();
    
    var gameMusic;
    
    preload.on("fileload", handleFileLoad);
    preload.on("progress", handleFileProgress);
    preload.on("complete", loadComplete);
    preload.on("error", loadError);
    
    //preload.loadManifest([{id: "sound/Song.wav", src: "sound/Song.wav"}]);
 
    function handleFileLoad(event) {
        console.log("A file has loaded of type: " + event.item.type);
        /*if(event.item.id == "logo"){
            console.log("Logo is loaded");
            //create bitmap here
        }*/
        /*if (event.item.type == "sound") {
            gameMusic = 
        }*/
    }


    function loadError(evt) {
        console.log("Error!",evt.text);
    }


    function handleFileProgress(event) {
        //progressText.text = (preload.progress*100|0) + " % Loaded";
        //stage.update();
    }

    function loadComplete(event) {
        console.log("Finished Loading Assets");
    }
    
    createjs.Sound.initializeDefaultPlugins();
    createjs.Sound.registerPlugins([createjs.HTMLAudioPlugin, createjs.WebAudioPlugin, createjs.FlashAudioPlugin]);
    createjs.Sound.alternateExtensions = ["mp3"];
    //var myInstance = createjs.Sound.play("sound/Song.wav");
    //createjs.Sound.play("sound/Song.wav");
    //createjs.Sound.on("fileload", createjs.proxy(this.loadHandler, (this)));
    createjs.Sound.addEventListener("fileload", handleFileLoad);
    //createjs.Sound.addEventListener("complete", handleSongComplete);
    
    function handleFileLoad(event) {
        console.log("loading music...");
         // This is fired for each sound that is registered.
         var instance = createjs.Sound.play("gameMusic", {loop:-1});  // play using id.  Could also use full source path or event.src.
         instance.on("complete", createjs.proxy(this.handleComplete, this));
         instance.volume = 0.5;
        console.log("Preloaded:", event.id, event.src);
    }
    
    /*function handleSongComplete(event) {
        console.log("song is complete");
        var instance = createjs.Sound.play("gameMusic");
        instance.on("complete", createjs.proxy(this.handleComplete, this));
         
        instance.volume = 0.5;
        console.log("Replaying gameMusic");
    }*/
    
    createjs.Sound.registerSound("sound/Song.wav","gameMusic");
    
    game = new Game(stage);
	
	// pos, vel, mass, radius
    monk = new Monk(new Vector(stage.canvas.width/2, stage.canvas.height/2), new Vector(0, 0), 8, 50);
    
    projection = new Projection(new Vector(stage.canvas.width/2, stage.canvas.height/2), new Vector(0, 0), 8, 50);

    startDesire = new Desire(new Vector(stage.canvas.width/2, stage.canvas.height/4), new Vector(0, 0), 10, 10, "Start.png");
    
    scoreText = new createjs.Text("--- Desires Avoided", "bold 18px Arial", "#000");
    scoreText.x = 10;
    scoreText.y = stage.canvas.height - 30;
    
    instructionText = new createjs.Text("Drag monk and launch to start", "bold 14px Arial", "#000");
    instructionText.textAlign = "center";
    instructionText.x = stage.canvas.width/2;
    instructionText.y = stage.canvas.height -stage.canvas.height/3;
    
    stage.addChild(scoreText);
    stage.addChild(instructionText);
    stage.update();

    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(60);

    function tick(event) {
        // Randomly generate a desire.
        if (!gameRunning) {
            if (startDesire.collision_check(projection)) {
                gameRunning = true;
                stage.removeChild(startDesire.bitmap);
                stage.removeChild(instructionText);
                score = 0;
            }
        }
        else if (Math.random() < 0.05 && desires.length < 4) {
			// Random position
            var start;
            if (Math.random() < 0.5) {
                if (Math.random() < 0.5) {
			         start = new Vector(Math.ceil(Math.random() * stage.canvas.width), 0);
                }
                else {
                    start = new Vector(Math.ceil(Math.random() * stage.canvas.width), stage.canvas.height);
                }
            }
            else {
                if (Math.random() < 0.5) {
			         start = new Vector(0, Math.ceil(Math.random() * stage.canvas.height/4));
                }
                else {
                    start = new Vector(stage.canvas.width, Math.ceil(Math.random() * stage.canvas.height/4));
                }
            }
                // pos, vel, mass, radius
            desires.push(new Desire(start, monk.position.sub(start).norm().scale(0.2 + Math.random() * 1.5), 1, 10));
        }
        
        // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
        /*if (update) {
            update = false; // only update once
            stage.update(event);
        }*/
        
                
        // Update projection
        projection.update(monk);
        
        // Update desires
        for (var i = 0; i < desires.length; i++) {
            
            // Remove desire if its off screen.
           if(false == desires[i].update(monk)) {
               stage.removeChild(desires[i].bitmap);
               desires.splice(i--, 1);
               score++;
           }
		   
		   // Game over if collided with Monk.
		   else if(monk.collision_check(desires[i])) {
               //GAME OVER
               for (var j = 0; j < desires.length; j++) {
                  stage.removeChild(desires[j].bitmap);
               }
               desires = [];
               gameRunning = false;
               startDesire = new Desire(new Vector(stage.canvas.width/2, stage.canvas.height/4), new Vector(0, 0), 10, 10, "Game_Over.png");
               instructionText.text = "Hit the game over bubble to continue meditating."
               stage.addChild(instructionText);
               break;
		   }		   
		   // Collide astral projection with desires
		   else if(!projection.flyingProjection && desires[i].collision_check(projection)) {
			   desires[i].collide(projection);
		   }
		   
        }
        
        scoreText.text = score + " Desires Avoided";
        
        stage.update(event);
    }
}