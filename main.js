song1="";
song2="";
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
scoreleftWrist=0;
scorerightWrist=0

function preload(){
song1=loadSound("Harry_Potter_Theme_Song.mp3");
song2=loadSound("taki_taki.mp3");
}

function setup(){
canvas=createCanvas(600,350);
canvas.position(350,300);

video=createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video , modelloded);
poseNet.on('pose', gotPoses);
}

function modelloded(){
    console.log("PoseNet Is Loaded");
}

function draw(){
image(video,0,0,600,350);
fill('black');
stroke('black');
if(scorerightWrist > 0.2){
circle(rightWristx,rightWristy,20);
song1.stop();
song2.play();
document.getElementById("song_name").innerHTML="song name =" + "taki_taki";
}

if(scoreleftWrist > 0.2){
    circle(leftWristx,leftWristy,20);
    song2.stop();
    song1.play();
    document.getElementById("song_name").innerHTML="song name =" + "Harry_Potter_Theme_Song";
    }
}


function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scorerightWrist = results[0].pose.keypoints[10].score;
        scoreleftWrist = results[0].pose.keypoints[9].score;
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log(" leftWristx =" + leftWristx + " leftWristy =" +  leftWristy);

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log(" rightWristx =" + rightWristx + " rightWristy =" +  rightWristy);
    }
}

function play1(){
    song1.play();
}

function play2(){
    song2.play();
}

function stop1(){
    song1.stop();
}

function stop2(){
    song2.stop();
}


