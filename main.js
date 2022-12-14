import { reset } from "./reset.js";
import { makeRoundHistory } from "./makeRoundHistory.js";

console.log("티츄 카운터 만들고 싶어");

// 세션 스토리지에 저장된 점수들
let totalScore = JSON.parse(window.sessionStorage.getItem("total"));
let roundScores = JSON.parse(window.sessionStorage.getItem("score"));

// 현재 라운드
let now = 1;

if (!roundScores) roundScores = [];
else now = roundScores.length + 1;

console.log("저장된 ", totalScore, roundScores);

let curAEl = document.querySelector(".score.cur.left");
let curBEl = document.querySelector(".score.cur.right");

let totalAEl = document.querySelector(".score.total.left");
let totalBEl = document.querySelector(".score.total.right");

const hisotryEl = document.querySelector(".history");
const inputEl = document.querySelector(".input-score");

// 세션 스토리지에 저장된 점수가 있는 경우
if (roundScores.length !== 0 && totalScore !== null) {
  totalAEl.innerText = totalScore[0];
  totalBEl.innerText = totalScore[1];

  hisotryEl.innerHTML = "";
  for (let i = 0; i < roundScores.length; i++) {
    makeRoundHistory(hisotryEl, roundScores[i][0], roundScores[i][1], i + 1);
  }
}

// 리셋 버튼 누르면 총 점수, 히스토리 모두 삭제
const resetEl = document.querySelector(".reset");
resetEl.addEventListener("click", () => {
  now = 1;
  totalAEl.innerText = 0;
  totalBEl.innerText = 0;
  inputEl.value = 50;

  reset(hisotryEl);

  totalScore = null;
  roundScores = [];
});

// 라운드 점수 삭제하기
hisotryEl.addEventListener("click", (el) => {
  if (el.target.classList[0] === "btn-del") {
    let delRound = Number(el.target.classList[1]);
    let pparentEl = el.path[2];

    // 삭제하는 라운드가 남은 하나인 경우 reset
    if (pparentEl.children.length === 1) {
      now = 1;
      totalAEl.innerText = 0;
      totalBEl.innerText = 0;
      inputEl.value = 50;

      reset(pparentEl);

      totalScore = null;
      roundScores = [];
    } else {
      let a = Number(totalScore[0]) - Number(roundScores[delRound - 1][0]);
      let b = Number(totalScore[1]) - Number(roundScores[delRound - 1][1]);

      now--;

      totalAEl.innerText = a;
      totalBEl.innerText = b;
      totalScore = [a, b];
      roundScores.splice(delRound - 1, 1);

      if (pparentEl.children.length === delRound) {
        pparentEl.removeChild(pparentEl.children[delRound - 1]);
      } else {
        // 중간 라운드 삭제하는 경우 reload
        for (let i = 0; i < roundScores.length; i++) {
          makeRoundHistory(hisotryEl, roundScores[i][0], roundScores[i][1], i + 1);
        }
      }
    }

    window.sessionStorage.setItem("total", JSON.stringify(totalScore));
    window.sessionStorage.setItem("score", JSON.stringify(roundScores));
  }
});

// 점수 입력
inputEl.addEventListener("change", () => {
  curAEl.innerText = inputEl.value;
  curBEl.innerText = 100 - inputEl.value;
});

// 스몰, 라지 티츄, 원투 점수 계산
// 스몰, 라지 티츄 -> 성공 실패에 따라 +-100, +-200
// 원투 -> 스티 라티 한 경우 -> +200
//      -> 없는 경우 -> 이긴 팀은 200, 진 팀은 0

const clickEvent = (el, i) => {
  el.classList.toggle("active");
};

let btns = document.querySelectorAll(".btns");
console.log(btns[0].children[0]);

// 버튼 눌렀을 때 점수 추가하기
// 1. small large 눌려있을 때 s / f 활성화 -> s 는 + f -
// 이때 s/f 버튼 display none 했다가, small large 누르면 보이게 하기
// 2. one two 눌렀을 때 이긴 쪽에 +200 진 쪽은 0

// 현재 라운드 (History) 점수 저장하기
// X 누르면 없어지고 토탈 점수도 수정하기

// 점수 저장하기
const save = document.querySelector(".save");
save.addEventListener("click", () => {
  let curA = Number(curAEl.innerText);
  let curB = Number(curBEl.innerText);

  let totalA = Number(totalAEl.innerText);
  let totalB = Number(totalBEl.innerText);

  // 총 점수
  totalAEl.innerText = totalA + curA;
  totalBEl.innerText = totalB + curB;

  totalScore = [totalA + curA, totalB + curB];

  curAEl.innerText = 50;
  curBEl.innerText = 50;
  inputEl.value = 50;

  // 현재 라운드 점수
  makeRoundHistory(hisotryEl, curA, curB, now);
  roundScores.push([curA, curB]);

  window.sessionStorage.setItem("total", JSON.stringify(totalScore));
  window.sessionStorage.setItem("score", JSON.stringify(roundScores));
  now++;
});
