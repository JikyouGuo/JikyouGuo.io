const birdDom = document.querySelector(".bird");
const birdStyles = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const birdLeft = parseFloat(birdStyles.left);
const birdTop = parseFloat(birdStyles.top);

class Bird extends Rectangle {
    constructor(gravity, jumpSpeed) {
        super(birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
        this.g = gravity;
        this.jumpSpeed = jumpSpeed;
        this.timer = null;
        this.swing = 0;
        this.birdMaxHeight = gameHeight - landHeight - birdHeight;
        this.swingFreq = 1000 / 6;
    }
    render() {
        super.render();
        this.dom.className = `bird swing${this.swing}`;
    }
    swingBegin() {
        this.timer = setInterval(() => {
            this.swing = ++this.swing % 3;
            this.render();
        }, this.swingFreq);
    }
    swingEnd() {
        clearInterval(this.timer);
        this.timer = null;
    }
    onMove() {
        if (this.top <= 0) {
            this.top = 0;
        } else if (this.top >= this.birdMaxHeight) {
            this.top = this.birdMaxHeight;
        }
    }
    move(duration) {
        super.move(duration);
        this.speedY += this.g * duration;
    }
    jump() {
        this.speedY = this.jumpSpeed;
    }
}
