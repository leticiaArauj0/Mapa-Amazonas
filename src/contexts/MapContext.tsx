import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { municipiosData } from '../data';

interface MapContextProps {
    selectedMunicipio: string,
    setSelectedMunicipio: React.Dispatch<React.SetStateAction<string>>

    won: boolean
    setWon: React.Dispatch<React.SetStateAction<boolean>> 
    
    index: number
    setIndex: React.Dispatch<React.SetStateAction<number>> 

    municipios: string[]
    setMunicipios: React.Dispatch<React.SetStateAction<string[]>> 
}

interface MapProviderProps {
    children: ReactNode
}

export const MapContext = createContext({} as MapContextProps)

export const MapProvider = ({ children }: MapProviderProps) => {
  const [selectedMunicipio, setSelectedMunicipio] = useState('');
  const [won, setWon] = useState(false)
  const [municipios, setMunicipios] = useState(municipiosData)
  const [index, setIndex] = useState(Math.floor(Math.random() * 62))

  useEffect(() => {
    if (municipios.length >= 0 && won) {
      const municipioUpdate = municipios.filter((_, idx) => idx !== index);
      const municioAmount = municipioUpdate.length;
      const i = Math.floor(Math.random() * municioAmount);
      setMunicipios(municipioUpdate);
      setIndex(i);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [won]);
  
  return (
    <MapContext.Provider value={{ selectedMunicipio, setSelectedMunicipio, won, setWon, index, setIndex, municipios, setMunicipios }}>
      {children}
    </MapContext.Provider>
  )
}

export const useMap = () => useContext(MapContext)
