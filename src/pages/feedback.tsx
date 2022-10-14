import React, {useState} from 'react';

import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Alert from '@mui/material/Alert';

import countries from 'country-list-with-dial-code-and-flag';
import {Rate, useFeedbacks} from '../contexts/feedbacks';
import { useNavigate } from 'react-router-dom';

const Feedback: React.FC = () => {
	const [code, setCode] = useState('+91');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [service, setService] = useState<Rate>('Excellent');
	const [beverage, setBeverage] = useState<Rate>('Excellent');
	const [cleanliness, setCleanliness] = useState<Rate>('Excellent');
	const [overall, setOverall] = useState<Rate>('Excellent');
	const [error, setError] = useState('');

	const {addFeedback} = useFeedbacks();
  const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			!code ||
			!name ||
			!email ||
			!phone ||
			!service ||
			!beverage ||
			!cleanliness ||
			!overall
		) {
			return setError('All fields are required!');
		}

		if (
			!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
				email
			)
		) {
			return setError(
				'Email should be in valid format i.e. username@example.com!'
			);
		}

		if (!/^[0-9]{10}$/.test(phone)) {
			return setError('Phone should be valid 10 digit number!');
		}

		addFeedback({
			id: new Date().getTime(),
			name,
			phone: `${code}${phone}`,
			email,
			service,
			beverage,
			cleanliness,
			overall,
		});
    
    navigate('/thanks');
	};

	return (
		<>
			<Box style={{padding: '20px 55px', overflowY: 'auto'}}>
				<form onSubmit={handleSubmit}>
					<Box display='flex' gap='10%' mb='30px'>
						<FormControl required style={{width: '50%'}}>
							<FormLabel htmlFor='name'>Name</FormLabel>
							<OutlinedInput
								required
								type='text'
								name='name'
								size='small'
								value={name}
								onChange={({target: {value}}) => setName(value)}
							/>
						</FormControl>
						<FormControl required style={{width: '50%'}}>
							<FormLabel>Email</FormLabel>
							<OutlinedInput
								required
								type='email'
								name='email'
								size='small'
								value={email}
								onChange={({target: {value}}) => setEmail(value)}
							/>
						</FormControl>
					</Box>
					<Box gap='2%' display='flex' mb='30px'>
						<FormControl required style={{width: '10%'}}>
							<FormLabel>Country</FormLabel>
							<Select
								size='small'
								className='dial_code'
								value={code}
								onChange={({target: {value}}) => setCode(value)}
							>
								{countries.getList().map((country: any) => (
									<MenuItem
										className='dial_code'
										selected={country.dial_code === '+91'}
										value={country.dial_code}
										key={country.dial_code}
									>
										{country.flag} {country.dial_code}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl required style={{width: '33%'}}>
							<FormLabel>Phone</FormLabel>
							<OutlinedInput
								type='number'
								required
								name='phone'
								size='small'
								value={phone}
								onChange={({target: {value}}) => setPhone(value)}
							/>
						</FormControl>
					</Box>
					<Box mb='30px' gap='10%' display='flex'>
						<FormControl required style={{width: '50%'}}>
							<FormLabel>
								Please rate the quality of the service you received from your
								host.
							</FormLabel>
							<RadioGroup
								row
								style={{display: 'flex', justifyContent: 'space-between'}}
								value={service}
								onChange={({target: {value}}) => setService(value as Rate)}
							>
								<FormControlLabel
									value='Excellent'
									control={<Radio />}
									label='Excellent'
									labelPlacement='start'
								/>
								<FormControlLabel
									value='Good'
									control={<Radio />}
									label='Good'
									labelPlacement='start'
								/>
								<FormControlLabel
									value='Fair'
									control={<Radio />}
									label='Fair'
									labelPlacement='start'
								/>
								<FormControlLabel
									value='Bad'
									control={<Radio />}
									label='Bad'
									labelPlacement='start'
								/>
							</RadioGroup>
						</FormControl>
						<FormControl required style={{width: '50%'}}>
							<FormLabel>Please rate the quality of your beverage.</FormLabel>
							<RadioGroup
								row
								style={{display: 'flex', justifyContent: 'space-between'}}
								value={beverage}
								onChange={({target: {value}}) => setBeverage(value as Rate)}
							>
								<FormControlLabel
									value='Excellent'
									control={<Radio />}
									label='Excellent'
									labelPlacement='start'
								/>
								<FormControlLabel
									value='Good'
									control={<Radio />}
									label='Good'
									labelPlacement='start'
								/>
								<FormControlLabel
									value='Fair'
									control={<Radio />}
									label='Fair'
									labelPlacement='start'
								/>
								<FormControlLabel
									value='Bad'
									control={<Radio />}
									label='Bad'
									labelPlacement='start'
								/>
							</RadioGroup>
						</FormControl>
					</Box>
					<Box display='flex' gap='10%' mb='30px'>
						<FormControl required style={{width: '50%'}}>
							<FormLabel>Was our restaurant clean?</FormLabel>
							<RadioGroup
								row
								style={{display: 'flex', justifyContent: 'space-between'}}
								value={cleanliness}
								onChange={({target: {value}}) => setCleanliness(value as Rate)}
							>
								<FormControlLabel
									value='Excellent'
									control={<Radio />}
									label='Excellent'
									labelPlacement='start'
								/>
								<FormControlLabel
									value='Good'
									control={<Radio />}
									label='Good'
									labelPlacement='start'
								/>
								<FormControlLabel
									value='Fair'
									control={<Radio />}
									label='Fair'
									labelPlacement='start'
								/>
								<FormControlLabel
									value='Bad'
									control={<Radio />}
									label='Bad'
									labelPlacement='start'
								/>
							</RadioGroup>
						</FormControl>
						<FormControl required style={{width: '50%'}}>
							<FormLabel>Please rate your overall dining experience.</FormLabel>
							<RadioGroup
								row
								style={{display: 'flex', justifyContent: 'space-between'}}
								value={overall}
								onChange={({target: {value}}) => setOverall(value as Rate)}
							>
								<FormControlLabel
									value='Excellent'
									control={<Radio />}
									label='Excellent'
									labelPlacement='start'
								/>
								<FormControlLabel
									value='Good'
									control={<Radio />}
									label='Good'
									labelPlacement='start'
								/>
								<FormControlLabel
									value='Fair'
									control={<Radio />}
									label='Fair'
									labelPlacement='start'
								/>
								<FormControlLabel
									value='Bad'
									control={<Radio />}
									label='Bad'
									labelPlacement='start'
								/>
							</RadioGroup>
						</FormControl>
					</Box>
					{error ? <Alert severity='error'>{error}</Alert> : null}
					<Box justifyContent='flex-end' display='flex' py='20px'>
						<Button type='submit' variant='contained' color='success'>
							Submit
						</Button>
					</Box>
				</form>
			</Box>
		</>
	);
};

export default React.memo(Feedback);
