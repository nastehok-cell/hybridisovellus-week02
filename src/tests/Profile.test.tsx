import { render, screen } from '@testing-library/react';
import Profile from '../views/Profile';

test('renders correct content for the headline', () => {
  render(<Profile />);
  const element = screen.getByText('Profile page');
  expect(element).toBeDefined();
});
