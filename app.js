//app.js
let quarterLines = [];
let dividedLines = [];

const svgbg = document.getElementById("svgbg");

//section stuff
let sections = []
class Section {
    constructor(id,heading,content) {
        this.id = id;
        this.heading=heading;
        this.content=content;
    }
}
sections.push(new Section("abt","about","blablabla, and a bla and a blegh"))
sections.push(new Section("prj","projects","blablabla, and a bla and a blegh"))
sections.push(new Section("cnt","contact","blablabla, and a bla and a blegh"))

document.addEventListener('DOMContentLoaded', () => {
    let mhh1 = document.getElementById("mhh1");
    let mhp1 = document.getElementById("mhp1");

    animateText(mhh1, "julius šlepetis", 25, 12, () => {
        animateText(mhp1, "<i>idk</i>, i need, <i>like</i>, an internship,<i> or something</i>", 25, 7, () => {
            quarterLines = calculateQuarterLines();
            drawLinesIteratively(quarterLines, 50, 50);

            dividedLines = dividedLinePoints(quarterLines[0], sections.length);
            drawLinesIteratively(dividedLines, 5, 50);
            //since the code logic works by always making as many lines as there are sections, we can assign sections based on an index
            
            function animateSectionsSequentially(index = 0) {
                if (index >= dividedLines.length + 1) {
                    console.log("All sections animated.");
                    return;
                }
            
                let divBox = document.querySelector(`.btn_section#${sections[index].id}`);
            
                // Check if the element exists, create if it doesn't
                if (!divBox) {
                    divBox = document.createElement("div");
                    document.body.append(divBox);
                    divBox.setAttribute("class", "btn_section");
                    divBox.setAttribute("id", sections[index].id);
                }
            
                // Set the styles for the divBox
                divBox.setAttribute("style",
                    `width: ${dividedLines[1].start.x}px;
                    top: ${(dividedLines[1].start.y - 50)}px;
                    left: ${(dividedLines[index]?.start?.x ?? 0)}px;`
                );
            
                // Animate the text for the current divBox
                animateText(divBox, sections[index].heading, 50, 120, () => {
                    console.log("Animation complete for section " + index);
                    // Move to the next section
                    animateSectionsSequentially(index + 1);
                });
            }
            
            animateSectionsSequentially();

            function repositionNavTexts(){

                for (let i = 0; i < dividedLines.length+1; i++) {
                    let divBox = document.querySelector(`.btn_section#${sections[i].id}`);
                    //maybe a doublecheck if that element exists would be perfect
    
                    divBox.setAttribute("style",
                        "width:"+dividedLines[1].start.x+"px;"+
                        "top:"+(dividedLines[1].start.y-50)+"px;"+
                        "left:"+(dividedLines[i]?.start?.x ?? 0) +"px;"
                    )
                    
                   console.log("moving "+ i)
                    
                }
            }
            

            window.addEventListener("resize", () => {
                cancelAnimation();
                adjustLinesForResize(quarterLines);
                dividedLines = dividedLinePoints(quarterLines[0], sections.length);
                drawLinesIteratively(quarterLines, 50, 50);
                drawLinesIteratively(dividedLines, 5, 50);
                repositionNavTexts()
            });

            window.addEventListener("scroll",() => {
                document.getElementById("main-header").style.top=Math.max(0,((window.innerHeight/100)*60-window.scrollY))+"px";
                cancelAnimation();
                adjustLinesForResize(quarterLines);
                dividedLines = dividedLinePoints(quarterLines[0], 3);
                drawLinesIteratively(quarterLines, 50, 50);
                drawLinesIteratively(dividedLines, 5, 50);
                repositionNavTexts()
          

            });
        });
    });
});

// Import functions from other files
import { animateText } from './textAnimations.js';
import { calculateQuarterLines, drawLinesIteratively, dividedLinePoints, adjustLinesForResize, cancelAnimation } from './lineAnimations.js';