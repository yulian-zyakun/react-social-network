import React, { useState } from "react";
import Preloader from "../../Common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
// import ProfileStatus from "./ProfileStatus";
import ProfileStatusHooks from "./ProfileStatusHooks";
import userPhoto from "../../../assets/images/blank_user.png";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {
  let [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />;
  }

  const mainPhotoUpload = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    props.saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div className="">
      <div className={s.descriptionBlock}>
        <img
          src={props.profile.photos.large || userPhoto}
          className={s.mainPhoto}
          alt="Avatar"
        />
        {props.isOwner && <input onChange={mainPhotoUpload} type={"file"} />}

        {/* <ProfileStatus />*/}
        <ProfileStatusHooks
          status={props.status}
          updateUserStatus={props.updateUserStatus}
        />
        {editMode ? (
          <ProfileDataForm
            initialValues={props.profile}
            profile={props.profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            profile={props.profile}
            isOwner={props.isOwner}
            actEditMode={() => {
              setEditMode(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, actEditMode }) => {
  return (
    <div>
      {isOwner && (
        <div>
          <button onClick={actEditMode}>Edit</button>
        </div>
      )}
      <div>
        <div>{profile.fullName}</div>

        <div>Looking for a job: {profile.lookingForAJob ? "yes" : "no"}</div>
        {profile.lookingForAJob && (
          <div>Description: {profile.lookingForAJobDescription}</div>
        )}
      </div>
      <div>About Me: {profile.aboutMe}</div>
      <div>
        Contacts:
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contact={profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

const Contact = ({ contactTitle, contact }) => {
  return (
    <div className={s.contact}>
      {contactTitle}: {contact}
    </div>
  );
};

export default ProfileInfo;
