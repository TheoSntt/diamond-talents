import { MemoryRouter } from 'react-router-dom'
import { screen, render } from '@testing-library/react'
import Home from './'
import { ThemeProvider } from '../../utils/context'

describe('The Home component', () => {
  it('should render title', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Home />
        </ThemeProvider>
      </MemoryRouter>,
    )
    // screen.debug()

    // expect(
    //   screen.getByText(
    //     'Repérez vos besoins, on s’occupe du reste, avec les meilleurs talents',
    //   ),
    // ).toBeTruthy()

    expect(
      screen.getByRole('heading', {
        level: 2,
        text: 'Repérez vos besoins, on s’occupe du reste, avec les meilleurs talents',
      }),
    ).toBeTruthy()
  })
})
