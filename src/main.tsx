import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './router/App';
import FeedbackProvider from './contexts/feedbacks';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<FeedbackProvider>
			<App />
		</FeedbackProvider>
	</React.StrictMode>
);
