import ClientDemo from "@/components/ClientDemo";
import DataFetchingDemo from "@/components/DataFetchingDemo";
import ErrorBoundary from "@/components/ErrorBoundary";
import RSCDemo from "@/components/RSCDemo";
import fs from 'node:fs/promises';
import { Suspense } from "react";


export default async function Home() {
  const usersPromise = await new Promise((resolve) => 
    setTimeout(async () => {
      const data = await fs.readFile('dummy-db.json', 'utf-8');
      const users = JSON.parse(data);
      resolve(users);
    },2000)
  )

  return (
    <main>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <Suspense fallback={<p>Loading data...!</p>}>
          <DataFetchingDemo usersPromise={usersPromise}/>
        </Suspense>
      </ErrorBoundary>
      <ClientDemo>
        <RSCDemo/>
      </ClientDemo>
      <RSCDemo/>  
    </main>
  );
}
