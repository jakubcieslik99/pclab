import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main className="flex-1">
      <div className="flex flex-col items-center justify-center h-full content">
        <div className="flex flex-col px-[22px] pt-4 pb-[18px] mb-16 border rounded-xl border-white/[0.25] bg-white/[0.05]">
          <div className="flex items-center gap-4 font-semibold">
            <h1 className="text-6xl">404</h1>
            <div className="mt-[4px] text-4xl">:(</div>
          </div>
          <h2 className="mb-[3px] text-2xl font-bold">Tutaj nic nie ma!</h2>
          <Link to="/" className="underline">
            Wróć na stronę główną
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFound
