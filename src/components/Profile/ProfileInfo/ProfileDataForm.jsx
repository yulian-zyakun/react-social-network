import { reduxForm } from "redux-form";
import {
  createField,
  Input,
  Textarea,
} from "../../Common/FormControls/FormControls";
import s from "./ProfileInfo.module.css";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>Save</button>
      </div>
      {error && <div className={s.formError}>{error}</div>}
      <div>
        <div>Full name: {createField("fullName", "Full Name", [], Input)}</div>
        <div>
          Looking for a job:{" "}
          {createField("lookingForAJob", "", [], Input, "checkbox")}
        </div>

        <div>
          Skill Description:{" "}
          {createField(
            "lookingForAJobDescription",
            "Prof skills",
            [],
            Textarea
          )}
        </div>
      </div>
      <div>About Me: {createField("aboutMe", "About Me", [], Textarea)}</div>
      <div>
        Contacts:
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div key={key} className={s.contact}>
              {key}:{createField("contacts." + key, key, [], Input)}
            </div>
          );
        })}
      </div>
    </form>
  );
};

const ProfileDataReduxForm = reduxForm({ form: "editProfile" })(
  ProfileDataForm
);

export default ProfileDataReduxForm;
