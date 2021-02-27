import Dinosaur from './dinosaur.js';
import Cactus from './cactus.js';
import {practice} from './practice.js';

const Root = {};
function run() {
    const width = window.innerWidth;
    console.log('run start')
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
        //ctx.fillStyle = 'green';
        //ctx.fillRect(10, 100, 50, 50);
    }
    ctx.imageSmoothingEnabled = false;
    // global
    Root.canvas = canvas;
    Root.ctx = ctx;
    Root.state = {
      input: {},
      elapsedTime: 0,
      cntFrame: 0,
      nextStuff: 0, 
      speed: 200,
      interval: 17,
      fps: 60,
      score: 0,
    };
    // setting

    // input
    document.body.addEventListener('keydown',(e) => {
        if (e.code === "Space"){
          //console.log("space has down")
        }
        Root.state.input[e.code] = true;
    });
    document.body.addEventListener('keyup',(e) => {
        if (e.code === "Space"){
          //console.log("space has up")
        }
        Root.state.input[e.code] = false;
    });
    
    // dinosaur
    Root.dinosaur = new Dinosaur(Root);

    //practice()

    startGameloop();
    console.log('run end')
}

function draw(stuffs) {
    Root.ctx.clearRect(0, 0, Root.canvas.width, Root.canvas.height);
    Root.ctx.putImageData(Root.dinosaur.img, Root.dinosaur.x, Root.dinosaur.y);
    for (var s of stuffs) {
        Root.ctx.putImageData(s.img, s.x, s.y);
    }
    drawStatus(stuffs)
    // const dino = Root.dinosaur;
    // Root.ctx.putImageData(dino.img, dino.x, dino.y);
    // drawStatus()
    //console.log('drew');
}

function drawStatus(stuffs) {
    Root.ctx.fillStyle = 'black';
    Root.ctx.font = '14px sans-serif';
    Root.ctx.textAlign = 'right';
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    Root.ctx.fillText(`score: ${Root.state.score}`, 600, 20, 200);  
    Root.ctx.fillText(`frame: ${Root.state.cntFrame}, time: ${numberWithCommas(Root.state.elapsedTime)}`, 600, 40, 200);
    Root.ctx.fillText(`stuffs: ${stuffs.length}`, 600, 60, 200);  
}

function startGameloop() {
    var timerId = null;
    const startTime =  performance.now();
    let stuffs = [];
    let prevScoreTime = startTime;
    // should be included in settings?
    let scoreInterval = 100;
    let speedUpThreshold = 100;
    let tmp = 0;
    async function gameloop() {
        Root.state.elapsedTime = Math.floor( performance.now() - startTime);
        if ((Root.state.elapsedTime - prevScoreTime) >= scoreInterval) {
            Root.state.score += 1;
            prevScoreTime += scoreInterval;
            if (Root.state.score === speedUpThreshold) {
                scoreInterval *= 0.8;
                speedUpThreshold *= 2;
            }
        }
        if (Root.state.input.Space) {
            Root.dinosaur.jump();
        }
        if (Root.state.input.Escape) {
            //clearInterval(timerId);
            return;
        }
        //console.log('gameloop');
        //console.log(elapsedTime);
        Root.dinosaur.step();
        for (var s of stuffs) {
           s.step();
        }
        // Append stuffs
        appendStuffs(stuffs);
        // Garbage Collection
        stuffs = stuffs.filter((s) => s.isDisplay());
        // Draw
        draw(stuffs);
        Root.state.cntFrame += 1;

        //Collision Check
        if(stuffs.some((stuff) => (Root.dinosaur.isCollided(stuff)))){
            Root.dinosaur.death();
            console.log("collided!!!")
            clearInterval(timerId);
            return;
        }
        let untilNext = (Root.state.interval - (performance.now() - startTime - Root.state.elapsedTime));
        untilNext = untilNext < 0 ? 0 : untilNext;
        console.log(untilNext);
        timerId = setTimeout(gameloop, untilNext);
    }
    // timerId = setInterval(gameloop, Root.state.interval)
    timerId = setTimeout(gameloop, Root.state.interval);
}

function appendStuffs(stuffs){
    //nextStuffが0以下で処理を行う
    if(Root.state.nextStuff <= 0 ){
        const cactusType = Math.floor( Math.random() * 6 );
        stuffs.push(new Cactus(Root,cactusType));
        const distances = [60, 90, 120, 150, 240]
        Root.state.nextStuff = distances[Math.floor(Math.random() * distances.length)]
    }
    Root.state.nextStuff -= 1;
}


window.addEventListener('DOMContentLoaded', e => {
    run()
});