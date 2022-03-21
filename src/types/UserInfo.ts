export type UserInformation = {
  usState: string | null;
  age: number | null;
  projectedIncome: number | null;
  familySize: number | null;
  isPregnant: boolean | undefined;
};

export type UseUserInformation = {
  userInfo: UserInformation;
  setUserInfo: (updatedUserInfo: UserInformation) => void;
};
