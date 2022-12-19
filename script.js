let side = "white";
let dial = "black";
let random = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let memo = "";
let realMemo = "";
let l = ["L","A","B","C","D","E","F","G","H","I","J","K"];

document.addEventListener("keydown", function onEvent(event) {
  if (event.key === " ") {
    flip();
  }
  else if (event.key === "s") {
    random = Array.from({length: 14}, () => Math.floor(Math.random() * 12));
    console.log(random);
    memo="";
    document.querySelector("#memo").innerText="memo: ";
    scramble();
  }
  else if(event.key === "Backspace"){
    if(memo.length==3 || memo.length==6){
      memo=memo.slice(0,-2);
    }
    else{
      memo = memo.slice(0, -1);
    }
    document.querySelector("#memo").innerText="memo: "+memo;
  }
  else if(event.key === "Enter"){
    checkMemo();
  }
  else{
    if(event.key.charCodeAt(0)>=97 && event.key.charCodeAt(0) <= 108){
      if((document.querySelector('input[name="pairs"]:checked').value == '3' && memo.length<8) || (document.querySelector('input[name="pairs"]:checked').value == '4' && memo.length<11)){
        memo+=event.key.toUpperCase();
      }
      if(memo.length==2 || memo.length==5 || memo.length==8){
        memo+=" ";
      }
      document.querySelector("#memo").innerText="memo: "+memo;
    }
  }  
  
});

function checkMemo(){
  if (document.querySelector('input[name="pairs"]:checked').value == '3'){
    realMemo = l[(random[11]-random[13]+144)%12]+l[((random[2]*-1-random[12])+(random[1]-random[3])+144)%12]+" "+l[(random[13]-random[12]+144)%12]+l[(random[3]-random[1]+144)%12]+" "+l[(random[2]-random[1]+random[4]-random[7]+random[6]+random[10]+random[12]+144)%12]+l[(random[9]-random[11]+random[13]+random[0]-random[3]+random[8]-random[5]+144)%12]+" ";
  }
  if (document.querySelector('input[name="pairs"]:checked').value == '4'){
    realMemo = l[(random[11]-random[13]+144)%12]+l[((random[2]*-1-random[12])+(random[1]-random[3])+144)%12]+" "+l[(random[13]-random[12]+144)%12]+l[(random[3]-random[1]+144)%12]+" "+l[(random[12]-random[13]+random[3]-random[0]+144)%12]+l[(random[1]-random[4]+144)%12]+" "+l[(random[2]-random[1]+random[4]-random[7]+random[6]+random[10]+random[12]+144)%12]+l[(random[9]-random[11]+random[13]+random[0]-random[3]+random[8]-random[5]+144)%12];
  }
  if(memo.toUpperCase()==realMemo){
    alert("correct");
  }
  else{
    alert(`Your memo: ${memo.toUpperCase()}\nCorrect memo: ${realMemo}`);
  }
  random = Array.from({length: 14}, () => Math.floor(Math.random() * 12));
  console.log(random);
  scramble();
  memo="";
  document.querySelector("#memo").innerText="memo: ";
}

function flip() {
  if(side=='white'){
    side='black';
    dial='white';
  }
  else{
    side='white';
    dial='black'
  }
  for(let i of document.querySelectorAll(".circle")){
    i.style.backgroundColor = side;
  }
  for(let i of document.querySelectorAll(".dial")){
    i.style.backgroundColor = dial;
  }
  scramble();
}

function scramble() {
  if(side=="white"){
    for(let i=0; i<9; i++){
      document.querySelectorAll(".dial")[i].style.transform = "translate(50px, 2px) rotate("+random[i]*30+"deg)";
      document.querySelectorAll(".twelve")[i].style.transform = "translate(50px,-10px)";
    }
  }
  if(side=="black"){
    for(let i=0; i<5; i++){
      document.querySelectorAll(".center")[i].style.transform = "translate(50px, 2px) rotate("+(random[i+9]+6)*30+"deg)";
    }
    document.querySelector(".dl.dial").style.transform = "translate(50px, 2px) rotate("+(random[0]+6)*-30+"deg)";
    document.querySelector(".dr.dial").style.transform = "translate(50px, 2px) rotate("+(random[2]+6)*-30+"deg)";
    document.querySelector(".ul.dial").style.transform = "translate(50px, 2px) rotate("+(random[6]+6)*-30+"deg)";
    document.querySelector(".ur.dial").style.transform = "translate(50px, 2px) rotate("+(random[8]+6)*-30+"deg)";
    for(let i=0; i<9; i++){
      document.querySelectorAll(".twelve")[i].style.transform = "translate(50px,110px)"
    }
  }
}
