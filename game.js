
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;                                                       //keeps track of the start of the game
var level = 0;

$(document).keypress(function() {                                          //Detecting when keys are pressed
    if (!started) {                                                        //If the game started, change original Heading to "Level 0"
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});
                                                                           //When Users click buttons, It plays the sounds that correspond with the colors
$(".btn").click(function() {                                               //Detecting when buttons are clicked
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);                              //Adding User chosen buttons to "clicked" array
   
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);                            //A user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
});

function checkAnswer (currentLevel) {                                      //Checking to see if the user chose the buttons that matches
    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]) {    //If User choses correctly
        console.log("Correct!");

        if (userClickedPattern.length === gamePattern.length){             //If the user got the most recent answer right in step 3
            setTimeout(function () {                                       //Applying Delay after button selection
            nextSequence();
            }, 1000);
      }
    } else {                                                               //If user choses incorrectly
        console.log("Wrong!");
        playSound("Wrong!");              

        $("body").addClass("game-over");                                   //Flashes game over when user loses
        setTimeout (function () {
        $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");               //Changes heading to Game Over
   
        startOver();
    }
}

function nextSequence() {

    userClickedPattern = [];                                               //When triggered, resets for the next level

    level++;                                                               // Increase the level by 1 every time the function is called
    $("#level-title").text("Level " + level);                              //Update the h1 with the increasing corresponding level

    var randomNumber = Math.floor(Math.random() * 4);                      //Generating Random Numbers & Linking them to Button Colors
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);                                   //Adding random chosen buttons to "gamePattern" array

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);       //Applying Random Numbers & Colors to HTML #IDs to corresponding buttons & Creating a flash animation with the buttons
    playSound(randomChosenColor);   
}

function playSound(name) {                                                 //Applying Sounds for Corresponding Color choice clicks
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play(); 
}

function animatePress(currentColor) {                                      //Animating pressed buttons
    $("#" + currentColor).addClass("pressed");
    setTimeout (function () {   
    $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {                                                     //Resets the game variables
    gamePattern = [];
    started = false;
    level = 0;
}