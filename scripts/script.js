var starti=0, startj=0, endi=10, endj=10;
var ci = starti, cj = startj;
var gridx = 20, gridy = 60;
gridy = Math.round(screen.width/20);

var xarr = [1, 2, 3];
var visited = [];
var resultPath = [];
var theStack = [];
// var yarr = [x, 1];

var resetTable = function() {
    x = gridx;
    y = gridy;
    var theHTML = '<table style="margin-top: 10px; margin-left: -15px; margin-right: auto; width:'+screen.width+'px">';
    for(var i = 0; i < x; i++) {
        theHTML += '<tr>';
        for(var j = 0; j < y; j++) {
            if(i == starti && j == startj) {
                theHTML += '<td class="startcell" id="' + i + '-' + j + '">';
                theHTML += '</td>';
            }
            else if(i == endi && j == endj) {
                theHTML += '<td class="endcell" id="' + i + '-' + j + '">';
                theHTML += '</td>';
            }
            else {
                theHTML += '<td class="cellsize" id="' + i + '-' + j + '">';
                theHTML += '</td>';
            }
        }
        theHTML += '</tr>';
    }
    theHTML += '</table>';
    document.getElementById("table-holder").innerHTML = theHTML;
    // console.log(theHTML);
}

resetTable();

var isValidIndex = function(ci, cj) {
    if(ci >= 0 && cj >= 0 && ci < (gridx) && cj < (gridy)) {
        return true;
    }
    return false;
}

// var wait = function(ms) {
//     var starttime = new Date().getTime();
//     var endtime = starttime;
//     while(endtime < starttime+ms) {
//         endtime = new Date().getTime();
//     }
// }

var drawDFSPath = function() {
    document.getElementById("tmpalgname").innerHTML = "Currently doing Depth First Search";
    ci = starti;
    cj = startj;
    resultPath = [];
    visited = [];
    theStack = [(starti+"-"+startj)];
    //clear visited
    // for(var i = 0; i < x; i++) {
    //     for(var j = 0; j < y; j++) {
    //         visited[i+"-"+j] == 0;
    //     }
    // }
    // doDFSRemaining();
    doDFSRemainingTimer();
    // while(theStack.length != 0) {
    //     var anElement = theStack[theStack.length-1];
    //     ci = anElement.split("-")[0];
    //     cj = anElement.split("-")[1];
    //     // console.log(ci+"-"+cj + "<->" +visited[ci+"-"+cj]);
    //     if(visited[ci+"-"+cj] == null) {
    //         resultPath.push(anElement);
    //         // console.log(anElement + ":" + theStack.length);
    //         visited[ci+"-"+cj] = 1;
    //         // console.log("Set: " + (10*(ci) + cj) + " = 1");
    //     }
    //     if(parseInt(ci) == endi && parseInt(cj) == endj) {
    //         // alert("Found path");
    //         break;
    //     }
    //     theStack.pop();
    //     // console?
    //     //moving up
    //     if(isValidIndex(parseInt(ci)-1, parseInt(cj))) {
    //         // console.log("up");
    //         if(visited[(parseInt(ci)-1)+"-"+cj] == null) {
    //             theStack.push((parseInt(ci)-1)+"-"+cj);
    //         }
    //     }
    //     else {
    //         // console.log((ci-1)+"-"+cj+ " is invalid");
    //     }
    //     //moving right
    //     if(isValidIndex(parseInt(ci), parseInt(cj)+1)) {
    //         // console.log("right");
    //         if(visited[(ci)+"-"+(parseInt(cj)+1)] == null) {
    //             // console.log("right");
    //             theStack.push(ci+"-"+(parseInt(cj)+1));
    //         }
    //     }
    //     else {
    //         // console.log((ci)+"-"+(cj+1)+ " is invalid");
    //     }
    //     //moving down
    //     if(isValidIndex(parseInt(ci)+1, parseInt(cj))) {
    //         // console.log("down");
    //         if(visited[(parseInt(ci)+1)+"-"+cj] == null) {
    //             // console.log(anElement + " Down " + theStack.length);
    //             theStack.push((parseInt(ci)+1)+"-"+cj);
    //         }
    //     }
    //     else {
    //         // console.log((ci+11)+"-"+cj+ " is invalid");
    //     }
    //     //moving left
    //     if(isValidIndex(parseInt(ci), parseInt(cj)-1)) {
    //         // console.log("right");
    //         if(visited[ci+"-"+(parseInt(cj)-1)] == null) {
    //             theStack.push(ci+"-"+(parseInt(cj)-1));
    //         }
    //     }
    //     else {
    //         // console.log((ci)+"-"+(cj-1)+ " is invalid");
    //     }
    // }
    // // for(var i = 0; i < resultPath.length; i++) {
    // //     document.getElementById(resultPath[i]).style.backgroundColor = "tomato";
    // //     // wait(1);
    // // }
    // // displayResultPath();
    // setDisplayResultTimer();
}

var doDFSRemaining = function() {
    if(theStack.length == 0) {
        clearInterval(DFSRunningIntervalId);
        return;
    }
    var anElement = theStack[theStack.length-1];
    ci = anElement.split("-")[0];
    cj = anElement.split("-")[1];
    // console.log(ci+"-"+cj + "<->" +visited[ci+"-"+cj]);
    if(visited[ci+"-"+cj] == null) {
        resultPath.push(anElement);
        // console.log(anElement + ":" + theStack.length);
        visited[ci+"-"+cj] = 1;
        // console.log("Set: " + (10*(ci) + cj) + " = 1");
    }
    if(parseInt(ci) == endi && parseInt(cj) == endj) {
        // alert("Found path");
        document.getElementById("tmpalgname").innerHTML = "Path Found. Now painting it!";
        clearInterval(DFSRunningIntervalId);
        setDisplayResultTimer();
        // break;
        return;
    }
    theStack.pop();
    document.getElementById(ci+"-"+cj).style.backgroundColor = "#f1c40f";
    console.log("Set for " + ci+"-"+cj );
    // console?
    //moving up
    if(isValidIndex(parseInt(ci)-1, parseInt(cj))) {
        // console.log("up");
        if(visited[(parseInt(ci)-1)+"-"+cj] == null) {
            theStack.push((parseInt(ci)-1)+"-"+cj);
        }
    }
    else {
        // console.log((ci-1)+"-"+cj+ " is invalid");
    }
    //moving right
    if(isValidIndex(parseInt(ci), parseInt(cj)+1)) {
        // console.log("right");
        if(visited[(ci)+"-"+(parseInt(cj)+1)] == null) {
            // console.log("right");
            theStack.push(ci+"-"+(parseInt(cj)+1));
        }
    }
    else {
        // console.log((ci)+"-"+(cj+1)+ " is invalid");
    }
    //moving down
    if(isValidIndex(parseInt(ci)+1, parseInt(cj))) {
        // console.log("down");
        if(visited[(parseInt(ci)+1)+"-"+cj] == null) {
            // console.log(anElement + " Down " + theStack.length);
            theStack.push((parseInt(ci)+1)+"-"+cj);
        }
    }
    else {
        // console.log((ci+11)+"-"+cj+ " is invalid");
    }
    //moving left
    if(isValidIndex(parseInt(ci), parseInt(cj)-1)) {
        // console.log("right");
        if(visited[ci+"-"+(parseInt(cj)-1)] == null) {
            theStack.push(ci+"-"+(parseInt(cj)-1));
        }
    }
    else {
        // console.log((ci)+"-"+(cj-1)+ " is invalid");
    }
    // for(var i = 0; i < resultPath.length; i++) {
    //     document.getElementById(resultPath[i]).style.backgroundColor = "tomato";
    //     // wait(1);
    // }
    // displayResultPath();
}

var DFSRunningIntervalId;

var doDFSRemainingTimer = function() {
    DFSRunningIntervalId = setInterval(doDFSRemaining, 10);
}

// var setCellColorToTomato = function(cellid) {
//     if(cellid >= resultPath.length) {
//         return;
//     }
//     // console.log("Yes " + cellid);
//     document.getElementById(cellid).style.backgroundColor = "tomato";
//     // setInterval(setCellColorToTomato(cellid+1), 100);
// }

var last = 0;

var pathColorIntervalId;

var setDisplayResultTimer = function() {
    pathColorIntervalId = setInterval(displayResultPath, 10);
}

var displayResultPath = function() {
    last++;
    if(last >= resultPath.length-1) {
        // console.log("test");
        clearInterval(pathColorIntervalId);
        document.getElementById("tmpalgname").innerHTML = "Done!";
    }
    else {
        // console.log("test2: " + resultPath[last]);
        document.getElementById(resultPath[last]).style.backgroundColor = "#2ecc71";
        document.getElementById(resultPath[last]).style.border = "1px solid #2ecc71";
    }
    // console.log(last++);
    // for(var i = 0; i < resultPath.length; i++) {
        // setCellColorToTomato(0);
        // document.getElementById(resultPath[i]).style.backgroundColor = "tomato";
        // wait(1);
        // setInterval(setCellColorToTomato(0), 100);
    // }
}

// drawDFSPath();

// setDisplayResultTimer();

