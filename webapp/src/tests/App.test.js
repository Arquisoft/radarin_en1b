import { render, screen } from '@testing-library/react';
// import App from '../views/App';
import LoginForm from '../views/LoginForm';
import {toBeInTheDocument} from '@testing-library/jest-dom';

test('renders learn react link', () => {
  render(<LoginForm />);
  const linkElement = screen.getByText(/Welcome to Radarin Manager/i);
  expect(linkElement).toBeInTheDocument();
});
