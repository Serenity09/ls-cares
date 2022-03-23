import { createContext, useContext } from "react";

export class User {
  usState: string | null;
  age: number | null;
  projectedIncome: number | null;
  familySize: number | null;
  isPregnant: boolean | undefined;

  constructor() {
    this.usState = null;
    this.age = null;
    this.projectedIncome = null;
    this.familySize = null;
    this.isPregnant = undefined;
  }
}

export const UserContext = createContext<{
  user: User;
  setUser: (updatedUser: User) => void;
} | null>(null);

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context)
    throw new Error(
      "useFormContext must be used within a UserContext Provider"
    );

  return context;
}
