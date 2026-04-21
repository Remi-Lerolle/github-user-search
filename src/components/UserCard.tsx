import type { UserDataType } from "../Types/userDataType";

interface CardProps {

	userData: UserDataType;

	handleSelectUser: ( e: React.ChangeEvent<HTMLInputElement>, userId: number ) => void;

	checked: boolean;

}

export default function UserCard( { userData, handleSelectUser, checked }: CardProps ){

	return (
		<div className="user-card">

			<input
				type="checkbox"
				className="user-card__check"
				onChange={ (e) => handleSelectUser( e, userData.id ) }
				checked={ checked }
			/>

			<img 
				alt="user avatar"
				className="user-card__profile-avatar"
				src={ userData.avatar_url.toString() }
			/>

			<p
				className="user-card__profile-id"
			>

				{ userData.id }

			</p>

			<p
				className="user-card__profile-login">

				{ userData.login }

			</p>

			<a
				href={ userData.html_url.toString() }
				target="_blank"
				>
				<button>

					View profile

			</button>
			</a>	

		</div>
	)
}