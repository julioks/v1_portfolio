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
sections.push(new Section("abt","about","i’m 27 (probably).<br><br>"+
"i like coming up with ideas—especially weird ones—and figuring out how to turn them into something real. if you’ve got a vague concept or some random piece of tech, i’m all about seeing what’s possible with it. bonus points if it’s unusual or doesn’t seem practical at first glance.<br><br>"+
"interests? yeah, those are… everywhere. knitting, old hi-fi, cars, history, whatever. basically, if it’s a niche topic or there’s room to mess around with it, i’m probably interested. there are maybe three things in the world i find boring, but we don’t talk about those.<br><br>"+
"when it comes to problem-solving, i’m not much for sticking to one idea. i’ll throw out five, maybe more, and see what sticks. i like breaking away from the obvious and exploring stuff that feels a little out there—it’s more fun that way."))

sections.push(new Section(
    "prj",
    "projects",
    "idk, here’s some stuff i’m kinda proud of and had fun working on, and enjoyed the contexts of.<br><br>"+
    "these are all developed to an interactive concept stage. a few went a bit further, but let’s be real, none of them work <i>perfectly</i>. if you want to mess around with something specific, just reach out, and i’ll see what i can do. details are below, project by project.<br>" +
    
    "<h2>cameramiga</h2>"+

"<div class='mdtst'><div class='imgcont'><img style='margin-right:20px;' src='./imgs/prj_cmg_1.png'><img style='margin-right:20px;' src='./imgs/prj_cmg_2.jpg'><img style='margin-right:20px;' src='./imgs/prj_cmg_3.png'></div><div class='textWrapper'><h3>description</h3>"+
"<h4>a retro photo booth built on a commodore amiga</h4>"+
"<p>a museum-grade photo booth that runs on real amiga hardware. it grabs a live video feed with a 90s framegrabber, shows it on screen using bitplanes, lets visitors snap a photo, and prints it on a normal printer. the whole thing is designed to feel native to classic amiga os with proper intuition ui, not some modern skin taped on top. it looks old because it is old, but it works clean and feels intentional.</p>"+

"<h3>context</h3>"+
"<p>this was built for the homecomputermuseum in helmond to show that vintage machines are still fun and usable. most exhibits sit behind glass. i wanted an installation people could poke, use, and walk away with a print. constraints are very real here. tiny ram, slow cpu, bitplane graphics, weird old capture cards, flaky peripherals. the goal is to lean into the limits and still ship something visitors enjoy.</p>"+

"<h3>state</h3>"+
"<p>the pipeline is running. frame capture works through a period-correct framegrabber. image display is done with custom blits into amiga bitplanes. ui is built with intuition gadgets and event loops. printing works via two paths. native hp pcl output when a compatible printer is available, or a linux bridge that receives data over serial and takes care of spooling. image quality is handled with a custom color quantization path. i prototype algorithms in python and rewrite the chosen one in 68k assembly. there is also an esp microcontroller route to translate serial to parallel when needed. next up is more robust error handling, better user prompts, and final tuning of the quantizer for speed vs look.</p></div></div>"+
    
    
    "<h2>melodiverse</h2>"+
"<div class='mdtst'><div class='imgcont'><img  src='./imgs/projects_1.gif'></img></div>"+
"<div class='textWrapper'><h3>description</h3>"+
"<h4>a spotify-based music player that lets you explore *truly* random music in *truly* random genres.</h4>"+
"<p>spotify’s normal suggestions can feel a bit... repetitive. they base everything on a list of about 100 subgenres they think you’re into, so you end up circling the same stuff over and over. this player? it throws all that out. using a list of <b>every</b> genre spotify offers (yes, even the weird ones) and their api, melodiverse lets you break free from their algorithm and dive into the full spectrum of music randomness. </p>"+
"<p>or, in one sentence: “a diverse universe of melodies.”</p>"+

"<h3>context</h3>"+
"<p>this is a personal project from a few semesters back. music’s a big thing for me—i’ll listen to anything, whether it’s christian trapcore or satanic folk or anything in between. i’ve always felt that there aren’t bad genres or bad artists, just bad or lazy creations. after using spotify a lot (like, *a lot*), my friends and i noticed it kept us stuck in a loop of the same kind of music, no matter how much we tried to branch out. so, i made melodiverse. it randomly picks a subgenre from spotify’s full list, grabs a random track, and plays it. simple as that. </p>"+
"<h3>state</h3>"+
"<p>implementation of spotify’s authentication flow is a bit iffy at the moment, but otherwise the application is working as intended</p></div></div>"+



"<h2>d.a.s.h.</h2>"+

"<div class='mdtst'><div class='imgcont'><img style='margin-right:20px;' src='./imgs/pro_dsh1.png'><img style='margin-right:20px;' src='./imgs/pro_dsh2.png'><img style='margin-right:20px;'  src='./imgs/pro_dsh3.png'></div><div class='textWrapper'><h3>description</h3>"+
"<h4>digital automotive systems hub</h4>"+
"<p>an aftermarket onboard computer that adds functionality similar to the trip/computer systems in modern cars. designed to integrate into older vehicles with obd2, it shows data from the car’s ecu like fuel consumption, digital speed, range, and more. the goal? make it blend in with the car’s interior as if it were oem—no tacky, aftermarket vibes here. it's an arduino-powered solution that you can stick into your dashboard and get all kinds of useful data without it looking out of place.</p>"+

"<h3>context</h3>"+
"<p>i’m kind of addicted to old, cheap cars. i’ve got a lot of them, and my friends always joke that if i sold them, i could afford a “real” car. but i like 'em. the older the car, the more character it has. out of the ones i own, my favorite's a ‘87 vw jetta, and the car thats currently turned into my daily driver is a ‘00 passat. sure, newer cars are more practical, but nothing beats the quirks and charm of older models. however, using these cars every day does make you notice how much tech has improved over the years. one thing i miss? trip computers. they’ve been around since the ‘70s, but in older cars, they’re either non-existent or really expensive. that’s where d.a.s.h. comes in: most cars already have the sensors, just not the display hardware. with microcontrollers and small screens being cheap and accessible, i figured, why not make one myself?</p>"+

"<h3>state</h3>"+
"<p>there’s already a visual prototype that shows how it would look mounted in the instrument cluster and powered up. right now, both the screen and the gauges are controlled by a microcontroller, but i’m working on getting real ecu data using the vag kw1281 protocol to make it work with my passat and jetta's ecus.</p></div></div>"+


"<h2>plant-e wandelpark</h2>"+

"<div class='mdtst'><div class='imgcont'><img style='margin-right:20px;' src='./imgs/prj_pe_1.png'><img style='margin-right:20px;' src='./imgs/prj_pe_2.png'></div><div class='textWrapper'><h3>description</h3>"+
"<h4>teaching people interactive color theory and helping them navigate by using environmentally friendly lighting</h4>"+
"<p>evening walks in a park can be pretty nice, assuming you're not wandering through a sketchy neighborhood (let's pretend we're not). the challenge comes when you’re trying to navigate winding paths in low light. also, let’s be real, standard sodium streetlights, though nostalgic, can get a bit boring. so, what if we could light up park paths with different colors, each one tied to where it leads? like, end paths could have their own colors, and the connecting paths could be a mix of those. and to make it even cooler, what if all that lighting was powered by the plants in the park themselves? i mean, how cool is that?</p>"+

"<h3>context</h3>"+
"<p>plant-e is an organization working on this pretty wild concept: generating electricity from plants. sounds like something out of a sci-fi movie, right? well, it's not even close to being as much energy as you'd get from a solar panel, but still, it’s something. my team was challenged to create a project that could showcase this tech and grab the public’s attention. i thought about how this could be applied in a park, making something both practical and visually engaging—and this concept was one of my favorites.</p>"+

"<h3>state</h3>"+
"<p>the concept's been documented pretty well, and i built an interactive experience in unity to give a sense of how it would look in action. i also made a small-scale model of the park out of foam board, paper, leds, and a microcontroller, so you could “walk” your fingers around and see how the lighting would guide you through the space.</p></div></div>"+

"<h2>zenmo zero</h2>"+
"<div class='mdtst'>"+
"<div class='imgcont'><img style='margin-right:20px;' src='./imgs/prj_z0_1.png'><img style='margin-right:20px;' src='./imgs/prj_z0_2.png'></div>"+
"<div class='textWrapper'>"+
"<h3>description</h3>"+
"<h4>a netherlands-wide sustainable energy transition game</h4>"+
"<p>ever thought switching to sustainable energy was as simple as slapping some solar panels on a roof and calling it a day? yeah, me too—until i started working on this. zenmo zero is a game where you get to simulate your neighborhood (or really, anywhere in the netherlands) and make all the big decisions to transition it to fully sustainable energy. but it’s not just about panels and wind turbines—you’re balancing the entire electricity grid, budgeting, dealing with peak usage, and all the other complicated stuff that makes “going green” way more of a puzzle than it seems. turns out, there’s a lot more to it than just throwing panels around.</p>"+
"<h3>context</h3>"+
"<p>zenmo, the company behind this, specializes in creating high-level simulations of sustainable electricity grids. usually, they work with big players—think industrial-scale operations, government agencies, and other “serious” clients who deal with grid-level decision-making. my task was to take their very technical simulations and turn them into something that could catch the public’s interest. the goal? help people understand what goes into transitioning to a sustainable energy grid and why some decisions are made the way they are. it’s not just about the electricity you use daily—it’s about the entire infrastructure behind it.</p>"+
" <h3>state</h3>"+
"<p>i’ve put together an interactive concept of the simulation, where you can see how the interaction and gameplay would flow. the concept doesn’t actually connect to the zenmo simulation or pull real data, so it’s running on placeholder stuff to give a feel of how things would work. it’s all about showing the concept, not the full system, at this stage.</p>"+
"</div>"+
"</div>"+

"<h2>sanquin app</h2>"+
"<div class='mdtst'>"+
"<div class='imgcont'><img style='margin-right:20px;' src='./imgs/prj_sq_1.png'>><img style='margin-right:20px;' src='./imgs/prj_sq_2.png'></div>"+
"<div class='textWrapper'>"+
"<h3>description</h3>"+
"<h4>a social blood donation app</h4>"+
"<p>donating blood is objectively a good thing—no one’s going to argue with that. but realistically… how many of your friends donate? do you? yeah, that’s kind of the problem. it’s just not something people think about enough to actually do. this app was created to change that. during the project, we explored a bunch of ideas to get people more engaged with blood donation—like donating with friends, making sign-ups simpler, rethinking how rewards work, introducing community challenges, and more. the result? a whole mix of interesting interactions and features designed to make donating blood feel less like a chore and more like something you’d actually want to do and think about doing.</p>"+
"<h3>context</h3>"+
"<p>sanquin is the organization that handles blood donations across the netherlands. right now, the blood supply is fine—stable, even—but there’s a bit of a problem on the horizon. most of the current donor base is older, and, well, people age out of eligibility. with fewer younger donors signing up, there’s a risk of supply issues in the future. so, sanquin gave us the task of figuring out how to get younger people to not just think about donating but actually go and do it. this app was part of the solution.</p>"+
"<h3>state</h3>"+
"<p>i designed all the user interactions in figma, basing them on user research and creating suggested design styles specifically for this app. there’s also a working software version built by my teammates, though i didn’t contribute much to the programming side. my focus was on crafting interactions and visual concepts that align with user needs and the project goals.</p>"+
"</div>"+
"</div>"

  ));
  

sections.push(new Section("cnt","contact","email: slepetisjulius@gmail.com, j.slepetis@student.fontys.nl"))

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
                animateText(divBox, `<span>${section.heading}</span>`, 10, 20, sectionDone);
            });
        
            // Start animating sections and call `done` only after all section tasks are complete
            executeTaskQueue([...sectionTasks, done]);
        
            // Attach click listeners later when the sections are created
        },
        // Do the content stuff
        // Content rendering task
(done) => {
    console.log("All sections animated!");

    const content = document.createElement("div");
    content.setAttribute("class", "content");

    sections.forEach(section => {
        const sectionDiv = document.createElement("div");
        sectionDiv.setAttribute("class", "single_section");
        sectionDiv.setAttribute("id", "cont_" + section.id);

        // Add heading 
        const heading = document.createElement("h1");
        heading.innerHTML = section.heading;
        sectionDiv.appendChild(heading);

        // Add content dynamically with animation
        const paragraph = document.createElement("p");
        paragraph.style.opacity = "0"; // Start hidden for animation
        paragraph.innerHTML = section.content;
        sectionDiv.appendChild(paragraph);

        // Animate content appearance after heading
        animateText(
            heading, // Animate heading first
            section.heading,
            50,
            50,
            () => {
                // Fade in the paragraph after heading animation completes
                paragraph.style.transition = "opacity 0.5s ease-in-out";
                paragraph.style.opacity = "1";

                // Attach button click event for smooth scrolling
                const button = buttonToSectionMap.get(section.id);
                if (button) {
                    button.addEventListener("click", () => {
                        scrollIntoView(sectionDiv.getBoundingClientRect().top + window.scrollY - 181, 120, 12);
                    });
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
    
        // Set the initial position from shared state
        sharedState.pos = scrollElement.scrollTop;
    
        const distance = targetOffset - sharedState.pos;
        const stepCount = Math.abs(Math.round(distance / smooth));
        const stepSize = distance / (stepCount || 1); // Avoid division by zero
    
        let step = 0;
    
        function performStep() {
            // Calculate the current scroll position
            const currentPos = sharedState.pos;
    
            if (step >= stepCount || Math.abs(targetOffset - currentPos) < 1) {
                scrollElement.scrollTop = targetOffset; // Snap to target to avoid rounding issues
                sharedState.pos = targetOffset; // Update shared state to final position
                return;
            }
    
            // Update shared position and scroll the element
            sharedState.pos += stepSize;
            scrollElement.scrollTop = sharedState.pos;
    
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
import { sharedState } from './smooth-scroll.js';