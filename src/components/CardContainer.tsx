import type { UserDataType } from "../dataTypes/userDataType";
import UserCard from "./UserCard"; 


interface CardContainerProps {

	listOfUsersData: [UserDataType]

}

export default function CardContainer( { listOfUsersData }: CardContainerProps ){

	
	return <div className="card-container">

		{ listOfUsersData.map( userData => ( <UserCard userData={ userData } /> ) ) }

	</div>

}