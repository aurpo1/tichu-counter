console.log("티츄 카운터 만들고 싶어");

// 현재 라운드
let now = 1;

// 리셋 버튼 누르면 총 점수, 히스토리 모두 삭제

// 점수 입력
const inputValue = () => {
  let curA = document.querySelector(".score.cur.left");
  let curB = document.querySelector(".score.cur.right");
  let score = document.querySelector(".input-score").value;

  curA.innerText = score;
  curB.innerText = 100 - score;
};

// 버튼 눌렀을 때 점수 추가하기
// 1. small large 눌려있을 때 s / f 활성화 -> s 는 + f -
// 이때 s/f 버튼 display none 했다가, small large 누르면 보이게 하기
// 2. one two 눌렀을 때 이긴 쪽에 +200 진 쪽은 0

// 현재 라운드 (History) 점수 저장하기
// X 누르면 없어지고 토탈 점수도 수정하기

// 총 점수 저장하기
const save = () => {
  let curA = Number(document.querySelector(".score.cur.left").innerText);
  let curB = Number(document.querySelector(".score.cur.right").innerText);
  console.log(curA);
  let totalA = Number(document.querySelector(".score.total.left").innerText);
  let totalB = Number(document.querySelector(".score.total.right").innerText);

  // 합계 저장
  document.querySelector(".score.total.left").innerText = totalA + curA;
  document.querySelector(".score.total.right").innerText = totalB + curB;

  document.querySelector(".score.total.left").innerText = 50;
  document.querySelector(".score.total.right").innerText = 50;
  document.querySelector(".input-score").value = 50;

  // 현재 라운드 점수 저장
  const hisotryEl = document.querySelector(".history");
  let liEl = document.createElement("li");
  let rEl = document.createElement("p");
  let aEl = document.createElement("div");
  let bEl = document.createElement("div");

  liEl.classList.add(`round${now}`);
  rEl.innerHTML = `${now}.`;
  aEl.classList.add(`score${now}`);
  bEl.classList.add(`score${now}`);
  aEl.innerHTML = curA;
  bEl.innerHTML = curB;

  liEl.appendChild(rEl);
  liEl.appendChild(aEl);
  liEl.appendChild(bEl);

  let btnEl = document.createElement("button");
  btnEl.classList.add(`btn-del${now}`);
  btnEl.innerHTML = "X";
  liEl.appendChild(btnEl);

  hisotryEl.appendChild(liEl);

  console.log(now);
  console.log(btnEl);
  now++;
};
