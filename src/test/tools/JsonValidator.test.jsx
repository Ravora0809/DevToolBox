import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import JsonValidator from '../../components/tools/JsonValidator';

describe('JsonValidator Tool', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('validates valid RFC 8259 JSON successfully', () => {
    render(<JsonValidator />);
    const textarea = screen.getByRole('textbox');
    const validateBtn = screen.getByRole('button', { name: /Validate Syntax/i });

    fireEvent.change(textarea, { target: { value: '{"name": "test", "active": true}' } });
    fireEvent.click(validateBtn);

    expect(screen.getByText(/JSON is strictly valid RFC 8259 format/i)).toBeInTheDocument();
  });

  it('reports errors and location on invalid JSON syntax', () => {
    render(<JsonValidator />);
    const textarea = screen.getByRole('textbox');
    const validateBtn = screen.getByRole('button', { name: /Validate Syntax/i });

    fireEvent.change(textarea, { target: { value: '{\n  "missingQuote: true\n}' } });
    fireEvent.click(validateBtn);

    expect(screen.getByText(/Syntax Error Detected/i)).toBeInTheDocument();
  });

  it('handles empty input gracefully', () => {
    render(<JsonValidator />);
    const textarea = screen.getByRole('textbox');
    const validateBtn = screen.getByRole('button', { name: /Validate Syntax/i });

    fireEvent.change(textarea, { target: { value: '   ' } });
    fireEvent.click(validateBtn);

    expect(screen.queryByText(/Syntax Error Detected/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/JSON is strictly valid/i)).not.toBeInTheDocument();
  });

  it('auto-fixes common single-quotes and trailing commas', () => {
    render(<JsonValidator />);
    const textarea = screen.getByRole('textbox');
    const fixBtn = screen.getByRole('button', { name: /Auto-Fix/i });

    fireEvent.change(textarea, { target: { value: "{\n  'single': 'value',\n}" } });
    fireEvent.click(fixBtn);

    expect(textarea.value).toContain('"single": "value"');
    expect(screen.getByText(/Syntax auto-repaired successfully/i)).toBeInTheDocument();
  });

  it('resets input when reset button is clicked', () => {
    render(<JsonValidator />);
    const resetBtn = screen.getByTitle(/Reset and clear editor/i);
    fireEvent.click(resetBtn);

    const textarea = screen.getByRole('textbox');
    expect(textarea.value).toBe('');
  });

  it('copies JSON content to clipboard', () => {
    render(<JsonValidator />);
    const copyBtn = screen.getByRole('button', { name: /Copy/i });
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
