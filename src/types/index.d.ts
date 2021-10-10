import "canvas";

declare module "canvas" {
    interface NodeCanvasRenderingContext2D {
        blur(blur: number): void;
        drawBlurredImage;
        roundImage;
        roundImageCanvas;
    }
}
