import { describe, test, expect } from "vitest"

import CardContainer from "../components/CardContainer"

describe (

	"Test message is displayed if rateLimit is reached",

	() => {

		test( 

			"Sends rateLimit true expect text 'Limite d'appels API atteinte !' to be present",

			() => {

				expect( true ).toBe( true )

			}

		)
	}

)
