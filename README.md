
# Sunflower animation

A small detail to give sunflowers virtually, shows a painting that is painted with opaque lines little by little until the image is filled and made visible.


## Code essentials
in this fragment of the "script.js" file, the text is inserted
```javascript
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
```

In this other fragment of the "script.js" file, There is the resolution adjustment, adapting the image and text to mobile devices.

```javascript
function setup() {
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
```


## Test link

See the result <a href="https://zoront22.github.io/sunflower">here.</a>

