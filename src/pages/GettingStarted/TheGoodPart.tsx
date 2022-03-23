import { useUserContext } from "../../user/UserContext";

export default function TheGoodPart() {
  const { user } = useUserContext();

  return (
    <div>
      {user.usState +
        " " +
        user.age +
        " " +
        user.projectedIncome +
        " " +
        user.familySize +
        " " +
        user.isPregnant}
    </div>
  );
}
