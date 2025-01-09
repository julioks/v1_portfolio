//app.js
let quarterLines = [];
let dividedLines = [];
const svgbg = document.getElementById("svgbg");

document.addEventListener('DOMContentLoaded', () => {
    let mhh1 = document.getElementById("mhh1");
    let mhp1 = document.getElementById("mhp1");

    animateText(mhh1, "julius šlepetis", 250, 120, () => {
        animateText(mhp1, "<i>idk</i>, i need, <i>like</i>, an internship,<i> or something</i>", 250, 70, () => {
            quarterLines = calculateQuarterLines();
            drawLinesIteratively(quarterLines, 50, 50);

            dividedLines = dividedLinePoints(quarterLines[0], 3);
            drawLinesIteratively(dividedLines, 5, 50);
            let i=0;
            dividedLines.forEach((line) => {
               let divBox=document.querySelector(`.btn_section#${line.id}`)
                //check if an element with such a class and id exists, if not execute ONLY two lines below and then the rest
                if (!document.querySelector(`.btn_section#${line.id}`)) {
                    // Create and append the div
                    divBox = document.createElement("div");
                    document.body.append(divBox);
                
                    divBox.setAttribute("class", "btn_section");
                    divBox.setAttribute("id", line.id);
                }

                divBox.setAttribute("style",
                    "width:"+dividedLines[1].start.x+"px;"+
                    "top:"+(dividedLines[1].start.y-50)+"px;"+
                    "left:"+dividedLines[i].start.x+"px;"
                )
                animateText(divBox,"this is a "+line.id,500,120)
                i++;
             
            });

            window.addEventListener("resize", () => {
                cancelAnimation();
                adjustLinesForResize(quarterLines);
                dividedLines = dividedLinePoints(quarterLines[0], 3);
                drawLinesIteratively(quarterLines, 50, 50);
                drawLinesIteratively(dividedLines, 5, 50);
            });

            window.addEventListener("scroll",() => {
                document.getElementById("main-header").style.top=Math.max(0,((window.innerHeight/100)*60-window.scrollY))+"px";
                cancelAnimation();
                adjustLinesForResize(quarterLines);
                dividedLines = dividedLinePoints(quarterLines[0], 3);
                drawLinesIteratively(quarterLines, 50, 50);
                drawLinesIteratively(dividedLines, 5, 50);
                let i=0;
            dividedLines.forEach((line) => {
               let divBox=document.querySelector(`.btn_section#${line.id}`)
                //check if an element with such a class and id exists, if not execute ONLY two lines below and then the rest
                if (!document.querySelector(`.btn_section#${line.id}`)) {
                    // Create and append the div
                    divBox = document.createElement("div");
                    document.body.append(divBox);
                
                    divBox.setAttribute("class", "btn_section");
                    divBox.setAttribute("id", line.id);
                }

                divBox.setAttribute("style",
                    "width:"+dividedLines[1].start.x+"px;"+
                    "top:"+(dividedLines[1].start.y-50)+"px;"+
                    "left:"+dividedLines[i].start.x+"px;"
                )
                //animateText(divBox,"this is a "+line.id,500,120)
                i++;
             
            });

            });
        });
    });
});

// Import functions from other files
import { animateText } from './textAnimations.js';
import { calculateQuarterLines, drawLinesIteratively, dividedLinePoints, adjustLinesForResize, cancelAnimation } from './lineAnimations.js';