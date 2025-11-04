import { render } from '@testing-library/react'
import StylePanel from '@/components/StylePanel'

describe('StylePanel Component', () => {
  const mockProps = {
    selectedComponent: { type: 'name', section: 'header' },
    styling: {
      headingSize: 32,
      primaryColor: '#1f2937',
      fontFamily: 'Segoe UI',
    },
    position: { x: 100, y: 100 },
    onUpdateStyling: jest.fn(),
    onDelete: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders style panel with position', () => {
    const { container } = render(<StylePanel {...mockProps} />)
    expect(container).toBeInTheDocument()
  })

  it('renders without crashing when no component selected', () => {
    const { container } = render(<StylePanel {...mockProps} selectedComponent={null} />)
    expect(container).toBeInTheDocument()
  })
})
