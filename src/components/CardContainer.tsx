import type { UserDataType } from "../Types/userDataType";
import UserCard from "./UserCard"; 
import Message from "./Message";

interface CardContainerProps {

	listOfUsersData: UserDataType[];

	rateLimitReset: number | null;

	rateLimitReached: boolean;

	handleSelectUser: ( e: React.ChangeEvent<HTMLInputElement>, userId: number ) => void;

	listOfSelectedUsers: number[];

}

export default function CardContainer( { listOfUsersData, rateLimitReset, rateLimitReached, handleSelectUser, listOfSelectedUsers }: CardContainerProps ){

	return <div className="card-container">

		{ 
	
			listOfUsersData && listOfUsersData.length
				? listOfUsersData.map( ( userData, userCardindex ) => ( 
						<UserCard 
							userData={ userData }
							key={ `user-card-${ userCardindex }` }
							handleSelectUser={ handleSelectUser }
							checked={ listOfSelectedUsers.includes( userData.id ) }
						/> )
					)
				: null
		 
		}

		{/* could merge to a single test with previous */}
		{ 
	
			listOfUsersData && listOfUsersData.length === 0
				? <p>Aucun résultat.</p>
				: null

		}

		{

			rateLimitReached
				? <Message>
						<p>{`Limite d'appels API atteinte ! Attendre ${ rateLimitReset ? rateLimitReset - Math.round( Date.now() / 1000 ) : "" } secondes.`}</p>
					</Message>
				:	null

		}

	</div>

}