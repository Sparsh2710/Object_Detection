img = "";

status = "";
objects = [];

function preload() {
    img = loadImage('dog_cat.jpg');
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "STATUS : Detecting Object";
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(results, error) {
    if(error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects = results;
        objects[0].label;
        objects[0].width
    }
}

function draw() {
    image(img, 0, 0, 640, 420);
    
    if(status != "") {
        for(i = 0; i < objects.lenght; i++) {
            document.getElementById("status").innerHTML = "STATUS : Objects Detected";
            console.log("DRAWING");

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
