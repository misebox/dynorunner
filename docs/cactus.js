import image from './image.js';
function Cactus(root, i) {
    this.size = {0:{w:32,h:32},
                 1:{w:16,h:40},
                 2:{w:32,h:50},
                 3:{w:64,h:32},
                 4:{w:16,h:60},
                 5:{w:5,h:5}
                };
    this.root = root;
    this.w = this.size[i].w;
    this.h = this.size[i].h;
    this.x = 600;
    this.y = 150 - this.size[i].h;
    // this.img = dummyImageFactory(this.root, this.w, this.h);
    const shape = 'ICAAAAAAAF/oAAA4sAAAEDAPAJIQGQBQMDUAOJAhABASJQASFCEAUBirAHCIwQAaCGkAEEqBABAc0AAYCYUAkUshAFQOAwA4KIoAkAImBHCULhwkCBgmNIQwIyAJ0GmgFhBS4AQAQileAEQgBABg4AQAMDEMABygRAAD4AQAACIkAA==';
    const shapes = [
      'ICAAAAAAAAAAAAADgAAAA8DABgfh4A8H4eAPh+HgD4fD4AfPw+AB/4fgAH+HwAA/j8AAD4+AAA+fgAAP/wAAD/4AAAf8AAAH8AAAx8AAAePgAAHj4AAB4eAAAPHgAAD54AAAfeAAAD/gAAAP4AAAB/AAAAfwAAAH8AAAB/AAAAPwAA==',
      'ECgBwAPgA2AD4AOgAyADIGPg0uCa4Jrgmuaa67rrquuL64vru+u677qvv6//7/1P9t//////P/8f/w//D/8P/wf8B/AH8AfwB/AH8AfwB/AD4A==',
      'IDIAAACAAB/xgAAv/wB4R/OQD4PE0APwDHACEBhiZAAA3j+AQIwIAMAcUACANFAAggJ8EIACJACAAkQAwMFAAESBQABAgcAAQIHAAECBgICAgYCAgIGBgIDBgQKAQYEAgEGCAIBBkgCAQYIAgEGCAIBBgmCAQYIAgMOCAIACggCABIAAgASCGIIEghAABIIQAAiBECAIgQggEMDIIRBAKCAgYCggIDAoIGAYCCCAGAhBgAgIQQAMGEIABBACAAYEg4ADAIDAAQAAwA==',
      'QCAAAAAAAAAAAAAAAggAAAGAACADCAggAZgcFQAMCHCCkHwPAIwf84ImfAeDD/j/zH4YB4D8GEPI/AAD34YQ//gMEAJ5RJv/mIQQANHM//vsiBDh48f19YeIcOY1/v/zu4QgeHvf/c/7zHgw+////294CPPv//9///AZuf///3//+B08///////sGj/////f//QOf////////Aue//v////8Pj////////IGH///////9orf///////kL3/////9//wbv/v/////7Jm//f////97nf/////////K/3//////+w1///////f3B5v/7/+v//wD////////+AP////9//8A',
      'EDwAAAAAB+AH8AfwD/pO2i/6H7wP+A34D/gvuB/6BvwGuAf4B/gHsAf4FugP+Af4B/gP2E96Lfwf+A/4D/gPcA/wHfAf8B9wX/hf8D3wH+AfoBvgH/gf4B+gLeA/5H/oO/A/4D/gPuA34D3gP2A/6DvwP8Af4B/gH/A=',
      'BQUtb8IAAAAAAAAA',
    ];
    this.img = image.loadFromBase64(root.ctx, shapes[i], 0x14C832F0);
    return this;
}
const ratio = 1 / 60;
let prevNow = performance.now();
Cactus.prototype.step = function () {
    //let diff = Math.floor(this.root.state.speed * ratio * 10)/10;
    let diff = Math.floor(this.root.state.speed * ratio);
    this.x -= diff;
    let newNow = performance.now();
    //console.log('diff', diff, prevNow - newNow);
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