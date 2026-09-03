import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RegexTester from '../../components/tools/RegexTester';

describe('RegexTester Tool', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('matches valid regex pattern against test text', () => {
    render(<RegexTester />);
    const patternInput = screen.getByLabelText(/Regular Expression Pattern/i);
    const textInput = screen.getByPlaceholderText(/Enter test string to evaluate against regex/i);

    fireEvent.change(patternInput, { target: { value: '\\d+' } });
    fireEvent.change(textInput, { target: { value: 'Order 123 arrived at 456' } });

    expect(screen.getByText(/2 matches/i)).toBeInTheDocument();
  });

  it('handles invalid regex syntax and displays error message', () => {
    render(<RegexTester />);
    const patternInput = screen.getByLabelText(/Regular Expression Pattern/i);

    fireEvent.change(patternInput, { target: { value: '[a-z' } });

    expect(screen.getByText(/Regex Syntax Error:/i)).toBeInTheDocument();
  });

  it('handles empty pattern gracefully without error', () => {
    render(<RegexTester />);
    const patternInput = screen.getByLabelText(/Regular Expression Pattern/i);

    fireEvent.change(patternInput, { target: { value: '' } });

    expect(screen.queryByText(/Regex Syntax Error:/i)).not.toBeInTheDocument();
    expect(screen.getByText(/0 matches/i)).toBeInTheDocument();
  });

  it('toggles flags like case-insensitive (i)', () => {
    render(<RegexTester />);
    const flagBtnI = screen.getByRole('button', { name: 'Flag i' });
    fireEvent.click(flagBtnI);
    expect(flagBtnI).toBeInTheDocument();
  });

  it('clears pattern and test text when reset is clicked', () => {
    render(<RegexTester />);
    const clearBtn = screen.getByLabelText(/Clear regex and test text/i);
    fireEvent.click(clearBtn);

    const patternInput = screen.getByLabelText(/Regular Expression Pattern/i);
    const textInput = screen.getByPlaceholderText(/Enter test string to evaluate against regex/i);

    expect(patternInput.value).toBe('');
    expect(textInput.value).toBe('');
  });

  it('loads sample regex and text when preset button is clicked', () => {
    render(<RegexTester />);
    const clearBtn = screen.getByLabelText(/Clear regex and test text/i);
    fireEvent.click(clearBtn);

    const emailPresetBtn = screen.getByRole('button', { name: 'Email Address' });
    fireEvent.click(emailPresetBtn);

    const patternInput = screen.getByLabelText(/Regular Expression Pattern/i);
    expect(patternInput.value).toContain('@');
  });

  it('copies matches to clipboard', () => {
    render(<RegexTester />);
    const patternInput = screen.getByLabelText(/Regular Expression Pattern/i);
    const textInput = screen.getByPlaceholderText(/Enter test string to evaluate against regex/i);

    fireEvent.change(patternInput, { target: { value: '\\w+@\\w+\\.\\w+' } });
    fireEvent.change(textInput, { target: { value: 'user@test.com' } });

    const copyBtn = screen.getByTitle(/Copy all matched strings/i);
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('user@test.com');
  });
});
