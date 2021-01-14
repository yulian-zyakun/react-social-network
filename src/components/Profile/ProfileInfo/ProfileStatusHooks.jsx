import React, { useEffect, useState } from "react";

import s from "./ProfileInfo.module.css";

const ProfileStatusHooks = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateUserStatus(status);
  };

  const handleChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      Status:
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode}>{status}</span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            onChange={handleChange}
            onBlur={deactivateEditMode}
            type="text"
            autoFocus={true}
            value={status}
          />
        </div>
      )}
    </div>
  );
};
export default ProfileStatusHooks;
