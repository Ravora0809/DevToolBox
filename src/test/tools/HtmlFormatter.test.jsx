import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HtmlFormatter from '../../components/tools/HtmlFormatter';

describe('HtmlFormatter Tool', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('formats HTML code with proper indentation', () => {
    render(<HtmlFormatter />);
    const textarea = screen.getByPlaceholderText(/Paste raw HTML markup here/i);
    const formatBtn = screen.getByRole('button', { name: /Format HTML/i });

    fireEvent.change(textarea, { target: { value: '<div><p>Hello World</p></div>' } });
    fireEvent.click(formatBtn);

    const output = screen.getByPlaceholderText(/Click 'Format HTML' to generate beautified markup/i);
    expect(output.value).toContain('<div>');
    expect(output.value).toContain('  <p>');
    expect(output.value).toContain('  </p>');
    expect(output.value).toContain('</div>');
  });

  it('minifies HTML code into single line string', () => {
    render(<HtmlFormatter />);
    const textarea = screen.getByPlaceholderText(/Paste raw HTML markup here/i);
    const minifyBtn = screen.getByRole('button', { name: /Minify HTML/i });

    fireEvent.change(textarea, { target: { value: '<div>\n  <p>  Test text  </p>\n</div>' } });
    fireEvent.click(minifyBtn);

    const output = screen.getByPlaceholderText(/Click 'Format HTML' to generate beautified markup/i);
    expect(output.value).toBe('<div><p> Test text </p></div>');
  });

  it('handles empty input gracefully', () => {
    render(<HtmlFormatter />);
    const textarea = screen.getByPlaceholderText(/Paste raw HTML markup here/i);
    const formatBtn = screen.getByRole('button', { name: /Format HTML/i });

    fireEvent.change(textarea, { target: { value: '   ' } });
    fireEvent.click(formatBtn);

    const output = screen.getByPlaceholderText(/Click 'Format HTML' to generate beautified markup/i);
    expect(output.value).toBe('');
  });

  it('clears input and output on trash button click', () => {
    render(<HtmlFormatter />);
    const clearBtn = screen.getByTitle(/Reset and clear all/i);
    fireEvent.click(clearBtn);

    const textarea = screen.getByPlaceholderText(/Paste raw HTML markup here/i);
    expect(textarea.value).toBe('');
  });

  it('copies formatted HTML code to clipboard', () => {
    render(<HtmlFormatter />);
    const textarea = screen.getByPlaceholderText(/Paste raw HTML markup here/i);
    const formatBtn = screen.getByRole('button', { name: /Format HTML/i });

    fireEvent.change(textarea, { target: { value: '<span>Hello</span>' } });
    fireEvent.click(formatBtn);

    const copyBtn = screen.getByRole('button', { name: /Copy/i });
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
