import { useParams } from "react-router-dom";

export default function Guide() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { state, age, projectedExpenses, projectedIncome, encryptedData } =
    useParams();

  return (
    <>
      <p>guide!</p>
      <p>yea!</p>
    </>
  );
}
