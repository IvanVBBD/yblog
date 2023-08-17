document.addEventListener("DOMContentLoaded", () => {
  setupPage();
  loadBlogs();
});

const reqCount = "reqCount";
const endOfBlogs = "endOfBlogs";
function setupPage() {
  const commentButtons = document.getElementsByClassName("comment-button");

  for (const element of commentButtons) {
    element.addEventListener("click", () => {
      console.log("TIME TO COMMENT");
    });
  }

  localStorage.setItem(reqCount, "0");
  localStorage.setItem(endOfBlogs, "false");

  const postContainer = document.getElementById("posts");
  postContainer?.addEventListener("scroll", () => {
    if (isNearBottom(postContainer)) {
      loadBlogs();
    }
  });
}

function incrementReqCount() {
  let r = localStorage.getItem(reqCount);
  if (r != null) {
    localStorage.setItem(reqCount, (parseInt(r) + 1).toString());
  } else {
    localStorage.setItem(reqCount, "1");
  }
}

async function loadBlogs() {
  if (localStorage.getItem(endOfBlogs) != "true") {
    incrementReqCount();
    const blogPosts = JSON.parse(
      JSON.stringify(
        await (
          await fetch(
            `/posts/latest?reqCount=` + localStorage.getItem(reqCount),
            {
              method: "GET",
            }
          )
        ).json()
      )
    );

    if (blogPosts.data.length == 0) {
      localStorage.setItem(endOfBlogs, "true");
    }

    const postContainer = document.querySelector(".posts");
    blogPosts.data.forEach(
      (element: {
        comments: any;
        author: string | null;
        title: string | null;
        content: string | null;
        createdAt: string | null;
      }) => {
        const post = document.createElement("section");
        post.classList.add("post");

        const icon = document.createElement("img");
        icon.src = "./logo_filled_black.png";
        icon.classList.add("icon");
        post.appendChild(icon);

        const displayName = document.createElement("h2");
        displayName.textContent = element.author;
        displayName.classList.add("display-name");
        post.appendChild(displayName);

        const username = document.createElement("h3");
        username.textContent = element.author;
        username.classList.add("username");
        post.appendChild(username);

        // const followButton = document.createElement("button");
        // followButton.textContent = "Follow";
        // followButton.classList.add("follow-button");
        // followButton.classList.add("button");
        // post.appendChild(followButton);

        const blogTitle = document.createElement("h2");
        blogTitle.textContent = element.title;
        blogTitle.classList.add("blog-title");
        post.appendChild(blogTitle);

        const blogText = document.createElement("p");
        blogText.textContent = element.content;
        blogText.classList.add("blog-text");
        post.appendChild(blogText);

        const dateStamp = document.createElement("h5");
        dateStamp.textContent = element.createdAt;
        dateStamp.classList.add("date-stamp");
        post.appendChild(dateStamp);

        const likeText = document.createElement("h4");
        likeText.classList.add("like-text");
        post.appendChild(likeText);

        const commentButton = document.createElement("button");
        commentButton.textContent = "Comment";
        commentButton.classList.add("comment-button");
        commentButton.classList.add("button");
        post.appendChild(commentButton);

        // const likeButton = document.createElement("button");
        // likeButton.textContent = "Like";
        // likeButton.classList.add("like-button");
        // likeButton.classList.add("button");
        // post.appendChild(likeButton);

        if (element.comments.length > 0) {
          const comments = document.createElement("section");
          comments.classList.add("comments");

          element.comments.forEach(
            (commentElement: {
              text: string | null;
              author: string | null;
              createdAt: string | null;
            }) => {
              //   <section class="new-comment">
              //     <input type="text" id="comment-input" placeholder="Enter your comment">
              //   </section>

              const comment = document.createElement("section");
              comment.classList.add("comment");
              comments.appendChild(comment);

              const commentIcon = document.createElement("img");
              commentIcon.src = "./logo_filled_black.png";
              commentIcon.classList.add("comment-icon");
              comment.appendChild(commentIcon);

              const commentDisplayName = document.createElement("h4");
              commentDisplayName.textContent = commentElement.author;
              commentDisplayName.classList.add("comment-display-name");
              comment.appendChild(commentDisplayName);

              const commentUsername = document.createElement("h4");
              commentUsername.textContent = commentElement.author;
              commentUsername.classList.add("comment-username");
              comment.appendChild(commentUsername);

              const commentDateStamp = document.createElement("h6");
              commentDateStamp.textContent = commentElement.createdAt;
              commentDateStamp.classList.add("comment-date-stamp");
              comment.appendChild(commentDateStamp);

              const commentText = document.createElement("p");
              commentText.textContent = commentElement.text;
              commentText.classList.add("comment-text");
              comment.appendChild(commentText);
            }
          );
          post.appendChild(comments);
        }
        postContainer?.appendChild(post);
      }
    );
  }
}

function isNearBottom(element: HTMLElement | null): boolean {
  if (!element) return false;
  const scrollTop = element.scrollTop;
  const scrollHeight = element.scrollHeight;
  const clientHeight = element.clientHeight;
  const scrollThreshold = 10;

  return scrollHeight - scrollTop - clientHeight <= scrollThreshold;
}
