const skySpeed = -30;
const landSpeed = -130;

const gravity = 1000;
const jumpSpeed = -400;

const producerTick = 1350;
const freqTime = 1000 / 60;
const duration = 1 / 60;

class Game {
    constructor() {
        this.sky = new Sky(skySpeed);
        this.land = new Land(landSpeed);
        this.bird = new Bird(gravity, jumpSpeed);
        this.producer = new PipePairProducer(landSpeed, producerTick);
        this.timer = null;
        this.isOver = false;
    }

    /**
     * 碰撞检测
     * @param {Rectangle} rec1
     * @param {Rectangle} rec2
     */
    isHit(rec1, rec2) {
        // 横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
        // 纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
        let centerX1 = rec1.left + rec1.width / 2;
        let centerY1 = rec1.top + rec1.height / 2;
        let centerX2 = rec2.left + rec2.width / 2;
        let centerY2 = rec2.top + rec2.height / 2;
        if (
            Math.abs(centerX1 - centerX2) < (rec1.width + rec2.width) / 2 &&
            Math.abs(centerY1 - centerY2) < (rec1.height + rec2.height) / 2
        )
            return true;
        else return false;
    }

    isGameOver() {
        if (this.bird.top === this.bird.birdMaxHeight) {
            return true;
        }
        let list = this.producer.pipePairList;
        for (let i = 0; i < list.length; i++) {
            const pair = list[i];
            if (
                this.isHit(this.bird, pair.upPipe) ||
                this.isHit(this.bird, pair.downPipe)
            ) {
                return true;
            }
        }
        return false;
    }

    begin() {
        this.timer = setInterval(() => {
            this.sky.move(duration);
            this.land.move(duration);
            this.bird.move(duration);
            this.producer.pipePairList.forEach(ele => ele.move(duration));
            if (this.isGameOver()) this.over();
        }, freqTime);
        this.bird.swingBegin();
        this.producer.beginProduce();
    }
    pause() {
        clearInterval(this.timer);
        this.timer = null;
        this.bird.swingEnd();
        this.producer.endProduce();
    }
    over() {
        this.isOver = true;
        this.pause();
    }
    regEvent() {
        window.onkeypress = e => {
            if (e.key === " " && !this.isOver) {
                this.bird.jump();
            }
            if (e.key === "Enter") {
                if (this.timer) this.pause();
                else this.begin();
                if (this.isOver) {
                    window.location.reload();
                    gameDom.onload = () => this.begin();
                }
            }
        };
    }
}

const game = new Game();
game.regEvent();
