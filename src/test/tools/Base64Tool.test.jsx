import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Base64Tool from '../../components/tools/Base64Tool';

describe('Base64Tool', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('encodes plain text into Base64', () => {
    render(<Base64Tool />);
    const inputArea = screen.getByPlaceholderText(/Type or paste UTF-8 text to encode/i);
    const processBtn = screen.getByRole('button', { name: /Encode to Base64/i });

    fireEvent.change(inputArea, { target: { value: 'Hello World' } });
    fireEvent.click(processBtn);

    const outputArea = screen.getByPlaceholderText(/Result will appear here/i);
    expect(outputArea.value).toBe('SGVsbG8gV29ybGQ=');
  });

  it('decodes valid Base64 string into plain text', () => {
    render(<Base64Tool />);
    const decodeModeBtn = screen.getByRole('button', { name: /Decode \(Base64 → Text\)/i });
    fireEvent.click(decodeModeBtn);

    const inputArea = screen.getByPlaceholderText(/Paste Base64 string to decode/i);
    const processBtn = screen.getByRole('button', { name: /Decode Base64/i });

    fireEvent.change(inputArea, { target: { value: 'SGVsbG8gV29ybGQ=' } });
    fireEvent.click(processBtn);

    const outputArea = screen.getByPlaceholderText(/Result will appear here/i);
    expect(outputArea.value).toBe('Hello World');
  });

  it('displays error on invalid Base64 in decode mode', () => {
    render(<Base64Tool />);
    const decodeModeBtn = screen.getByRole('button', { name: /Decode \(Base64 → Text\)/i });
    fireEvent.click(decodeModeBtn);

    const inputArea = screen.getByPlaceholderText(/Paste Base64 string to decode/i);
    const processBtn = screen.getByRole('button', { name: /Decode Base64/i });

    fireEvent.change(inputArea, { target: { value: 'This is not valid base64!@#%' } });
    fireEvent.click(processBtn);

    expect(screen.getByText(/Failed to decode/i)).toBeInTheDocument();
  });

  it('handles empty input gracefully', () => {
    render(<Base64Tool />);
    const inputArea = screen.getByPlaceholderText(/Type or paste UTF-8 text to encode/i);
    const processBtn = screen.getByRole('button', { name: /Encode to Base64/i });

    fireEvent.change(inputArea, { target: { value: '   ' } });
    fireEvent.click(processBtn);

    const outputArea = screen.getByPlaceholderText(/Result will appear here/i);
    expect(outputArea.value).toBe('');
    expect(screen.queryByText(/Failed to/i)).not.toBeInTheDocument();
  });

  it('resets inputs and outputs on clear click', () => {
    render(<Base64Tool />);
    const clearBtn = screen.getByTitle(/Reset and clear all/i);
    fireEvent.click(clearBtn);

    const inputArea = screen.getByPlaceholderText(/Type or paste UTF-8 text to encode/i);
    expect(inputArea.value).toBe('');
  });

  it('copies encoded result to clipboard', () => {
    render(<Base64Tool />);
    const inputArea = screen.getByPlaceholderText(/Type or paste UTF-8 text to encode/i);
    const processBtn = screen.getByRole('button', { name: /Encode to Base64/i });

    fireEvent.change(inputArea, { target: { value: 'Test' } });
    fireEvent.click(processBtn);

    const copyBtn = screen.getByRole('button', { name: /Copy/i });
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('VGVzdA==');
  });
});
