import { renderHook, act } from '@testing-library/react'
import useLongPress from '@/hooks/useLongPress'

describe('useLongPress Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('triggers callback after long press duration', () => {
    const onLongPress = jest.fn()
    const onClick = jest.fn()
    const { result } = renderHook(() => useLongPress(onLongPress, onClick, { delay: 500 }))

    // Create a mock event with target
    const mockEvent = {
      target: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
      preventDefault: jest.fn(),
    }

    act(() => {
      result.current.onMouseDown(mockEvent)
    })

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(onLongPress).toHaveBeenCalled()
  })

  it('does not trigger callback if released early', () => {
    const onLongPress = jest.fn()
    const onClick = jest.fn()
    const { result } = renderHook(() => useLongPress(onLongPress, onClick, { delay: 500 }))

    const mockEvent = {
      target: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
      preventDefault: jest.fn(),
    }

    act(() => {
      result.current.onMouseDown(mockEvent)
    })

    act(() => {
      jest.advanceTimersByTime(200)
    })

    act(() => {
      result.current.onMouseUp(mockEvent)
    })

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(onLongPress).not.toHaveBeenCalled()
    expect(onClick).toHaveBeenCalled()
  })

  it('cancels on mouse leave', () => {
    const onLongPress = jest.fn()
    const onClick = jest.fn()
    const { result } = renderHook(() => useLongPress(onLongPress, onClick, { delay: 500 }))

    const mockEvent = {
      target: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
      preventDefault: jest.fn(),
    }

    act(() => {
      result.current.onMouseDown(mockEvent)
    })

    act(() => {
      jest.advanceTimersByTime(200)
    })

    act(() => {
      result.current.onMouseLeave(mockEvent)
    })

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(onLongPress).not.toHaveBeenCalled()
    expect(onClick).not.toHaveBeenCalled()
  })

  it('works with touch events', () => {
    const onLongPress = jest.fn()
    const onClick = jest.fn()
    const { result } = renderHook(() => useLongPress(onLongPress, onClick, { delay: 500 }))

    const mockEvent = {
      target: {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      },
      preventDefault: jest.fn(),
    }

    act(() => {
      result.current.onTouchStart(mockEvent)
    })

    act(() => {
      jest.advanceTimersByTime(500)
    })

    expect(onLongPress).toHaveBeenCalled()
  })
})
