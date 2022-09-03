let numbers = document.querySelectorAll('.num');
let interval = 5000;

numbers.forEach(number => {
    let startValue = 0;
    let endValue = parseInt(number.getAttribute('data-val'));
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(function() {
        startValue += 1;
        number.textContent = startValue;
        if(startValue == endValue) {
            clearInterval(counter)
        }
    }, duration);
});