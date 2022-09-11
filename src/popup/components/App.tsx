import { useEffect, useState } from 'react';
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initial mount logic
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const appBody = (
    isLoading ? <h3>Loading...</h3>
    : (
      <main></main>
    )
  );

  return (<>
    <h2>{/* TODO? EXTENSION_NAME_HERE */}</h2>
    {appBody}
  </>);
}