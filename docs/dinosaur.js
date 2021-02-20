function Dinosaur(root) {
    this.root = root;
    this.x = 10;
    this.y = 110;
    this.baseY = 110;
    this.w = 32;
    this.h = 32;
    this.jumpInterval = 800;
    this.jumpProgress = 100;
    this.img = dummyImageFactory(this.root, this.w, this.h);
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