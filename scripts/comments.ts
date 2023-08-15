const commentButtons = document.getElementsByClassName('comment-button');

console.log("OMG HELP");

for(let i = 0; i < commentButtons.length; i++){
  commentButtons[i].addEventListener('click', () => {
    console.log("WELP WELP WELP");
  });
}

// submitCommentBtn.addEventListener('click', () => {
//   const commentInput = document.querySelector('#comment-input');
//   const commentText = commentInput.value;

//   if (commentText.trim() !== '') {
//     const commentElement = document.createElement('p');
//     commentElement.textContent = commentText;
//     commentsContainer.appendChild(commentElement);

//     commentInput.value = '';
//     commentDialog.classList.remove('active');
//   }
// });


function greet(name: string): string {

  return `Hello, ${name}!`;

}

const user = 'TypeScript Developer';


console.log(greet(user));