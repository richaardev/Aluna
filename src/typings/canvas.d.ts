import "canvas";

declare module "canvas" {
    interface NodeCanvasRenderingContext2D {
        blur(blur: number): void;
        drawBlurredImage(image: Image, blur: number, imageX: number, imageY: number, w: number, h: number): void;
        roundImage(img: Image, x: number, y: number, w: number, h: number, r: number): void;
        roundImageCanvas(img: Image, w: number, h: number, r: number): void;
        roundRect(x: number, y: number, width: number, height: number, radius: number, fill?: boolean, stroke?: boolean): void;
        getLines(text: string, maxWidth: number): string[];
    }
}
