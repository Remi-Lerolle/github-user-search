interface MessageProps {

	message: string | null;

}

export default function Message( { message }: MessageProps ){

	const closeDialog = () => {

		document
			.querySelector( "dialog" )
			.close()

	}


	return <>

		<dialog 
			id="message-dialog"
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

		{

 			document
				.getElementsByTagName( "dialog" )
				[ 0 ]
				?.showModal()

		}
	</>
}