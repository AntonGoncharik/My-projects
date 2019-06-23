class ObjectGame {
  constructor(imgX, imgY, canvasX, canvasY, imgWidth, imgHeight, canvasWidth, canvasHeight) {
    this.imgX = imgX;
    this.imgY = imgY;
    this.imgWidth = imgWidth;
    this.imgHeight = imgHeight;
    this.canvasX = canvasX;
    this.canvasY = canvasY;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }
}

class Bird extends ObjectGame {
  constructor(imgX, imgY, canvasX, canvasY, imgWidth, imgHeight, canvasWidth, canvasHeight) {
    super(imgX, imgY, canvasX, canvasY, imgWidth, imgHeight, canvasWidth, canvasHeight);
    this.countFrame = 13;
    this.currentFrame = 0;
    this.timeDelayFrame = 50;
    this.previousTimeFrame = 0;
    this.fly = 0;
  }
}

class Cactus extends ObjectGame {
  constructor(imgX, imgY, canvasX, canvasY, imgWidth, imgHeight, canvasWidth, canvasHeight) {
    super(imgX, imgY, canvasX, canvasY, imgWidth, imgHeight, canvasWidth, canvasHeight);
    this.speed = 6;
  }
}

class Game {
  constructor() {
    this.SCREEN_WIDTH = 1440;
    this.SCREEN_HEIGHT = 720;
    this.BACKGROUND_IMG = new Image();
    this.BACKGROUND_IMG.src = '../img/background_img.png';
    this.BIRD_IMG = new Image();
    this.BIRD_IMG.src = '../img/bird_img.png';
    this.BUTTONS_IMG = new Image();
    this.BUTTONS_IMG.src = '../img/buttons_img.png';
    this.CACTUS_IMG = new Image();
    this.CACTUS_IMG.src = '../img/cactus_img.png';
    this.scrollingFrame = 10;
    this.widthSecondFrame = 0;
    this.timeDelayFrame = 10;
    this.previousTimeFrame = 0;
  }

  createGame() {
    let canvasGame = document.createElement('canvas');
    canvasGame.id = 'canvasGame';
    canvasGame.width = this.SCREEN_WIDTH;
    canvasGame.height = this.SCREEN_HEIGHT;
    document.body.appendChild(canvasGame);
    this.ctx = canvasGame.getContext('2d');
    document.addEventListener('keydown', game.birdUp);
    document.addEventListener('keyup', game.birdDown);
  }

  createBird() {
    this.bird = new Bird(0, 0, 200, 300, 165, 150, 165, 150);
  }

  createCactus() {
    this.cactus = new Cactus(0, 0, this.ctx.canvas.width, -500, 300, 1080, 300, 1080);
  }

  moveGame() {
    requestAnimationFrame(game.moveGame);

    // background
    if (Date.now() - game.previousTimeFrame > game.timeDelayFrame) {
      game.previousTimeFrame = Date.now();
      game.widthSecondFrame += game.scrollingFrame;
    }
    if (Math.abs(game.widthSecondFrame) > game.SCREEN_WIDTH) {
      game.widthSecondFrame = 0;
    }

    // bird
    if (Date.now() - game.bird.previousTimeFrame > game.bird.timeDelayFrame) {
      game.bird.previousTimeFrame = Date.now();
      game.bird.currentFrame++;
      if (game.bird.currentFrame === game.bird.countFrame) {
        game.bird.currentFrame = 0;
      }
    }

    // cactus
    game.cactus.canvasX -= game.cactus.speed;
    if (game.cactus.canvasX < -game.cactus.canvasWidth) {
      let numberCactus = getRandomInt(0, 6);
      game.cactus.imgX = numberCactus * game.cactus.imgWidth;
      game.cactus.canvasX = game.ctx.canvas.width;
      switch (numberCactus) {
        case 0:
          game.cactus.canvasY = getRandomInt(-500, -900);
          break;
        case 1:
          game.cactus.canvasY = getRandomInt(200, 800);
          break;
        case 2:
          game.cactus.canvasY = getRandomInt(-500, -900);
          break;
        case 3:
          game.cactus.canvasY = getRandomInt(200, 800);
          break;
        case 4:
          game.cactus.canvasY = getRandomInt(-500, -900);
          break;
        case 5:
          game.cactus.canvasY = getRandomInt(200, 800);
          break;
      };
    }

    // encounter with cactus
    if (game.bird.canvasX + game.bird.canvasWidth - 82 > game.cactus.canvasX &&
      game.bird.canvasX + game.bird.canvasWidth - 82 < game.cactus.canvasX + game.cactus.canvasWidth) {
      if (game.cactus.canvasY < 0) {
        if (game.bird.canvasY < game.cactus.canvasY + game.cactus.canvasHeight) {
          alert('GAME OVER');
        }
      } else {
        if (game.bird.canvasY > game.cactus.canvasY) {
          alert('GAME OVER');
        }
      }
    }

    game.renderGame();

    // check touch floor
    if (game.bird.canvasY + game.bird.canvasHeight - 20 > game.ctx.canvas.height) {
      return;
    }
    if (game.bird.fly !== 1) {
      game.bird.canvasY += 10;
    }

    //   cancelAnimationFrame(this.IDtimer);
    //   return;
    // }
  }

  renderGame() {
    // clear canvas
    game.ctx.clearRect(0, 0, game.ctx.canvas.width, game.ctx.canvas.height);

    // render background
    game.ctx.drawImage(game.BACKGROUND_IMG, 165, 0, 1920, 1080,
      -game.widthSecondFrame, 0, game.SCREEN_WIDTH, game.SCREEN_HEIGHT);
    game.ctx.drawImage(game.BACKGROUND_IMG, 165, 0, 1920, 1080,
      game.SCREEN_WIDTH - game.widthSecondFrame, 0, game.SCREEN_WIDTH, game.SCREEN_HEIGHT);

    // render bird
    game.ctx.drawImage(game.BIRD_IMG, game.bird.currentFrame * game.bird.imgWidth, 0,
      game.bird.imgWidth, game.bird.imgHeight, game.bird.canvasX, game.bird.canvasY,
      game.bird.canvasWidth, game.bird.canvasHeight);

    // render cactus
    game.ctx.drawImage(game.CACTUS_IMG, game.cactus.imgX, game.cactus.imgY,
      game.cactus.imgWidth, game.cactus.imgHeight, game.cactus.canvasX, game.cactus.canvasY,
      game.cactus.canvasWidth, game.cactus.canvasHeight);

  }

  birdUp(e) {
    if (game.bird.canvasY - 40 < 0) {
      return;
    }

    if (e.keyCode === 32) {
      game.bird.fly = 1;
      game.bird.canvasY -= 100;
    }
  }

  birdDown(e) {
    if (e.keyCode === 32) {
      game.bird.fly = 0;
    }
  }

  playAudioTheme() {
    let audio = new Audio();
    audio.onloadeddata = function() {
      audio.play();
    }
    audio.src = '../audio/theme_audio.mp3';
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

let game = new Game();
game.BIRD_IMG.onload = function() {
  game.BACKGROUND_IMG.onload = function() {
    game.CACTUS_IMG.onload = function() {
      game.createGame();
      game.createBird();
      game.createCactus();
      game.moveGame();
      game.playAudioTheme();
    }
  }
}
