import './App.css'

import UsersView from './Views/UsersView.tsx';

function App() {

	return (
		<>

			{/* 
					Wrapping users view in a single component 
					makes it reusable in a more complex project
			*/}	
			<UsersView />

		</>
	)
}

export default App;
