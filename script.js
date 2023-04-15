let gameSound= new Audio("music.mp3");
let moveSound= new Audio("move.mp3");
let foodSound= new Audio("food.mp3");
let gameoverSound= new Audio("gameover.mp3");
let snakeArr=[
    {x:5, y:7}
]
let food={x:Math.round(2+16*Math.random()),y:Math.round(2+16*Math.random())}
let Displace={x:0 , y:0}
let lasttime=0;
let speed=9;
let score=0;

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lasttime)/1000 < 1/speed){
        return;
    }
    lasttime=ctime;
    gameEngine();
}
function isgameover(snakeArr){
    if(snakeArr[0].x>18 ||snakeArr[0].x<0 || snakeArr[0].y>18 || snakeArr[0].y<0){
        return true;
    }
    for(let i=1;i<snakeArr.length;i++){
        if(snakeArr[0].x===snakeArr[i].x && snakeArr[0].y===snakeArr[i].y){
            return true;
        }
    }
    return false;
}

function gameEngine(){
    // Display Snake and food
    let board=document.querySelector('.board');
    board.innerHTML="";
    snakeArr.forEach((e,index) => {
        let snakeEle=document.createElement('div');
        snakeEle.style.gridRowStart=e.y;
        snakeEle.style.gridColumnStart=e.x;
        if(index===0){
            snakeEle.classList.add('head');
        }
        else{
            snakeEle.classList.add('body');
        }
        board.appendChild(snakeEle);
    })
    let foodEle=document.createElement('div');
    foodEle.style.gridRowStart=food.y;
    foodEle.style.gridColumnStart=food.x;
    foodEle.classList.add('food');
    board.appendChild(foodEle);

    //Check Gameover
    if(isgameover(snakeArr)){
        Displace={x:0, y:0}
        snakeArr=[
            {x:5, y:7}
        ]
        gameoverSound.play();
        info.innerText="Game Over";
        board.style.display='none';
    }
    //Check Food Eaten or not
    if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
        snakeArr.unshift({x: snakeArr[0].x + Displace.x , y: snakeArr[0].y + Displace.y})
        food={x:Math.round(2+16*Math.random()),y:Math.round(2+16*Math.random())}
        foodSound.play();
        score+=1;
        Score.innerText="Your Score is: "+ score;
    }
    
    //Snake move
    for (let i = snakeArr.length-2 ; i>=0 ; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
        
    }
    snakeArr[0].x+=Displace.x;
    snakeArr[0].y+=Displace.y;
}



let board=document.querySelector('.board');
start.addEventListener('click',() => {
    start.style.display='none';
    window.requestAnimationFrame(main);
    window.addEventListener('keydown', e => {
        
        switch (e.key) {
            case "ArrowUp":
                moveSound.play();
                Displace.x=0;
                Displace.y=-1;
                break;
            case "ArrowDown":
                moveSound.play();
                Displace.x=0;
                Displace.y=1;
                break;
            case "ArrowRight":
                moveSound.play();
                Displace.x=1;
                Displace.y=0;
                break;
            case "ArrowLeft":
                moveSound.play();
                Displace.x=-1;
                Displace.y=0;
                break;
            default:
                break;
        }
    })
})