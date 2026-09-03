import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TimestampConverter from '../../components/tools/TimestampConverter';

describe('TimestampConverter Tool', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('converts valid Unix timestamp to UTC and Local formats', () => {
    render(<TimestampConverter />);
    const epochInput = screen.getByLabelText(/Enter Unix Epoch/i);

    fireEvent.change(epochInput, { target: { value: '1700000000' } });

    expect(screen.getByText(/UTC \(GMT\)/i)).toBeInTheDocument();
    expect(screen.getByText(/ISO 8601 Format/i)).toBeInTheDocument();
    expect(screen.getByText(/2023-11-14T22:13:20.000Z/i)).toBeInTheDocument();
  });

  it('displays error for non-numeric timestamp input', () => {
    render(<TimestampConverter />);
    const epochInput = screen.getByLabelText(/Enter Unix Epoch/i);

    fireEvent.change(epochInput, { target: { value: 'not-a-timestamp' } });

    expect(screen.getByText(/Please enter a valid numeric Unix timestamp/i)).toBeInTheDocument();
  });

  it('handles empty input gracefully without errors', () => {
    render(<TimestampConverter />);
    const epochInput = screen.getByLabelText(/Enter Unix Epoch/i);

    fireEvent.change(epochInput, { target: { value: '   ' } });

    expect(screen.queryByText(/Please enter a valid numeric/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/UTC \(GMT\)/i)).not.toBeInTheDocument();
  });

  it('converts human date picker input into seconds and milliseconds', () => {
    render(<TimestampConverter />);
    const datePicker = screen.getByLabelText(/Pick Date and Time:/i);

    fireEvent.change(datePicker, { target: { value: '2025-01-01T00:00' } });

    expect(screen.getByText(/Epoch Seconds \(10 digits\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Epoch Milliseconds \(13 digits\)/i)).toBeInTheDocument();
  });

  it('sets preset epoch timestamps like Unix 0', () => {
    render(<TimestampConverter />);
    const epoch0Btn = screen.getByRole('button', { name: /Unix 0 \(1970\)/i });
    fireEvent.click(epoch0Btn);

    const epochInput = screen.getByLabelText(/Enter Unix Epoch/i);
    expect(epochInput.value).toBe('0');
    expect(screen.getByText(/1970-01-01T00:00:00.000Z/i)).toBeInTheDocument();
  });

  it('copies timestamp to clipboard', () => {
    render(<TimestampConverter />);
    const copyLiveBtn = screen.getByRole('button', { name: /Copy Live Epoch/i });
    fireEvent.click(copyLiveBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });
});
