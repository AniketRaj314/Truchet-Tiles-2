let screenSize, size, lines, lastFlg, move;
function setup() {
    screenSize = innerWidth < innerHeight - 4 ? innerWidth : innerHeight - 4;
    size = 30;
    lines = [];
    createCanvas(screenSize, screenSize);
    generateLines();
    lastFlg = lines[lines.length - 1].flg;
    move = 1;
}

function draw() {
    background(0, 0, 0, 12);
    for(const line of lines) {
        line.update();
        line.show();
    }
    if(lastFlg != lines[lines.length - 1].flg) {
        move = 0;
        setTimeout(() => { move = 1; }, 3000);
        lastFlg = lines[lines.length - 1].flg;
    }
}

function generateLines() {
    for(let x = 0; x < screenSize; x += size) {
        for(let y = 0; y < screenSize; y += size) {
            if(random([0, 1])) {
                lines.push(new Lines(x, y, x + size, y + size));
            } else {
                lines.push(new Lines(x + size, y, x, y + size));
            }
        }
    }
}

class Lines {
    constructor(x1, y1, x2, y2) {
        this.const_x1 = x1;
        this.const_y1 = y1;
        this.const_x2 = x2;
        this.const_y2 = y2;
        this.limit = x1 > x2 ? x1 : x2;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.flg = this.const_x1 < this.const_x2;
    }

    show() {
        line(this.x1, this.y1, this.x2, this.y2);
    }

    update() {
        if(move == 1)
            stroke(random(100, 255), random(100, 255), random(100, 255));
        if(this.flg) {
            this.x1 += move;
            this.x2 -= move;
            if(this.x1 >= this.limit) {
                this.flg = !this.flg;
            }
        } else {
            this.x1 -= move;
            this.x2 += move;
            if(this.x2 >= this.limit) {
                this.flg = !this.flg;
            }
        }
    }
}