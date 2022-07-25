import Hero from '../components/hero/Hero'

const HomeScreen = () => {
  return (
    <main className="flex flex-col flex-1">
      <Hero />

      <div className="content">
        <div>Content</div>
      </div>
    </main>
  )
}

export default HomeScreen
