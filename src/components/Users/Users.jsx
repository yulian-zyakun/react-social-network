import React from "react";
import Pagination from "../Common/Paginator/Pagination";
import User from "./User";

const Users = ({
  currentPage,
  totalUsersCount,
  onChangePage,
  pageSize,
  users,
  ...props
}) => {
  return (
    <div>
      <Pagination
        currentPage={currentPage}
        onChangePage={onChangePage}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
      />
      {users.map((u) => (
        <User
          key={u.id}
          user={u}
          followingInProgress={props.followingInProgress}
          follow={props.follow}
          unfollow={props.unfollow}
        />
      ))}
    </div>
  );
};

export default Users;
