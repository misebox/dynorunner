function Cactus(root) {
    this.root = root;
    this.x = 600;
    this.y = 110;
    this.w = 16;
    this.h = 32;
    this.img = dummyImageFactory(this.root, this.w, this.h);
    return this;
}
Cactus.prototype.step = function () {
    this.x -= this.root.state.speed / 60;
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