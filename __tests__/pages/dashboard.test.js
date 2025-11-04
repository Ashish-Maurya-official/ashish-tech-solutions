import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Dashboard from '@/pages/dashboard'

// Mock fetch
global.fetch = jest.fn()

describe('Dashboard Page', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('renders dashboard with loading state', () => {
    fetch.mockResolvedValueOnce({
      json: async () => [],
    })

    render(<Dashboard />)
    expect(screen.getByText(/loading resumes/i)).toBeInTheDocument()
  })

  it('displays empty state when no resumes exist', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [],
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText(/no resumes yet/i)).toBeInTheDocument()
    })
  })

  it('displays resumes grid when resumes exist', async () => {
    const mockResumes = [
      { id: '1', name: 'Software Engineer Resume', updatedAt: new Date().toISOString() },
      { id: '2', name: 'Product Manager Resume', updatedAt: new Date().toISOString() },
    ]

    fetch.mockResolvedValueOnce({
      json: async () => mockResumes,
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText('Software Engineer Resume')).toBeInTheDocument()
      expect(screen.getByText('Product Manager Resume')).toBeInTheDocument()
    })
  })

  it('opens create modal when clicking new resume button', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [],
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText(/no resumes yet/i)).toBeInTheDocument()
    })

    const createButton = screen.getAllByText(/new resume/i)[0]
    fireEvent.click(createButton)

    expect(screen.getByText(/create new resume/i)).toBeInTheDocument()
  })

  it('creates a new resume', async () => {
    fetch
      .mockResolvedValueOnce({ json: async () => [] })
      .mockResolvedValueOnce({ json: async () => ({ id: '123', name: 'Test Resume' }) })

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText(/no resumes yet/i)).toBeInTheDocument()
    })

    const createButton = screen.getAllByText(/new resume/i)[0]
    fireEvent.click(createButton)

    const input = screen.getByPlaceholderText(/e.g., Software Engineer Resume/i)
    fireEvent.change(input, { target: { value: 'Test Resume' } })

    // Get all buttons and find the one in the modal footer
    const submitButtons = screen.getAllByRole('button', { name: /create resume/i })
    const submitButton = submitButtons[submitButtons.length - 1] // Last one is in modal
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/resumes', expect.objectContaining({
        method: 'POST',
      }))
    })
  })
})
