// textAnimations.js
export function animateText(element, text, blinkIntervalTime, typeIntervalTime, callback) {
    let currentText = "";
    let index = 0;
    let blinkCount = 0;
    let blinkInterval;
    let textInterval;

    function blink() {
        blinkCount++;
        element.innerHTML = blinkCount % 2 === 0 ? "_" : '&nbsp;';
        if (blinkCount >= 4) {
            clearInterval(blinkInterval);
            textInterval = setInterval(typeText, typeIntervalTime);
        }
    }

    function typeText() {
        if (index < text.length) {
            currentText += text[index];
            element.innerHTML = currentText + "_";
            index++;
        } else {
            clearInterval(textInterval);
            if (callback) callback();
        }
    }

    blinkInterval = setInterval(blink, blinkIntervalTime);
}
