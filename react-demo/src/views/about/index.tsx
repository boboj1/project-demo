import { Outlet, useLocation, useParams, useSearchParams } from 'react-router'

export default function About() {
  const location = useLocation()
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <div>
      <h1>About</h1>
      <button onClick={() => setSearchParams({ id: '456' })}>改变id</button>
    </div>
  )
}
