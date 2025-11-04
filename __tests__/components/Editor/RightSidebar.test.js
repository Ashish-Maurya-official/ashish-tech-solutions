import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import RightSidebar from '@/components/Editor/RightSidebar'

describe('RightSidebar Component', () => {
  it('renders right sidebar without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <RightSidebar />
      </Provider>
    )
    expect(container).toBeInTheDocument()
  })
})
