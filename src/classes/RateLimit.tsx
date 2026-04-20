
/*

		This object is used to store the rate limit sent by github

*/

export class RateLimit {

	limit: number | null = null ;
	
	remaining: number | null = null;

	reset: number | null = null;

	used: number  | null = null;

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
