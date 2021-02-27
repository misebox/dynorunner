function Cactus(root, i) {
    this.size = {0:{w:32,h:32},
                 1:{w:16,h:40},
                 2:{w:32,h:50},
                 3:{w:64,h:32},
                 4:{w:16,h:60},
                 5:{w:3,h:3}
                };
    this.root = root;
    this.w = this.size[i].w;
    this.h = this.size[i].h;
    this.x = 600;
    this.y = 150 - this.size[i].h;
    this.img = dummyImageFactory(this.root, this.w, this.h);
    return this;
}
const ratio = 1 / 60;
let prevNow = performance.now();
Cactus.prototype.step = function () {
    //let diff = Math.floor(this.root.state.speed * ratio * 10)/10;
    let diff = Math.floor(this.root.state.speed * ratio);
    this.x -= diff;
    let newNow = performance.now();
    console.log('diff', diff, prevNow - newNow);
    prevNow = newNow;
    //this.jumpProgress += (100 / 60 * (1000 / this.jumpInterval));
}

Cactus.prototype.isDisplay = function(){
    if(this.x + this.w > 0){
        return true;
    } else {
        return false;
    }
}

Cactus.prototype.getBound = function () {
    return {
        bottom: this.y + this.h,
        top: this.y,
        left: this.x,
        right: this.x + this.w,
    }
}

function dummyImageFactory(root, w, h) {
    const img = root.ctx.createImageData(w, h);
    for (var i = 0; i < img.data.length; i+= 4) {
        img.data[i+0] = 20; //R
        img.data[i+1] = 200; //G
        img.data[i+2] = 50; //B
        img.data[i+3] = 240; //A
    }
    return img;
}



export default Cactus