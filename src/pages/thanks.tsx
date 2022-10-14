import React from 'react';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';

const Thanks: React.FC = () => {
	return (
		<>
			<Box
				display='flex'
				flexDirection='column'
				justifyContent='center'
				alignItems='center'
				gap={2}
				style={{height: '80vh'}}
			>
				<CheckCircle color='success' fontSize='large' />
				<Box style={{textAlign: 'center'}}>
					<Typography component='h3' fontWeight='bold' fontSize='24px'>
						Thank you for providing the feedback.
					</Typography>
					<Typography component='p'>
						We will work on improving your experience.
					</Typography>
				</Box>
				<Link to='/'>
					<Button variant='contained' color='secondary'>
						Close
					</Button>
				</Link>
			</Box>
		</>
	);
};

export default React.memo(Thanks);
