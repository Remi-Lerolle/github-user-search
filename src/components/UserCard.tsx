import type { UserDataType } from "../Types/userDataType";

interface CardProps {

	userData: UserDataType;

}

export default function UserCard( { userData }: CardProps ){

	return (
		<div className="user-card">

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