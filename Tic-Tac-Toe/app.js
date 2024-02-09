let buttons = document.querySelectorAll(".btn");
let resetButton = document.querySelector("#resetGame");
let trackX = true;
let count=0;
let winSound  = document.getElementById("winAudio");
let drawSound  = document.getElementById("drawAudio");
let tapSound  = document.getElementById("tap");
let patternS = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];
function enabled(){
    buttons.forEach(
        (button)=>{
            button.disabled=false;
        }
    )

}
resetButton.addEventListener("click",
    ()=>{
        tapSound.play();
        buttons.forEach(
            (button)=>{
                button.disabled=false;
                button.innerText="";
                button.setAttribute("class","btn");
            }
        )
        trackX=true;
        document.getElementById("message").innerText=``;
        count=0;

    }
)
function disabled(){
    buttons.forEach(
        (button)=>{
            button.disabled=true;
        }
    )

}
let sound = ()=>{
    winSound.play();
}
let looseSound = ()=>{
    drawSound.play();
}
const winner = ()=>{
   for(pattern of patternS){
    let pos1 = buttons[pattern[0]].innerText;
    let pos2 = buttons[pattern[1]].innerText;
    let pos3 = buttons[pattern[2]].innerText;
    if(pos1!=="" && pos2!=="" && pos3!==""){
        if(pos1===pos2 && pos2===pos3){
            sound();
            //console.log("winner");
            document.getElementById("message").innerText=`Winner is ${pos1}`;
            disabled();
        }
    }
   }
}
function draw(){
    if(count===9){
        looseSound()
        document.getElementById("message").innerText=`Game Draw!!!`;
    }
}
buttons.forEach(
    (btn)=>{
        btn.addEventListener("click",()=>{
            tapSound.play();
            count++;
            if(trackX){
                //console.log("button X is clicked");
                btn.setAttribute("class","btnColor");
                btn.innerText="X";
                trackX=false;
                btn.disabled = true;
            }else{
                //console.log("button Y is clicked");
                btn.innerText="0";
                trackX=true;
                btn.disabled = true;
            }
            draw();
            winner();
        })
    }
   
)
