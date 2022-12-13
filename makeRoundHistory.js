export const makeRoundHistory = (hisotryEl, curA, curB, now) => {
  // const hisotryEl = document.querySelector(".history");
  if (now === 1) hisotryEl.innerHTML = "";
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

  // roundScores.push([curA, curB]);

  liEl.appendChild(rEl);
  liEl.appendChild(aEl);
  liEl.appendChild(bEl);

  let btnEl = document.createElement("button");
  btnEl.classList.add("btn=del", `${now}`, `btn-del${now}`);
  btnEl.innerHTML = "X";
  liEl.appendChild(btnEl);

  hisotryEl.appendChild(liEl);
};
