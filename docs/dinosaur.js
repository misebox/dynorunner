import {jumpSound, deathSound} from './sound.js';
import image from './image.js';

function Dinosaur(root) {
    this.root = root;
    this.w = 32;
    this.h = 32;
    this.x = 10;
    this.y = 150 - this.h;
    this.baseY = 150 - this.h;
    this.jumpInterval = 800;
    this.jumpProgress = 100;
    this.img = dummyImageFactory(this.root, this.w, this.h);
    this.jumpSound = jumpSound;
    this.deathSound = deathSound;
    const shape = 'ICAAAH/gAAP/+AAHg/4AB7v/AAe7/wAHg/8AB///AAP//wAB//6AAP/wgAD//sAB/gDAA/wA4AP4APgH+AD+D/8Af///AD//+QAf//EAD//wAAf/4AAD/8AAA/+AAAP/AAAD/gAAAf4AAAH+AAADhgAAA4cAAAOHAAAHj+AAB+/4AA==';
    this.img = image.loadFromBase64(root.ctx, shape, 0xC86464F0);
    return this;
}
Dinosaur.prototype.step = function () {
    if (this.jumpProgress < 100) {
        const dy = 0 - (this.jumpProgress / 5 - 10) ** 2 + 100;
        this.y = this.baseY - dy;
        this.jumpProgress += (100 / this.root.state.fps * (1000 / this.jumpInterval));
    } else {
        this.y = this.baseY
    }
    //console.log(this.y);
}
Dinosaur.prototype.jump = function () {
    if (this.jumpProgress >= 100) {
      this.jumpProgress = 0;
      this.jumpSound.play();
    }
}

Dinosaur.prototype.getBound = function () {
    return {
        bottom: this.y + this.h,
        top: this.y,
        left: this.x,
        right: this.x + this.w,
    }
}
Dinosaur.prototype.isCollided = function (stuff) {
    const dino = this.getBound();
    const other = stuff.getBound(); 
    let x_collision = false;
    let y_collision = false;

    //x軸方向で重なりがあるか？
    if ((dino.left <= other.left && other.left <= dino.right)
    || (dino.left <= other.right && other.right <= dino.right)) {x_collision = true}; 

    //y軸方向で重なりがあるか？
    if ((dino.top <= other.top && other.top <= dino.bottom)
    || (dino.top <= other.bottom && other.bottom <= dino.bottom)) {y_collision = true};

    return (x_collision && y_collision);
}
Dinosaur.prototype.death = function (){
    this.deathSound.play();
}

Dinosaur.prototype.isDisplay = () => (true);

function dummyImageFactory(root, w, h) {
    const img = root.ctx.createImageData(w, h);
    for (var i = 0; i < img.data.length; i+= 4) {
        img.data[i+0] = 200; //R
        img.data[i+1] = 100; //G
        img.data[i+2] = 100; //B
        img.data[i+3] = 240; //A
    }
    return img;
}



export default Dinosaur