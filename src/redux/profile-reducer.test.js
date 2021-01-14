const {
  default: profileReducer,
  addPostActionCreator,
  deletePost,
} = require("./profile-reducer");

let state = {
  posts: [
    { id: 1, message: "Hi, how r U?", likesCount: 11 },
    { id: 2, message: "My second post", likesCount: 7 },
  ],
};

it("new post should be added", () => {
  // test data
  let action = addPostActionCreator("new post");

  // execution
  let newState = profileReducer(state, action);

  // expected
  expect(newState.posts.length).toBe(3);
});

it("new post message test", () => {
  // test data
  let action = addPostActionCreator("new post");

  // execution
  let newState = profileReducer(state, action);

  // expected
  expect(newState.posts[2].message).toBe("new post");
});

it("existing post delete test", () => {
  let action = deletePost(1);
  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(1);
});

it("incorrect id post delete test", () => {
  let action = deletePost(10);
  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(2);
});
