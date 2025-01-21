// textAnimations.js
export function animateText(element, text, blinkIntervalTime, typeIntervalTime, callback, instantDisplay = false) {
    let currentText = "";
    let index = 0;
    let blinkCount = 0;
    let blinkInterval;
    let textInterval;
   
    blinkInterval = setInterval(blink, blinkIntervalTime);

    function blink() {
        blinkCount++;
        console.log(element)
        element.innerHTML = blinkCount % 2 === 0 ? "_" : "&nbsp;";
        if (blinkCount >= 4 && !instantDisplay) {
            clearInterval(blinkInterval);
            textInterval = setInterval(typeText, typeIntervalTime);
        } else if (instantDisplay) {
            clearInterval(blinkInterval);
            
            //currentText = text;
            element.innerHTML = text;
            console.log(element)
            if (callback) callback();
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

   
}
