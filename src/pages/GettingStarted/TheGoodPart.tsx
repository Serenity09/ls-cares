import IUserInfo from '../../interfaces/IUserInfo';

export default function TheGoodPart(props: IUserInfo) {
    return (
        <div>{props.usState + " " + props.age + " " + props.projectedIncome + " " + props.familySize + " " + props.isPregnant}</div>
    )
}