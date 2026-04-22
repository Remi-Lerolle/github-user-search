import { renderHook, act } from "@testing-library/react"
import { describe, test, expect } from "vitest";

import { apiHeadersHandler } from "../hooks/handleApiHeaders"

describe (

	"Tests handleApiHeader hook",

	() => {

		test( 

			"Initializes with default values",

			() => {

				const { result } = renderHook( () => apiHeadersHandler() );

				expect( result.current.getRateLimitRefReset() ).toBe( null );

				expect( result.current.limitIsReached() ).toBe( false );

			}

		),

		test( 

			"handleApiHeaders",

			() => {

				const datePlus1Min = Date.now() + 60000

				const testHeader = new Headers;

				testHeader.append( "x-rate-limit", "0" );
				testHeader.append( "x-ratelimit-remaining", "0" );
				/* This header says the API is unreable for one minute */
				testHeader.append( "x-ratelimit-reset", datePlus1Min.toString() );
				testHeader.append( "x-ratelimit-used", "0" );

				const { result } = renderHook( () => apiHeadersHandler() );

				act(

					() => {

						result.current.handleApiHeaders( testHeader );

					}

				)

				expect( result.current.getRateLimitRefReset() ).toBe( datePlus1Min );

				expect( result.current.limitIsReached() ).toBe( true );

			}

		)

	}

)
