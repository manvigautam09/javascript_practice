document.addEventListener("DOMContentLoaded", () => {
  const parent = document.getElementById("app");

  const progressDiv = document.createElement("div");
  progressDiv.classList.add("progress");
  parent.appendChild(progressDiv);

  const progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");
  progressDiv.appendChild(progressBar);

  progressBar.setAttribute("aria-label", "Progress Bar");
  progressBar.setAttribute("role", "progressBar");
  progressBar.setAttribute("aria-valuenow", "0");
  progressBar.setAttribute("aria-valuemin", "0");
  progressBar.setAttribute("aria-valuemax", "100");

  let intervalId = null;

  const startProgressBar = () => {
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      const width = parseInt(progressBar.style.width) || 0;
      if (width + 1 >= 100) {
        clearInterval(intervalId);
        intervalId = null;
      }
      progressBar.style.width = `${width + 1}%`;
    }, 100);
  };

  const pauseInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const stopInterval = () => {
    if (parseInt(progressBar.style.width) > 0) {
      clearInterval(intervalId);
      intervalId = null;
      progressBar.style.width = "0%";
    }
  };

  const buttonStart = document.createElement("button");
  buttonStart.textContent = "Start";
  buttonStart.onclick = startProgressBar;
  parent.appendChild(buttonStart);

  const buttonPause = document.createElement("button");
  buttonPause.textContent = "Pause";
  buttonPause.addEventListener("click", pauseInterval);
  parent.appendChild(buttonPause);

  const buttonStop = document.createElement("button");
  buttonStop.textContent = "Stop";
  parent.appendChild(buttonStop);
  buttonStop.addEventListener("click", stopInterval);

  const input = document.createElement("input");
  parent.appendChild(input);
  input.type = "number";
  input.min = 0;
  input.max = 100;
  input.classList.add("input");
  input.value = 0;
  input.addEventListener("input", (e) => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      progressBar.style.width = `${e.target.value}%`;
    }
  });
});
