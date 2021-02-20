import something from './lib.js';
import Dinosaur from './dinosaur.js';
import Cactus from './cactus.js';

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
    // global
    Root.canvas = canvas;
    Root.ctx = ctx;
    Root.state = {
      input: {}
    };
    // setting
    Root.state.interval = 17;
    Root.state.fps = 60;

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
    Root.state.elapsedTime = 0;
    Root.state.cntFrame = 0;
    Root.state.nextStuff = 0;
    Root.state.speed = 200;

    // practice()

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
    Root.ctx.fillText(`frame: ${Root.state.cntFrame}, time: ${numberWithCommas(Root.state.elapsedTime)}`, 600, 20, 200);  
    Root.ctx.fillText(`stuffs: ${stuffs.length}`, 600, 40, 200);  
}

function startGameloop() {
    var timerId = null;
    const startTime =  performance.now();
    let stuffs = [
    ];
    let cntFrame = 0;
    function gameloop() {
        Root.state.elapsedTime = Math.floor( performance.now() - startTime);
        if (Root.state.input.Space) {
            Root.dinosaur.jump();
        }
        if (Root.state.input.Escape) {
            clearInterval(timerId);
        }
        //console.log('gameloop');
        //console.log(elapsedTime);
        // Root.dinosaur.step()
        Root.dinosaur.step();
        for (var s of stuffs) {
           s.step();
        }
        // Append stuffs
        appendStuffs(stuffs);
        // Garbage Collection

        stuffs = stuffs.filter((s) => s.isDisplay());
        // for (var i=stuffs.length-1; i>0; i--) {
        //     if (stuffs[i].isDisplay() === false) {
        //         stuffs.splice(i, 1)
        //     }
        // }

        // Draw
        draw(stuffs);
        cntFrame += 1;
        Root.state.cntFrame = cntFrame;

        //collision check
        if(stuffs.some((stuff) => (Root.dinosaur.isCollided(stuff)))){
            console.log("collided!!!")
            clearInterval(timerId);
        }
        
    }
    timerId = setInterval(gameloop, Root.state.interval)
}

function appendStuffs(stuffs){
    //nextStuffが0以下で処理を行う
    if(Root.state.nextStuff <= 0 ){
        stuffs.push(new Cactus(Root));
        Root.state.nextStuff = Math.random() * (300 - 60) + 60
    }
    Root.state.nextStuff -= 1;
}

function practice() {
    function ClassA(val) {

        this.member1 = val;
        return this;
    }

    function ClassB(val) {
        ClassA.call(this, 2);
        this.member2 = val;
        return this;
    }
    var c1 = new ClassA(1);
    var c2 = new ClassA(2);
    var c3 = new ClassB(3);

    //console.log(c1)
    //console.log(c2)
    //console.log(c3)

    const img = Root.ctx.createImageData(32, 32);
    for (var i = 0; i < img.data.length; i+= 4) {
        img.data[i+0] = 200; //R
        img.data[i+1] = 100; //G
        img.data[i+2] = 100; //B
        img.data[i+3] = 240; //A
    }
    Root.ctx.putImageData(img, 200, 0);


}

window.addEventListener('DOMContentLoaded', e => {
    run()
});