//app.js
let quarterLines = [];
let dividedLines = [];
const svgbg = document.getElementById("svgbg");

document.addEventListener('DOMContentLoaded', () => {
    let mhh1 = document.getElementById("mhh1");
    let mhp1 = document.getElementById("mhp1");

    animateText(mhh1, "julius šlepetis", 25, 12, () => {
        animateText(mhp1, "<i>idk</i>, i need, <i>like</i>, an internship,<i> or something</i>", 25, 7, () => {
            quarterLines = calculateQuarterLines();
            drawLinesIteratively(quarterLines, 50, 50);

            dividedLines = dividedLinePoints(quarterLines[0], 3);
            drawLinesIteratively(dividedLines, 5, 50);
            let i=0;
            dividedLines.forEach((line) => {
                const divBox = document.createElement("div");
                divBox.setAttribute("class", "btn_section");
                divBox.setAttribute("id", line.id);
                divBox.setAttribute("style",
                    "width:"+dividedLines[1].start.x+"px;"+
                    "top:"+(dividedLines[1].start.y-50)+"px;"+
                    "left:"+dividedLines[i].start.x+"px;"
                )
                animateText(divBox,"this is a "+line.id,500,120)
                i++;
                document.body.append(divBox)
            });

            window.addEventListener("resize", () => {
                cancelAnimation();
                adjustLinesForResize(quarterLines);
                dividedLines = dividedLinePoints(quarterLines[0], 3);
                drawLinesIteratively(quarterLines, 50, 50);
                drawLinesIteratively(dividedLines, 5, 50);
            });
        });
    });
});

// Import functions from other files
import { animateText } from './textAnimations.js';
import { calculateQuarterLines, drawLinesIteratively, dividedLinePoints, adjustLinesForResize, cancelAnimation } from './lineAnimations.js';