import { CanvasRenderingContext2D, createCanvas, Image } from "canvas";

CanvasRenderingContext2D.prototype.blur = function (blur: number) {
    const delta = 5;
    const alphaLeft = 1 / (2 * Math.PI * delta * delta);
    const step = blur < 3 ? 1 : 2;
    let sum = 0;
    for (let y = -blur; y <= blur; y += step) {
        for (let x = -blur; x <= blur; x += step) {
            const weight = alphaLeft * Math.exp(-(x * x + y * y) / (2 * delta * delta));
            sum += weight;
        }
    }

    for (let y = -blur; y <= blur; y += step) {
        for (let x = -blur; x <= blur; x += step) {
            this.globalAlpha = ((alphaLeft * Math.exp(-(x * x + y * y) / (2 * delta * delta))) / sum) * blur;
            this.drawImage(this.canvas, x, y);
        }
    }
    this.globalAlpha = 1;
};

CanvasRenderingContext2D.prototype.drawBlurredImage = function (image: Image, blur: number, imageX: number, imageY: number, w = image.width, h = image.height) {
    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, w, h);
    this.blur(blur);
    this.drawImage(canvas, imageX, imageY, w, h);
};
CanvasRenderingContext2D.prototype.roundImage = function (ctx: CanvasRenderingContext2D, img: Image, x: number, y: number, w: number, h: number, r: number) {
    ctx.drawImage(this.roundImageCanvas(img, w, h, r), x, y, w, h);
    return this;
};
CanvasRenderingContext2D.prototype.roundImageCanvas = function (img: Image, w = img.width, h = img.height, r = w * 0.5) {
    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "source-over";
    ctx.drawImage(img, 0, 0, w, h);

    ctx.fillStyle = "#fff";
    ctx.globalCompositeOperation = "destination-in";
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.5, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    return canvas;
};
