const msgEl = document.getElementById("msg");

const randomNum = getRnadomNumber();

console.log("randomNumber", randomNum);

function getRnadomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

// let recognition = new window.SpeechRecognition();

let SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new SpeechRecognition();

recognition.start();

function onSpeak(e) {
  const msg = e.results[0][0].transcript;
  console.log(msg);
  writeMessage(msg);
  checkNumber(msg);
}
function checkNumber(msg) {
  const num = +msg;

  if (Number.isNaN(num)) {
    msgEl.innerHTML += `<div> That is not a Valid Number </div>`;
    return;
  }

  if (num > 100 || num < 1) {
    msgEl.innerHTML += `<div>Number must be between 1 and 100 </div>`;
    return;
  }

  if (num === randomNum) {
    document.body.innerHTML = `<h2>Congrats You have guessed the number right!<br><br> It was ${num} </h2>
      <button class="play-btn" id="play-btn">Play Again</button>
    
    `;
  } else if (num > randomNum) {
    msgEl.innerHTML += `<div>Go Lower </div>`;
  } else {
    msgEl.innerHTML += `<div>Go Higher <div>`;
  }
}

function writeMessage(msg) {
  msgEl.innerHTML = `<div> You said : </div>
    <span class="box"> ${msg}</span>
    `;
}
recognition.addEventListener("result", onSpeak);
recognition.addEventListener('end', ()=> recognition.start() );

document.body.addEventListener('click', (e)=>{
    if(e.target.id === 'play-btn')
    {
        window.location.reload();
    }
})