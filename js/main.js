//사용변수
const GAME_TIME = 10;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let words = [];
let checkInterval;
const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".word-display");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");

init();

function init() {
  buttonChange("Loading...");
  getWords();
  wordInput.addEventListener("input", checkMatch);
}

// 게임 실행
function run() {
  if (isPlaying) {
    return;
  }
  isPlaying = true;
  time = GAME_TIME;
  wordInput.focus();
  scoreDisplay.innerHTML = 0;
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50);
  buttonChange("Gaming");
}

function checkStatus() {
  if (isPlaying && time === 0) {
    buttonChange("Game restart");
    clearInterval(checkInterval);
  }
}

//단어 불러오기
function getWords() {
  axios
    .get("https://random-word-api.herokuapp.com/word?number=100")
    .then(function (response) {
      response.data.forEach(word => {
        if (word.length < 10) {
          words.push(word);
        }
      });
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}

//단어일치 체크
function checkMatch() {
  if (wordInput.value.toLowerCase() === wordDisplay.innerHTML.toLowerCase()) {
    wordInput.value = "";
    if (!isPlaying) {
      return;
    }
    score++;
    scoreDisplay.innerHTML = score;
    time = GAME_TIME;
    const randomIndex = Math.floor(Math.random() * words.length);
    wordDisplay.innerHTML = words[randomIndex];
  }
}

//1초 마다 카운트 다운
// setInterval(countDown, 1000);

// 삼항연산자 : (조건) ? 참일경우 : 거짓일 경우
function countDown() {
  time > 0 ? time-- : (isPlaying = false);
  if (!isPlaying) {
    clearInterval(timeInterval);
  }
  timeDisplay.innerHTML = time;
}

buttonChange("Game start");

function buttonChange(text) {
  button.innerHTML = text;
  text === "Game start"
    ? button.classList.remove("loading")
    : button.classList.add("loading");
}
