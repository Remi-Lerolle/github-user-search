export class RateLimit {

	#limit: number ;
	
	#remaining: number ;

	#reset: number ;

	#used: number ;

	constructor(

		limitValue: number,
		
		remainingValue: number,

		resetValue: number,

		usedValue: number

	){

		this.#limit = limitValue;
		
		this.#remaining = remainingValue;

		this.#reset = resetValue;

		this.#used = usedValue;
	}

	get	limit () { return this.#limit } ;
	
	set	limit ( value: number ){

		if ( !value || typeof value !== "number" ){ return };

		this.#limit = value;

	};

	get remaining() { return this.#remaining; }

	set remaining ( value: number ){

		if ( !value || typeof value !== "number" ){ return };

		this.#remaining = value;

	};

	get reset () { return this.#reset }

	set reset ( value: number ){

		if ( !value || typeof value !== "number" ){ return };

		this.#reset = value;

	};

	get used () { return this.#used }

	set used ( value: number ){

		if ( !value || typeof value !== "number" ){ return };

		this.#used = value;

	};

}
