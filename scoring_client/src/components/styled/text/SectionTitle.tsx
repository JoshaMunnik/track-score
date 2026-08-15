import type {PropsWithChildren} from "react";
import styles from './SectionTitle.module.css';

export function SectionTitle({children}: PropsWithChildren) {
  return (
    <h3 className={styles.title}>{children}</h3>
  )
}