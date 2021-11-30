function initScreen() {

  //defines variables
  let matchNumber = document.getElementById("teamNumber").value;
  let teamNumber = document.getElementById("matchNumber").value;
  var allianceColor = document.getElementsByName('alliance');
  //defines which alliance
  if (allianceColor[0].checked) {
    let selectedAlliance = "red"
  }
  if (allianceColor[1].checked) {
    let selectedAlliance = "blue"
  }

  //check if all info filled info    
  let err = 0
  // if(!matchNumber || !teamNumber ){
  //   err = 1
  //   alert("No match number and/or team number")
  // }
  // if(!allianceColor[0].checked && !allianceColor[1].checked){
  //   err = 2
  //   alert("No alliance color selected")
  // }

  //success, sets up next screen
  if (err === 0) {
    console.log("success")

    document.getElementById("inputScreen").style.display = "none";
    document.getElementById("standbyScreen").style.display = "flex";
    document.getElementById("infoBar").style.display = "flex";
    document.getElementById("matchDisplay").innerHTML = "Match: " + document.getElementById("matchNumber").value;
    document.getElementById("teamDisplay").innerHTML = "Team: " + document.getElementById("teamNumber").value;

  }
}

//STANDBY <------------------
let doubleClickThresh = 2
document.getElementById('standbyButton').onclick = function doubleClick() {
  if (doubleClickThresh === 2) {
    document.getElementById('standbyButton').style.color = "red";
  }
  if (doubleClickThresh === 1) {
    gameStart();
  }
  doubleClickThresh = doubleClickThresh - 1;
}

//GAME START <----------------------

let data = [false, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false, 0, 0, false, false, false, "", "", 0];
let dataFormat = ["Auto Mobility", "Auto Inner", "Auto Outer", "Auto Low", "Auto Missed", "Tele Inner", "Tele Outer", "Tele Low", "Tele Missed", "WOF", "Attempted Climb", "Successful Climb", "Climb Time", "Defense Time", "Penalty", "Under WOF", "Oof"]
let wofList = ["None", "Rotation", "Position"]
let wof = 0
let rotOut = "";
let timer = 150 // TIMER, SHOULD BE 150 !!!!1!!!1!!!!!!!!!!!!1!!!!!!!11111!!!!!!1!!
let phase = "null"
let defTimer = 0
let climbTimer = 0
let defenseBool = false
let climbBool = false

setInterval(updateDataTimer, 1000);
function updateDataTimer() { //updates climb and defense timers
  if (defenseBool == true && timer > 30) { // endgame
    defTimer++
    console.log(data)
  }
  if (climbBool == true && timer > 0) {
    climbTimer++
    console.log(data)
  }
  if (timer > 0) {
    data[13] = defTimer
    data[12] = climbTimer
    document.getElementById('tBool1').innerHTML = "DefenCe: " + defTimer + "<div id='innerdiv'>K</div>";
    document.getElementById('eBool1').innerHTML = "Climb: " + climbTimer + "<div id='innerdiv'>K</div>";
  }
}

function gameStart() {
  document.getElementById("standbyScreen").style.display = "none";
  document.getElementById("autoScreen").style.display = "flex";
  startTimer();
}
let timeDelay = true
function startTimer() {
  setInterval(updateTimer, 1000); //should be 1000
  function updateTimer() {
    if (timer == 150) { //game start, should be 150
      phase = "auto";
    }
    if (timer == 135) { //SHOULD BE 135!!!!!!!!!!, teleop start
      if (timeDelay){
        timer = 136;
        timeDelay = false;
      } else {
        document.getElementById("timerDisplay").innerHTML = timer;
        console.log("TELEOP")
        document.getElementById("timerDisplay").style.color = "white";
        document.getElementById("autoScreen").style.display = "none";
        document.getElementById("teleopScreen").style.display = "flex";
        phase = "teleop";
      }
    }
    if (timer == 30) { // endgame start, should be 30
      document.getElementById("timerDisplay").innerHTML = timer;
      console.log("AVENGERS ENDGAM")
      document.getElementById("timerDisplay").style.color = "red";
      document.getElementById("teleopScreen").style.display = "none";
      document.getElementById("endgameScreen").style.display = "flex";

      document.getElementById("eQuantitative2").innerHTML = "Inner Goal: " + data[5] + "<div id='innerdiv'>D</div>";
      document.getElementById("eQuantitative1").innerHTML = "High Goal: " + data[6] + "<div id='innerdiv'>F</div>";
      document.getElementById("eQuantitative4").innerHTML = "Low Goal: " + data[7] + "<div id='innerdiv'>A</div>";
      document.getElementById("eQuantitative3").innerHTML = "Missed Shot: " + data[8] + "<div id='innerdiv'>J</div>";
      document.getElementById("eBool2").innerHTML = "Penalty: " + data[14] + "<div id='innerdiv'>L</div>";

      phase = "endgame";
    }
    if (timer == 0) { //game over
      timer = timer - 1;
      console.log("gam is over ;c")
      document.getElementById("endgameScreen").style.display = "none";
      document.getElementById("teleopScreen").style.display = "none";
      document.getElementById("autoScreen").style.display = "none";
      document.getElementById("endscreenScreen").style.display = "flex";
      document.getElementById("infoBar").style.display = "none";
      document.getElementById("timerDisplay").style.display = "none";
      phase = "null";
    }
    else {
      timer = timer - 1;
      //document.getElementById('timer').innerHTML = timer
      document.getElementById("timerDisplay").innerHTML = timer;
    }
  }
}

//TELEOP <-------------
function tri(type, number) {

  //auto
  if (type === 2 && number === 1) {
    startTeleop()
  }
  if (number === 0) {
    data[0] = !data[0]
    if (data[0]) { //auto mobility
      document.getElementById("bool1").style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    }
    else {
      document.getElementById("bool1").style.backgroundColor = "rgba(255, 255, 255, 0)";
    }
  }
  if (number >= 1 && number <= 4) {
    data[number] = data[number] + 1;
    if (number == 1) { //auto inner
      document.getElementById("quantitative2").innerHTML = "Inner Goal: " + data[number] + "<div id='innerdiv'>D</div>";
    }
    if (number == 2) { //auto outer/high
      document.getElementById("quantitative1").innerHTML = "High Goal: " + data[number] + "<div id='innerdiv'>F</div>";
    }
    if (number == 3) { //auto low
      document.getElementById("quantitative4").innerHTML = "Low Goal: " + data[number] + "<div id='innerdiv'>A</div>";
    }
    if (number == 4) { //auto missed
      document.getElementById("quantitative3").innerHTML = "Missed Shot: " + data[number] + "<div id='innerdiv'>J</div>";
    }

  }
  //tele
  if (number >= 5 && number <= 8) {
    data[number] = data[number] + 1;

    if (timer > 30) { //teleop func
      if (number == 5) { //inner
        document.getElementById("tQuantitative2").innerHTML = "Inner Goal: " + data[number] + "<div id='innerdiv'>D</div>";
      }
      if (number == 6) { //outer/high
        document.getElementById("tQuantitative1").innerHTML = "High Goal: " + data[number] + "<div id='innerdiv'>F</div>";
      }
      if (number == 7) { //low
        document.getElementById("tQuantitative4").innerHTML = "Low Goal: " + data[number] + "<div id='innerdiv'>A</div>";
      }
      if (number == 8) { //missed
        document.getElementById("tQuantitative3").innerHTML = "Missed Shot: " + data[number] + "<div id='innerdiv'>J</div>";
      }
    }
    if (timer <= 30) { //endgame func
      if (number == 5) { //inner
        document.getElementById("eQuantitative2").innerHTML = "Inner Goal: " + data[number] + "<div id='innerdiv'>D</div>";
      }
      if (number == 6) { //outer/high
        document.getElementById("eQuantitative1").innerHTML = "High Goal: " + data[number] + "<div id='innerdiv'>F</div>";
      }
      if (number == 7) { //low
        document.getElementById("eQuantitative4").innerHTML = "Low Goal: " + data[number] + "<div id='innerdiv'>A</div>";
      }
      if (number == 8) { //missed
        document.getElementById("eQuantitative3").innerHTML = "Missed Shot: " + data[number] + "<div id='innerdiv'>J</div>";
      }
    }
  }
  if (number === 9) { //wof
    data[9] = data[9] + 1;
    if (data[9] > 2) {
      data[9] = 0;
    }
    console.log(data[9])
    if (data[9] == 1) {
      rotOut = "rotation";
    }
    if (data[9] == 2) {
      rotOut = "position";
    }
    if (data[9] == 0) {
      rotOut = "none";
    }
    document.getElementById("tTrigger1").innerHTML = "WOF: " + rotOut + "<div id='innerdiv'>S</div>";
  }
  if (number === 13) { // defense timer
    defenseBool = !defenseBool
    if (defenseBool) {
      document.getElementById("tBool1").style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    }
    else {
      document.getElementById("tBool1").style.backgroundColor = "rgba(255, 255, 255, 0)";
    }

  }
  if (number === 10 || number === 11) { //climb
    data[number] = !data[number]
    if (number == 10) {
      document.getElementById("eTrigger1").innerHTML = "Attempted Climb: " + data[10] + "<div id='innerdiv'>S</div>";
    }
    if (number == 11) {
      document.getElementById("eBool5").innerHTML = "Successful Climb: " + data[11]
    }
  }
  if (number === 12) { // climb timer
    climbBool = !climbBool
    if (climbBool) {
      document.getElementById("eBool1").style.backgroundColor = "rgba(255, 255, 255, 0.3)";
    }
    else {
      document.getElementById("eBool1").style.backgroundColor = "rgba(255, 255, 255, 0)";
    }
  }
  if (number === 14 || number === 15 || number === 16) { //qata
    data[number] = !data[number]
    if (number == 14) {
      if (timer > 30) {
        document.getElementById("tBool2").innerHTML = "Penalty: " + data[14] + "<div id='innerdiv'>L</div>";
      }
      if (timer <= 30) {
        document.getElementById("eBool2").innerHTML = "Penalty: " + data[14] + "<div id='innerdiv'>L</div>";
      }
    }
    if (number == 15) {
      document.getElementById("eBool3").innerHTML = "Under WOF: " + data[15]
    }
    if (number == 16) {
      document.getElementById("eBool4").innerHTML = "Oof: " + data[16]
    }
  }
  console.log(data);
}
let currentlyEdit = 0;
function changeEdit(editNum) {
  document.getElementById("dataEditDisplay").innerHTML = data[editNum];
  document.getElementById("dataTypeDisplay").innerHTML = "Currently editing: " + dataFormat[editNum];
  console.log("hello")
  currentlyEdit = editNum;
}
function editDataPlus() {
  if (typeof data[currentlyEdit] == "number") {
    if (currentlyEdit == 9) {
      console.log("wof+")
      data[currentlyEdit] = data[currentlyEdit] + 1
      if (data[currentlyEdit] > 2) {
        data[currentlyEdit] = 0
      }
    } else {
      data[currentlyEdit] = data[currentlyEdit] + 1;
    }
  }
  if (typeof data[currentlyEdit] == "boolean") {
    data[currentlyEdit] = !data[currentlyEdit]
  }
  if (currentlyEdit == 9) {
    document.getElementById("dataEditDisplay").innerHTML = wofList[data[currentlyEdit]]
    console.log(data)
  } else {
    document.getElementById("dataEditDisplay").innerHTML = data[currentlyEdit]
    console.log(data)
  }
  document.getElementById("dataValue" + currentlyEdit).innerHTML = data[currentlyEdit];
}
function editDataMinus() {
  if (currentlyEdit == 9) {
    console.log("wof-")
    data[currentlyEdit] = data[currentlyEdit] - 1
    if (data[currentlyEdit] < 0) {
      data[currentlyEdit] = 2
    }
  }
  else {
    data[currentlyEdit] = data[currentlyEdit] - 1;
  };

  if (currentlyEdit == 9) {
    document.getElementById("dataEditDisplay").innerHTML = wofList[data[currentlyEdit]]
    console.log(data)
  } else {
    document.getElementById("dataEditDisplay").innerHTML = data[currentlyEdit]
    console.log(data)
  };
  if (typeof data[currentlyEdit] == "boolean") {
    data[currentlyEdit] = !data[currentlyEdit]
  }
  document.getElementById("dataValue" + currentlyEdit).innerHTML = data[currentlyEdit];
}
//data = [false, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false, 0, 0, false, false, false, ""];
// index (datatype) value - (data output format)
// AUTO: 0 (bool) automove, 1 (int) innergoal, 2 (int) outergoal, 3 (int) lowgoal, 4 (int) missedshot
// TELE: 5 (int) innergoal, 6 (int) outergoal, 7 (int) lowgoal, 8 (int) missedshot, 9 (0none, 1rot, 2pos) WOF
// END: 10 (bool) attemptedclimb, 11 (bool) successful climb, 12 (int) climbtime
// QDATA: 13 (int) defensetime, 14 (bool) penalty, 15 (bool) underWOFable, 16 (bool) oof
// 17 (string) general qdata, 18 (string) drivetrain type, 19 (int) driver rating
function triggerEditScreen() {
  document.getElementById("editDataScreen").style.display = "flex";
  document.getElementById("endscreenScreen").style.display = "none";
  for (let i = 0; i < 18; i++) {
    document.getElementById("dataType" + i).innerHTML = dataFormat[i];
    document.getElementById("dataValue" + i).innerHTML = data[i];
    document.getElementById("dataValue" + i).style.fontFamily = "monospace";
  }
}
function triggerQrScreen() {
  data[17] = document.getElementById("qata").value;
  data[17] = data[17].replace(/\n/g, ' ');
  data[17] = data[17].replace(/\,/g, ';'); // condense qdata string to one line
  data[18] = document.getElementById("qataDT").value;
  data[18] = data[18].replace(/\n/g, ' ');
  data[18] = data[18].replace(/\,/g, ';');
  data[19] = document.getElementById("qataDriver").value;
  data[19] = data[19].replace(/\n/g, ' ');
  data[19] = data[19].replace(/\,/g, ';');

  document.getElementById("editDataScreen").style.display = "none";
  document.getElementById("endscreenscreenScreen").style.display = "flex";
  document.getElementById("teamQATADisplay").innerHTML = "Team: " + document.getElementById("teamNumber").value;
  document.getElementById("matchQATADisplay").innerHTML = "Match: " + document.getElementById("matchNumber").value;

  document.getElementById("dataString").innerHTML = data;
  document.getElementById("body").style.backgroundColor = "gray";

  console.log(data)

  // converting boolean to 0 or 1 (takes less space)
  data[0] = Number(data[0])
  data[10] = Number(data[10])
  data[11] = Number(data[11])
  data[14] = Number(data[14])
  data[15] = Number(data[15])
  data[16] = Number(data[16])
  let output = data.toString() //convert data array to string
  console.log(output)

  new QRCode(document.getElementById("qrcode"), output); // generate QR code
  console.log("done")
}

window.addEventListener('keydown', function (e) {
  switch (e.key) {
    case 's': //wof -- attempted climb
      if (phase == "teleop") {
        tri(1, 9);
      }
      if (phase == "endgame") {
        tri(1, 10);
      }
      break;
    case 'a': //add low
      if (phase == "auto") {
        tri(1, 3);
      }
      if (phase == "teleop" || phase == "endgame") {
        tri(1, 7);
      }
      break;
    case 'A': //subtract low
      if (phase == "auto") {
        data[3] = data[3] - 2;
        tri(1, 3);
      }
      if (phase == "teleop" || phase == "endgame") {
        data[7] = data[7] - 2;
        tri(1, 7);
      }
      break;
    case 'd': //inner
      if (phase == "auto") {
        tri(1, 1);
      }
      if (phase == "teleop" || phase == "endgame") {
        tri(1, 5);
      }
      break;
    case 'D': //subtract inner
      if (phase == "auto") {
        data[1] = data[1] - 2;
        tri(1, 1);
      }
      if (phase == "teleop" || phase == "endgame") {
        data[5] = data[5] - 2;
        tri(1, 5);
      }
      break;
    case 'f': //high
      if (phase == "auto") {
        tri(1, 2);
      }
      if (phase == "teleop" || phase == "endgame") {
        tri(1, 6);
      }
      break;
    case 'F': //subtract high
      if (phase == "auto") {
        data[2] = data[2] - 2;
        tri(1, 2);
      }
      if (phase == "teleop" || phase == "endgame") {
        data[6] = data[6] - 2;
        tri(1, 6);
      }
      break;
    case 'j': //missed
      if (phase == "auto") {
        tri(1, 4);
      }
      if (phase == "teleop" || phase == "endgame") {
        tri(1, 8);
      }
      break;
    case 'J': //subtract missed
      console.log("J printed")
      if (phase == "auto") {
        data[4] = data[4] - 2;
        tri(1, 4);
      }
      if (phase == "teleop" || phase == "endgame") {
        data[8] = data[8] - 2;
        tri(1, 8);
      }
      break;
    case 'k': //auto mob -- defense timer -- climb timer
      if (phase == "auto") {
        tri(1, 0);
      }
      if (phase == "teleop") {
        defenseBool = !defenseBool
        if (defenseBool) {
          document.getElementById("tBool1").style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        }
        else {
          document.getElementById("tBool1").style.backgroundColor = "rgba(255, 255, 255, 0)";
        }
      }
      if (phase == "endgame") {
        climbBool = !climbBool
        if (climbBool) {
          document.getElementById("eBool1").style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        }
        else {
          document.getElementById("eBool1").style.backgroundColor = "rgba(255, 255, 255, 0)";
        }
      }
      break;
    case 'l': //penalty -- penalty
      if (phase == "teleop" || phase == "endgame") {
        tri(1, 14)
      }
      break;
  }
  console.log(e.key)
}, false);