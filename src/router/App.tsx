import React from 'react';
import {Routes, Route, BrowserRouter, NavLink} from 'react-router-dom';
import Feedback from '../pages/feedback';
import Home from '../pages/home';
import {Container, AppBar, Box} from '@mui/material'
import Thanks from '../pages/thanks';

const App: React.FC = () => {
	return (
		<>
			<Container style={{maxWidth: 'none', width: '100%', overflowY: 'auto'}}>
				<BrowserRouter>
					<AppBar position="fixed" style={{padding: '20px', fontSize: '24px', backgroundColor: 'white', color: 'black'}}>
						<NavLink to="/">Aromatic Bar</NavLink>
					</AppBar>
					<Box style={{backgroundColor: 'white', marginTop: '75px'}}>
						<Routes>
							<Route path='/' index element={<Home />} />
							<Route path='/new-feedback' element={<Feedback />} />
							<Route path='/thanks' element={<Thanks />} />
						</Routes>
					</Box>
				</BrowserRouter>
			</Container>
		</>
	);
};

export default React.memo(App);
