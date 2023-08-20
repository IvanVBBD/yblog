import { postComment } from "../Controllers/dbControl";

const reqCount = "reqCount";
const endOfBlogs = "endOfBlogs";
const currentAuthorUsername = "currentAuthorUsername";
let postContainer = document.getElementById("posts");

function setupPage() {
  localStorage.setItem(reqCount, "0");
  localStorage.setItem(endOfBlogs, "false");

  postContainer = document.getElementById("posts");
  if (postContainer != null) {
    postContainer.innerHTML = "";
  }

  postContainer?.addEventListener("scroll", () => {
    if (isNearBottom(postContainer)) {
      loadBlogs(localStorage.getItem(currentAuthorUsername));
    }
  });

  const openPopupButton = document.getElementById("openPopupButton");
  const closePopup = document.getElementById("closePopup");
  const postPopup = document.getElementById("postPopup");
  const submitPostButton = document.getElementById("submitPost");

  openPopupButton?.addEventListener("click", () => {
    if (postTitle) {
      postTitle.value = "";
    }
    if (postBody) {
      postBody.value = "";
    }
    if (postPopup != null) {
      postPopup.style.display = "block";
    }
  });

  closePopup?.addEventListener("click", () => {
    closePostPopup();
  });

  const postTitle = document.getElementById("postTitle") as HTMLInputElement;
  const postBody = document.getElementById("postBody") as HTMLTextAreaElement;
  const postsErrorText = document.getElementById("postsErrorText");

  submitPostButton?.addEventListener("click", () => {
    if (postsErrorText) {
      postsErrorText.innerText = "";
    }

    if (postTitle.value == null || postTitle.value == "") {
      if (postsErrorText != null) {
        postsErrorText.innerText = "Please insert a blog title.";
      }
    } else if (postBody.value == null || postBody.value == "") {
      if (postsErrorText != null) {
        postsErrorText.innerText = "Please insert blog context.";
      }
    } else if (postBody.value.length > 300) {
      if (postsErrorText != null) {
        postsErrorText.innerText = "Please limit your blog to 300 characters.";
      }
    } else {
      postNewBlog(postTitle?.value, postBody?.value);
    }
  });

  function closePostPopup() {
    if (postPopup != null) {
      postPopup.style.display = "none";
    }
  }

  loadBlogs(localStorage.getItem(currentAuthorUsername));
  closePostPopup();
}

async function postNewComment(text: string, index: number) {
  if (text != null && text != "") {
    if (postContainer != null && index != null && index >= 0) {
      const post = postContainer?.children[index];
      const postID = post.id;
      const currentUserAuthor = "PlaceholderAuthor";
      const currentUserUsername = "PlaceholderUsername";
      const newCommentBody = {
        text,
        author: currentUserAuthor,
        username: currentUserUsername,
        postID,
      };
      const addCommentResult = await fetch(`/posts/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCommentBody),
      });

      if (addCommentResult.status == 200) {
        setupPage();
      }
    } else {
      console.log("Yah eish error handling... Error adding comment.");
    }
  } else {
    console.log("Yah eish error handling... Error adding comment v2.");
  }
}

async function postNewBlog(title: string, body: string) {
  const newBlogBody = {
    title,
    content: body,
    username: "PlaceholderUsername",
    author: "PlaceholderAuthor",
  };
  const blogPostResult = await fetch(`/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBlogBody),
  });

  if (blogPostResult.status == 200) {
    setupPage();
  }
}

let posts;
let commentButtons;

function createCommentButtons() {
  posts = document.getElementsByClassName("posts");
  const commentButtons = document.getElementsByClassName("comment-button");

  for (let i = 0; i < commentButtons.length; i++) {
    commentButtons[i].addEventListener("click", () => {
      commentButtons[i].classList.remove("display-none");
      commentButtonClicked(i, commentButtons[i]);
    });
  }
}

function resetCommentButtons() {
  const commentButtons = document.getElementsByClassName("comment-button");

  for (const element of commentButtons) {
    element.classList.remove("display-none");
  }
  if (postContainer != null) {
    for (const element of postContainer.children) {
      const childElement = element.querySelector(".new-comment");
      if (childElement != null) {
        element.removeChild(childElement);
      }
    }
  }
}

function incrementReqCount() {
  let r = localStorage.getItem(reqCount);
  if (r != null) {
    localStorage.setItem(reqCount, (parseInt(r) + 1).toString());
  } else {
    localStorage.setItem(reqCount, "1");
  }
}

function commentButtonClicked(
  index: number | null,
  commentButton: Element | null
) {
  resetCommentButtons();
  if (postContainer != null && index != null && index >= 0) {
    commentButton?.classList.add("display-none");
    const post = postContainer?.children[index];

    const commentInputSection = document.createElement("section");
    commentInputSection.classList.add("new-comment");
    post.appendChild(commentInputSection);

    const commentInput = document.createElement("input");
    commentInput.classList.add("comment-input");
    commentInput.placeholder = "Enter your comment.";
    commentInputSection.appendChild(commentInput);

    const postCommentButton = document.createElement("button");
    postCommentButton.textContent = "Post";
    postCommentButton.classList.add("post-comment-button");
    postCommentButton.classList.add("button");
    commentInputSection.appendChild(postCommentButton);

    postCommentButton.addEventListener("click", () => {
      postNewComment(commentInput.value, index);
    });
  }
}

async function loadBlogs(username: string | null) {
  if (localStorage.getItem(endOfBlogs) != "true") {
    let urlParams = "";
    if (username != null && username != "") {
      urlParams =
        "/posts/?reqCount=" +
        localStorage.getItem(reqCount) +
        "&username=" +
        username;
    } else {
      urlParams = "/posts/latest?reqCount=" + localStorage.getItem(reqCount);
    }

    incrementReqCount();
    const blogPosts = JSON.parse(
      JSON.stringify(
        await (
          await fetch(urlParams, {
            method: "GET",
          })
        ).json()
      )
    );

    if (blogPosts.data.length == 0) {
      localStorage.setItem(endOfBlogs, "true");
    }

    const postContainer = document.querySelector(".posts");
    blogPosts.data.forEach(
      (element: {
        username: string;
        likedBy: string;
        likes: string;
        comments: any;
        author: string | null;
        title: string | null;
        content: string | null;
        createdAt: string | null;
        postID: string | null;
      }) => {
        const post = document.createElement("section");
        post.classList.add("post");

        if (element.postID != null) {
          post.id = element.postID;
        }

        const icon = document.createElement("img");
        icon.src = "./logo_filled_black.png";
        icon.classList.add("icon");
        post.appendChild(icon);

        const displayName = document.createElement("h2");
        displayName.textContent = element.author;
        displayName.classList.add("display-name");
        displayName?.addEventListener("click", () => {
          goToAuthorsPosts(element.username);
        });
        post.appendChild(displayName);

        const username = document.createElement("h3");
        username.textContent = element.username;
        username.classList.add("username");
        username?.addEventListener("click", () => {
          goToAuthorsPosts(element.username);
        });
        post.appendChild(username);

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

        const likeText = document.createElement("h5");
        likeText.classList.add("like-text");
        const likes = parseInt(element.likes);
        if (likes == 1) {
          likeText.innerText = element.likes + " like";
        } else {
          likeText.innerText = element.likes + " likes";
        }
        post.appendChild(likeText);

        const commentButton = document.createElement("img");
        commentButton.src = "./icon_comment.png";
        commentButton.classList.add("comment-button");
        commentButton.classList.add("button");
        commentButton?.addEventListener("mouseover", () => {
          commentButton.src = "./icon_comment_filled.png";
        });
        commentButton?.addEventListener("mouseout", () => {
          commentButton.src = "./icon_comment.png";
        });
        post.appendChild(commentButton);

        let thisUserLikedThisPost = false;
        for (let i = 0; i < element.likedBy.length; i++) {
          if (element.likedBy[i] == "Placeholder") {
            thisUserLikedThisPost = true;
          }
        }
        const likeButton = document.createElement("img");
        if (thisUserLikedThisPost) {
          likeButton.src = "./icon_heart_filled_pink.png";
        } else {
          likeButton.src = "./icon_heart.png";
        }
        likeButton.classList.add("like-button");
        likeButton?.addEventListener("click", () => {
          likePost(
            element.postID,
            likeButton,
            thisUserLikedThisPost,
            likeText,
            element.likes
          );
        });
        likeButton.classList.add("button");
        post.appendChild(likeButton);

        if (element.comments.length > 0) {
          const comments = document.createElement("section");
          comments.classList.add("comments");

          element.comments.forEach(
            (commentElement: {
              text: string | null;
              author: string | null;
              username: string | null;
              createdAt: string | null;
            }) => {
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
              commentUsername.textContent = commentElement.username;
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

  createCommentButtons();
}

async function likePost(
  postID: string | null,
  buttonElement: HTMLImageElement,
  thisUserLikedThisPost: boolean,
  numLikesText: HTMLElement,
  numLikesString: string
) {
  if (postID != null && postID != "") {
    const currentUser = "Placeholder";

    const likePostBody = {
      username: currentUser,
      postID,
    };

    const likePostResult = await fetch(`/posts/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(likePostBody),
    });

    if (likePostResult.status == 200) {
      if (thisUserLikedThisPost) {
        if (buttonElement.classList.contains("unliked")) {
          buttonElement.src = "./icon_heart_filled_pink.png";
          const newLikes = parseInt(numLikesString);
          if (newLikes == 1) {
            numLikesText.innerText = newLikes.toString() + " like";
          } else {
            numLikesText.innerText = newLikes.toString() + " likes";
          }
          buttonElement.classList.remove("unliked");
        } else {
          buttonElement.src = "./icon_heart.png";
          const newLikes = parseInt(numLikesString) - 1;
          if (newLikes == 1) {
            numLikesText.innerText = newLikes.toString() + " like";
          } else {
            numLikesText.innerText = newLikes.toString() + " likes";
          }
          buttonElement.classList.add("unliked");
        }
      } else {
        if (buttonElement.classList.contains("liked")) {
          buttonElement.src = "./icon_heart.png";
          const newLikes = parseInt(numLikesString);

          if (newLikes == 1) {
            numLikesText.innerText = newLikes.toString() + " like";
          } else {
            numLikesText.innerText = newLikes.toString() + " likes";
          }
          buttonElement.classList.remove("liked");
        } else {
          buttonElement.src = "./icon_heart_filled_pink.png";
          const newLikes = parseInt(numLikesString) + 1;

          if (newLikes == 1) {
            numLikesText.innerText = newLikes.toString() + " like";
          } else {
            numLikesText.innerText = newLikes.toString() + " likes";
          }
          buttonElement.classList.add("liked");
        }
      }
    } else {
      console.log("Yah eish error handling... Error liking post.");
    }
  } else {
    console.log("Yah eish error handling... Error liking post v2.");
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

const myBlogsButton = document.getElementById("my-blogs-button");
myBlogsButton?.addEventListener("click", () => {
  homeButton?.classList.remove("selected");
  myBlogsButton.classList.add("selected");
  if (mainHeading) {
    mainHeading.innerText = "My Blogs";
  }
  localStorage.setItem(currentAuthorUsername, "Jesse");
  setupPage();
});

const homeButton = document.getElementById("home-button");
homeButton?.addEventListener("click", () => {
  homeButton.classList.add("selected");
  myBlogsButton?.classList.remove("selected");
  if (mainHeading) {
    mainHeading.innerText = "Home";
  }
  localStorage.removeItem(currentAuthorUsername);
  setupPage();
});

const mainHeading = document.getElementById("main-heading");

function goToAuthorsPosts(authorUsername: string | null) {
  if (mainHeading && authorUsername) {
    mainHeading.innerText = authorUsername + "'s blogs";
    homeButton?.classList.remove("selected");
    myBlogsButton?.classList.remove("selected");
    localStorage.setItem(currentAuthorUsername, authorUsername);
    setupPage();
  }
}

setupPage();
