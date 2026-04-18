import type { UserDataType } from "../dataTypes/userDataType";

interface CardProps {

	userData: UserDataType;

}

export default function UserCard( { userData }: CardProps ){

	return (
		<div className="user-card">

			<img 
				alt="user avatar"
				src={ userData.avatar_url.toString() }
			/>

			<p>

				{ userData.login }

			</p>

		</div>
	)
}