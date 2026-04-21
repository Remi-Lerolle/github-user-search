interface MessageProps {

	children: React.ReactNode;

}

export default function Message( { children }: MessageProps ){

	const closeDialog = () => {

		document
			.querySelector( "dialog" )
			.close()

	}

	return <>

		<dialog 
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