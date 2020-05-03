
function getDurationCourse() {
    try {
        const classMaterial = document.getElementsByClassName('Material')[0];
        const classTimes = classMaterial.getElementsByClassName('MaterialItem-copy-time');
        const courseName = document.getElementsByClassName('CourseDetail-left-title')[0];
        const courseImg = document.getElementsByClassName('CourseDetail-left-figure')[0];
        let hours = 0;
        let minutes = 0;
        let seconds = 0;
        for(const item of classTimes) {
            minutes += parseInt(item.innerText.slice(0,2));
            seconds += parseInt(item.innerText.slice(3,5));
        }
        minutes += parseInt(seconds / 60);
        seconds %= 60;
        hours += parseInt(minutes / 60);
        minutes %= 60;
        return {
            courseName: courseName.innerText,
            duration: {
                hours,
                minutes,
                seconds
            },
            courseImg: courseImg.innerHTML,
            state: true
        };
    } catch (error) {
        return {
            courseName: 'Lo sentimos no encontramos curso valido',
            duration: {
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
            document.getElementById("b2aae36c-ff9d-4cef-b919-3c0cec2fb84f3").innerHTML = results[0].duration.hours;
            document.getElementById("b2aae36c-ff9d-4cef-b919-3c0cec2fb84f4").innerHTML = results[0].duration.minutes;
            document.getElementById("b2aae36c-ff9d-4cef-b919-3c0cec2fb84f5").innerHTML = results[0].duration.seconds;
        } else {
            document.getElementById("b2aae36c-ff9d-4cef-b919-3c0cec2fb84f2").innerHTML = results[0].courseName;
            document.getElementById("b2aae36c-ff9d-4cef-b919-3c0cec2fb84f99").innerHTML = "";
        }
        
    }
);
