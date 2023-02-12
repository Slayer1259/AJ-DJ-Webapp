song = "";
leftWristX = 0;
rightWristX = 0;
leftWrsitY = 0;
rightWristY = 0;
score_leftWrist = 0;
score_rightWrist = 0;

function preload() {
    song = loadSound("music.mp3");
}


function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modeLoaded);
    poseNet.on('pose', gotPoses);
}

function modeLoaded() {
    console.log("Model is Loaded");
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if (score_leftWrist > 0.1) {

        circle(leftWristX, leftWrsitY, 20);
        numerical_leftwristY = Number(leftWrsitY);
        removedecimal = floor(numerical_leftwristY);
        leftWrist_five = removedecimal / 500;
        song.setVolume(leftWrist_five);
        document.getElementById("volume").innerHTML = "volume = " + leftWrist_five;
    }
    if (score_rightWrist > 0.1) {
        circle(rightWristX, rightWristY, 20);

        if (rightWristY > 0 && rightWristY <= 100) {
            song.rate(0.5);
            document.getElementById("speed").innerHTML = "speed = 0.5x ";
        }
        else if (rightWristY > 100 && rightWristY <= 200) {
            song.rate(1);
            document.getElementById("speed").innerHTML = "speed = 1x ";
        }
        else if (rightWristY > 200 && rightWristY <= 300) {
            song.rate(1.5);
            document.getElementById("speed").innerHTML = "speed = 1.5x ";
        }
        else if (rightWristY > 300 && rightWristY <= 400) {
            song.rate(2);
            document.getElementById("speed").innerHTML = "speed = 2x ";
        }
        else if (rightWristY > 400 && rightWristY <= 500) {
            song.rate(2.5);
            document.getElementById("speed").innerHTML = "speed = 2.5x ";
        }
    }
}
function play() {
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        leftWrsitY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftwrist = " + leftWristX, leftWrsitY);
        console.log("rightwrist = " + rightWristX, rightWristY);
        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;
    }
}
