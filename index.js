const set = document.querySelector(".set");

const playSound = function (item) {
  console.log(item);

  const audio = new Audio(`sounds/${item.dataset.instrument}.mp3`);
  audio.play();
};

const changeStyle = function (item) {
  item.classList.toggle("pressed");
};

const onkey = function (event) {
  const allInstruments = document.querySelectorAll(".drum");
  if (!["w", "a", "s", "d", "j", "k", "l"].includes(event.key)) return;

  allInstruments.forEach((instrument) => {
    if (instrument.textContent === event.key) {
      playSound(instrument);
      changeStyle(instrument);
    }
  });
};

// Listeners
set.onmousedown = function (event) {
  const parent = event.target.closest(".set");

  if (event.target === parent) return;

  playSound(event.target);
  changeStyle(event.target);
};

set.onmouseup = function (event) {
  event.target.classList.remove("pressed");
};

document.onkeydown = function (event) {
  onkey(event);
};

document.onkeyup = function (event) {
  onkey(event);
};
