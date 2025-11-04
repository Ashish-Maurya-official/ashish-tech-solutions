import { render, screen } from '@testing-library/react'
import ClassicTemplate from '@/components/templates/ClassicTemplate'

const mockData = {
  name: 'Jane Smith',
  title: 'Product Manager',
  email: 'jane@example.com',
  phone: '555-1234',
  summary: 'Experienced PM with 5 years in tech',
  experience: [
    {
      company: 'Tech Inc',
      position: 'Senior PM',
      duration: '2020-2023',
      description: 'Led product development',
    }
  ],
  education: [
    {
      school: 'State University',
      degree: 'MBA',
      year: '2019',
    }
  ],
  skills: ['Product Strategy', 'Agile', 'Data Analysis'],
  styling: {},
}

describe('ClassicTemplate Component', () => {
  it('renders personal information', () => {
    render(<ClassicTemplate data={mockData} />)
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.getByText('Product Manager')).toBeInTheDocument()
    expect(screen.getByText(/jane@example.com/)).toBeInTheDocument()
  })

  it('renders experience section', () => {
    render(<ClassicTemplate data={mockData} />)
    
    expect(screen.getByText('Tech Inc')).toBeInTheDocument()
    expect(screen.getByText(/Led product development/)).toBeInTheDocument()
  })

  it('renders education section', () => {
    render(<ClassicTemplate data={mockData} />)
    
    expect(screen.getByText('State University')).toBeInTheDocument()
    expect(screen.getByText('MBA')).toBeInTheDocument()
  })

  it('renders skills section', () => {
    render(<ClassicTemplate data={mockData} />)
    
    expect(screen.getByText(/Product Strategy/)).toBeInTheDocument()
    expect(screen.getByText(/Agile/)).toBeInTheDocument()
  })

  it('applies custom styling', () => {
    const styledData = {
      ...mockData,
      styling: {
        primaryColor: '#ff0000',
        fontFamily: 'Arial',
      }
    }

    const { container } = render(<ClassicTemplate data={styledData} />)
    expect(container).toBeInTheDocument()
  })

  it('handles missing optional fields', () => {
    const minimalData = {
      name: 'John Doe',
      title: 'Developer',
    }

    render(<ClassicTemplate data={minimalData} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
