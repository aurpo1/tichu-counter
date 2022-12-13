export const reset = (el) => {
  el.innerHTML = "";

  const noDiv = document.createElement("div");
  noDiv.className = "initial";
  noDiv.innerText = "No Data";

  el.appendChild(noDiv);

  window.sessionStorage.removeItem("total");
  window.sessionStorage.removeItem("score");
};
