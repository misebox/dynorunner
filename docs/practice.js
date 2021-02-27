export function practice() {
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