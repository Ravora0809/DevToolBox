import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UrlEncoderDecoder from '../../components/tools/UrlEncoderDecoder';

describe('UrlEncoderDecoder Tool', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('encodes URLs correctly', () => {
    render(<UrlEncoderDecoder />);
    const inputArea = screen.getByPlaceholderText(/Type or paste URL here/i);
    const processBtn = screen.getByRole('button', { name: /Process/i });

    fireEvent.change(inputArea, { target: { value: 'https://example.com/search?q=test & user' } });
    fireEvent.click(processBtn);

    const outputArea = screen.getByPlaceholderText(/Processed output will appear here/i);
    expect(outputArea.value).toContain('https%3A%2F%2Fexample.com');
  });

  it('decodes encoded URLs correctly', () => {
    render(<UrlEncoderDecoder />);
    const decodeBtn = screen.getByRole('button', { name: /Decode URL/i });
    fireEvent.click(decodeBtn);

    const inputArea = screen.getByPlaceholderText(/Type or paste URL here/i);
    const processBtn = screen.getByRole('button', { name: /Process/i });

    fireEvent.change(inputArea, { target: { value: 'https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dtest%20%26%20user' } });
    fireEvent.click(processBtn);

    const outputArea = screen.getByPlaceholderText(/Processed output will appear here/i);
    expect(outputArea.value).toBe('https://example.com/search?q=test & user');
  });

  it('handles malformed URI components on decode', () => {
    render(<UrlEncoderDecoder />);
    const decodeBtn = screen.getByRole('button', { name: /Decode URL/i });
    fireEvent.click(decodeBtn);

    const inputArea = screen.getByPlaceholderText(/Type or paste URL here/i);
    const processBtn = screen.getByRole('button', { name: /Process/i });

    fireEvent.change(inputArea, { target: { value: '%E0%A4%A' } }); // incomplete sequence
    fireEvent.click(processBtn);

    expect(screen.getByText(/Processing Error:/i)).toBeInTheDocument();
  });

  it('handles empty input gracefully', () => {
    render(<UrlEncoderDecoder />);
    const inputArea = screen.getByPlaceholderText(/Type or paste URL here/i);
    const processBtn = screen.getByRole('button', { name: /Process/i });

    fireEvent.change(inputArea, { target: { value: '' } });
    fireEvent.click(processBtn);

    const outputArea = screen.getByPlaceholderText(/Processed output will appear here/i);
    expect(outputArea.value).toBe('');
    expect(screen.queryByText(/Processing Error:/i)).not.toBeInTheDocument();
  });

  it('clears input and output on trash button click', () => {
    render(<UrlEncoderDecoder />);
    const clearBtn = screen.getByTitle(/Clear all/i);
    fireEvent.click(clearBtn);

    const inputArea = screen.getByPlaceholderText(/Type or paste URL here/i);
    const outputArea = screen.getByPlaceholderText(/Processed output will appear here/i);
    expect(inputArea.value).toBe('');
    expect(outputArea.value).toBe('');
  });

  it('copies encoded/decoded text to clipboard', () => {
    render(<UrlEncoderDecoder />);
    const inputArea = screen.getByPlaceholderText(/Type or paste URL here/i);
    const processBtn = screen.getByRole('button', { name: /Process/i });

    fireEvent.change(inputArea, { target: { value: 'hello world' } });
    fireEvent.click(processBtn);

    const copyBtn = screen.getByRole('button', { name: /Copy/i });
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello%20world');
  });
});
