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
    this.timeDelayFrame = 70;
    this.previousTimeFrame = 0;
    this.fly = 0;
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
    this.timeDelayFrame = 30;
    this.previousTimeFrame = 0;
  }

  createGame() {
    let canvasGame = document.createElement('canvas');
    canvasGame.id = 'canvasGame';
    canvasGame.width = this.SCREEN_WIDTH;
    canvasGame.height = this.SCREEN_HEIGHT;
    document.body.appendChild(canvasGame);
    this.ctx = canvasGame.getContext('2d');
    document.addEventListener('keydown', game.moveBird);
    //document.addEventListener('keydown', game.moveBird);
  }

  createBird() {
    this.bird = new Bird(0, 0, 200, 300, 165, 150, 165, 150);
  }

  renderGame() {
    requestAnimationFrame(game.renderGame);
    // clear canvas
    game.ctx.clearRect(0, 0, game.ctx.canvas.width, game.ctx.canvas.height);

    // render background
    game.ctx.drawImage(game.BACKGROUND_IMG, 165, 0, 1920, 1080, -game.widthSecondFrame, 0, game.SCREEN_WIDTH, game.SCREEN_HEIGHT);
    game.ctx.drawImage(game.BACKGROUND_IMG, 165, 0, 1920, 1080, game.SCREEN_WIDTH - game.widthSecondFrame - 5, 0, game.SCREEN_WIDTH, game.SCREEN_HEIGHT);
    if (Math.abs(game.widthSecondFrame) > game.SCREEN_WIDTH) {
      game.widthSecondFrame = 0;
    }
    if (Date.now() - game.previousTimeFrame > game.timeDelayFrame) {
      game.previousTimeFrame = Date.now();
      game.widthSecondFrame += game.scrollingFrame;
    }

    // render bird
    if (game.bird.fly !== 1) {
      game.bird.canvasY += 5;
    }

    game.ctx.drawImage(game.BIRD_IMG, game.bird.currentFrame * game.bird.imgWidth, 0,
      game.bird.imgWidth, game.bird.imgHeight, game.bird.canvasX, game.bird.canvasY,
      game.bird.canvasWidth, game.bird.canvasHeight);
    if (Date.now() - game.bird.previousTimeFrame > game.bird.timeDelayFrame) {
      game.bird.previousTimeFrame = Date.now();
      game.bird.currentFrame++;
      if (game.bird.currentFrame === game.bird.countFrame) {
        game.bird.currentFrame = 0;
      }
    }
  }

  moveBird(e) {
    if (e.keyCode === 32) {
      game.bird.fly = 1;
      game.bird.canvasY -= 70;
    }

    // encounter with wall
    // if (this.ball.canvasX + this.ball.canvasWidth > this.ctx.canvas.width || this.ball.canvasX < 0) {
    //   this.ball.dx = -this.ball.dx;
    //   this.playAudioBeatBall();
    // }
    // if (this.ball.canvasY < 0) {
    //   this.ball.dy = -this.ball.dy;
    //   this.playAudioBeatBall();
    // }
    // if (this.ball.canvasY + this.ball.canvasHeight > this.ctx.canvas.height) {
    //   //clearTimeout(this.IDtimer);
    //   cancelAnimationFrame(this.IDtimer);
    //   alert('GAME OVER');
    //   return;
    // }
    //
    // // encounter with bricks
    // for (let i = 0; i < this.bricks.length; i++) {
    //   let brick = this.bricks[i];
    //   if (brick.visible === 0) continue;
    //   if (this.ball.canvasX > brick.canvasX && this.ball.canvasX < brick.canvasX + brick.canvasWidth &&
    //     this.ball.canvasY > brick.canvasY && this.ball.canvasY < brick.canvasY + brick.canvasHeight) {
    //     this.ball.dy = -this.ball.dy;
    //     brick.visible = 0;
    //     this.playAudioBeatBrick();
    //   }
    // }
    //
    // // encounter with platform
    // if (this.ball.canvasX > this.platform.canvasX && this.ball.canvasX < this.platform.canvasX + this.platform.canvasWidth &&
    //   this.ball.canvasY + this.ball.canvasHeight > this.platform.canvasY &&
    //   this.ball.canvasY + this.ball.canvasHeight < this.platform.canvasY + this.platform.canvasHeight) {
    //   this.ball.dy = -this.ball.dy;
    //   this.playAudioBeatBall();
    // }
    //
    // this.ball.canvasX += this.ball.dx;
    // this.ball.canvasY += this.ball.dy;
    //
    // this.renderGame();
    // this.IDtimer = requestAnimationFrame(() => this.moveBall());
    // //this.IDtimer = setTimeout(() => this.moveBall(), 25);
  }

  playAudioBeatBrick() {
    // let audio = new Audio();
    // audio.src = '/E:/html, css, js/JS/arkanoid canvas/audio/song_beat_brick.mp3';
    // audio.play();
  }
}

let game = new Game();
game.BIRD_IMG.onload = function() {
  game.BACKGROUND_IMG.onload = function() {
    game.createGame();
    game.createBird();
    game.renderGame();
  }
}
