/**
 * 父类：矩形
 * 宽，高，横坐标，纵坐标，x速度，y速度，dom
 * speedX：右正左负，像素/秒
 * speedY：下正上负，像素/秒
 */
class Rectangle {
    constructor(width, height, left, top, speedX, speedY, dom) {
        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;
        this.speedX = speedX;
        this.speedY = speedY;
        this.dom = dom;
    }
    /**
     * render page with width, height, left, top in dom
     */
    render() {
        this.dom.style.width = this.width + "px";
        this.dom.style.height = this.height + "px";
        this.dom.style.left = this.left + "px";
        this.dom.style.top = this.top + "px";
    }
    /**
     * move in "duration" seconds
     * @param {Number} duration second
     */
    move(duration) {
        const dLeft = duration * this.speedX;
        const dTop = duration * this.speedY;
        this.left += dLeft;
        this.top += dTop;

        // 可能会发生一些事
        if (this.onMove) {
            // 每次移动后，渲染前，均会调用该方法
            this.onMove(); //是否存在onMove方法，如果存在，则调用
        }

        this.render();
    }
}
