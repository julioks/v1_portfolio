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

//helper thing to defer button click attachment 
      let buttonToSectionMap = new Map();
sections.push(new Section("abt","about","Adipisicing irure eu laboris aliquip ad cupidatat eiusmod ullamco. Enim velit aliquip cillum eiusmod sint commodo aute magna aute magna irure pariatur adipisicing elit. Quis adipisicing ullamco magna tempor laboris fugiat qui velit incididunt qui non sint. Labore aliquip sint quis sunt consectetur excepteur. <br> Do dolore culpa amet ad. Pariatur cupidatat occaecat laboris commodo ea tempor ad labore amet Lorem nulla commodo. Fugiat eu anim labore dolor minim magna fugiat voluptate excepteur sint aliquip. Magna duis sunt aliquip sint ea fugiat nulla esse sit excepteur. Aliquip occaecat velit quis ut velit dolore. Incididunt sint dolor sunt voluptate incididunt dolore ea eu adipisicing ex aliqua ullamco. Cupidatat in reprehenderit enim cupidatat aute consequat anim dolore. ute irure elit cupidatat tempor aliqua dolor tempor deserunt. Aute laborum ullamco eu labore magna velit excepteur. Qui labore deserunt cillum esse dolor commodo ullamco. Enim ut occaecat ut dolore aute nulla ipsum eu amet. Amet ullamco consectetur nulla exercitation est pariatur laborum. "))

sections.push(new Section(
    "prj",
    "projects",
    "blablabla, Lorem cillum incididunt sint qui ullamco sunt sunt est ullamco culpa. Nostrud cupidatat do officia reprehenderit duis ad excepteur commodo ad nulla cupidatat magna. Aute reprehenderit elit aliqua duis minim sint. Fugiat qui labore duis veniam dolore qui. Amet id eu cupidatat anim.<br>" +
    "<h2>melodiverse</h2>"+
    "<div class='mdtst'><img src='./imgs/projects_1.gif'></img><p>" +
    "<br>Eu exercitation esse deserunt anim occaecat cupidatat enim laboris elit. Ullamco reprehenderit labore ut ad sunt veniam exercitation duis nisi ea anim non pariatur id. Aliquip qui dolor dolor aliquip. Ad duis ex nisi elit et irure irure sunt quis commodo proident. Et magna excepteur deserunt tempor magna incididunt anim.<br>Ut ullamco cillum est esse eu nisi duis aliqua exercitation deserunt ut nostrud nostrud voluptate. Esse labore non ipsum veniam ad consectetur eiusmod mollit. Nostrud pariatur aliquip dolore dolor.</p></div>"+"<h2>melodiverse</h2>"+
    "<div class='mdtst'><img src='./imgs/projects_1.gif'></img><p>" +
    "Quis voluptate elit ipsum aute aliquip laboris. Mollit minim pariatur veniam commodo do labore aute consectetur ex aute ad pariatur. Ullamco dolore nisi pariatur id qui est. Proident elit labore nulla enim dolor in Lorem velit.<br>Amet labore tempor dolore ut proident eiusmod. Anim laborum laboris ullamco in ullamco labore reprehenderit duis esse reprehenderit. Nostrud veniam irure officia consequat magna exercitation aliquip. Enim ut est occaecat officia. Duis cupidatat elit quis ex ullamco id ullamco ipsum voluptate.<br>Ea enim nisi consequat reprehenderit. Ullamco labore mollit consectetur quis occaecat enim enim sunt nisi do elit. Veniam tempor adipisicing velit occaecat. Est ut amet anim culpa. Excepteur in cillum est eiusmod nostrud minim et. Labore veniam pariatur cupidatat dolore dolor sint cillum eiusmod sunt minim eiusmod culpa. Ea minim amet tempor officia aliquip nulla adipisicing ea minim cupidatat excepteur Lorem.<br>Ex veniam dolore ut consectetur Lorem id Lorem irure. Qui nostrud eu nostrud ea nulla. Aliqua non nulla mollit fugiat nisi..</p></div>"
  ));
  

sections.push(new Section("cnt","contact","blablabla, and a bla and a bleghEa in enim velit aliqua ad ullamco laboris nulla nisi ipsum esse sunt. Elit veniam consequat nulla ex elit laboris ex reprehenderit ea ea aliquip. Exercitation reprehenderit eu incididunt eu aliquip dolor duis dolor Lorem. In excepteur amet duis do officia. Sit mollit ad dolor tempor nulla Lorem minim laboris quis reprehenderit aliquip.<br>Consectetur aliqua ex eiusmod do duis qui reprehenderit mollit ex veniam deserunt. Nulla dolore dolor proident laboris ea esse veniam incididunt ea commodo. Exercitation tempor ad deserunt ipsum irure do. Id amet consequat excepteur consequat laborum deserunt reprehenderit. Irure veniam sunt laboris magna et eu consequat nulla excepteur dolor nisi. Et minim non fugiat voluptate pariatur cupidatat velit reprehenderit non anim.<br>Cupidatat adipisicing nostrud voluptate aute ullamco ex est officia dolor aliqua laborum. Occaecat ad aliquip exercitation in. In mollit minim Lorem amet. Ex quis nisi eu voluptate consequat proident ut exercitation ex tempor consequat. Commodo elit enim non adipisicing esse nisi id laboris in culpa duis elit et ipsum."))

document.addEventListener('DOMContentLoaded', () => {
    let mhh1 = document.getElementById("mhh1");
    let mhp1 = document.getElementById("mhp1");

    function executeTaskQueue(queue) {
        if (queue.length === 0) {
            return; // All tasks are complete
        }

        const [currentTask, ...remainingQueue] = queue;
        currentTask(() => executeTaskQueue(remainingQueue)); // Execute the current task and pass the "done" callback
    }

    // Define the task queue
    const tasks = [
        // Animate main heading text
        (done) => animateText(mhh1, "julius šlepetis", 250, 120, done),

        // Animate subheading text
        (done) => animateText(mhp1, "<i>idk</i>, i need, <i>like</i>, an internship,<i> or something</i>", 250, 70, done),

        // Calculate and draw quarter lines
        (done) => {
            quarterLines = calculateQuarterLines();
            drawLinesIteratively(quarterLines, 5, 10);
            done();
        },

        // Divide long horizontal line and draw divisions
        (done) => {
            dividedLines = dividedLinePoints(quarterLines[0], sections.length);
            drawLinesIteratively(dividedLines, 5, 50);
            done();
        },
  
        (done) => {

        
            const sectionTasks = sections.map((section, index) => (sectionDone) => {
                let divBox = document.querySelector(`.btn_section#${section.id}`);
        
                // Create divBox if it doesn't exist
                if (!divBox) {
                    divBox = document.createElement("div");
                    document.body.append(divBox);
                    divBox.setAttribute("class", "btn_section");
                    divBox.setAttribute("id", section.id);
        
                    // Store the mapping between the button and section id
                    buttonToSectionMap.set(section.id, divBox);
                }
        
                // Set styles
                divBox.setAttribute(
                    "style",
                    `width: ${dividedLines[1].start.x}px;
                    top: ${(dividedLines[1].start.y - 50)}px;
                    left: ${(dividedLines[index]?.start?.x ?? 0)}px;`
                );
        
                // Animate the text
                animateText(divBox, `<span>${section.heading}</span>`, 50, 120, sectionDone);
            });
        
            // Start animating sections and call `done` only after all section tasks are complete
            executeTaskQueue([...sectionTasks, done]);
        
            // Attach click listeners later when the sections are created
        },
        // Do the content stuff
        (done) => {
            console.log("All sections animated!");
        
            const content = document.createElement("div");
            content.setAttribute("class", "content");
        
            sections.forEach(section => {
                const sectionDiv = document.createElement("div");
                sectionDiv.setAttribute("class", "single_section");
                sectionDiv.setAttribute("id", "cont_" + section.id);
        
                // Animate the section's content
                animateText(
                    sectionDiv,
                    `<h1>${section.heading}</h1><p>${section.content}</p>`,
                    0,
                    0,
                    () => {
                        // Attach the button's click event to the corresponding <h1> when it is created
                        const button = buttonToSectionMap.get(section.id);
                        if (button) {
                            const header = sectionDiv.querySelector("h1");
                            if (header) {
                                button.addEventListener("click", () => {
                                    smoothScrollTo(header.getBoundingClientRect().top + window.scrollY-181, 120, 12);
                                });
                            }
                        }
                    }
                );
        
                content.append(sectionDiv);
            });
        
            document.body.append(content);
            done();
        }
        
    ];

    // Start executing tasks sequentially
    executeTaskQueue(tasks);

    function smoothScrollTo(targetOffset, speed, smooth) {
        const scrollElement = document.scrollingElement || document.documentElement;
    
        let currentScroll = scrollElement.scrollTop;
        const distance = targetOffset - currentScroll;
        const stepCount = Math.abs(Math.round(distance / smooth));
        const stepSize = distance / (stepCount || 1); // Avoid division by zero for very small distances
    
        let step = 0;
    
        function performStep() {
            if (step >= stepCount || Math.abs(targetOffset - scrollElement.scrollTop) < 1) {
                scrollElement.scrollTop = targetOffset; // Snap to target to avoid rounding issues
                return;
            }
    
            scrollElement.scrollTop += stepSize;
            step++;
            requestAnimationFrame(performStep);
        }
    
        performStep();
    }
    

    // Handle repositioning and resizing
    function repositionNavTexts() {
        for (let i = 0; i < dividedLines.length + 1; i++) {
            let divBox = document.querySelector(`.btn_section#${sections[i].id}`);
            if (!divBox) continue;

            divBox.setAttribute(
                "style",
                `width: ${dividedLines[1].start.x}px;
                top: ${(dividedLines[1].start.y - 50)}px;
                left: ${(dividedLines[i]?.start?.x ?? 0)}px;`
            );
        }
    }

    // Event listeners for resize and scroll
    window.addEventListener("resize", () => {
    
        adjustLinesForResize(quarterLines);
        dividedLines = dividedLinePoints(quarterLines[0], sections.length, true);
        drawLinesIteratively(quarterLines, 0, 0);
        drawLinesIteratively(dividedLines, 0, 0);
        repositionNavTexts();
    });

    window.addEventListener("scroll", () => {
        document.getElementById("main-header").style.top = Math.max(
            0,
            (window.innerHeight / 100) * 60 - window.scrollY
        ) + "px";
     
        adjustLinesForResize(quarterLines);
        dividedLines = dividedLinePoints(quarterLines[0], sections.length, true);
        drawLinesIteratively(dividedLines, 0, 0);
        drawLinesIteratively(quarterLines, 0, 0);
        repositionNavTexts();
    });
});

// Import functions from other files
import { animateText } from './textAnimations.js';
import { calculateQuarterLines, drawLinesIteratively, dividedLinePoints, adjustLinesForResize, cancelAnimation } from './lineAnimations.js';