import Trash from "../assets/trash.svg"
import Copy from "../assets/copy.svg"
import Check from "../assets/check.svg"
import CheckDouble from "../assets/check-double.svg"

interface ControlsProps{

	countSelected: number;

	handleSelectUser: ( e: React.MouseEvent<HTMLInputElement> ) => void;
	
}

export default function Controls( { countSelected, handleSelectUser }: ControlsProps ){

	return <div
		className="controls">

			<div 
				className="controls__select-all">
			
				<div
					className="controls__select-all__box"
					onClick={ handleSelectUser }
				>

				</div>

				<p
					className="controls__select-all__count" >

					<span>{countSelected}</span><span>{ ` selected element${ countSelected > 0 ? "s" : "" }` }</span> {/* text could be "selected user(s) instead*/}

				</p>

		</div>

			<div 
				className="controls__actions">
			
				<div
					className="controls__actions__clone"
				>

				<img
						src={Copy}
					/>
					
				</div>

				<div
					className="controls__actions__delete" >

					<img
						src={Trash}
					/>

				</div>

		</div>

	</div>
}