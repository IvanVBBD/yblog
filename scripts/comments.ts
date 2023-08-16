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

  blogPosts.data.forEach((element: {
    comments: any; author: string | null; title: string | null; content: string | null; createdAt: string | null; 
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

    if(element.comments.length > 0){
      const comments = document.createElement("section");
      comments.classList.add("comments");

      element.comments.forEach((commentElement: {
        author: string | null; content: string | null; createdAt: string | null; 
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
        comments.appendChild(commentIcon);

        const commentDisplayName = document.createElement("h4");
        commentDisplayName.textContent = commentElement.author;
        commentDisplayName.classList.add("comment-display-name");
        comments.appendChild(commentDisplayName);

        const commentUsername = document.createElement("h4");
        commentUsername.textContent = commentElement.author;
        commentUsername.classList.add("comment-username");
        comments.appendChild(commentUsername);

        const commentDateStamp = document.createElement("h6");
        commentDateStamp.textContent = commentElement.createdAt;
        commentDateStamp.classList.add("comment-date-stamp");
        comments.appendChild(commentDateStamp);

        const commentText = document.createElement("p");
        commentText.textContent = commentElement.content;
        commentText.classList.add("comment-text");
        comments.appendChild(commentText);
      });
      post.appendChild(comments);
    }
  postContainer?.appendChild(post);

});

});

