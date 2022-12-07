console.log("티츄 카운터 만들고 싶어");

// 리셋 버튼 누르면 총 점수, 히스토리 모두 삭제

// 점수 입력
const inputValue = () => {
  let curA = document.getElementById("c-score-a");
  let curB = document.getElementById("c-score-b");
  let score = document.getElementById("input-score").value;

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
  let curA = Number(document.getElementById("c-score-a").innerText);
  let curB = Number(document.getElementById("c-score-b").innerText);

  let totalA = Number(document.getElementById("score-a").innerText);
  let totalB = Number(document.getElementById("score-b").innerText);

  // 합계 저장
  document.getElementById("score-a").innerText = totalA + curA;
  document.getElementById("score-b").innerText = totalB + curB;

  document.getElementById("c-score-a").innerText = 50;
  document.getElementById("c-score-b").innerText = 50;
  document.getElementById("input-score").value = 50;

  // 한 라운드 점수 저장
  const hisotryEl = document.getElementById("history");
  let liEl = document.createElement("li");
  let aEl = document.createElement("div");
  let bEl = document.createElement("div");

  aEl.id = "score";
  bEl.id = "score";
  aEl.innerHTML = curA;
  bEl.innerHTML = curB;

  liEl.appendChild(aEl);
  liEl.appendChild(bEl);

  let btnEl = document.createElement("button");
  btnEl.id = "btn-del";
  btnEl.innerHTML = "X";
  liEl.appendChild(btnEl);

  hisotryEl.appendChild(liEl);
};
