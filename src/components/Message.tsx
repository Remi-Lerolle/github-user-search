import { useEffect } from "react";

interface MessageProps {

	message: string;

	id: string;

}

export default function Message( { message, id }: MessageProps ){

	const closeDialog = () => {

		document
			.querySelector( `dialog` )
			.close()

	}

	const showDialog = () => {

		document
			.querySelector( "dialog" )
			.showModal()

	}
	
	/* Always display the dialog as a modal (with backdrop) */
	useEffect( 
	
		() => {

			showDialog();

		},

		[], // deps array

	)

	return <>

		<dialog 
			id={ `message-dialog-${ id }` }
		>

			<p>
				
				{ message }

			</p>


			<div 
				className="dialog__buttons"
			>

				<button
					onClick={closeDialog}
				>

					OK

				</button>

			</div>

		</dialog>

	</>
}