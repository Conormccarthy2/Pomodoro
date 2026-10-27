let work = 20 * 60;
let breakTime = 3 * 60;
let longBreak = 5 * 60;
let isRunning = false;
let completedWorkSessions = 0;
let sessionType = "Work";
let remaining = work;
let timerId = null;

const timerDisplay = document.getElementById("timer");
const sessionDisplay = document.getElementById("session");
const completedSessionsDisplay = document.getElementById(
  "CompletedWorkSessions",
);
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");

function displaytime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsleft = seconds % 60;
  const formattedmiutes = String(minutes).padStart(2, "0");
  const formattedseconds = String(secondsleft).padStart(2, "0");
  timerDisplay.textContent = `${formattedmiutes}:${formattedseconds}`;
}
function starttimer() {
  if (isRunning) return;
  isRunning = true;
  timerId = setInterval(() => {
    remaining--;
    displaytime(remaining);

    if (remaining <= 0) {
      clearInterval(timerId);
      isRunning = false;

      if (sessionType === "Work") {
        completedWorkSessions++;
        updatecompletedsessionsdisplay();

        if (completedWorkSessions % 4 === 0) {
          sessionType = "Long Break";
          remaining = longBreak;
        } else {
          sessionType = "Break";
          remaining = breakTime;
        }
      } else {
        sessionType = "Work";
        remaining = work;
      }

      updatesessiondisplay();
      displaytime(remaining);
      starttimer();
    }
  }, 1000);
}
function pausetimer() {
  if (!isRunning) return;
  clearInterval(timerId);
  timerId = null;
  isRunning = false;

  console.log("Timer paused.");
}
function resettimer() {
  clearInterval(timerId);
  timerId = null;
  isRunning = false;
  remaining = work;
  sessionType = "work";
  completedWorkSessions = 0;

  updatesessiondisplay();
  updatecompletedsessionsdisplay();
  displaytime(remaining);
}
function updatesessiondisplay() {
  if (sessionType === "Work") {
    sessionDisplay.textContent = `Current Session: ${sessionType}`;
  } else if (sessionType === "Break") {
    sessionDisplay.textContent = `Current Session: ${sessionType}`;
  } else {
    sessionDisplay.textContent = `Current Session: ${sessionType}`;
  }
}
function updatecompletedsessionsdisplay() {
  completedSessionsDisplay.textContent = `Work Sessions: ${completedWorkSessions}`;
}
startButton.addEventListener("click", starttimer);
pauseButton.addEventListener("click", pausetimer);
resetButton.addEventListener("click", resettimer);

const settingsButton = document.getElementById("settingsButton");
const settingsDialog = document.getElementById("settingsDialog");
const settingsForm = document.getElementById("settingsForm");
const closeSettingsButton = document.getElementById("closeSettingsButton");

const workInput = document.getElementById("workMinutes");
const breakInput = document.getElementById("breakMinutes");
const longBreakInput = document.getElementById("longBreakMinutes");

settingsButton.addEventListener("click", () => {
  workInput.value = work / 60;
  breakInput.value = breakTime / 60;
  longBreakInput.value = longBreak / 60;
  settingsDialog.showModal();
});

closeSettingsButton.addEventListener("click", () => {
  settingsDialog.close();
});

settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();

  work = Number(workInput.value) * 60;
  breakTime = Number(breakInput.value) * 60;
  longBreak = Number(longBreakInput.value) * 60;

  pausetimer();

  if (sessionType === "Work") remaining = work;
  else if (sessionType === "Break") remaining = breakTime;
  else remaining = longBreak;

  displaytime(remaining);
  settingsDialog.close();
});
displaytime(remaining);
