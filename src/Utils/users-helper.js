export const updateUsersArray = (users, userId, objPropName, newObjProps) => {
  return users.map((u) => {
    if (u[objPropName] === userId) {
      return { ...u, newObjProps };
    }
    return u;
  });
};
