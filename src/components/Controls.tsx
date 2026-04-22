import Trash from "../assets/trash.svg"
import Copy from "../assets/copy.svg"
import Check from "../assets/check.svg"
import Bar from "../assets/bar.svg"

interface ControlsProps{

	countSelected: number;

	countUsers: number;

	handleSelectAllUsers: () => void;

	handleRemoveUsers: () => void;

	handleCopyUser: () => void;

}

export default function Controls( { countSelected, countUsers, handleSelectAllUsers, handleRemoveUsers, handleCopyUser }: ControlsProps ){

	return <div
		className="controls">

			<div 
				className="controls__select-all">
			
				<div
					className="controls__select-all__box"
					onClick={ handleSelectAllUsers }
				>

					{

						countSelected && countSelected < countUsers
							? <img
									src={ Bar }
								/>
							: null
					}

					{

						( countSelected > 0 ) && ( countSelected === countUsers )
							? <img
									src={ Check }
								/>
							: null
					}

				</div>

				<p
					className="controls__select-all__count"
				>

					<span>{ countSelected }</span><span>{ ` selected element${ countSelected > 0 ? "s" : "" }` }</span> {/* text could be "selected user(s) instead*/}

				</p>

		</div>

			<div 
				className="controls__actions">
			
				<div
					className="controls__actions__clone"
				>

				<img
					src={ Copy }
					onClick={ handleCopyUser }
					/>
					
				</div>

				<div
					className="controls__actions__delete" >

					<img
						src={ Trash }
						onClick={ handleRemoveUsers }
					/>

				</div>

		</div>

	</div>
}