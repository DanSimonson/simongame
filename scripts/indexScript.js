
const RED = 'RED';
const GREEN = 'GREEN';
const BLUE = 'BLUE';
const YELLOW = 'YELLOW';

var simon = {
    sendColor: function(color) {
        if(simon.sequence.length === 0){
            //start a new game
            simon.nextSequence();
        }
        else {
            if(color === simon.sequence[simon.step]){
                //got to next step
                if(simon.step === simon.sequence.length - 1){
                    console.log('sequence complete!');
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
                simon.sequence = [];
                simon.step = 0;
            }
        }
        //console.log('NEW COLOR: ' + color);

    },
    sequence: [],
    colors: [RED, BLUE, YELLOW, GREEN],
    step: 0,
    nextSequence: function(){
        var nextColor = simon.colors[Math.floor(Math.random() * simon.colors.length)];
        simon.sequence.push(nextColor);
        console.log("the sequence ", simon.sequence);
    }
};
 
$(document).ready(function() {
    $("#red").click(function() {simon.sendColor('RED')});
    $("#blue").click(function() {simon.sendColor('BLUE')});
    $("#yellow").click(function() {simon.sendColor('YELLOW')});
    $("#green").click(function() {simon.sendColor('GREEN')});
});
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