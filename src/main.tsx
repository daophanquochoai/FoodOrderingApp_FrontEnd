import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import './sentry/sentry.config';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from './hooks/context/ModalContext';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store/config';
import MessagePopUp from './components/popup/MessagePopUp';
import LoadingPage from './pages/LoadingPage';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <>
        <Provider store={store}>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <ModalProvider>
                        <MessagePopUp />
                        <App />
                    </ModalProvider>
                </QueryClientProvider>
            </BrowserRouter>
        </Provider>
    </>
);
