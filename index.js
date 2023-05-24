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
const onMouse = function (event) {
  // Get closest event parent with set class
  const parent = event.target.closest(".set");

  // Return if the event is mousedown or clicked in parent (prevent propagation)
  if (event.target === parent && event.type === "mousedown") return;

  // If event is an instrument (includes drum class)
  if ([...event.target.classList].includes("drum")) {
    // If event type is mouse down
    if (event.type === "mousedown") {
      // Save instrument clicked
      instrumentClicked = event.target;

      // Play sound and change style
      playSound(event.target);
      changeStyle(event.target);

      // If element type is not mousedown (mouseup in this case)
    } else {
      // Only change style and empty instrumentClicked
      changeStyle(event.target);
      instrumentClicked = "";
    }

    // If event is NOT an instrument
  } else {
    // If a instrument was clicked
    if (instrumentClicked) {
      // Only change style and empty instrumentClicked
      changeStyle(instrumentClicked);
      instrumentClicked = "";
    }
  }
};

// Click on instrument
set.onmousedown = function (event) {
  onMouse(event);
};

// Release click on instrument
window.onmouseup = function (event) {
  onMouse(event);
};

// Key pressed
document.onkeydown = function (event) {
  onKey(event);
};

// Key released
document.onkeyup = function (event) {
  onKey(event);
};
