import SearchBar from './SearchBar';
import { screen, render, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { server } from '../../mocks/server';

// Test 1: Verify the presence of the search input
test('Verify the presence of the search input', () => {
    render(<SearchBar />);
    const inputElement = screen.getByPlaceholderText(/search city.../i);
    expect(inputElement).toBeInTheDocument();
});

// Test 2: Test Dropdown rendering for correct suggestions
test('Test Dropdown rendering for correct suggestions', async () => {
    server.use(
        rest.get('http://api.openweathermap.org/geo/1.0/direct', (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json([
                    { name: 'New York', state: 'NY', country: 'US' },
                    { name: 'Newark', state: 'NJ', country: 'US' },
                ])
            );
        })
    );

    render(<SearchBar />);

    // Simulate user typing in the search bar
    const inputElement = screen.getByPlaceholderText(/search city.../i);
    fireEvent.change(inputElement, { target: { value: 'New' } });

    // Wait for suggestions to render
    const suggestion1 = await screen.findByText('New York, NY, US');
    const suggestion2 = await screen.findByText('Newark, NJ, US');

    expect(suggestion1).toBeInTheDocument();
    expect(suggestion2).toBeInTheDocument();
});
