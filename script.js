let fArray = [];
let painting;
let hatchSize = 100;
let hatchToggle = true;
let cx, cy;
let chatchSize = 100;
let textAlpha = 0;
let textIncreasing = true;

function preload() {
    bg = loadImage(
        'https://assets.codepen.io/9234665/sunflowers.jpeg'
    );
}

function setup() {
    // h = max(windowWidth, 3 * windowHeight);
    // w = (h * bg.width) / bg.height;
    // cnv = createCanvas(w, h); //canvas creation
    // strokeWeight(0.8);
    h = windowHeight;
    w = windowWidth;
    cnv = createCanvas(w, h);
    strokeWeight(0.8);

    // Calculate the number of focal points and their spacing
    fArray = [];
    const numFocalPoints = 1000;
    const spacingX = width / (numFocalPoints + 1);
    const spacingY = height / (numFocalPoints + 1);

    // Populate the fArray with evenly spread focal points
    for (let i = 1; i <= numFocalPoints; i++) {
        const focalPoint = createVector(i * spacingX, i * spacingY);
        fArray.push(focalPoint);
    }
}

// Resize canvas when the window is resized
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

let hatchDelay = 1; // Delay between each hatch iteration

function draw() {
    if (hatchToggle) {
        if (frameCount % hatchDelay === 0) { // Add a delay between each hatch iteration
            for (let i = 0; i < 10; i++) {
                for (let j = 0; j < fArray.length; j++) {
                    circleHatch(fArray[j].x, fArray[j].y);
                }
            }

            // Decrease hatch size
            if (hatchSize > 5) {
                hatchSize -= 0.5;
            }
        }
    }

    // Draw the background image
    let fontSize = min(width, height) / 12;
    let tColor = lerpColor(color(10, 20, 0), color(255, 255, 0), sin(frameCount * 0.01) * 0.5 + 0.5);
    textSize(fontSize);
    fill(red(tColor), green(tColor), blue(tColor), textAlpha);
    noStroke();
    textSize(64);
    textAlign(CENTER, CENTER);
    text("Tus girasoles miamor <3", width / 2, height / 2);

    // Animate text alpha
    if (textIncreasing) {
        textAlpha += 2;
        if (textAlpha > 255) textIncreasing = false;
    } else {
        textAlpha -= 2;
        if (textAlpha < 80) textIncreasing = true;
    }
}

function circleHatch(cx, cy) {
    x = random(0, width);
    y = random(0, height);
    pixCol = bg.get(bg.width / (width / x), bg.height / (height / y));
    stroke(pixCol);
    r = dist(cx, cy, x, y);
    theta = atan((y - cy) / (x - cx));
    hs = min(200, chatchSize / 10);
    d = random(PI / (hs + 10), PI / hs);
    noFill();

    if (cx >= x && cy >= y) {
        theta += PI;
        arc(cx, cy, r * 2, r * 2, theta - d, theta + d);
    }
    if (cx >= x && cy < y) {
        theta -= PI;
        arc(cx, cy, r * 2, r * 2, theta - d, theta + d);
    }
    if (cx < x && cy <= y) {
        arc(cx, cy, r * 2, r * 2, theta - d, theta + d);
    }
    if (cx < x && cy > y) {
        arc(cx, cy, r * 2, r * 2, theta - d, theta + d);
    }
    chatchSize += 0.05;
}

//change the focal points
function mousePressed() {
    fArray = []; // Clear the existing focal points array
    const numFocalPoints = 20;
    const spacingX = width / (numFocalPoints + 1);
    const spacingY = height / (numFocalPoints + 1);

    for (let i = 1; i <= numFocalPoints; i++) {
        const focalPoint = createVector(i * spacingX, i * spacingY);
        fArray.push(focalPoint);
    }

    chatchSize = 1;
}

function keyPressed() {
    hatchToggle = !hatchToggle;
}

function classicHatch() {
    x = random(0, width);
    y = random(0, height);
    pixCol = bg.get(bg.width / (width / x), bg.height / (height / y));
    stroke(pixCol);
    d = random(0, hatchSize);
    line(x - d / 2, y - d / 2, x + d / 22, y + d / 2);
    //crosshatch
    //line(x-d/2,y+d/2,x-d/22,y-d/2);
}

function brightenImage(amount) {
    bg.loadPixels(); // Load the pixel data of the background image

    for (let i = 0; i < bg.pixels.length; i += 4) {
        // Increase the brightness of each pixel
        bg.pixels[i] += amount; // Red component
        bg.pixels[i + 1] += amount; // Green component
        bg.pixels[i + 2] += amount; // Blue component
    }

    bg.updatePixels(); // Update the modified pixel data
}

// Example usage: brighten the image by 50 units
brightenImage(100);
