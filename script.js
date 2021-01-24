
/* UI Controller to handle UI */

var UIController = (function(){

    var DOMmans = {
        top1: 'top-1',
        top2: 'top-2',
        top3: 'top-3',
        middle1: 'middle-1',
        middle2: 'middle-2',
        middle3: 'middle-3',
        bottom1: 'bottom-1',
        bottom2: 'bottom-1',
        bottom3: 'bottom-1',
        play: '.play'
    };

    var InnerStr= {
        top1: document.getElementById(DOMmans.top1).innerText,
        top2: document.getElementById(DOMmans.top2).innerText,
        top3: document.getElementById(DOMmans.top3).innerText,
        middle1: document.getElementById(DOMmans.middle1).innerText,
        middle2: document.getElementById(DOMmans.middle2).innerText,
        middle3: document.getElementById(DOMmans.middle3).innerText,
        bottom1: document.getElementById(DOMmans.bottom1).innerText,
        bottom2: document.getElementById(DOMmans.bottom2).innerText,
        bottom3: document.getElementById(DOMmans.bottom3).innerText,
    };

    return{
        getInnerStr: function(){
            return InnerStr;
        },
        
        getDOMmans: function() {
            return DOMmans;
        }
    }

})();



/* Global APP */
var globalController = (function(UICtrl){

    var canAddcross = true;

    var DOM = UICtrl.getDOMmans();

    var grabinnerStr = UICtrl.getInnerStr();
    // console.log(grabinnerStr.top1)


    // add either X or O
    function addPlayerMark(e){
        const boxTarget = e.target;

        e.preventDefault();

        // check if box is not empty
        if(boxTarget.innerText !== ''){
            return
        }

        // clear class
        boxTarget.classList.remove('cross');
        boxTarget.classList.remove('circle')

        
        // check for which to add (X or O)
        if(canAddcross){
            boxTarget.innerText = "X"
            boxTarget.style.color = 'red'
            boxTarget.classList.add("cross");
            canAddcross = false;
        } else {
            boxTarget.innerText = "O";
            boxTarget.style.color = 'black'
            boxTarget.classList.add("circle");
            canAddcross = true;
        }

        // loop through the classes to get the index
        classToArray();
        // announce winner
        annouceWinner(checkWin());
        // add score to board
        addScore(checkWin())
        
        
    }
  
   
    // create possible win values
    let posWin = [
        [0,1,2],
        [0,3,6],
        [2,5,8],
        [1,4,7],
        [0,4,8],
        [2,4,6],
        [3,4,5],
        [6,7,8]
    ];


    var annouceWinner = function(winner){
        if(winner !== "No win" && winner !== false)
        {
            // setTimeout(alert.bind(this,winner +" has won"),1000)
             setTimeout("alert('"+winner+" has won')",1000);
            //  reset the game
             setTimeout(resetGame, 800);
        }
        else if(winner == "No win")
        {
           setTimeout("alert('Cat Game')", 1000);
           //  reset the game
           setTimeout(resetGame, 800);
        }
    }

    


    let board = document.getElementById('board')
    let eachBoard = board.querySelectorAll('.play')

    // loop through each class of the game board
    for (const item of eachBoard){
        item.addEventListener('click', addPlayerMark);
        // console.log(item);
    }

    // create an empty array to destructure value
    let gameState = new Array(9);


    // loop through each class of the game board to get the inner value
    let classToArray = function(){
        eachBoard.forEach(function(item, i){
            gameState[i] = item.innerText;
        });
    
    }

    // check for winner
    function checkWin(){
        let isFull = null
      for(let i=0;i<posWin.length;i++){
          let [a,b,c] = posWin[i]

          if(gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c]) 
          {
              return gameState[a]
          }
          else if(gameState[i] !== "")
          {
              isFull +=1
          }
      }
    //   check completed
      return isFull === 8 ?  "No win" : false
    }

 
    // add score to board
    function addScore(winner){
        if(winner === "No win" || winner === false) return
        if(winner === 'X'){
            currScr = document.getElementById('X')
            currScr.innerText = Number(currScr.innerText)+1;
        }
        else{
            currScr = document.getElementById('O')
            currScr.innerText = Number(currScr.innerText)+1;
        }
    }
    
    // reset game
    function resetGame(){
        eachBoard.forEach(function(item, i){
         item.innerText = '';
        });
    }
    // console.log(resetGame)
})(UIController);

