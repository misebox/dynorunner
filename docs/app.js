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

    const buffer = document.getElementById('buffer');
    const bufferCtx = canvas.getContext('2d');

    // global
    Root.canvas = canvas;
    Root.ctx = ctx;
    Root.buffer = {
      canvas: buffer,
      ctx: bufferCtx,
    };
    Root.state = {
      input: {},
      elapsedTime: 0,
      cntFrame: 0,
      nextStuff: 0, 
      speed: 400,
      interval: 17,
      fps: 60,
      score: 0,
      looped: false,
    };
    // setting

    // input
    document.body.addEventListener('keydown',(e) => {
        Root.state.input[e.code] = true;
        if (e.code === "Enter"){
            console.log("Enter");
            if(Root.state.looped === false){
                startGameloop();
            }
          }
    });
    document.body.addEventListener('keyup',(e) => {
        Root.state.input[e.code] = false;
    });

    // dinosaur
    Root.dinosaur = new Dinosaur(Root);

    // practice()

    startGameloop();
    console.log('run end')
}

function draw(stuffs) {
    const buf = Root.buffer;
    buf.ctx.clearRect(0, 0, Root.canvas.width, Root.canvas.height);
    buf.ctx.putImageData(Root.dinosaur.img, Root.dinosaur.x, Root.dinosaur.y);
    for (var s of stuffs) {
        buf.ctx.putImageData(s.img, s.x, s.y);
    }
    drawStatus(stuffs)
    // const dino = Root.dinosaur;
    // Root.ctx.putImageData(dino.img, dino.x, dino.y);
    // drawStatus()
    //console.log('drew');
    const img = buf.ctx.getImageData(0, 0, 599, 149);
    buf.ctx.putImageData(img, 0, 0);
}

function drawStatus(stuffs) {
    const buf = Root.buffer;
    buf.ctx.fillStyle = 'black';
    buf.ctx.font = '14px sans-serif';
    buf.ctx.textAlign = 'right';
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    buf.ctx.fillText(`score: ${Root.state.score}`, 600, 20, 200);  
    buf.ctx.fillText(`frame: ${Root.state.cntFrame}, time: ${numberWithCommas(Root.state.elapsedTime)}`, 600, 40, 200);
    buf.ctx.fillText(`stuffs: ${stuffs.length}`, 600, 60, 200);  
}

function startGameloop() {
    var timerId = null;
    const startTime =  performance.now();
    let stuffs = [];
    let prevScoreTime = 0;
    // should be included in settings?
    //Root.stateの初期化
    Root.state.score = 0;
    Root.cntFrame = 0;
    Root.state.looped = true;
    let scoreInterval = 100;
    let speedUpThreshold = 100;
    let tmp = 0;
    async function gameloop() {
        //startTimeからの経過時間をカウント
        Root.state.elapsedTime = Math.floor( performance.now() - startTime);
        // console.log(
        //     'now', performance.now(),
        //     'diff', Root.state.elapsedTime - prevScoreTime,
        //     'elapsed', Root.state.elapsedTime,
        //     'prevScoreTime', prevScoreTime);
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
        stuffs.filter((s) => !s.isDisplay()).map(s => {
          Root.state.score += Math.floor(s.w * s.h / 100) ** 2;
        });
        stuffs = stuffs.filter((s) => s.isDisplay());
        // Draw
        draw(stuffs);
        Root.state.cntFrame += 1;

        //Collision Check
        if(stuffs.some((stuff) => (Root.dinosaur.isCollided(stuff)))){
            Root.dinosaur.death();
            console.log("collided!!!");
            //game over 表示
            Root.ctx.font = '48px sans-serif';
            Root.ctx.fillText("GAME OVER", 440, 100);  
            Root.ctx.font = '14px sans-serif';
            Root.ctx.fillText("PRESS ENTER KEY!!", 380, 130);
            clearInterval(timerId);
            Root.state.looped = false;
            return;
        }
        // できるだけ17msごとに実行するため、setTimeoutへの指定時間を調整する
        let untilNext = (Root.state.interval - (performance.now() - startTime - Root.state.elapsedTime));
        untilNext = untilNext < 0 ? 0 : untilNext;
        //console.log(untilNext);
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

function gameReset(){
    console.log("Game reset");
}

window.addEventListener('DOMContentLoaded', e => {
    run()
});