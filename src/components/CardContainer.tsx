import type { UserDataType } from "../Types/userDataType";
import UserCard from "./UserCard"; 
import Message from "./Message";

interface CardContainerProps {

	listOfUsersData: UserDataType[];

	rateLimitReset: number | null;

	rateLimitReached: boolean;

}

export default function CardContainer( { listOfUsersData, rateLimitReset, rateLimitReached }: CardContainerProps ){

	return <div className="card-container">

		{

			rateLimitReached
				? <Message 
						message={`Limite d'appels API atteinte ! Attendre ${ rateLimitReset - Math.round( Date.now() / 1000 ) } secondes.`} 
					/>
				:	null

		}

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