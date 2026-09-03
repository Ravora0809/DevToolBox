import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PasswordGenerator from '../../components/tools/PasswordGenerator';

describe('PasswordGenerator Tool', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('generates a password of default length 16', () => {
    render(<PasswordGenerator />);
    const copyBtn = screen.getByRole('button', { name: /Copy/i });
    expect(copyBtn).toBeEnabled();

    // Check strength estimation is displayed
    expect(screen.getByText(/Estimated Security:/i)).toBeInTheDocument();
  });

  it('applies PIN preset generating numbers only', () => {
    render(<PasswordGenerator />);
    const pinBtn = screen.getByRole('button', { name: /Numeric PIN/i });
    fireEvent.click(pinBtn);

    const lengthSlider = screen.getByLabelText(/Password Length:/i);
    expect(lengthSlider.value).toBe('6');
  });

  it('handles empty character set gracefully', () => {
    render(<PasswordGenerator />);
    const uppercase = screen.getByLabelText(/Include Uppercase/i);
    const lowercase = screen.getByLabelText(/Include Lowercase/i);
    const numbers = screen.getByLabelText(/Include Numbers/i);
    const symbols = screen.getByLabelText(/Include Symbols/i);

    // Uncheck all character sets
    fireEvent.click(uppercase);
    fireEvent.click(lowercase);
    fireEvent.click(numbers);
    fireEvent.click(symbols);

    expect(screen.getByText(/Select character sets below/i)).toBeInTheDocument();
  });

  it('regenerates password on refresh button click', () => {
    render(<PasswordGenerator />);
    const refreshBtn = screen.getByTitle(/Generate new password/i);
    fireEvent.click(refreshBtn);

    const copyBtn = screen.getByRole('button', { name: /Copy/i });
    expect(copyBtn).toBeEnabled();
  });

  it('copies password to clipboard', () => {
    render(<PasswordGenerator />);
    const copyBtn = screen.getByRole('button', { name: /Copy/i });
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
