import styles from './PopupWithTitle.module.css';
import {IoClose} from "react-icons/io5";
import {Popup, type PopupProps} from "./Popup.tsx";

type PopupWithTitleProps = PopupProps & {
  title: string;
}

/**
 * {@link PopupWithTitle} shows a popup with a title, close button and scrollable content area.
 */
export function PopupWithTitle({title, onClose, children, ...props}: PopupWithTitleProps) {
  return (
    <Popup {...props} onClose={onClose}>
      <div className={styles['container']}>
        <h2 className={styles['title']}>{title}</h2>
        <button className={styles['close']} onClick={onClose}>
          <IoClose/>
        </button>
        <div className={styles['content']}>{children}</div>
      </div>
    </Popup>
  );
}
