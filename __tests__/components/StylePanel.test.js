import { render, screen, fireEvent } from '@testing-library/react'
import StylePanel from '@/components/StylePanel'

const createProps = (overrides = {}) => ({
  selectedComponent: { type: 'name', section: 'header', deletable: true },
  styling: {
    headingSize: 32,
    primaryColor: '#1f2937',
    fontFamily: 'Segoe UI',
  },
  position: { x: 100, y: 100 },
  onClose: jest.fn(),
  updateStyling: jest.fn(),
  onDelete: jest.fn(),
  ...overrides,
})

describe('StylePanel Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders expected controls for name component', () => {
    render(<StylePanel {...createProps()} />)

    expect(screen.getByText('Name Style')).toBeInTheDocument()
    const sliders = screen.getAllByRole('slider')
    expect(sliders[0]).toHaveValue('32')
  })

  it('calls updateStyling when style controls change', () => {
    const props = createProps()
    render(<StylePanel {...props} />)

    const sizeSlider = screen.getAllByRole('slider')[0]
    fireEvent.change(sizeSlider, { target: { value: '40' } })
    expect(props.updateStyling).toHaveBeenCalledWith('headingSize', 40)

    const colorTextInput = screen.getAllByDisplayValue('#1f2937')[1]
    fireEvent.change(colorTextInput, { target: { value: '#abcdef' } })
    expect(props.updateStyling).toHaveBeenCalledWith('primaryColor', '#abcdef')
  })

  it('invokes delete and close handlers when delete is clicked', () => {
    const props = createProps()
    render(<StylePanel {...props} />)

    fireEvent.click(screen.getByRole('button', { name: /delete element/i }))
    expect(props.onDelete).toHaveBeenCalledWith(props.selectedComponent)
    expect(props.onClose).toHaveBeenCalled()
  })

  it('closes panel when clicking outside', () => {
    const props = createProps()
    render(<StylePanel {...props} />)

    fireEvent.mouseDown(document.body)
    expect(props.onClose).toHaveBeenCalled()
  })

  it('renders nothing when no component is selected', () => {
    const { container } = render(<StylePanel {...createProps({ selectedComponent: null })} />)
    expect(container).toBeEmptyDOMElement()
  })
})
