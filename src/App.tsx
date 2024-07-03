import { Home } from "./pages/Home";
import { MapProvider } from './contexts/MapContext'

export function App() {
  return (
    <MapProvider>
      <Home />
    </MapProvider>  
  )
}
