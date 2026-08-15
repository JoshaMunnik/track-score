import styles from './NormalText.module.css';
import type {PropsWithChildren} from "react";
import {NormalText} from "./NormalText.tsx";

type ParagraphProps = Readonly<PropsWithChildren>;

export function Paragraph({children}: ParagraphProps) {
  return <NormalText className={styles['paragraph']}>{children}</NormalText>;
}