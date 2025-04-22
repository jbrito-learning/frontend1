// TEST CANVAS

const testCanvas = document.getElementById("test-canvas");
const testCtx = testCanvas.getContext("2d");

testCtx.fillStyle = "black"; // Set background color
testCtx.fillRect(0, 0, testCanvas.width, testCanvas.height); // Fill entire canvas

testCtx.fillStyle = "red";
testCtx.fillRect(100, 100, 100, 100);

testCtx.beginPath();
testCtx.arc(300, 300, 50, 0, Math.PI * 2);
testCtx.fillStyle = "blue";
testCtx.fill();

testCtx.beginPath();
testCtx.moveTo(400, 100);
testCtx.lineTo(300, 200);
testCtx.strokeStyle = "green";
testCtx.lineWidth = 5;
testCtx.stroke();

// ANIMATE CANVAS

const animateCanvas = document.getElementById("animate-canvas");
const animateCtx = animateCanvas.getContext("2d");

let x = 0;
function animate() {
  animateCtx.clearRect(0, 0, animateCanvas.width, animateCanvas.height);
  animateCtx.fillRect(x, 100, 100, 100);
  x += 1;
  requestAnimationFrame(animate);
}
animate();

// GAME CANVAS

const gameCanvas = document.getElementById("game-canvas");
const gameCtx = gameCanvas.getContext("2d");

// Player square properties
const player = {
  x: gameCanvas.width / 2 - 25,
  y: gameCanvas.height / 2 - 25,
  width: 50,
  height: 50,
  color: "red",
  speed: 5,
};

// Track which keys are currently pressed
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

// Event listeners for key presses
window.addEventListener("keydown", (e) => {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = true;
  }
});

window.addEventListener("keyup", (e) => {
  if (keys.hasOwnProperty(e.key)) {
    keys[e.key] = false;
  }
});

// New animation function for player movement
function gameLoop() {
  // Clear the canvas
  gameCtx.fillStyle = "black";
  gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

  // Update player position based on key presses
  if (keys.ArrowUp) {
    player.y = Math.max(0, player.y - player.speed);
  }
  if (keys.ArrowDown) {
    player.y = Math.min(
      gameCanvas.height - player.height,
      player.y + player.speed
    );
  }
  if (keys.ArrowLeft) {
    player.x = Math.max(0, player.x - player.speed);
  }
  if (keys.ArrowRight) {
    player.x = Math.min(
      gameCanvas.width - player.width,
      player.x + player.speed
    );
  }

  // Draw the player
  gameCtx.fillStyle = player.color;
  gameCtx.fillRect(player.x, player.y, player.width, player.height);

  // Continue the animation
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
