import type { UserDataType } from "../Types/userDataType";

interface CardProps {

	userData: UserDataType;

	handleSelectUser: ( e: React.MouseEvent<HTMLInputElement>, userId: number ) => void;

}

export default function UserCard( { userData, handleSelectUser }: CardProps ){

	return (
		<div className="user-card">

			<input
				type="checkbox"
				className="user-card__check"
				onClick={ (e) => handleSelectUser( e, userData.id ) }
			/>

			<img 
				alt="user avatar"
				className="user-card__profile-avatar"
				src={ userData.avatar_url.toString() }
			/>

			<p>

				{ userData.login }

			</p>

			<button>

				Voir le profile

			</button>

		</div>
	)
}