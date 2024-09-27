const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let iteration = 0;
document.querySelector("h1").onmouseover = (event) => {
  const Interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if (index <= iteration) {
          return event.target.dataset.newvalue[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    iteration += 1 / 2;
    if (iteration >= event.target.dataset.newvalue.length) {
      iteration = 0;
      clearInterval(Interval);
    }
  }, 50);
};
document.querySelector("h1").onmouseout = (event) => {
  const Interval = setInterval(() => {
    event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
        if (index <= iteration) {
          return event.target.dataset.oldvalue[index];
        }
        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    iteration += 1 / 2;
    if (iteration >= event.target.dataset.oldvalue.length) {
      iteration = 0;
      clearInterval(Interval);
    }
  }, 50);
};
