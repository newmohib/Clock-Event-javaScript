function updateClock() {
    var dateTime = new Date()
    var dateTimeLocal = dateTime.toLocaleTimeString()
    // var dsy = dateTime.getDay();
    // var hours = dateTime.getHours();
    // var minutes = dateTime.getMinutes();
    // var secounds = dateTime.getSeconds();
    // var Milliseconds = dateTime.getMilliseconds();
    // var myclock = document.getElementById("myclock");
    // myclock.innerHTML = hours + ":" + minutes + ":" + secounds
    myclock.innerHTML = dateTimeLocal

    setTimeout("updateClock()",1000)
}
updateClock()

//var useStorage= "momoryStorage" || "localStorage"
var useStorage = "localStorage" || "momoryStorage"
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

window.memoryStorage = {};
var setToMemoryStore = function (key, value) {
    window.memoryStorage[key] = value;
}
var getFromMemoryStore = function (key) {
    var stringData = window.memoryStorage[key];
    if (stringData) {
        return stringData
    } else {
        return stringData = {};
    }
}

var setToStore = function (storageName, key, value) {
    if (storageName == "localStorage") {
        setToLocalStore(key, value);
    } else {
        setToMemoryStore(key, value)
    }
}

var getFromStore = function (storageName, key) {
    let getInfo = false
    if (storageName == "localStorage") {
        getInfo = getFromLocalStore(key);
        return getInfo
    } else {
        getInfo = getFromMemoryStore(key);
        return getInfo
    }
}


var concatString = function (result) {
    result = result < 10 ? "0" + result : result
    return result;
}


function eventClock() {
    var dateTime = new Date();
    var dateTimeLocal = dateTime.toLocaleTimeString();
    var myclock = document.getElementById("eventClock");
    myclock.innerHTML = dateTimeLocal

    setTimeout("eventClock()", 1000);
}


var increaseTimeCalculation = function (getTime) {
    let hoursLimit = getTime.hours;
    let minutesLimit = getTime.minutes;
    let secoundsLimit = getTime.secounds;
    let isStart = getTime.isStart;
    let elementId = getTime.elementId;

    if (0 <= secoundsLimit && 59 > secoundsLimit) {
        console.log("increase secounds");
        secoundsLimit += 1
    } else if (59 >= secoundsLimit && 59 > minutesLimit) {
        console.log("increase minutes");
        minutesLimit += 1
        secoundsLimit = 00;
    } else if (59 >= secoundsLimit && 59 >= minutesLimit && 24 > hoursLimit) {
        console.log("increase hours");
        hoursLimit += 1;
        minutesLimit = 00;
        secoundsLimit = 00;
    }
    else {
        console.log("Time Over");
        hoursLimit = 00;
        minutesLimit = 00;
        secoundsLimit = 00
        isStart = false
    }
    var lastUpdateTime = {
        hours: hoursLimit,
        minutes: minutesLimit,
        secounds: secoundsLimit,
        isStart:isStart,
        elementId : elementId
    }
    setToStore(useStorage, "increaseSetTime", lastUpdateTime);
    return lastUpdateTime;
}

var decreaseTimeCalculation = function (getTime) {
    let hoursLimit = getTime.hours;
    let minutesLimit = getTime.minutes;
    let secoundsLimit = getTime.secounds;
    let isStart = getTime.isStart;
    let elementId = getTime.elementId;
    if (0 < secoundsLimit && secoundsLimit < 60) {
        console.log("decrease secounds");
        secoundsLimit--;
    } else if (0 >= secoundsLimit && 0 < minutesLimit && 60 > minutesLimit) {
        console.log("decrease minutes");
        minutesLimit--
        secoundsLimit = 59;
    } else if (0 >= secoundsLimit && 0 >= minutesLimit && 0 < hoursLimit && 24 > hoursLimit) {
        console.log("decrease hours");
        hoursLimit--;
        minutesLimit = 59;
        secoundsLimit = 59;
    } else {
        console.log("Time out");
        hoursLimit = 0;
        minutesLimit = 0;
        secoundsLimit = 0;
        isStart = false
    }
    var lastUpdateTime = {
        hours: hoursLimit,
        minutes: minutesLimit,
        secounds: secoundsLimit,
        isStart: isStart,
        elementId:elementId
    }
    setToStore(useStorage, "decreaseSetTime", lastUpdateTime);
    return lastUpdateTime;
}


var increaseClock = function () {
    let elementId = "increase"
    let getTime = getFromStore(useStorage, "increaseSetTime");
    var hoursLimit = "";
    var minutesLimit = "";
    var secoundsLimit = "";
    var isStart = "";
    if (getTime) {
        var updateTime = increaseTimeCalculation(getTime);
        hoursLimit = updateTime.hours;
        minutesLimit = updateTime.minutes;
        secoundsLimit = updateTime.secounds;
        isStart = updateTime.isStart;
        elementId = updateTime.elementId;
        var dateTime = new Date();
        var secounds = dateTime.getSeconds();
    }
    hoursLimit = concatString(hoursLimit);
    minutesLimit = concatString(minutesLimit);
    secoundsLimit = concatString(secoundsLimit);

    var myclock = document.getElementById(elementId);
    myclock.innerHTML = hoursLimit + ":" + minutesLimit + ":" + secoundsLimit;

    if (isStart == true) {
        setTimeout("increaseClock()", 1000);
    } else {
        return;
    }
    
}

var decreaseClock = function () {
    let elementId = ""
    let getTime = getFromStore(useStorage, "decreaseSetTime");
    var hoursLimit = "";
    var minutesLimit = "";
    var secoundsLimit = "";
    var isStart = "";
    if (getTime) {
        var updateTime = decreaseTimeCalculation(getTime);
        hoursLimit = updateTime.hours;
        minutesLimit = updateTime.minutes;
        secoundsLimit = updateTime.secounds;
        isStart = updateTime.isStart;
        elementId = updateTime.elementId;
        var dateTime = new Date();
        var secounds = dateTime.getSeconds();

    }
    hoursLimit = concatString(hoursLimit);
    minutesLimit = concatString(minutesLimit);
    secoundsLimit = concatString(secoundsLimit);

    var myclock = document.getElementById(elementId);
    myclock.innerHTML = hoursLimit + ":" + minutesLimit + ":" + secoundsLimit;
    
    if (isStart == true) {
        setTimeout("decreaseClock()", 1000);
    } else {
        return;
    }
}


var stopClock = function (useStorage, key, ElementId) {

    let elementId = ""
    let getTime = getFromStore(useStorage, key);
    let hoursLimit = "";
    let minutesLimit = "";
    let secoundsLimit = "";
    let isStart = "";
    let updateTime = {}
    if (getTime) {
        if (key == "decreaseSetTime") {
            updateTime = decreaseTimeCalculation(getTime);
            secoundsLimit = updateTime.secounds+1;
        } else if (key == "increaseSetTime") {
            updateTime = increaseTimeCalculation(getTime);
            secoundsLimit = updateTime.secounds-1;
        }
        hoursLimit = updateTime.hours;
        minutesLimit = updateTime.minutes;
        //secoundsLimit = updateTime.secounds+1;
        elementId = updateTime.elementId;
        isStart = false;
    }

    var lastUpdateTime = {
        hours: hoursLimit,
        minutes: minutesLimit,
        secounds: secoundsLimit,
        isStart: isStart,
        elementId:elementId
    }
    setToStore(useStorage, key, lastUpdateTime);

    hoursLimit = concatString(hoursLimit);
    minutesLimit = concatString(minutesLimit);
    secoundsLimit = concatString(secoundsLimit);

    var myclock = document.getElementById(ElementId);
    myclock.innerHTML = hoursLimit + ":" + minutesLimit + ":" + secoundsLimit;

}


var decreaseStartClock = function (result) {
    //useStorage declared top
        var elementId = result.elementId;
        var key = result.key;
        if (result.isStart == true) {
            setToStore(useStorage, "decreaseSetTime", result);
            decreaseClock();
        } else {
            stopClock(useStorage,"decreaseSetTime", elementId)
        }

}


var increaseStartClock = function (result) {
        let elementId = result.elementId;
        let key = result.key;
        if (result.isStart == true) {
            setToStore(useStorage,"increaseSetTime", result);
            increaseClock();
        } else {
            stopClock(useStorage, "increaseSetTime", elementId)
        }

}


var continueAfterPauseClock = function (result) {

        let key = result.key;
        let getTime = getFromStore(useStorage, key);
        if (getTime) {
            getTime.elementId = result.elementId;;
            getTime.isStart = result.isStart;
            if (key == "decreaseSetTime") {
                decreaseStartClock(getTime);
            } else if (key == "increaseSetTime") {
                increaseStartClock(getTime);
            }
    
        }
}
