// 配置游戏，开始
var gameConfig = {
    isOver: false,
    imgUrl: "img/lol.png",
    width: 500,
    height: 500,
    rows: 3,
    cols: 3,
    dom: document.getElementById("gameContainer"),
    blocks: [], // 包含拼图块信息的数组
};
// var width = getComputedStyle(gameConfig.dom, null).getPropertyValue('width');
// var height = getComputedStyle(gameConfig.dom, null).getPropertyValue('height');
// 图块宽高
gameConfig.blockWidth = gameConfig.width / gameConfig.cols;
gameConfig.blockHeight = gameConfig.height / gameConfig.rows;
// 图块数量
gameConfig.blockNumber = gameConfig.rows * gameConfig.cols;
// 配置游戏，结束


// 初始化游戏
function initialize() {

    // 1. 初始化游戏容器
    initGameDom();
    // 2. 初始化拼图块
    // 2.1 准备数组，用对象，记录拼图块 div 信息
    initBlockArray();
    // 2.2 数组洗牌
    shuffle();
    // 3. 注册点击事件
    regEvent();
    // 4. 更改光标样式
    ifExchangable();

    // 初始化流程结束，下列为辅助函数

    /**
     * 3. 是否相等
     * @param {*} a 
     * @param {*} b 
     */
    function isEqual(a, b) {
        return parseInt(a) === parseInt(b);
    }

    /**
     * 3. 是否可点击（交换）
     */
    function isExchangabal(b) {
        return (
            b.left === getInvisableBlock().left &&
            isEqual(Math.abs(b.top - getInvisableBlock().top), gameConfig.blockHeight) || // 同一列
            b.top === getInvisableBlock().top &&
            isEqual(Math.abs(b.left - getInvisableBlock().left), gameConfig.blockWidth) // 同一行
        )
    }

    /**
     * 3. 注册点击事件
     */
    function regEvent() {
        gameConfig.blocks.forEach(function (b) {
            b.dom.onclick = function () {
                if (gameConfig.isOver) {
                    return;
                }
                if (isExchangabal(b)) {
                    // 判断是否可以交换
                    exchangeBlock(b, getInvisableBlock());
                    // 更变光标样式
                    ifExchangable();
                    // 游戏结束判定
                    isWin();
                }
            }
        })
    }

    /**
     * 3. 得到所有不可见的拼图块元素对象
     */
    function getInvisableBlock() {
        return gameConfig.blocks.find(function (b) {
            return !b.isVisable;
        });
    }

    /**
     * 3. 是否通过
     */
    function isWin() {
        var wrongs = gameConfig.blocks.filter(function (b) {
            return !b.isCorrect();
        });
        console.log(`Wrong blocks: ${wrongs.length}.`)
        if (wrongs.length === 0) {
            // 游戏结束，去掉边框、圆角
            gameConfig.blocks.forEach(function (b) {
                gameConfig.isOver = true;
                b.dom.style.cursor = "not-allowed";
                b.dom.style.border = "";
                b.dom.style.display = "block";
            })
        }
    }

    /**
     * 2.3 判断是否可以交换 --> 光标样式
     */
    function ifExchangable() {
        gameConfig.blocks.forEach(function (b) {
            b.dom.style.cursor = "not-allowed";
            if (isExchangabal(b)) {
                b.dom.style.cursor = "pointer";
                b.show();
            }
        })
    }

    /**
     * 2.2 生成随机数
     * @param {*} min 下限
     * @param {*} max 上限
     */
    function getRandom(min, max) {
        return Math.floor(Math.random() * ((max - min + 1) + min));
    }

    /**
     * 2.2 & 3. 交换拼图块的left和top
     * @param {*} a 
     * @param {*} b 
     */
    function exchangeBlock(a, b) {
        var temp = a.left;
        a.left = b.left;
        b.left = temp;

        var temp = a.top;
        a.top = b.top;
        b.top = temp;

        a.show();
        b.show();
    }

    /**
     * 2.2 数组洗牌
     */
    function shuffle() {
        for (i = 0; i <= gameConfig.blockNumber - 2; i++) {
            // 随机生成下标
            var index = getRandom(0, gameConfig.blockNumber - 2)
            // 将数组当前项与随机项的left和top交换
            exchangeBlock(gameConfig.blocks[i], gameConfig.blocks[index])
        }
    }

    /**
     * 2.1 构造拼图块
     * @param {*} left 
     * @param {*} top 
     * @param {*} isVisable 是否可见
     */
    function Block(left, top, isVisable) {
        // 信息存储
        this.left = left; // 当前
        this.top = top; // 当前
        this.correctLeft = this.left; // 正确
        this.correctTop = this.top; // 正确
        this.isVisable = isVisable;
        // DOM、样式
        this.dom = document.createElement("div");
        this.dom.className = "gameBlock";
        this.dom.style.border = "1px solid dimgray";
        this.dom.style.width = gameConfig.blockWidth + "px";
        this.dom.style.height = gameConfig.blockHeight + "px";
        this.dom.style.background = `url("${gameConfig.imgUrl}") -${this.correctLeft}px -${this.correctTop}px`;

        // 辅助判断，开始
        /** 
         * 判断拼图块是否在正确的位置
         */
        this.isCorrect = function () {
            return isEqual(this.left, this.correctLeft) && isEqual(this.top, this.correctTop);
        }
        /** 
         * 根据当前的left和top，重新设置div位置
         */
        this.show = function () {
            this.dom.style.left = this.left + "px";
            this.dom.style.top = this.top + "px";
        }
        // 是否显示
        if (!isVisable) {
            this.dom.style.display = "none";
        }
        // 辅助判断，结束

        // 设置div宽高
        this.show();
        // html渲染
        gameConfig.dom.appendChild(this.dom);
    }

    /**
     * 2.1 初始化拼图块数组
     */
    function initBlockArray() {
        for (r = 1; r <= gameConfig.rows; r++) {
            for (c = 1; c <= gameConfig.cols; c++) {
                var isVisable = true;
                if (r === gameConfig.rows && c === gameConfig.cols) {
                    isVisable = false;
                }
                var b = new Block(
                    (c - 1) * gameConfig.blockWidth, // 当前横坐标
                    (r - 1) * gameConfig.blockWidth, // 当前纵坐标
                    isVisable,
                );
                gameConfig.blocks.push(b);
            }
        }
    }

    /**
     * 1. 初始化游戏容器
     */
    function initGameDom() {
        gameConfig.dom.className = "gamefield";
        gameConfig.dom.style.width = gameConfig.width + "px";
        gameConfig.dom.style.height = gameConfig.height + "px";
    }
}

initialize();
// 1处保留了控制台打印