import { render } from '@testing-library/react'
import BlankCanvas from '@/components/Editor/BlankCanvas'

describe('BlankCanvas Component', () => {
  const mockElements = [
    { 
      id: 'elem-1', 
      type: 'text', 
      content: 'Hello', 
      position: { x: 100, y: 100 }, 
      size: { width: 200, height: 50 } 
    },
  ]

  const mockProps = {
    elements: mockElements,
    selectedElementIds: [],
    onElementSelect: jest.fn(),
    onElementUpdate: jest.fn(),
    onElementDelete: jest.fn(),
    pageStyle: {
      width: '210mm',
      minHeight: '297mm',
      backgroundColor: '#ffffff',
    },
    gridSettings: { enabled: false },
    isEditing: true,
  }

  it('renders canvas without crashing', () => {
    const { container } = render(<BlankCanvas {...mockProps} />)
    expect(container).toBeInTheDocument()
  })

  it('renders with empty elements array', () => {
    const { container } = render(<BlankCanvas {...mockProps} elements={[]} />)
    expect(container).toBeInTheDocument()
  })
})
