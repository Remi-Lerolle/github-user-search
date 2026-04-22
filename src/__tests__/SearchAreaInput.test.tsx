import { describe, test, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import SearchArea from "../components/SearchArea";

describe( 

	"Search Input",

	() => {

		test(

			"renders input",

			() => {

				render( 

					<SearchArea 
						handleChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => { console.log( "changed!" ); console.log( e.currentTarget ) } }
					/> 
				
				)

				expect(

					screen.getByPlaceholderText( "type something" )

				).toBeInTheDocument();

			}

		),

		test( 

			"Calls onChange when changed",

			() => {

				const handleChange = vi.fn;

				render(

					<SearchArea 
						handleChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => { console.log( "changed!" ); console.log( e.currentTarget ) } }
					/> 
				
				)

				fireEvent
					.click( screen.getByPlaceholderText( "type something" ) )
			}
		)

	}

)

