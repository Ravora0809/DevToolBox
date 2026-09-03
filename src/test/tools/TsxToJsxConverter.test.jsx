import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TsxToJsxConverter from '../../components/tools/TsxToJsxConverter';

describe('TsxToJsxConverter Tool', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('strips TypeScript types and interfaces to clean JSX', () => {
    render(<TsxToJsxConverter />);
    const textarea = screen.getByLabelText(/Input TypeScript \/ TSX Code/i);
    const convertBtn = screen.getByRole('button', { name: /Convert TSX to JSX/i });

    const tsxCode = `interface MyProps { title: string; }\nexport const Heading: React.FC<MyProps> = ({ title }: MyProps): JSX.Element => <h1>{title}</h1>;`;
    fireEvent.change(textarea, { target: { value: tsxCode } });
    fireEvent.click(convertBtn);

    const output = screen.getByLabelText(/Clean JSX Output/i);
    expect(output.value).not.toContain('interface MyProps');
    expect(output.value).not.toContain(': React.FC<MyProps>');
    expect(output.value).toContain('<h1>{title}</h1>');
  });

  it('handles empty input gracefully', () => {
    render(<TsxToJsxConverter />);
    const textarea = screen.getByLabelText(/Input TypeScript \/ TSX Code/i);
    const convertBtn = screen.getByRole('button', { name: /Convert TSX to JSX/i });

    fireEvent.change(textarea, { target: { value: '   ' } });
    fireEvent.click(convertBtn);

    const output = screen.getByLabelText(/Clean JSX Output/i);
    expect(output.value).toBe('');
  });

  it('resets to sample TSX code when reset button is clicked', () => {
    render(<TsxToJsxConverter />);
    const clearBtn = screen.getByTitle(/Clear all/i);
    fireEvent.click(clearBtn);

    const resetBtn = screen.getByRole('button', { name: /Reset Example/i });
    fireEvent.click(resetBtn);

    const textarea = screen.getByLabelText(/Input TypeScript \/ TSX Code/i);
    expect(textarea.value).toContain('interface UserCardProps');
  });

  it('copies converted JSX code to clipboard', () => {
    render(<TsxToJsxConverter />);
    const copyBtn = screen.getByRole('button', { name: /Copy JSX/i });
    fireEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
