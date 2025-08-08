export const UserRolesEnum = {
  ADMIN: "admin",
  STUDENT:"student",
  FACULTY:"faculty"
};

export const AvailableUserRoles = Object.values(UserRolesEnum);



/**
 * @type {{ GOOGLE: "GOOGLE"; GITHUB: "GITHUB"; EMAIL_PASSWORD: "EMAIL_PASSWORD"} as const}
 */
export const UserLoginType = {
  GOOGLE: "GOOGLE",
  GITHUB: "GITHUB",
  EMAIL_PASSWORD: "EMAIL_PASSWORD",
};

export const AvailableSocialLogins = Object.values(UserLoginType);
