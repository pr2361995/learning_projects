'use client';

function Error({error}) {
  return (
    <main className="error">
      <h1>Error Occured!</h1>
      <p>Faile to fetch the meals data. Please try again later.</p>
    </main>
  )
}

export default Error