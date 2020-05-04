function toSeconds({ hours = 0, minutes = 0, seconds = 0 }) {
    return hours * 3600 + minutes * 60 + seconds;
}

function secondsToHM(totalSeconds = 0) {
    const seconds = totalSeconds % 60;
    const minutesAux = parseInt(totalSeconds / 60);
    const minutes = minutesAux % 60;
    const hours = parseInt(minutesAux / 60);
    return { hours, minutes, seconds }
}

function getMaterialContentTime(htmlElements) {
    const hours = 0;
    let minutes = 0;
    let seconds = 0;
    for (const item of htmlElements) {
      minutes += parseInt(item.innerText.slice(0,2));
      seconds += parseInt(item.innerText.slice(3,5));
    }
    return { hours, minutes, seconds } 
}

function getDurationCourse() {
    const classTotalItems = 'MaterialItem-copy';
    const classTotalTimes = 'MaterialItem-copy-time';
    const classWatched = 'icon-eye-slash';
    const classTitle = 'CourseDetail-left-title';
    const classImg = 'CourseDetail-left-figure';

    try {
        const classMaterial = document.getElementsByClassName(classTotalItems);
        const classTimes = document.getElementsByClassName(classTotalTimes);
        const courseName = document.getElementsByClassName(classTitle)[0];
        const courseImg = document.getElementsByClassName(classImg)[0];

        const watchedVideosTime = Object.values(classMaterial)
            .filter(item => (
                item.getElementsByClassName(classWatched).length
                &&
                item.getElementsByClassName(classTotalTimes).length
            ))
            .map(item => item.getElementsByClassName(classTotalTimes)[0])

        const totalTime = getMaterialContentTime(classTimes);
        const totalSeconds = toSeconds(totalTime);
        const watchedTime = getMaterialContentTime(watchedVideosTime);
        const secondsWatched = toSeconds(watchedTime);
        const secondsNotWatched = totalSeconds - secondsWatched;

        return {
            courseName: courseName.innerText,
            courseImg: courseImg.innerHTML,
            totalDuration: secondsToHM(totalSeconds),
            watchedDuration: secondsToHM(secondsWatched),
            notWatchetDuration: secondsToHM(secondsNotWatched),
            state: true
        };
    } catch (error) {
        return {
            courseName: 'Lo sentimos no encontramos un curso valido',
            duration: {
                hours: 0,
                minutes: 0,
                seconds: 0
            },
            watchedDuration: {
                hours: 0,
                minutes: 0,
                seconds: 0
            },
            notWatchetDuration: {
                hours: 0,
                minutes: 0,
                seconds: 0
            },
            courseImg: '',
            state: false
        };
    }
}

chrome.tabs.executeScript({
        code: '(' + getDurationCourse + ')();' //argument here is a string but function.toString() returns function's code
    }, (results) => {
        if(results[0].state) {
            document.getElementById("b2aae36c-ff9d-4cef-b919-3c0cec2fb84f1").innerHTML = results[0].courseImg;
            document.getElementById("b2aae36c-ff9d-4cef-b919-3c0cec2fb84f2").innerHTML = results[0].courseName;
            document.getElementById("b2aae36c-ff9d-4cef-b919-3c0cec2fb84f3").innerHTML = results[0].totalDuration.hours;
            document.getElementById("b2aae36c-ff9d-4cef-b919-3c0cec2fb84f4").innerHTML = results[0].totalDuration.minutes;
            document.getElementById("b2aae36c-ff9d-4cef-b919-3c0cec2fb84f5").innerHTML = results[0].totalDuration.seconds;
            document.getElementById("b2aae36c-ff9d-4cef-b919-3c0cec2fb84f6").innerHTML = results[0].watchedDuration.hours;
            document.getElementById("b2aae36c-ff9d-4cef-b919-3c0cec2fb84f7").innerHTML = results[0].watchedDuration.minutes;
            document.getElementById("b2aae36c-ff9d-4cef-b919-3c0cec2fb84f8").innerHTML = results[0].watchedDuration.seconds;
            document.getElementById("b2aae36c-ff9d-4cef-b919-3c0cec2fb84f9").innerHTML = results[0].notWatchetDuration.hours;
            document.getElementById("b2aae36c-ff9d-4cef-b919-3c0cec2fb84f10").innerHTML = results[0].notWatchetDuration.minutes;
            document.getElementById("b2aae36c-ff9d-4cef-b919-3c0cec2fb84f11").innerHTML = results[0].notWatchetDuration.seconds;
        } else {
            document.getElementById("b2aae36c-ff9d-4cef-b919-3c0cec2fb84f2").innerHTML = results[0].courseName;
            document.getElementById("b2aae36c-ff9d-4cef-b919-3c0cec2fb84f99").innerHTML = "";
        }
    }
);
