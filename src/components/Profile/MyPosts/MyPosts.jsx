import React, { PureComponent } from "react";
import { Field, reduxForm } from "redux-form";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import {
  maxLengthCreator,
  required,
} from "./../../../Utils/Validators/validators";
import { Textarea } from "../../Common/FormControls/FormControls";

class MyPosts extends PureComponent {
  render() {
    let postElements = this.props.posts.map((p) => (
      <Post key={p.id} message={p.message} likesCount={p.likesCount} />
    ));

    let onAddPost = (values) => {
      this.props.addPost(values.newPost);
    };

    return (
      <div className={s.postBlock}>
        <h3>My Posts</h3>
        <AddNewPostReduxForm onSubmit={onAddPost} />
        <div className={s.posts}>{postElements}</div>
      </div>
    );
  }
}

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name={"newPost"}
          component={Textarea}
          placeholder={"Enter New Post"}
          validate={[required, maxLength10]}
        />
      </div>
      <div>
        <button>Add New Post</button>
      </div>
    </form>
  );
};

const AddNewPostReduxForm = reduxForm({ form: "newPostForm" })(AddNewPostForm);

export default MyPosts;
