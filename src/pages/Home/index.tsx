import { useContext, useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { Map } from '../../components/Map/index';
import { MapContext } from '../../contexts/MapContext';
import styles from './styles.module.css';

export function Home() {
  const [time, setTime] = useState(0);
  const { index, municipios } = useContext(MapContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime < 3599) {
            return prevTime + 1;
          } else {
            setIsActive(false);
            clearInterval(interval);
            return prevTime;
          }
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (62 - municipios.length === 1) {
      setIsActive(true);
    } else if (62 - municipios.length === 62) {
      setIsActive(false);
      setTime(0);
    }

    return () => clearInterval(interval);
  }, [isActive, municipios]);

  const formatTime = (time: number) => {
    const minutes = String(Math.floor(time / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.containerMap}>
        <div className={styles.containerInfoGame}>
          <div>
            <strong>Pontuação: </strong>
            <span>{62 - municipios.length} / 62</span>
          </div>
          <div>
            <strong>Time: </strong>
            <span>{formatTime(time)}</span>
          </div>
        </div>

        <Map municipioQuestion={municipios[index]} />

        {municipios.length !== 0 ? (
          <div className={styles.municipio}>
            <span>{municipios[index]}</span>
          </div>
        ) : (
          <div className={styles.municipio}>
            <span>GANHOU!</span>
          </div>
        )}
      </div>
    </div>
  );
}
