
/*

		This object is used to store the rate limit sent by github

*/

export class RateLimit {

	limit: number;
	
	remaining: number;

	reset: number;

	used: number;

	constructor(

		limitValue: number,
		
		remainingValue: number,

		resetValue: number,

		usedValue: number

	){

		this.limit = limitValue;
		
		this.remaining = remainingValue;

		this.reset = resetValue;

		this.used = usedValue;
	}

}
