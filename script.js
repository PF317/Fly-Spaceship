 
let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
canvas.width =1200;
canvas.height = 500;
document.body.appendChild(canvas);
// Load the background image
let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
  // show the background image
  bgReady = true;
};


bgImage.src = "cartoonImageBackground.jpg ";
bgImage.width = "1200px"


// Load the alien image
let alienReady = true;
let alienImage = new Image();
alienImage.src = "./alien-ship-png-19.png";
let alien = {
  speed: 256 // movement speed of alien in pixels per second
};
let human = {};
let humanReady = true;
let humansCaught = 0;

let humanImage = new Image();
if (humansCaught === 5){
  bgImage.src = "cartoonImage3Background.jpg"
}

humanImage.src = "1024px-Black_Man_Walking_Cartoon_Vector.svg.png";


// Create the game objects

// Handle keyboard controls
let keysDown = {};
// Check for keys pressed where key represents the keycode captured
addEventListener("keydown", function (key) {
  keysDown[key.keyCode] = true;
}, false);
addEventListener("keyup", function (key) {
  delete keysDown[key.keyCode];
}, false);
// Reset the player and human positions when player catches a human
let reset = function () {
  // Reset player's position to center of canvas
  alien.x = canvas.width / 2;
  alien.y = canvas.height / 2;
  // Place the human somewhere on the canvas randomly
  human.x = 32 + (Math.random() * (canvas.width - 44));
  human.y = 32 + (Math.random() * (canvas.height - 44));
};
// Update game objects - change player position based on key pressed
let update = function (modifier) {
  if (38 in keysDown) { // Player is holding up key
    alien.y -= alien.speed * modifier;
  }
  if (40 in keysDown) { // Player is holding down key
    alien.y += alien.speed * modifier;
  }
  if (37 in keysDown) { // Player is holding left key
    alien.x -= alien.speed * modifier;
  }
  if (39 in keysDown) { // Player is holding right key
    alien.x += alien.speed * modifier;
  }
  // Check if player and human collider
  if (
    alien.x <= (human.x + 32)
    && human.x <= (alien.x + 32)
    && alien.y <= (human.y + 32)
    && human.y <= (alien.y + 32)
  ) {
    ++humansCaught;
    reset();
  }
};
// Draw everything on the canvas
let render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (alienReady) {
    ctx.drawImage(alienImage, alien.x, alien.y,130,130);
  }
  if (humanReady) {
    ctx.drawImage(humanImage, human.x, human.y,70,70);
  }
  // Display score and time 
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Humans Abducted: " + humansCaught, 20, 20);
 
  // Display game over message when timer finished
  if(finished==true){
    ctx.fillText("Game over!", 200, 220);
  }
  
};
let count = 30; // how many seconds the game lasts for - default 30
let finished = false;
let counter =function(){
  count=count-1; // countown by 1 every second
  // when count reaches 0 clear the timer, hide human and
  // alien and finish the game
    if (count <= 0)
    {
      // stop the timer
       clearInterval(counter);
       // set game to finished
       finished = true;
       count=0;
       // hider human and alien
       humanReady=false;
       alienReady=false;
    }
}
// timer interval is every second (1000ms)
setInterval(counter, 1000);
// The main game loop
let main = function () {
  // run the update function
  update(0.02); // do not change
  // run the render function
  render();
  // Request to do this again ASAP
  requestAnimationFrame(main);
};

let w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

reset();
main();