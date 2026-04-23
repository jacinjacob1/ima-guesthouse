import { useState } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import Rooms from './components/Rooms';
import Gallery from './components/Gallery';
import Booking from './components/Booking';
import Contact from './components/Contact';

export default function App() {
  const [page, setPage] = useState('Home');

  const handleSetPage = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pages = { Home, Rooms, Gallery, Booking, Contact };
  const Page = pages[page] || Home;

  return (
    <>
      <Nav page={page} setPage={handleSetPage} />
      <Page setPage={handleSetPage} />
    </>
  );
}
