import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom'; 

import { LoginPage } from '../src/pages/LoginPage'; // Assuming you used named export

describe('Login UI', () => {
  it('renders the login form and allows typing', () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Find inputs by their actual placeholder text from your component
    const roomInput = screen.getByPlaceholderText('104');
    const nameInput = screen.getByPlaceholderText('Jane Doe');
    
    // Find the button by its actual text
    const submitButton = screen.getByRole('button', { name: /Access Resort Map/i });

    expect(roomInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Test user typing into the fields
    fireEvent.change(roomInput, { target: { value: '101' } });
    fireEvent.change(nameInput, { target: { value: 'Alice' } });

    // Verify the inputs updated correctly
    expect((roomInput as HTMLInputElement).value).toBe('101');
    expect((nameInput as HTMLInputElement).value).toBe('Alice');
  });
});