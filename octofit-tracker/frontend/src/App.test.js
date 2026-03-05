import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock(
  'react-router-dom',
  () => ({
    Navigate: () => null,
    NavLink: ({ children }) => <span>{children}</span>,
    Route: () => null,
    Routes: ({ children }) => <div>{children}</div>,
  }),
  { virtual: true }
);

test('renders navigation heading', () => {
  render(<App />);

  const navigationElement = screen.getByText(/navigation/i);
  expect(navigationElement).toBeInTheDocument();
});
