// Parent element
const set = document.querySelector(".set");
let instrumentClicked = "";
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
const onKey = function (event) {
  const allInstruments = document.querySelectorAll(".drum");

  // Return if the key pressed is not needed
  if (!["w", "a", "s", "d", "j", "k", "l"].includes(event.key)) return;

  // Get the instrument asociated with the key pressed
  allInstruments.forEach((instrument) => {
    if (instrument.textContent === event.key) {
      // If the event is keyup only change style, dont play sound
      if (event.type === "keyup") changeStyle(instrument);
      else {
        playSound(instrument);
        changeStyle(instrument);
      }
    }
  });
};

// Listeners
const onMouse = function (event) {
  // Guard clause
  if (![...event.target.classList].includes("drum")) return;

  // Save instrument clicked
  instrumentClicked = event.target;
  // Play sound and change style
  playSound(event.target);
  changeStyle(event.target);
};

// Click on instrument
set.onmousedown = function (event) {
  onMouse(event);
};

// Release click on instrument
window.onmouseup = function () {
  // If there is an instrument clicked
  if (instrumentClicked) {
    changeStyle(instrumentClicked);
    instrumentClicked = "";
  }
};

// Key pressed
document.onkeydown = function (event) {
  onKey(event);
};

// Key released
document.onkeyup = function (event) {
  onKey(event);
};
