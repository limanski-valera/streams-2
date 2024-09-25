'use strict';
function initLanguages() {
	const ACTIVE_CLASS = '_opened';
	const wrapper = document.querySelector('.header__languages');
	if (!wrapper) return;

	document.addEventListener('click', (e) => {
		if (e.target.closest('.header__current-language')) wrapper.classList.add(ACTIVE_CLASS);
		else if (!e.target.closest('.header__languages')) wrapper.classList.remove(ACTIVE_CLASS);
	});
}

function initTimer(timerId) {
	function convertMilliseconds(ms) {
		const days = Math.floor(ms / (24 * 60 * 60 * 1000));
		const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
		const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));

		return { days, hours, minutes };
	}

	function setTime() {
		const currentTime = Date.now();

		let ms;

		if (!timerValue || currentTime >= timerValue) ms = 0;
		else ms = timerValue - currentTime;

		const { days, hours, minutes } = convertMilliseconds(ms);

		daysElem.textContent = days < 10 ? '0' + days : days;
		hoursElem.textContent = hours < 10 ? '0' + hours : hours;
		minutesElem.textContent = minutes < 10 ? '0' + minutes : minutes;
	}

	const timer = document.querySelector(timerId);

	if (!timer) return;

	const timerValue = timer.dataset.time;

	const daysElem = timer.querySelector('[data-timer-days]');
	const hoursElem = timer.querySelector('[data-timer-hours]');
	const minutesElem = timer.querySelector('[data-timer-minutes]');

	if (!daysElem || !hoursElem || !minutesElem) return;

	setTime();

	setInterval(setTime, 60000);
}

function initApp() {
	initLanguages();

	initTimer('#timer');
}

document.addEventListener('DOMContentLoaded', initApp);
