import React, {useEffect, useState} from 'react';
import {useFeedbacks} from '../contexts/feedbacks';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import {Search} from '@mui/icons-material';
import {DataGrid} from '@mui/x-data-grid';
import {Link} from 'react-router-dom';

const columns = [
	{
		headerName: 'Name',
		field: 'name',
		width: 100,
	},
	{
		headerName: 'Email',
		field: 'email',
		width: 200,
	},
	{
		headerName: 'Phone',
		field: 'phone',
		width: 150,
	},
	{
		field: 'service',
		headerName:
			'Please rate the quality of the service you received from your host.',
		width: 450,
	},
	{
		field: 'beverage',
		headerName: 'Please rate the quality of your beverage.',
		width: 300,
	},
	{
		field: 'cleanliness',
		headerName: 'Was our restaurant clean?',
		width: 200,
	},
	{
		field: 'overall',
		headerName: 'Please rate your overall dining experience.',
		width: 300,
	},
];

const Home: React.FC = () => {
	const {feedbacks, deleteFeedbacks} = useFeedbacks();
	const [rows, setRows] = useState(feedbacks);
	const [query, setQuery] = useState('');
	const [selection, setSelection] = useState<number[]>([]);

	useEffect(() => {
		setRows(feedbacks);
	}, [feedbacks]);

	const handleSearch = () => {
		let search = query.trim();
		if (!search) return setRows(feedbacks);
		let filtered = feedbacks.filter(
			(feed) =>
				feed.name.includes(search) ||
				feed.phone.includes(search) ||
				feed.email.includes(search)
		);
		setRows(filtered);
	};

	return (
		<>
			<Box py={2} display='flex' justifyContent='flex-end' gap={2}>
				<TextField
					id='search'
					label='Search...'
					type='search'
					size='small'
					value={query}
					onChange={({target: {value}}) => setQuery(value)}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton onClick={handleSearch}>
									<Search />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Link to='/new-feedback'>
					<Button variant='contained' color='success'>
						Add New
					</Button>
				</Link>
			</Box>
			<Box style={{height: '65vh'}}>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[5]}
					checkboxSelection
					onSelectionModelChange={(selected) =>
						setSelection(selected as number[])
					}
				/>
			</Box>
			<Box py={2} display='flex' justifyContent='flex-end'>
				<Button
					variant='contained'
					color='error'
					disabled={selection.length < 1}
					onClick={() => deleteFeedbacks(selection)}
				>
					Delete
				</Button>
			</Box>
		</>
	);
};

export default React.memo(Home);
