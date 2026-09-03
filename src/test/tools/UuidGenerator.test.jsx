import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UuidGenerator from '../../components/tools/UuidGenerator';

describe('UuidGenerator Tool', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('generates the specified quantity of UUIDs', () => {
    render(<UuidGenerator />);
    const select = screen.getByLabelText(/Quantity:/i);

    fireEvent.change(select, { target: { value: '1' } });
    const copyOneButtons = screen.getAllByTitle(/Copy this UUID/i);
    expect(copyOneButtons.length).toBe(1);

    fireEvent.change(select, { target: { value: '10' } });
    const updatedButtons = screen.getAllByTitle(/Copy this UUID/i);
    expect(updatedButtons.length).toBe(10);
  });

  it('formats UUIDs with uppercase when checked', () => {
    render(<UuidGenerator />);
    const uppercaseCheckbox = screen.getByLabelText(/Uppercase/i);
    fireEvent.click(uppercaseCheckbox);

    const generatedUuids = screen.getAllByText(/[0-9A-F]{8}-[0-9A-F]{4}/);
    expect(generatedUuids.length).toBeGreaterThan(0);
  });

  it('removes hyphens when hyphens checkbox is unchecked', () => {
    render(<UuidGenerator />);
    const hyphensCheckbox = screen.getByLabelText(/Include Hyphens/i);
    fireEvent.click(hyphensCheckbox); // toggle off

    const items = screen.getAllByText(/[0-9a-f]{32}/i);
    expect(items.length).toBeGreaterThan(0);
  });

  it('regenerates UUIDs when generate new button is clicked', () => {
    render(<UuidGenerator />);
    const generateBtn = screen.getByRole('button', { name: /Generate New/i });
    fireEvent.click(generateBtn);

    const copyOneButtons = screen.getAllByTitle(/Copy this UUID/i);
    expect(copyOneButtons.length).toBeGreaterThan(0);
  });

  it('copies all UUIDs to clipboard', () => {
    render(<UuidGenerator />);
    const copyAllBtn = screen.getByRole('button', { name: /Copy All/i });
    fireEvent.click(copyAllBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('downloads UUIDs as text file', () => {
    render(<UuidGenerator />);
    const downloadBtn = screen.getByTitle(/Download as \.txt/i);
    fireEvent.click(downloadBtn);

    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(window.URL.revokeObjectURL).toHaveBeenCalled();
  });
});
