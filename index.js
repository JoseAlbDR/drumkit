// Parent element
const set = document.querySelector(".set");

// Play the sound file with the dataset intrument
const playSound = function (item) {
  const audio = new Audio(`sounds/${item.dataset.instrument}.mp3`);
  audio.play();
};

// Toggle pressed style
const changeStyle = function (item) {
  item.classList.toggle("pressed");
};

// Check what key is pressed
const onkey = function (event) {
  const allInstruments = document.querySelectorAll(".drum");
  if (!["w", "a", "s", "d", "j", "k", "l"].includes(event.key)) return;

  // Get the instrument asociated with the key pressed
  allInstruments.forEach((instrument) => {
    if (instrument.textContent === event.key) {
      if (event.type === "keyup") changeStyle(instrument);
      else {
        playSound(instrument);
        changeStyle(instrument);
      }
    }
  });
};

// Listeners

// Click on instrument
set.onmousedown = function (event) {
  const parent = event.target.closest(".set");

  // Guard clause to prevent event in parent element
  if (event.target === parent) return;

  // Play the sound of the instrument
  playSound(event.target);

  // Change pressed style
  changeStyle(event.target);
};

// Release click on instrument
set.onmouseup = function (event) {
  if (event.target.classList.value.includes("set")) return;

  changeStyle(event.target);
};

// Key pressed
document.onkeydown = function (event) {
  onkey(event);
};

// Key released
document.onkeyup = function (event) {
  onkey(event);
};
