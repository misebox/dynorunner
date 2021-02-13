function run() {
    const width = window.innerWidth;
    console.log('run start')
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
        ctx.fillStyle = 'green';
        ctx.fillRect(10, 100, 50, 50);
    }
    // global
    const Root = {};
    Root.canvas = canvas;
    Root.ctx = ctx;
    globalThis.Root = Root;

    practice()
    console.log('run end')
}

function dummyImageFactory(w, h) {
    const img = Root.ctx.createImageData(w, h);
    for (var i = 0; i < img.data.length; i+= 4) {
        img.data[i+0] = 200; //R
        img.data[i+1] = 100; //G
        img.data[i+2] = 100; //B
        img.data[i+3] = 240; //A
    }
    return img;
}

function Dinosaur() {
    this.x = 100;
    this.y = 10;
    this.w = 32;
    this.h = 32;
    this.img = dummyImageFactory(this.w, this.h);
    return this;
}

Dinosaur.prototype.jump = function () {

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

    console.log(c1)
    console.log(c2)
    console.log(c3)

    const img = Root.ctx.createImageData(32, 32);
    for (var i = 0; i < img.data.length; i+= 4) {
        img.data[i+0] = 200; //R
        img.data[i+1] = 100; //G
        img.data[i+2] = 100; //B
        img.data[i+3] = 240; //A
    }
    Root.ctx.putImageData(img, 200, 0);


}
