console.log("티츄 카운터 만들고 싶어");

// 현재 라운드
let now = 1;

// 세션 스토리지에 저장된 점수들
let totalScore = JSON.parse(window.sessionStorage.getItem("total"));
let roundScores = JSON.parse(window.sessionStorage.getItem("round"));
if (!roundScores) roundScores = [];

console.log("저장된 ", totalScore, roundScores);

// 가져왔으니 화면에 넣어주기
if (roundScores.length !== 0) {
}

// 리셋 버튼 누르면 총 점수, 히스토리 모두 삭제
const reset = document.querySelector(".reset");
reset.addEventListener("click", () => {
  window.sessionStorage.clear();
});

let curAEl = document.querySelector(".score.cur.left");
let curBEl = document.querySelector(".score.cur.right");

let totalAEl = document.querySelector(".score.total.left");
let totalBEl = document.querySelector(".score.total.right");

// 점수 입력
const inputEl = document.querySelector(".input-score");
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
const save = () => {
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
  document.querySelector(".input-score").value = 50;

  // 현재 라운드 점수
  const hisotryEl = document.querySelector(".history");
  let liEl = document.createElement("li");
  let rEl = document.createElement("p");
  let aEl = document.createElement("div");
  let bEl = document.createElement("div");

  liEl.classList.add("round", `${now}`, `round${now}`);
  rEl.innerHTML = `${now}.`;
  aEl.classList.add("score", "round", `${now}`, "left");
  bEl.classList.add("score", "round", `${now}`, "right");
  aEl.innerHTML = curA;
  bEl.innerHTML = curB;

  roundScores.push([curA, curB]);

  liEl.appendChild(rEl);
  liEl.appendChild(aEl);
  liEl.appendChild(bEl);

  let btnEl = document.createElement("button");
  btnEl.classList.add("btn=del", `${now}`, `btn-del${now}`);
  btnEl.innerHTML = "X";
  liEl.appendChild(btnEl);

  hisotryEl.appendChild(liEl);

  console.log(totalScore, roundScores);
  window.sessionStorage.setItem("total", JSON.stringify(totalScore));
  window.sessionStorage.setItem("score", JSON.stringify(roundScores));
  now++;
};
