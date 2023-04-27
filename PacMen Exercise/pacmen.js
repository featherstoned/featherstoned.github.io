const pacArray = [
  ["./images/PacMan1.png", "./images/PacMan2.png"], ["./images/PacMan3.png", "./images/PacMan4.png"],
];
const pacMen = [];

function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale
  };
}

function makePac() {
  let velocity = setToRandom(10);
  let position = setToRandom(200);
  let mouthOpen = true;
  
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  
  newimg.style.position = 'absolute';
  newimg.src = "./images/PacMan1.png"; 
  newimg.width = 100;
  newimg.style.left = position.x;
  newimg.style.top = position.y;
 
  game.appendChild(newimg);
  
  return {
    position,
    velocity,
    newimg,
    mouthOpen,
    chompTime: 0
  };
  }

function update() {
  pacMen.forEach((item) => {
    checkCollisions(item)
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;
    item.newimg.style.left = item.position.x + "px";
    item.newimg.style.top = item.position.y + "px";
    item.chompTime += 1;
    if (item.chompTime % 6 === 0) {
      let chomp = item.mouthOpen ? 0 : 1;
      item.mouthOpen = !item.mouthOpen;
      let faceDirection = item.velocity.x > 0 ? 0 : 1;
      item.newimg.src = pacArray[faceDirection][chomp];
    }
  })
  setTimeout(update, 50);
}

function checkCollisions(item) {
  if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth || item.position.x + item.velocity.x < 0) item.velocity.x = -item.velocity.x;
  if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight || item.position.y + item.velocity.y < 0) item.velocity.y = -item.velocity.y;
}

function makeOne() {
  pacMen.push(makePac());
}