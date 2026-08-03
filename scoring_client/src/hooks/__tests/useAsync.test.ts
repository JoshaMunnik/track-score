import {beforeEach, describe, expect, it, vi} from 'vitest';
import {renderHook, waitFor} from '@testing-library/react';
import { useAsync } from '../useAsync.ts';

describe('useAsync', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should resolve with data when async function succeeds', async () => {
    const asyncFn = vi.fn().mockResolvedValue('test data');
    
    const { result } = renderHook(() => useAsync(asyncFn));
    
    await waitFor(() => {
      expect(result.current.data).toBe('test data');
      expect(result.current.error).toBeNull();
      expect(result.current.calling).toBe(false);
    });
  });

  it('should handle error when async function fails', async () => {
    const errorMessage = 'Something went wrong';
    const asyncFn = vi.fn().mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useAsync(asyncFn));
    
    await waitFor(() => {
      expect(result.current.error).toBe(errorMessage);
      expect(result.current.data).toBeNull();
      expect(result.current.calling).toBe(false);
    });
  });

  it('should handle dependencies correctly', async () => {
    const asyncFn = vi.fn().mockResolvedValue('test data');
    
    const { result, rerender } = renderHook(
      ({ fn, deps }) => useAsync(fn, deps),
      {
        initialProps: { fn: asyncFn, deps: [1] }
      }
    );
    
    await waitFor(() => {
      expect(result.current.data).toBe('test data');
    });
    
    // Rerender with different dependencies
    const newAsyncFn = vi.fn().mockResolvedValue('new data');
    rerender({ fn: newAsyncFn, deps: [2] });
    
    await waitFor(() => {
      expect(result.current.data).toBe('new data');
    });
  });

  it('should have correct initial state', async () => {
    const { result } = renderHook(() => useAsync(() => Promise.resolve('test')));

    await waitFor(() => {
      // The hook immediately starts executing, so calling should be true initially
      expect(result.current.calling).toBe(true);
      expect(result.current.data).toBeNull();
      expect(result.current.error).toBeNull();
    });
  });

  it('should work with empty dependencies array', async () => {
    const asyncFn = vi.fn().mockResolvedValue('test data');
    
    const { result } = renderHook(() => useAsync(asyncFn, []));
    
    await waitFor(() => {
      expect(result.current.data).toBe('test data');
      expect(result.current.error).toBeNull();
      expect(result.current.calling).toBe(false);
    });
  });

  it('should work with no dependencies', async () => {
    const asyncFn = vi.fn().mockResolvedValue('test data');
    
    const { result } = renderHook(() => useAsync(asyncFn));
    
    await waitFor(() => {
      expect(result.current.data).toBe('test data');
      expect(result.current.error).toBeNull();
      expect(result.current.calling).toBe(false);
    });
  });

  it('should execute only once without dependencies', async () => {
    const asyncFn = vi.fn().mockResolvedValue('test data');
    
    const { result, rerender } = renderHook(
      ({ fn }) => useAsync(fn),
      { initialProps: { fn: asyncFn } }
    );
    
    await waitFor(() => {
      expect(result.current.data).toBe('test data');
    });
    
    // Rerender without changing the function - should not re-execute
    rerender({ fn: asyncFn });
    
    // Wait a bit to ensure no additional calls happened
    await new Promise(resolve => setTimeout(resolve, 100));
    
    expect(asyncFn).toHaveBeenCalledTimes(1);
  });
});