import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Registrations } from './pages/Registrations';
import { Events } from './pages/Events';
import { EventDetails } from './pages/EventDetails';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-800">
        <Navbar />
        <main className="ml-64 p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registrations" element={<Registrations />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
