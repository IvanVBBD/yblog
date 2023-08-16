document.addEventListener("DOMContentLoaded", () => {
  const commentButtons = document.getElementsByClassName("comment-button");

  for (const element of commentButtons) {
    element.addEventListener("click", () => {
      console.log("TIME TO COMMENT");
    });
  }
});
