const skyDom = document.querySelector(".sky");
const skyStyles = getComputedStyle(skyDom);
const skyWidth = parseFloat(skyStyles.width);
const skyHeight = parseFloat(skyStyles.height);

class Sky extends Rectangle {
    constructor(skySpeed) {
        super(skyWidth, skyHeight, 0, 0, skySpeed, 0, skyDom);
    }
    onMove() {
        if (this.left <= -skyWidth / 2) {
            this.left = 0;
        }
    }
}
