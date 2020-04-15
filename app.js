var score, roundScore, activePlayer, gamePlaying; 

init();

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(gamePlaying){

         // 1. Random  number
        var dice1=Math.floor(Math.random() * 6) + 1;
        var dice2=Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        document.getElementById('dice-1').style.display='block';
        document.getElementById('dice-2').style.display='block';
        document.getElementById('dice-1').src='dice-'+dice1+'.png';
        document.getElementById('dice-2').src='dice-'+dice2+'.png';

        // 3. Update the roundScore  if the number is not a 1
        if(dice1 !== 1 && dice2 !==1){
            // Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent =roundScore;
    
        }else{
            // Next Player (Follow dry principle)
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        // ADD current score to Global score
    score[activePlayer] += roundScore;

    // Update the UI
    document.getElementById('score-' + activePlayer).textContent=score[activePlayer];

    // store the value enter by user in input variable
    var input=document.querySelector('.final-score').value;

    // Undefined, 0, null, "" are COERCED (assumed) to false (input is false here)
    // Anything else are COERCED (assumed) to true (input is true here)
    var winningScore;
    if(input){
        winningScore=input;
    }else{
        winningScore=100;
    }
    

    // Check if player won the game
        if(score[activePlayer] >= winningScore){
            document.getElementById('name-' + activePlayer).textContent='WINNER!';
            document.getElementById('dice-1').style.display='none';
            document.getElementById('dice-2').style.display='none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel' ).classList.remove('active');
            gamePlaying=false;
        }else{
            // Next Player to follow DRY principle
            nextPlayer();
        }    
    }
    
});

// function for Next player to follow DRY principle
function nextPlayer(){
    // Next Player (Follow dry principle)
    activePlayer === 0 ? activePlayer=1 : activePlayer=0 ;
    roundScore=0;

    // Change Active player
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';

    // Change symbol of active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Hide dice again
    document.getElementById('dice-1').style.display='none';
    document.getElementById('dice-2').style.display='none';

}

// Another way of calling callback function
document.querySelector('.btn-new').addEventListener('click', init);

// Use DRY principle
function init(){
    score=[0,0];
    roundScore=0;
    activePlayer=0;
    gamePlaying=true;

    document.getElementById('dice-1').style.display='none';
    document.getElementById('dice-2').style.display='none';

    // set all the score and current score to 0
    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';

    document.getElementById('name-0').textContent='Player 1';
    document.getElementById('name-1').textContent='Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}