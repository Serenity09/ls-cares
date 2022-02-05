import { UserInformation } from '../../types/UserInfo';

export default function TheGoodPart(props: UserInformation) {
    return (
        <div>{props.usState + " " + props.age + " " + props.projectedIncome + " " + props.familySize + " " + props.isPregnant}</div>
    )
}