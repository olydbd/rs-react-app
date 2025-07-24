import { useState } from 'react';
import Main from './pages/Main/Main';
import Header from './components/Header/Header';

export default function App() {
  const [error, setError] = useState(false);

  if (error) {
    throw new Error('Test Error for App');
  }

  return (
    <>
      <Header />
      <Main />
      <div className="flex justify-center p-10">
        <button
          className="cursor-pointer rounded bg-[#BFDE42] px-6 py-2 text-xs font-medium text-white uppercase hover:bg-[#abc449]"
          onClick={() => setError(true)}
        >
          Error App
        </button>
      </div>
    </>
  );
}
