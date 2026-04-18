import type { UserDataType } from "../Types/userDataType";
import UserCard from "./UserCard"; 


interface CardContainerProps {

	listOfUsersData: UserDataType[]

}

export default function CardContainer( { listOfUsersData }: CardContainerProps ){

	return <div className="card-container">

		{ 
	
			listOfUsersData
				? listOfUsersData.map( ( userData, userCardindex ) => ( 
						<UserCard 
							userData={ userData }
							key={ `user-card-${ userCardindex }` }
						/> )
					)
				: null
		 
		}

	</div>

}