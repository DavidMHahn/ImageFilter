var rawimg = null; //image that was uploaded
var blankimg = null;
var grayimg = null; //image after going through grayscale process
var rainbowimg = null; //image after going through rainbow process
var blurimg = null; //image after going through blur process
var imgcanvas = null; //the canvas where the images are printed to
var redimg = null; //image after going through red filter
var rng = null;

// function for uploading an image
function upLoadImg() {
    imgcanvas = document.getElementById("can1");
    var imageinput = document.getElementById("image");
    rawimg = new SimpleImage(imageinput);
    rawimg.drawTo(imgcanvas);
}

function imageIsLoaded() {
    if (rawimg == null || !rawimg.complete())
        alert("Image not loaded");
    return rawimg;
}

// Random number generator
function getRandom() {
    rng = Math.random();
    return rng;
}

// random coordinate functions
function randomX() {
    // changing the value that Math.random() is multiplied by will affect the graininess of the image, lower is less grainy
    var x = Math.floor((Math.random() * 10) + 1);
    return x;
}

function randomY() {
    var y = Math.floor((Math.random() * 10) + 1);
    return y;
}
// Grayscale image filter
function grayScale() {
    if (imageIsLoaded()) {
        grayimg = rawimg;
        for (var pixel of grayimg.values()) {
            var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
            pixel.setRed(avg);
            pixel.setGreen(avg);
            pixel.setBlue(avg);
        }
        imgcanvas = document.getElementById("can1");
        grayimg.drawTo(imgcanvas);
    }
}
// Red image filter
function doRed() {
    if (imageIsLoaded()) {
        redimg = rawimg;
        for (var pixel of redimg.values()) {
            var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
            if (avg < 128) {
                pixel.setRed(2 * avg);
                pixel.setGreen(0);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen((2 * avg) - 255);
                pixel.setBlue((2 * avg) - 255);
            }

        }
        imgcanvas = document.getElementById("can1");
        redimg.drawTo(imgcanvas);
    }
}

function doRainbow() {
    if (imageIsLoaded()) {
        var imageheight = rawimg.getHeight();
        rainbowimg = rawimg;
        for (var pixel of rainbowimg.values()) {
            var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
            //set Red stripe
            if (((pixel.getY()) <= (0.14 * imageheight)) && (avg < 128)) {
                pixel.setRed(255);
                pixel.setGreen(0);
                pixel.setBlue(0);
            } else if (((pixel.getY()) <= (0.14 * imageheight)) && (avg >= 128)) {
                pixel.setRed(255);
                pixel.setGreen((2 * avg) - 255);
                pixel.setBlue((2 * avg) - 255);
                //set orange stripe
            } else if (((pixel.getY()) > (0.14 * imageheight)) && ((pixel.getY()) <= (.285 * imageheight)) && (avg < 128)) {
                pixel.setRed(2 * avg);
                pixel.setGreen(0.8 * avg);
                pixel.setBlue(0);
            } else if (((pixel.getY()) > (.14 * imageheight)) && ((pixel.getY()) <= (.285 * imageheight)) && (avg >= 128)) {
                pixel.setRed(255);
                pixel.setGreen((1.2 * avg) - 51);
                pixel.setBlue((2 * avg) - 255);
                //set yellow stripe
            } else if (((pixel.getY()) > (.285 * imageheight)) && ((pixel.getY()) <= (.425 * imageheight)) && (avg < 128)) {
                pixel.setRed(2 * avg);
                pixel.setGreen(0.8 * avg);
                pixel.setBlue(0);
            } else if (((pixel.getY()) > (.285 * imageheight)) && ((pixel.getY()) <= (.425 * imageheight)) && (avg >= 128)) {
                pixel.setRed(255);
                pixel.setGreen(255);
                pixel.setBlue((2 * avg) - 255);
                //set green stripe
            } else if (((pixel.getY()) > (.425 * imageheight)) && ((pixel.getY()) <= (.565 * imageheight)) && (avg < 128)) {
                pixel.setRed(0);
                pixel.setGreen(2 * avg);
                pixel.setBlue(0);
            } else if (((pixel.getY()) > (.425 * imageheight)) && ((pixel.getY()) <= (.565 * imageheight)) && (avg >= 128)) {
                pixel.setRed((2 * avg) - 255);
                pixel.setGreen(255);
                pixel.setBlue((2 * avg) - 255);
                //set blue stripe
            } else if (((pixel.getY()) > (.565 * imageheight)) && ((pixel.getY()) <= (.705 * imageheight)) && (avg < 128)) {
                pixel.setRed(0);
                pixel.setGreen(0);
                pixel.setBlue(2 * avg);
            } else if (((pixel.getY()) > (.565 * imageheight)) && ((pixel.getY()) <= (.705 * imageheight)) && (avg >= 128)) {
                pixel.setRed((2 * avg) - 255);
                pixel.setGreen((2 * avg) - 255);
                pixel.setBlue(255);
                //set indigo stripe
            } else if (((pixel.getY()) > (.705 * imageheight)) && ((pixel.getY()) <= (.85 * imageheight)) && (avg < 128)) {
                pixel.setRed(0.8 * avg);
                pixel.setGreen(0);
                pixel.setBlue(2 * avg);
            } else if (((pixel.getY()) > (.705 * imageheight)) && ((pixel.getY()) <= (.85 * imageheight)) && (avg >= 128)) {
                pixel.setRed((1.2 * avg) - 51);
                pixel.setGreen((2 * avg) - 255);
                pixel.setBlue(255);
                //set violet stripe
            } else if (((pixel.getY()) > (.85 * imageheight)) && (avg < 128)) {
                pixel.setRed(1.6 * avg);
                pixel.setGreen(0);
                pixel.setBlue(1.6 * avg);
            } else {
                pixel.setRed((0.4 * avg) + 153);
                pixel.setGreen((2 * avg) - 255);
                pixel.setBlue((0.4 * avg) + 153);
            }
        }
        imgcanvas = document.getElementById("can1");
        rainbowimg.drawTo(imgcanvas);
    }
}
// Blur image filter
function doBlur() {
    if (imageIsLoaded()) {
        var imagewidth = rawimg.getWidth();
        var imageheight = rawimg.getHeight();
        var blurimgPixel = null;
        blankimg = new SimpleImage(imagewidth, imageheight);
        blurimg = blankimg;
        for (var pixel of blankimg.values()) {
            var rand = getRandom();
            var x = pixel.getX();
            var y = pixel.getY();
            if (rand < 0.5) {
                blurimgPixel = rawimg.getPixel(x, y);
                blurimg.setPixel(x, y, blurimgPixel);
            } else {
                var X = randomX();
                var Y = randomY();
                var Xcoord = (pixel.getX() + X);
                if (Xcoord >= imagewidth) {
                    Xcoord = imagewidth - 1;
                }
                var Ycoord = (pixel.getY() + Y);
                if (Ycoord >= imageheight) {
                    Ycoord = imageheight - 1;
                }
                blurimgPixel = rawimg.getPixel(Xcoord, Ycoord);
                blurimg.setPixel(x, y, blurimgPixel);
            }
        }
        imgcanvas = document.getElementById("can1");
        blurimg.drawTo(imgcanvas);
    }
}

function clearFilter() {
    imgcanvas = document.getElementById("can1");
    var imageinput = document.getElementById("image");
    rawimg = new SimpleImage(imageinput);
    rawimg.drawTo(imgcanvas);
}