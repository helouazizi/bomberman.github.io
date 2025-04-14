let box = document.getElementById("box");
let start = null;

function step(timestamp) {
  if (!start) start = timestamp;
  let progress = timestamp - start;
  box.style.transform = `translateX(${Math.min(progress / 10, 200)}px)`;
  if (progress < 2000) {
    requestAnimationFrame(step);
  }
}
setIdnterval(() => {
  // This may cause choppy animation
  console.log("Interval fired");
}, 16); // Roughly 60 FPS

requestAnimationFrame(step);
