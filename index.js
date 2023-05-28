let character = document.getElementById('character');
let characterBottom = parseInt(window.getComputedStyle(character).getPropertyValue('bottom'));
let characterRight = parseInt(window.getComputedStyle(character).getPropertyValue('right'));
let characterWidth = parseInt(window.getComputedStyle(character).getPropertyValue('width'));

let ground = document.getElementById('ground');
let groundBottom = parseInt(window.getComputedStyle(ground).getPropertyValue("bottom"));
let groundHeight = parseInt(window.getComputedStyle(ground).getPropertyValue("height"));
let isJumping = false;
let btn = document.querySelector(".btn");
let upTime;
let downTime;
let displayScore = document.getElementById("score");
const highScoreElement = document.querySelector(".high-score");
let score = 0;
let highScore = localStorage.getItem("high-score") || 0;

function jump(){
    if(isJumping) return;
    upTime = setInterval(()=>{
        if(characterBottom >= groundHeight + 250){
            clearInterval(upTime);
            downTime = setInterval(()=>{
                if(characterBottom <= groundHeight + 0){
                    clearInterval(downTime);
                    isJumping = false;
                }
                characterBottom -= 10;
                character.style.bottom = characterBottom + 'px';

            },20);
        }
        characterBottom += 10;
        character.style.bottom = characterBottom + 'px';
        isJumping = true;
    },20);
}

function showScore(){
    score++;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("high-score",highScore);
    highScoreElement.innerText = `High Score : ${highScore}`;
   
    displayScore.innerText = score;
}
setInterval(showScore,100);

function generateObstacle(){
    let obstacles = document.querySelector(".obstacles");
    let obstacle = document.createElement("div");
    obstacle.setAttribute("class","obstacle");
    obstacles.appendChild(obstacle);
    

    let randomTimeout = Math.floor(Math.random() * 1000) + 1000;

    let obstacleRight = -30;
    let obstacleBottom = 100;
    let obstacleWidth = 30;
    let obstacleHeight = Math.floor(Math.random() * 50) + 50;
    obstacle.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)})`;

    function moveObstacle(){
        obstacleRight += 5;
        obstacle.style.right = obstacleRight + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        obstacle.style.width = obstacleWidth + 'px';
        obstacle.style.height = obstacleHeight + 'px';
        if(characterRight >= obstacleRight - characterWidth && characterRight <= obstacleRight + obstacleWidth && characterBottom <=obstacleBottom + obstacleHeight){
            alert("Game Over !!");
            clearInterval(obstacleInterval);
            clearTimeout(obstacleTimeout);
            location.reload();

        }
    }
    let obstacleInterval = setInterval(moveObstacle,30);
    let obstacleTimeout = setTimeout(generateObstacle,1500);
}
generateObstacle();




function control(e){
    if(e.key == '1' || e.key == ''){
        jump();
    }
}

document.addEventListener('keydown',control);


btn.addEventListener("click",function(){
    jump();
});

