import Timer from "./timer";
//Timer
function timermod() {	
	const days = document.getElementById('days'),
		hours = document.getElementById('hours'),
		minutes = document.getElementById('minutes'),
		seconds = document.getElementById('seconds');

	function displayNullNumb(numb) {
		return `${((numb < 10) && '0') || ""}${numb}`;
	}

	const timer = new Timer(new Date(2021, 9, 22, 0, 0, 0), () => {
		seconds.textContent = displayNullNumb(timer.seconds);
		minutes.textContent = displayNullNumb(timer.minutes);
		hours.textContent = displayNullNumb(timer.hours);
		days.textContent = displayNullNumb(timer.days);
	});

	timer.startTimer();
	document.addEventListener("visibilitychange", () => { //if windo
		if (!document.hidden) {
			timer.startTimer();
		} else {
			timer.stopTimer();
		}
	});
}

export default timermod;