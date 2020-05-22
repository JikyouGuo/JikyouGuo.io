const pipeDom = document.querySelector(".pipe");
const pipeStyles = getComputedStyle(pipeDom);
const pipeWidth = parseFloat(pipeStyles.width);
const gameWidth = parseFloat(gameStyle.width);

class Pipe extends Rectangle {
    // pipeSpeed = landSpeed
    constructor(height, top, pipeSpeed, dom) {
        super(pipeWidth, height, gameWidth, top, pipeSpeed, 0, dom);
    }
    get isUseless() {
        return this.left <= -this.width;
    }

    onMove() {
        if (this.isUseless) this.dom.remove();
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

class PipePair {
    constructor(speed) {
        this.pairSpace = 135;

        const minHeight = 70;
        const maxHeight = landTop - this.pairSpace - minHeight;

        const upHeight = getRandom(minHeight, maxHeight);
        const downHeight = landTop - upHeight - this.pairSpace;
        const downTop = upHeight + this.pairSpace;

        const upDom = document.createElement("DIV");
        upDom.className = "pipe up";
        this.upPipe = new Pipe(upHeight, 0, speed, upDom);

        const downDom = document.createElement("DIV");
        downDom.className = "pipe down";
        this.downPipe = new Pipe(downHeight, downTop, speed, downDom);

        gameDom.appendChild(upDom);
        gameDom.appendChild(downDom);
    }

    move(duration) {
        this.upPipe.move(duration);
        this.downPipe.move(duration);
    }
}

class PipePairProducer {
    constructor(speed, tick) {
        this.speed = speed;
        this.pipePairList = [];
        this.timer = null;
        this.tick = tick;
    }
    beginProduce() {
        this.timer = setInterval(() => {
            const pipePair = new PipePair(this.speed);
            this.pipePairList.push(pipePair);
            for (let i = 0; i < this.pipePairList.length; i++) {
                if (this.pipePairList[i].upPipe.isUseless)
                    this.pipePairList.splice(i, 1);
            }
        }, this.tick);
    }
    endProduce() {
        clearInterval(this.timer);
        this.timer = null;
    }
}
