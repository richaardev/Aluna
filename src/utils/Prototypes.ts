import { CanvasRenderingContext2D, createCanvas, Image, registerFont } from "canvas";

// Canvas
registerFont("src/fonts/MatSaleh.ttf", {
    family: "Mat Saleh",
});
CanvasRenderingContext2D.prototype.getLines = function (text: string, maxWidth: number): string[] {
    var words = text.split(" ");
    var lines = [];
    var currentLine = words[0];

    for (var i = 1; i < words.length; i++) {
        var word = words[i];
        var width = this.measureText(currentLine + " " + word).width;
        if (width < maxWidth) {
            currentLine += " " + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    return lines;
};
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

CanvasRenderingContext2D.prototype.roundImage = function (img: Image, x: number, y: number, w: number, h: number, r: number) {
    this.drawImage(this.roundImageCanvas(img, w, h, r), x, y, w, h);
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
CanvasRenderingContext2D.prototype.roundRect = function (x: number, y: number, width: number, height: number, radius: number, fill = true, stroke = false) {
    let cornerRadius = { upperLeft: 0, upperRight: 0, lowerLeft: 0, lowerRight: 0 };
    if (typeof radius === "object") {
        cornerRadius = Object.assign(cornerRadius, radius);
    } else if (typeof radius === "number") {
        cornerRadius = { upperLeft: radius, upperRight: radius, lowerLeft: radius, lowerRight: radius };
    }

    this.beginPath();
    this.moveTo(x + cornerRadius.upperLeft, y);
    this.lineTo(x + width - cornerRadius.upperRight, y);
    this.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
    this.lineTo(x + width, y + height - cornerRadius.lowerRight);
    this.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height);
    this.lineTo(x + cornerRadius.lowerLeft, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
    this.lineTo(x, y + cornerRadius.upperLeft);
    this.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
    this.closePath();
    if (stroke) this.stroke();
    if (fill) this.fill();
    return this;
};

// String

String.prototype.abbreviate = function (precision = 2) {
    let _this = parseInt(this as string);
    const suffsFromZeros = { 0: "", 3: "k", 6: "M", 9: "B", 12: "T" };
    const { length } = _this.toString();
    const lengthThird = length % 3;
    const divDigits = length - (lengthThird || lengthThird + 3);
    const calc = "" + (_this / 10 ** divDigits).toFixed(precision);

    const keyTyped = divDigits as keyof typeof suffsFromZeros;
    return _this < 1000 ? "" + _this : (calc.indexOf(".") === calc.length - 3 ? calc.replace(/\.00/, "") : calc) + suffsFromZeros[keyTyped];
};
