// src/Components/TestWrapper.js
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { MemoryRouter } from 'react-router-dom';

//we can mock the store if we need

const TestWrapper = ({ children }) => {
    return (
        <Provider store={store}>
            <MemoryRouter>
                {children}
            </MemoryRouter>
        </Provider>
    );
};

export default TestWrapper;
