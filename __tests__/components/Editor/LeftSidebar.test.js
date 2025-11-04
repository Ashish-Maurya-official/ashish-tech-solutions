import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import LeftSidebar from '@/components/Editor/LeftSidebar'

describe('LeftSidebar Component', () => {
  it('renders left sidebar without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <LeftSidebar />
      </Provider>
    )
    expect(container).toBeInTheDocument()
  })
})
