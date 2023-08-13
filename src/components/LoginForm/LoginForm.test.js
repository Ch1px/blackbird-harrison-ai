import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './index';

test('renders sign in page', () => {
  render(<LoginForm />);
  const signInText = screen.getByText("Sign in");
  expect(signInText).toBeInTheDocument();
});

// Add more unit test here

test('displays invalid email error', () => {
  render(<LoginForm />);
  const emailInput = screen.getByTestId('email-input');
  userEvent.type(emailInput, 'invalidemail');

  const passwordInput = screen.getByTestId('password-input');
  userEvent.type(passwordInput, 'ValidPassword1!');

  const signInButton = screen.getByText("Sign In");
  userEvent.click(signInButton);

  expect(screen.getByText("Invalid email")).toBeInTheDocument();
});

test('displays invalid password error', () => {
  render(<LoginForm />);
  const emailInput = screen.getByTestId('email-input');
  userEvent.type(emailInput, 'valid@email.com');

  const passwordInput = screen.getByTestId('password-input');
  userEvent.type(passwordInput, 'Invalid');

  const signInButton = screen.getByText("Sign In");
  userEvent.click(signInButton);

  const expectedErrorMsg = "Password must have at least 8 characters, an uppercase, a lowercase, a number, and a special character (!@#$%^&*).";
  expect(screen.getByText(expectedErrorMsg)).toBeInTheDocument();
});

test('does not show any error with valid inputs', () => {
  render(<LoginForm />);
  const emailInput = screen.getByTestId('email-input');
  userEvent.type(emailInput, 'valid@email.com');

  const passwordInput = screen.getByTestId('password-input');
  userEvent.type(passwordInput, 'ValidPassword1!');

  const signInButton = screen.getByText("Sign In");
  userEvent.click(signInButton);

  const emailError = screen.queryByText("Invalid email");
  const passwordError = screen.queryByText("Password must have at least 8 characters, an uppercase, a lowercase, a number, and a special character (!@#$%^&*).");

  expect(emailError).not.toBeInTheDocument();
  expect(passwordError).not.toBeInTheDocument();
});