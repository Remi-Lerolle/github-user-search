import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import SearchArea from "../components/SearchArea";

describe( 

	"Search Input",

	() => {

		test(

			"renders input",

			() => {

				render( 
					<SearchArea 
						handleChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => { console.log( "clicked!" ); console.log( e.currentTarget ) } }
					/> )

				expect(

					screen.getByPlaceholderText( "type something" )

				).toBeInTheDocument();

			}

		)

	}

)

