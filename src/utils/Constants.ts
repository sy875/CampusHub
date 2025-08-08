/**
 * Student: View announcements, results, courses
 *  Faculty: Upload course materials, post announcements
 *  Admin: Manage users, publish results, full access
 */

export const UserRolesEnum = {
  ADMIN: "admin",
  STUDENT: "student",
  FACULTY: "faculty",
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

export const AudienceType = {
  ...UserRolesEnum,
  All: "all",
};

export const AvailableAudienceType = Object.values(AudienceType);

export const MaterialType = {
  PDF: "pdf",
  VIDEO: "video",
  PPT: "ppt",
  DOCX: "docx",
};

export const AvailableMaterialType = Object.values(MaterialType);
