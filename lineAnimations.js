//lineanimation.js
//line definition, use {new Line(properties)} to create a new one
class Line {
    constructor(id, startX, startY, endX, endY,currentX=startX,currentY=startY) {
        this.id = id;
        this.current = { x: currentX, y: currentY };
        this.start = { x: startX, y: startY };
        this.end = { x: endX, y: endY };
    }
}
export function calculateQuarterLines(){
    //empty the array to make sapce for new quartering lines
    const quarterLineArray=[]
    const mainheadrect = document.getElementById("main-header").getBoundingClientRect();
    const svgbgrect = svgbg.getBoundingClientRect();
    console.log(mainheadrect.pageX)
    let centerX = mainheadrect.x + mainheadrect.width; // Center X of the main header
    let centerY = mainheadrect.y; // Center Y of the main header
    
    // Function to calculate quartering lines
    const generateQuarteringLine = (id, angle) => {
        const rad = (angle * Math.PI) / 180; // Convert angle to radians
        let x2 = Math.max(0, centerX + Math.cos(rad) * svgbgrect.width); // Calculate endpoint X, ensuring it's not less than 0
        let y2 = Math.max(0, centerY + Math.sin(rad) * svgbgrect.height); // Calculate endpoint Y, ensuring it's not less than 0
        //this might be an issue? might need to add a check if a line being drawn is one of the main ones
        if (Math.round((centerY + Number.EPSILON) * 100) / 100===Math.round((y2 + Number.EPSILON) * 100) / 100) {
            centerY=Math.max(160,centerY)
            y2=Math.max(160,centerY)
        }
        return new Line(id, centerX, centerY, x2, y2);
    };
    
    
    // Define quartering angles (in degrees)
    const angles = [180, 90, 0, -90];
    //console.log(quarterLineArray)
    // Create quartering lines dynamically
    angles.forEach((angle, index) => {
        quarterLineArray.push(generateQuarteringLine(index, angle));
    });
    return quarterLineArray
}

//literally makes the svg line element appear on the screen. for animations, needs helper functions, end x and y will be the points to which the lines are immediately drawn
function drawLine(id,sx,sy,ex,ey){
    let drawnLine = document.getElementById('line_' + id);
    //if there is no svg element associated with this line, we make one
    if (!drawnLine) {
        const svgbg = document.getElementById("svgbg");
        drawnLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        drawnLine.setAttribute('id', 'line_' + id);
        drawnLine.setAttribute('class', 'svgline');
        drawnLine.setAttribute('stroke', 'var(--vfdcolor)');  
        svgbg.append(drawnLine);
    }
    drawnLine.setAttribute('x1', sx);
    drawnLine.setAttribute('y1', sy);
    drawnLine.setAttribute('x2', ex);
    drawnLine.setAttribute('y2', ey);
}let currentAnimationFrame = null; // Track the current animation frame ID

export function drawLinesIteratively(lineCollection, step, interval) {
    function animate() {
        lineCollection.forEach(line => {
            progressLine(line, step);
            drawLine(line.id, line.start.x, line.start.y, line.current.x, line.current.y);
        });

        if (!isCollectionDrawn(lineCollection)) {
            currentAnimationFrame = setTimeout(animate, interval); // Run animate again after the interval
        }
    }

    currentAnimationFrame = setTimeout(animate, interval); // Start the animation loop
}

export function cancelAnimation() {
    if (currentAnimationFrame) {
        clearTimeout(currentAnimationFrame); // Clear the timeout
        currentAnimationFrame = null;
    }
}

//helper function to see if all of the lines in a given collection are drawn
function isCollectionDrawn(lineCollection) {
    return !lineCollection.some(line => line.current.x !== line.end.x || line.current.y !== line.end.y);
}

//makes the given line progress towards the end by given step at the same angle
function progressLine(line, step) {
    const dx = line.end.x - line.start.x; // Difference in x
    const dy = line.end.y - line.start.y; // Difference in y
    const distance = Math.sqrt(dx * dx + dy * dy); // Total distance from start to end

    // If the line is already at the end, do nothing
    if (distance === 0) return;

    // Normalize the direction vector
    const dirX = dx / distance;
    const dirY = dy / distance;

    // Calculate the new current position
    let newX = line.current.x + dirX * step;
    let newY = line.current.y + dirY * step;

    // Check if we've reached or passed the end point
    const overshootX = (dx > 0 && newX > line.end.x) || (dx < 0 && newX < line.end.x);
    const overshootY = (dy > 0 && newY > line.end.y) || (dy < 0 && newY < line.end.y);

    if (overshootX || overshootY) {
        // Snap to the end if overshooting
        newX = line.end.x;
        newY = line.end.y;
    }

    // Update the line's current position
    line.current.x = newX;
    line.current.y = newY;
}
//returns an array of points which divide a given line into a given amount of sections
export function dividedLinePoints(line, divisions){
    const linePoints=[]
    const dx = line.end.x - line.start.x; // Difference in x
    const dy = line.end.y - line.start.y; // Difference in y
    const distance = Math.sqrt(dx * dx + dy * dy); // Total distance from start to end
    const distancePerDivision = distance/divisions
    

    // Normalize the direction vector
    const dirX = dx / distance;
    const dirY = dy / distance;


    //console.log(newX,newY)
    //drawLine(420,newX,newY,newX,newY+20)
    for (let i = 1; i < divisions; i++) {
        const singlePoint = [];
      
            // Calculate the new current position
    let newX = line.start.x + dirX * distancePerDivision*i;
    let newY = line.start.y + dirY * distancePerDivision*i;
    const newPoint = new Line("dv_"+i,newX,newY,newX,newY-50)
        linePoints.push(newPoint)
    }
    return linePoints
}

//adjusts lines to the same level of progress position of main element changed
export function adjustLinesForResize(lineCollection) {
    const newLines = calculateQuarterLines(); // Recalculate based on new layout

    lineCollection.forEach((line, index) => {
        const newLine = newLines[index]; // Corresponding new line
        const oldStart = line.start;
        const oldEnd = line.end;

        // Calculate progress based on the old layout
        const oldDx = oldEnd.x - oldStart.x;
        const oldDy = oldEnd.y - oldStart.y;
        const oldDistance = Math.sqrt(oldDx * oldDx + oldDy * oldDy);

        const progressDx = line.current.x - oldStart.x;
        const progressDy = line.current.y - oldStart.y;
        const progress = oldDistance === 0 ? 1 : Math.sqrt(progressDx * progressDx + progressDy * progressDy) / oldDistance;

        // Apply progress to the new layout
        const newDx = newLine.end.x - newLine.start.x;
        const newDy = newLine.end.y - newLine.start.y;
        line.start = { ...newLine.start };
        line.end = { ...newLine.end };

        line.current.x = line.start.x + progress * newDx;
        line.current.y = line.start.y + progress * newDy;
    });
}
