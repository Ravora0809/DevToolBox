import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WordCounter from '../../components/tools/WordCounter';

describe('WordCounter Tool', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('accurately counts words, characters, sentences, and paragraphs', () => {
    render(<WordCounter />);
    const textarea = screen.getByPlaceholderText(/Paste or type content here/i);

    fireEvent.change(textarea, { target: { value: 'Hello world. This is a test sentence.\n\nSecond paragraph.' } });

    const totalWordsCard = screen.getByText(/Total Words/i).closest('div');
    expect(totalWordsCard).toHaveTextContent('9');
  });

  it('handles empty input gracefully with zero counts', () => {
    render(<WordCounter />);
    const textarea = screen.getByPlaceholderText(/Paste or type content here/i);

    fireEvent.change(textarea, { target: { value: '' } });

    const totalWordsCard = screen.getByText(/Total Words/i).closest('div');
    expect(totalWordsCard).toHaveTextContent('0');
  });

  it('transforms text to UPPERCASE, lowercase, and Title Case', () => {
    render(<WordCounter />);
    const textarea = screen.getByPlaceholderText(/Paste or type content here/i);
    fireEvent.change(textarea, { target: { value: 'quick brown fox' } });

    const upperBtn = screen.getByRole('button', { name: /UPPERCASE/i });
    fireEvent.click(upperBtn);
    expect(textarea.value).toBe('QUICK BROWN FOX');

    const lowerBtn = screen.getByRole('button', { name: /lowercase/i });
    fireEvent.click(lowerBtn);
    expect(textarea.value).toBe('quick brown fox');

    const titleBtn = screen.getByRole('button', { name: /Title Case/i });
    fireEvent.click(titleBtn);
    expect(textarea.value).toBe('Quick Brown Fox');
  });

  it('clears text when trash button is clicked', () => {
    render(<WordCounter />);
    const clearBtn = screen.getByTitle(/Clear text/i);
    fireEvent.click(clearBtn);

    const textarea = screen.getByPlaceholderText(/Paste or type content here/i);
    expect(textarea.value).toBe('');
  });

  it('loads sample text when sample button is clicked', () => {
    render(<WordCounter />);
    const clearBtn = screen.getByTitle(/Clear text/i);
    fireEvent.click(clearBtn);

    const sampleBtn = screen.getByRole('button', { name: /Sample/i });
    fireEvent.click(sampleBtn);

    const textarea = screen.getByPlaceholderText(/Paste or type content here/i);
    expect(textarea.value).toContain('DevToolBoox');
  });

  it('copies text to clipboard', () => {
    render(<WordCounter />);
    const textarea = screen.getByPlaceholderText(/Paste or type content here/i);
    fireEvent.change(textarea, { target: { value: 'Sample content to copy' } });

    const copyBtn = screen.getByRole('button', { name: /Copy/i });
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Sample content to copy');
  });
});
