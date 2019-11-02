
var setToLocalStore = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
var getFromLocalStore = function (key) {
    var stringData = localStorage.getItem(key);
    let jsonData = {}
    if (stringData) {
        jsonData = JSON.parse(stringData);
    }
    return jsonData
}

var concatString=function(result){
    result= result <10?"0"+result:result
    return result;
}


function updateClock() {
    var dateTime = new Date()
    var dateTimeLocal = dateTime.toLocaleTimeString()
    var dsy = dateTime.getDay();
    var hours = dateTime.getHours();
    var minutes = dateTime.getMinutes();
    var secounds = dateTime.getSeconds();
    var Milliseconds = dateTime.getMilliseconds();
    var myclock = document.getElementById("myclock");
    myclock.innerHTML=hours+":"+minutes+":"+secounds	
    myclock.innerHTML = dateTimeLocal

    setTimeout("updateClock()", 1000);
}
updateClock();

function eventClock() {
    var dateTime = new Date();
    var dateTimeLocal = dateTime.toLocaleTimeString();
    var myclock = document.getElementById("eventClock");
    myclock.innerHTML = dateTimeLocal

    setTimeout("eventClock()", 1000);
}

var decreaseTimeCalculation=function(getTime){
   var hoursLimit = getTime.hours;
   var minutesLimit = getTime.minutes;
   var secoundsLimit = getTime.secounds;

   if (0 < secoundsLimit && secoundsLimit < 60 ) {
       console.log("decrease secounds");
      secoundsLimit--
   }else if(0 >= secoundsLimit && 0 < minutesLimit && 60 > minutesLimit ){
    console.log("decrease minutes");
     minutesLimit--
     secoundsLimit=59;
   }else if(0 >= secoundsLimit && 0 >= minutesLimit && 0 < hoursLimit && 24 > hoursLimit ){
    console.log("decrease hours");
    hoursLimit--;
    minutesLimit=59;
    secoundsLimit=59
   }else{
    console.log("Time out");
    hoursLimit=0;
    minutesLimit=0;
    secoundsLimit=0
   }
var lastUpdateTime={
    hours:hoursLimit,
    minutes:minutesLimit,
    secounds:secoundsLimit
}
setToLocalStore("decreaseSetTime", lastUpdateTime);
return lastUpdateTime;
}

var decreaseClock = function () {
    let getTime = getFromLocalStore("decreaseSetTime");
    var hoursLimit;
    var minutesLimit;
    var secoundsLimit;
    if (getTime) {
       var updateTime= decreaseTimeCalculation(getTime);
        hoursLimit = updateTime.hours;
        minutesLimit = updateTime.minutes;
        secoundsLimit = updateTime.secounds;
        var dateTime = new Date();
        var secounds = dateTime.getSeconds();

    }
    hoursLimit= concatString(hoursLimit);
    minutesLimit=concatString(minutesLimit);
    secoundsLimit=concatString(secoundsLimit);

    var myclock = document.getElementById("decrease");
    myclock.innerHTML=hoursLimit+":"+minutesLimit+":"+secoundsLimit
    setTimeout("decreaseClock()", 1000);
}

var decreaseStartClock = function (result) {
    setToLocalStore("decreaseSetTime", result);
    decreaseClock();

}

//increse

var increaseTimeCalculation=function(getTime){
    var hoursLimit = getTime.hours;
    var minutesLimit = getTime.minutes;
    var secoundsLimit = getTime.secounds;
 
    if (0 <= secoundsLimit && 59 > secoundsLimit) {
        console.log("increase secounds");
       secoundsLimit+=1

    }else if( 59 >= secoundsLimit && 59 > minutesLimit){
     console.log("increase minutes");
      minutesLimit+=1
      secoundsLimit=00;
    }else if(59 >= secoundsLimit && 59 >= minutesLimit && 24 > hoursLimit){
     console.log("increase hours");
     hoursLimit+=1;
     minutesLimit=00;
     secoundsLimit=00
    }
    else{
     console.log("Time Over");
     hoursLimit=00;
     minutesLimit=00;
     secoundsLimit=00
    }
 var lastUpdateTime={
     hours:hoursLimit,
     minutes:minutesLimit,
     secounds:secoundsLimit
 }
 setToLocalStore("increaseStartClock", lastUpdateTime);
 return lastUpdateTime;
 }

var increaseClock = function () {
    let getTime = getFromLocalStore("increaseStartClock");
    var hoursLimit;
    var minutesLimit;
    var secoundsLimit;
    if (getTime) {
       var updateTime= increaseTimeCalculation(getTime);
        hoursLimit = updateTime.hours;
        minutesLimit = updateTime.minutes;
        secoundsLimit = updateTime.secounds;
        var dateTime = new Date();
        var secounds = dateTime.getSeconds();

    }
    hoursLimit= concatString(hoursLimit);
    minutesLimit=concatString(minutesLimit);
    secoundsLimit=concatString(secoundsLimit);

    var myclock = document.getElementById("increase");
    myclock.innerHTML=hoursLimit+":"+minutesLimit+":"+secoundsLimit	
    setTimeout("increaseClock()", 1000);
}

var increaseStartClock = function (result) {
    setToLocalStore("increaseStartClock", result);
    increaseClock();

}