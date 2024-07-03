/* eslint-disable jsx-a11y/media-has-caption */
import styles from './styles.module.css';
import audio from '../../audio/Uirapuru.mp3'

export function Header() {
  return (
    <div className={styles.header}>
      <h1>Amazonas</h1>
      <div className={styles.containerAudio}>
        <audio controls autoPlay loop>
          <source src={audio} type='audio/mpeg' />
        </audio>
      </div>
    </div>
  )
}
