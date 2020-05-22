const landDom = document.querySelector(".land");
const landStyles = getComputedStyle(landDom);
const landWidth = parseFloat(landStyles.width);
const landHeight = parseFloat(landStyles.height);

const gameDom = document.querySelector(".game");
const gameStyle = getComputedStyle(gameDom);
const gameHeight = parseFloat(gameStyle.height);

const landTop = gameHeight - landHeight;

class Land extends Rectangle {
    constructor(landSpeed) {
        super(landWidth, landHeight, 0, landTop, landSpeed, 0, landDom);
    }
    onMove() {
        if (this.left <= -landWidth / 2) {
            this.left = 0;
        }
    }
}
