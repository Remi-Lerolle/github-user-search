interface MessageProps {

	children: React.ReactNode;

}

export default function Message( { children }: MessageProps ){

	const id = Math.random().toString()

	const closeDialog = () => {

		const dialog = document
			.getElementById( id ) as HTMLDialogElement;

		if ( dialog ){

			dialog.close();

		}

	}

	return <>

		<dialog 
			id={id}
			open
		>
				
				{ children }

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