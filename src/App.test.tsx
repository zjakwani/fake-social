import { render, screen } from '@testing-library/react';
import App from './App';
import PostPage from './pages/PostPage';
import userEvent from '@testing-library/user-event'
import {createMemoryHistory} from 'history'
import React from 'react'
import {Router, MemoryRouter} from 'react-router-dom'

import '@testing-library/jest-dom'



test('home page', () => {
  render(<App />);
  const linkElement = screen.queryByText("Fake-Media");
  expect(linkElement).toBeInTheDocument();
});

test('home page username loading', () => {
  render(<App />);
  const linkElement = screen.queryByText("Username");
  expect(linkElement).toBeNull;
});

test('home page email loading', () => {
  render(<App />);
  const linkElement = screen.queryByText("Email");
  expect(linkElement).toBeNull;
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
}));

test('post page', () => {
  render(<PostPage />);
  const linkElement = screen.queryByText("Comment:");
  expect(linkElement).toBeNull;
});