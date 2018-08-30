class Plant {
    constructor(x, y, vel) {
        this.x = x;
        this.y = y;
    }

    show() {
        image(this.image, this.x, this.y, this.image.width, this.image.height);
    }
}