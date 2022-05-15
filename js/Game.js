class Game {
  constructor() {
    this.resetButton=createButton("")
    this.resetTitle=createElement("h2")
  }

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1,car2];

  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");

    this.resetTitle.html("Reset Game")
    this.resetTitle.position(width/2+50,40)
    this.resetTitle.class("resetText");

    this.resetButton.position(width/2+50,40)
    this.resetButton.class("resetButton")
    
  }

  play() {
    this.handleElements();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 4, width, height * 5);

      var carindex=0;
      //for-in loop
      for(var plr in allPlayers){
        carindex++

        var x=allPlayers[plr].positionX
        var y=height-allPlayers[plr].positionY
        
        cars[carindex-1].position.x=x;
        cars[carindex-1].position.y=y;

        if(carindex===player.index){
          
          camera.position.x = cars[carindex-1].position.x;
          camera.position.y = cars[carindex-1].position.y;

          fill("red");
          text(player.name,x,y-50);
        }
      }
      this.handlePlayerControls();
      drawSprites();
    }
  }
  
  handlePlayerControls(){
    if(keyIsDown(UP_ARROW)){
      player.positionY+=20
      player.update();
    }

  }
}


