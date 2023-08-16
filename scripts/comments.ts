document.addEventListener("DOMContentLoaded", async () => {
  const commentButtons = document.getElementsByClassName("comment-button");

  for (const element of commentButtons) {
    element.addEventListener("click", () => {
      console.log("TIME TO COMMENT");
    });
  }
  
  const blogPosts = JSON.parse(
    JSON.stringify(
      await (
        await fetch(`/posts/latest?reqCount=1`, {
          method: "GET",
        })
      ).json()
    )
  );

  console.log("BLOG: ", blogPosts);
  console.log("BLOG: ", blogPosts.data);

  const postContainer = document.querySelector(".posts");

  blogPosts.data.forEach((element: { author: string | null; title: string | null; content: string | null; createdAt: string | null; }) => {
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

    const followButton = document.createElement("button");
    followButton.textContent = "Follow";
    followButton.classList.add("follow-button");
    followButton.classList.add("button");
    post.appendChild(followButton);

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

    const likeButton = document.createElement("button");
    likeButton.textContent = "Like";
    likeButton.classList.add("like-button");
    likeButton.classList.add("button");
    post.appendChild(likeButton);

  // <section class="comments">
  //   <section class="new-comment">
  //     <input type="text" id="comment-input" placeholder="Enter your comment">
  //   </section>
  //   <section class="comment">
  //     <img
  //       src="./logo_filled_black.png"
  //       class="comment-icon"
  //       alt="icon of this particular Blog Y user"
  //     />
  //     <h4 class="comment-display-name">Lone Husk</h4>
  //     <h4 class="comment-username">@lonehusk</h4>
  //     <h6 class="comment-date-stamp">1:35 PM Aug 11, 2023</h6>
  //     <p class="comment-text">
  //       Loren ate up some. Contrary to popular belief, Lorem Ipsum is not
  //       simply random text. This is a comment.
  //     </p>
  //   </section>
  postContainer?.appendChild(post);

});

});

