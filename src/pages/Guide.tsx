import { useParams } from "react-router-dom";

export default function Guide(props: any) {
    let { state, age, projectedExpenses, projectedIncome, encryptedData } = useParams();
    
    return (
        <>
            <p>guide!</p>
            <p>yea!</p>
        </>
    );
}