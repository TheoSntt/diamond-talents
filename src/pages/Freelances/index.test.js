import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { render, waitFor, screen } from '@testing-library/react'
import { ThemeProvider } from '../../utils/context'

import Freelances from './'

const freelancersMockedData = [
  {
    name: 'Harry Potter',
    job: 'Magicien frontend',
    picture: '',
  },
  {
    name: 'Hermione Granger',
    job: 'Magicienne fullstack',
    picture: '',
  },
]

const server = setupServer(
  // On précise ici l'url qu'il faudra "intercepter"
  http.get('http://localhost:8000/freelances', () => {
    // Là on va pouvoir passer les datas mockées dans ce qui est retourné en json
    return HttpResponse.json({ freelancersList: freelancersMockedData })
  }),
)

// Active la simulation d'API avant les tests depuis server
beforeAll(() => server.listen())
// Réinitialise tout ce qu'on aurait pu ajouter en termes de durée pour nos tests avant chaque test
afterEach(() => server.resetHandlers())
// Ferme la simulation d'API une fois que les tests sont finis
afterAll(() => server.close())

it('Should display freelancers names', async () => {
  render(
    <ThemeProvider>
      <Freelances />
    </ThemeProvider>,
  )
  expect(screen.getByTestId('loader')).toBeTruthy()
  await waitFor(() => {
    expect(screen.getByText('Harry Potter')).toBeTruthy()
    expect(screen.getByText('Hermione Granger')).toBeTruthy()
  })
})