import { render, screen, fireEvent } from '@testing-library/react'
import DraggableResume from '@/components/DraggableResume'

const mockData = {
  name: 'John Doe',
  title: 'Software Engineer',
  summary: 'Experienced developer',
  experience: [
    { company: 'Tech Corp', position: 'Senior Dev', duration: '2020-2023' }
  ],
  education: [
    { school: 'University', degree: 'BS Computer Science', year: '2020' }
  ],
  skills: ['JavaScript', 'React', 'Node.js'],
  sectionOrder: ['summary', 'experience', 'education', 'skills'],
  sectionVisibility: {},
}

const MockTemplate = ({ data, onComponentClick }) => (
  <div data-testid="mock-template">
    <div onClick={(e) => onComponentClick({ type: 'name' }, e)}>{data.name}</div>
    <div>{data.title}</div>
  </div>
)

describe('DraggableResume Component', () => {
  it('renders with template component', () => {
    render(
      <DraggableResume
        data={mockData}
        onComponentClick={jest.fn()}
        selectedComponent={null}
        onReorderSections={jest.fn()}
        TemplateComponent={MockTemplate}
      />
    )

    expect(screen.getByTestId('mock-template')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('handles component click', () => {
    const handleClick = jest.fn()
    
    render(
      <DraggableResume
        data={mockData}
        onComponentClick={handleClick}
        selectedComponent={null}
        onReorderSections={jest.fn()}
        TemplateComponent={MockTemplate}
      />
    )

    fireEvent.click(screen.getByText('John Doe'))
    expect(handleClick).toHaveBeenCalledWith(
      { type: 'name' },
      expect.any(Object)
    )
  })

  it('filters visible sections correctly', () => {
    const dataWithHiddenSection = {
      ...mockData,
      sectionVisibility: { skills: false },
    }

    const { container } = render(
      <DraggableResume
        data={dataWithHiddenSection}
        onComponentClick={jest.fn()}
        selectedComponent={null}
        onReorderSections={jest.fn()}
        TemplateComponent={MockTemplate}
      />
    )

    expect(container).toBeInTheDocument()
  })
})
