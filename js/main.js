const amongUs = document.getElementById('among-us');
const timer = document.querySelector('.timer');
const tomato = document.querySelector('#tomato');
//const muteIcon = document.querySelector('#mute');
const interval = 200;
const pomodoroSound = new Audio('https://persiandevelopers.com/assets/be-quiet.mp3');
let mute = false;
/*
async function getId() {
  let id = localStorage.getItem('id');
  if (!id || id == 'undefined') {
    const res = await fetch('/api/request');
    const data = await res.json();
    localStorage.setItem('id', data.result.id);
    id = data.result.id;
  }
  return id;
}*/

/**
 * get or update pomodoro
 * @param {Boolean} getReward - get reward or just get score
 *//*
async function pomodoro(getReward) {
  const id = await getId();
  const res = await fetch(`/api/${getReward ? 'reward' : 'pomodoro'}/${id}`);
  const data = await res.json();
  if (data.code === 400 || data.code === 404) {
    localStorage.removeItem('id');
    pomodoro(getReward);
    return;
  }
}*/

/**
 * A simple function to display count down
 * @param {Date} end - counter end time
 * @param {Boolean} update - update pomodoro score
 */
async function countDown(end, update) {
  //if (update) pomodoro();
  const delta = moment().diff(end, 'seconds')%1800; // 1800 is 30 minutes in seconds
  var seconds=delta%60;
  var minutes=Math.floor(delta/60);
  
  if (delta >= 1500) { // 1800 is 25 minutes in seconds
      if (!document.body.classList.contains('break')) {
        document.body.classList.add('break');
        document.body.classList.remove('pomodoro');
		minutes-=25;
      }
  } else {
      if (!document.body.classList.contains('pomodoro')) {
        pomodoroSound.muted = mute;
        if (!mute) {
          pomodoroSound.play();
        }
        amongUs.classList.remove('among-us-animation');
        void amongUs.offsetWidth;
        amongUs.classList.add('among-us-animation');
        document.body.classList.add('pomodoro');
        document.body.classList.remove('break');
      }
  }
  
  timer.innerText = (minutes<10?'0':'')+minutes+':'+(seconds<10?'0':'')+seconds;
}

window.onload = async () => {
  try {
    const startOfHour = moment().tz('Asia/Tehran').endOf('hour').add(1, 'second').add(-1, 'hour');
    setInterval(() => countDown(startOfHour, true), interval);
  } catch (error) {
    console.error(error);
  };
};
/*
muteIcon.onclick = () => {
  mute = !mute;
  muteIcon.src = `/images/${mute ? 'mute':'volume'}.svg`;
};
*/