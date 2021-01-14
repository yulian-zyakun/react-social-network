import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../Utils/Validators/validators";
import { Textarea } from "../Common/FormControls/FormControls";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((d) => (
    <DialogItem key={d.id} id={d.id} name={d.name} />
  ));

  let messagesElements = state.messages.map((msg) => (
    <Message key={msg.id} id={msg.id} message={msg.message} />
  ));

  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <div>
          <AddMessageReduxForm onSubmit={addNewMessage} />
        </div>
      </div>
    </div>
  );
};

const maxLength60 = maxLengthCreator(60);

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name={"newMessageBody"}
          placeholder={"Enter your message"}
          validate={[required, maxLength60]}
        />
      </div>
      <div>
        <button>Send Message</button>
      </div>
    </form>
  );
};

const AddMessageReduxForm = reduxForm({ form: "dialogAddMessageForm" })(
  AddMessageForm
);

export default Dialogs;
