function preload(){
    song = loadSound("music.mp3")
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses)
}

function modeLoaded(){
    console.log("poseNet is initialized!");
}

function gotPoses(results){
    if (results.lenght > 0){
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;

        rightWrist = results[0].pose.rightWrist.x;
        rightWrist = results[0].pose.rightWrist.y;

        leftWrist = results[0].pose.leftWrist.x;
        leftWrist = results[0].pose.leftWrist.y;
    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#ff0000")
    stroke("#ff0000")

    if (scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20)

        if (rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speed")= "velocidade = 0.5x"
            song.rate(0.5);
        }
        else if (rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed")= "velocidade = 1x"
            song.rate(1);
        }
            else if (rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed")= "velocidade = 1.5x"
            song.rate(1.5);
        }
                else if (rightWristY > 400){
            document.getElementById("speed")= "velocidade = 2.5x"
            song.rate(2.5);
        }
    }
}