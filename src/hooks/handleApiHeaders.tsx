import { useRef } from 'react';

import { RateLimit } from '../classes/RateLimit';

interface apiHeadersHandlerReturn{
	
	getRateLimitRefReset: () => number;

	handleApiHeaders:  ( headers: Headers ) => void;

	limitIsReached: () => boolean;

}

export const apiHeadersHandler = (): apiHeadersHandlerReturn => {

	const defaultRateLimit = new RateLimit( 0, 0, null, null );

	/*
			If a rateLimitReset has been saved in the browser localStorage,
			uses it.
	*/
	const rateLimitRef = useRef< RateLimit | null > (
			localStorage.getItem( "rateLimitReset" )
				? new RateLimit( 
						0,
						0,
						Number( localStorage.getItem( "rateLimitReset" ) ),
						null
					)
				: { ...defaultRateLimit }
		)

	const getRateLimitRefRemaining = () => rateLimitRef.current?.remaining;
	
	const getRateLimitRefReset = () => rateLimitRef.current?.reset;

	const handleApiHeaders = ( headers: Headers ): void => {

		/* 
			Save x-rate-limit in local storage.
			Because if the user reach the limit and reloads the page,
			the browser loses it
		*/
		localStorage.setItem( "rateLimitReset",  headers.get( "x-ratelimit-reset" ) );

		/* Updates the rate limit ref */ 
		rateLimitRef.current = new RateLimit(

				Number ( headers.get( "x-rate-limit" ) ),

				Number ( headers.get( "x-ratelimit-remaining" ) ),

				Number ( headers.get( "x-ratelimit-reset" ) ),

				Number ( headers.get( "x-ratelimit-used" ) )

		);

	}

	const limitIsReached = () => {

		/* API has not yet been requested, means no limit */
		if ( !getRateLimitRefReset() ){
			
			return false; 

		}

		return getRateLimitRefRemaining() === 0 && ( Date.now() / 1000 ) < getRateLimitRefReset();

	}

	return { getRateLimitRefReset, handleApiHeaders, limitIsReached };

}