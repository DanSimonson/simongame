var simonGame = function() {

    var scenarios = [[1, 2, 3, 4, 3, 4, 2, 4, 1, 1, 3, 2, 1, 4, 2, 3, 2, 4, 1, 4], [2, 1, 4, 3, 4, 2, 1, 4, 3, 1, 3, 2, 1, 4, 2, 4, 2, 4, 2, 3], [3, 4, 2, 1, 2, 3, 1, 2, 3, 1, 4, 2, 1, 3, 2, 4, 3, 2, 1, 2], [4, 1, 4, 2, 3, 2, 4, 1, 2, 3, 1, 2, 4, 2, 4, 1, 4, 3, 2, 1]];
    var scenario = Math.floor((Math.random()*4)+1)-1;
    var userInput = [];
    var strictMode = false;
    var userGo = false;
    var length = 1;
    
    //remove focus from pressed buttons
    $(".btn").mouseup(function(){
      $(this).blur();
    })
    
    //toggle strict mode on and off
    $('.strictOn').click(function(){
      $('#strict-on').toggleClass("active");
      $('#strict-on2').toggleClass("active");
      $('#strict-off').toggleClass("active");
      $('#strict-off2').toggleClass("active");
      strictMode = true;
    })
    $('.strictOff').click(function(){
      $('#strict-on').toggleClass("active");
      $('#strict-on2').toggleClass("active");
      $('#strict-off').toggleClass("active");
      $('#strict-off2').toggleClass("active");
      strictMode = false;
    })
    
    //play audio when buttons are highlighted
    var playSound = function(btnNum) {
      if (btnNum == 1) {
        $('#audio1').trigger('play');
      }
      else if (btnNum == 2) {
        $('#audio2').trigger('play');
      }
      else if (btnNum == 3) {
        $('#audio3').trigger('play');
      }
      else if (btnNum == 4) {
        $('#audio4').trigger('play');
      }
    };
    
    
    //functions to light up the sequenced button and play sound
    var lightUp = function(num) {
      $("#" + num).addClass('active');
      playSound(num);
    };
    var lightOff = function(num) {
      $("#" + num).removeClass('active');
    };
    
    //computer display the sequence
    var gamePlay = function() {
      var go = 1;
      $("#start").text("WATCH");
      var gameLoop = function() {
        setTimeout(function() {
          lightUp(scenarios[scenario][go-1]);
          setTimeout(function(){
            lightOff(scenarios[scenario][go-1]);
            go++;
          }, 2000);
          if (go < length) {
            gameLoop();
          }
          else {
            userGo = true;
            $("#start").text("YOU GO");
          }
        }, 2500)
      }
      gameLoop();
    };
    
    //start game when start button clicked
    $("#start").click(function(){
      $(this).addClass("active");
      $("#display-count").text(01);
      gamePlay();
    })
    
    //user input
    $(".btn-game").click(function(){
      var userValue = Number($(this).val());
      playSound(userValue);
      if (userGo && userInput.length < length) {
        if (userValue == scenarios[scenario][userInput.length]) {
          userInput.push(userValue);
          if (userInput.length == 20) {
            $("#display-count").text("WINNER!");
            userInput = [];
            userGo = false;
            length = 1;
            scenario = Math.floor((Math.random()*4)+1)-1;
            $('#start').removeClass("active");
            $("#start").text("START");
          }
          else if (userInput.length == length) {
            length++;
            userInput = [];
            userGo = false;
            $("#display-count").text(length);
            gamePlay();
          }
        }
        else {
          if (strictMode) {
            $("#display-count").text("FAIL");
            userInput = [];
            length = 1;
            scenario = Math.floor((Math.random()*4)+1)-1;
            userGo = false;
            $("#start").removeClass("active");
            $("#start").text("START");
          }
          else {
            $("#display-count").text("OOPS");
            userGo = false;
            userInput = [];
            gamePlay();
          }
        }
      }
      
    })
    
    //reset button
    $("#reset").click(function(){ 
      userGo = false;
      length = 1;
      userInput = [];
      $("#display-count").text("--");
      scenario = Math.floor((Math.random()*4)+1)-1;
      $('#start').removeClass("active");
      $("#start").text("START");
    })   
  };
  
  $(document).ready(simonGame);

/*------------------------------------------------------------
-------------------------------------------------------------
---------- old code -----------------------------------------

$(document).ready(function() {
    $("#red").click(function() {simon.sendColor('RED')});
    $("#blue").click(function() {simon.sendColor('BLUE')});
    $("#yellow").click(function() {simon.sendColor('YELLOW')});
    $("#green").click(function() {simon.sendColor('GREEN')});

    $("#start").click(function() {simon.nextSequence()});
    $("#reset").click(function () {simon.resetSequence()});
    //$("#strict").click(function () 

var currentColor;
var nextColor;
const RED = 'RED';
const GREEN = 'GREEN';
const BLUE = 'BLUE';
const YELLOW = 'YELLOW';
var simon = {
    sendColor: function(color) {          
        

            if(color === simon.sequence[simon.step]){
                //got to next step
                if(simon.step === simon.sequence.length - 1){
                    console.log('sequence complete!');
                    $(".game-steps").html(simon.sequence.length);
                    simon.step = 0;
                    simon.nextSequence();
                }
                else {
                    simon.step++;
                }
            }
            else {
                //!!lose condition
                alert('wrong!!');                
                currentColor = simon.sequence[simon.step];
                if( currentColor === simon.sequence[simon.step]){
                    console.log('wrong color chosen');
                    console.log('sequence: ', simon.sequence);
                    color =  simon.sequence[simon.step];               
                }                                
            }
        
        //}
        //console.log('NEW COLOR: ' + color);

    },
    sequence: [],
    colors: [RED, BLUE, YELLOW, GREEN],
    step: 0,
    nextSequence: function(){
        if(simon.sequence.length === 0){
            //hide start button and show reset button
            $(".btn-start").addClass('hidden');
		    $(".btn-reset").removeClass('hidden');
        }

        nextColor = simon.colors[Math.floor(Math.random() * simon.colors.length)];
        simon.sequence.push(nextColor);
        console.log("the sequence ", simon.sequence);
    },
    repeatSequence: function() {
        // reset array to where it was
        //simon.sequence.pop();
        console.log('sequence:', simon.sequence);

    },
    resetSequence: function(){
        //reset array holding colors and index
        simon.sequence = [];
        simon.step = 0;
        //show start button and hide reset button
        $(".btn-start").removeClass('hidden');
        $(".btn-reset").addClass('hidden');
        $(".game-steps").html(simon.step);
        console.log(simon.sequence);
        console.log(simon.step);

    }
    /*
    strictMode: function() {
        if(color !== simon.sequence[simon.step]){
            //reset array holding colors and index and start game over
            simon.sequence = [];
            simon.step = 0;
            simon.nextSequence();
        }
    }*/

//};
 

//});
/*

var simon = {
    sendColor: function(color) {
        
        //if(!simon.sequence.length){
            //start a new game
            //simon.nextSequence();
        //}
        //else {
            if(color === simon.sequence[simon.step]){
                //got to next step
                if(simon.step === simon.sequence.length - 1){
                    console.log('sequence complete!');
                    $(".game-steps").html(simon.sequence.length);
                    simon.step = 0;
                    simon.nextSequence();
                }
                else {
                    simon.step++;
                }
            }
            else {
                //!!lose condition
                console.log('time.step:', simon.step)                
                console.log('length: ', simon.sequence.length);
                console.log('[secuence:', simon.sequence);
                //currentColor = color; 
                //console.log('color:', currentColor);        
                //simon.step = simon.step 2;
                //console.log('[secuence:', simon.sequence);
                //console.log('time.step:', simon.step);
                alert('wrong!!');
                simon.sequence.pop();
                simon.step = simon.step - 1;
                currrentColor = simon.sequence[simon.step];
                //simon.sequence.length = simon.sequence.length -1;
                //var nextColor = simon.colors[Math.floor(Math.random() * simon.colors.length)];
                //simon.sendColor(nextColor);
            }
        //}
        //console.log('NEW COLOR: ' + color);

    },
    sequence: [],
    colors: [RED, BLUE, YELLOW, GREEN],
    step: 0,
    nextSequence: function(){
        if(simon.sequence.length === 0){
            //hide start button and show reset button
            $(".btn-start").addClass('hidden');
		    $(".btn-reset").removeClass('hidden');
        }

        var nextColor = simon.colors[Math.floor(Math.random() * simon.colors.length)];
        simon.sequence.push(nextColor);
        console.log("the sequence ", simon.sequence);
    },
    repeatSequence: function() {
        // reset array to where it was
        //simon.sequence.pop();
        //simon.step = simon.step - 1;

    },
    resetSequence: function(){
        //reset array holding colors and index
        simon.sequence = [];
        simon.step = 0;
        //show start button and hide reset button
        $(".btn-start").removeClass('hidden');
        $(".btn-reset").addClass('hidden');
        $(".game-steps").html(simon.step);
        console.log(simon.sequence);
        console.log(simon.step);

    }
    /*
    strictMode: function() {
        if(color !== simon.sequence[simon.step]){
            //reset array holding colors and index and start game over
            simon.sequence = [];
            simon.step = 0;
            simon.nextSequence();
        }
    }*/

//};
 

//});
/* other ways of creating the object and property
 var simon = {};
 simon.sendColor = function(color){
    console.log('NEW COLOR: ' + color);
 }
 var sendColor = function(color){
    console.log("NEW COLOR " + color);
 }
 var simon = {
    sendColor: sendColor
 }
 */