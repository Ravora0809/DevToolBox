import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import JsonFormatter from '../../components/tools/JsonFormatter';

describe('JsonFormatter Tool', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('formats valid JSON with custom indentation', async () => {
    render(<JsonFormatter />);
    const rawInput = screen.getByPlaceholderText(/Paste your unformatted JSON here/i);
    const formatBtn = screen.getByRole('button', { name: /Format JSON/i });

    fireEvent.change(rawInput, { target: { value: '{"foo":"bar","num":42}' } });
    fireEvent.click(formatBtn);

    const output = screen.getByPlaceholderText(/Formatted output will appear here/i);
    expect(output.value).toContain('{\n  "foo": "bar",\n  "num": 42\n}');
  });

  it('handles minification of valid JSON', () => {
    render(<JsonFormatter />);
    const rawInput = screen.getByPlaceholderText(/Paste your unformatted JSON here/i);
    const minifyBtn = screen.getByRole('button', { name: /Minify \(1 Line\)/i });

    fireEvent.change(rawInput, { target: { value: '{\n  "hello": "world"\n}' } });
    fireEvent.click(minifyBtn);

    const output = screen.getByPlaceholderText(/Formatted output will appear here/i);
    expect(output.value).toBe('{"hello":"world"}');
  });

  it('displays error message on invalid JSON input', () => {
    render(<JsonFormatter />);
    const rawInput = screen.getByPlaceholderText(/Paste your unformatted JSON here/i);
    const formatBtn = screen.getByRole('button', { name: /Format JSON/i });

    fireEvent.change(rawInput, { target: { value: '{ invalid: json without quotes }' } });
    fireEvent.click(formatBtn);

    expect(screen.getByText(/Expected property name|Unexpected token/i)).toBeInTheDocument();
  });

  it('handles empty input gracefully', () => {
    render(<JsonFormatter />);
    const rawInput = screen.getByPlaceholderText(/Paste your unformatted JSON here/i);
    const formatBtn = screen.getByRole('button', { name: /Format JSON/i });

    fireEvent.change(rawInput, { target: { value: '   ' } });
    fireEvent.click(formatBtn);

    const output = screen.getByPlaceholderText(/Formatted output will appear here/i);
    expect(output.value).toBe('');
    expect(screen.queryByText(/Unexpected token/i)).not.toBeInTheDocument();
  });

  it('clears input and output when clear button is clicked', () => {
    render(<JsonFormatter />);
    const clearBtn = screen.getByTitle(/Clear all/i);
    fireEvent.click(clearBtn);

    const rawInput = screen.getByPlaceholderText(/Paste your unformatted JSON here/i);
    const output = screen.getByPlaceholderText(/Formatted output will appear here/i);
    expect(rawInput.value).toBe('');
    expect(output.value).toBe('');
  });

  it('loads example JSON when example button is clicked', () => {
    render(<JsonFormatter />);
    const clearBtn = screen.getByTitle(/Clear all/i);
    fireEvent.click(clearBtn);

    const exampleBtn = screen.getByRole('button', { name: /Example/i });
    fireEvent.click(exampleBtn);

    const rawInput = screen.getByPlaceholderText(/Paste your unformatted JSON here/i);
    expect(rawInput.value).toContain('DevToolBox');
  });

  it('copies formatted JSON to clipboard', async () => {
    render(<JsonFormatter />);
    const rawInput = screen.getByPlaceholderText(/Paste your unformatted JSON here/i);
    const formatBtn = screen.getByRole('button', { name: /Format JSON/i });

    fireEvent.change(rawInput, { target: { value: '{"test":true}' } });
    fireEvent.click(formatBtn);

    const copyBtn = screen.getByRole('button', { name: /Copy/i });
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('{\n  "test": true\n}');
  });
});
