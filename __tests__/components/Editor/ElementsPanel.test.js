import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import ElementsPanel from '@/components/Editor/ElementsPanel'

describe('ElementsPanel Component', () => {
  it('renders elements panel without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <ElementsPanel />
      </Provider>
    )
    expect(container).toBeInTheDocument()
  })
})
