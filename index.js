var RED = new GameObj("red",1,"./sounds/red.mp3");
var GREEN = new GameObj("green",2,"./sounds/green.mp3");
var BLUE = new GameObj("blue",3,"./sounds/blue.mp3");
var YELLOW = new GameObj("yellow",4,"./sounds/yellow.mp3");

var randomColors = [];
var chosenColors = [];

var started = false;
var level = 0;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        levelColors();
        started = true;
    }
});

$(".btn").click(function(event){
    var id = event.target.id;
    addSound(id);
    createAnimation(id);
    chooseColors(id);
    checkAnswer(chosenColors.length-1);
});


//creates random number
function levelColors(){
    chosenColors = [];
    var randomNumber = Math.floor(Math.random() * 3) + 1;
    level++;
    $("#level-title").text("Level " + level);
    switch(randomNumber){
        case 1:
            createAnimation(RED.name);
            addSound(RED.name);
            randomColors.push(RED.id);
            break;
        case 2:
            createAnimation(GREEN.name);
            addSound(GREEN.name);
            randomColors.push(GREEN.id);
            break;
        case 3:
            createAnimation(BLUE.name);
            addSound(BLUE.name);
            randomColors.push(BLUE.id);
            break;
        case 4:
            createAnimation(YELLOW.name);
            addSound(YELLOW.name);
            randomColors.push(YELLOW.id);
            break;            
    }
    return randomNumber;
}
//Adds sound
function addSound(key){
  switch(key){
    case "green":
        GREEN.Play();
        break;
    case "red":
        RED.Play();
        break;
    case "yellow":
        YELLOW.Play();
        break;
    case "blue":
        BLUE.Play();
        break;
    default: 
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        break;        
  }  
}
//GameObjConst
function GameObj(name,id,src){
    this.name = name;
    this.id = id;
    this.src = src;
    this.Play = function(){
        var audio = new Audio(src);
        audio.play();
    }
}
//create animation
function createAnimation(id){
    var event = $("#"+id);
    event.addClass("pressed");
    setTimeout(function(){
        event.removeClass("pressed");
    },100); 
}
//put elements to choosecolor
function chooseColors(id){
    switch(id){
        case "red":
            chosenColors.push(RED.id);
            break;
        case "blue":
            chosenColors.push(BLUE.id);
            break;
        case "yellow":
            chosenColors.push(YELLOW.id);        
            break;
        case "green":
            chosenColors.push(GREEN.id);    
    }
}
//check answer
function checkAnswer(currentLevel){
    if(randomColors[currentLevel] === chosenColors[currentLevel]){
        if(randomColors.length === chosenColors.length){
            setTimeout(function(){
                levelColors();
            },1000);
        }
    }
    else {
        addSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
}

// start over
function startOver() {
    level = 0;
    randomColors = [];
    started = false;
  }

