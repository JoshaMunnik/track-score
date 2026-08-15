import {NormalText, type NormalTextProps} from "./NormalText.tsx";
import {resolveClassName} from "../styledHelpers.ts";
import styles from './LargeText.module.css';

export function LargeText({className, ...other}: NormalTextProps) {
  return (
    <NormalText className={resolveClassName(className) + ' ' + styles['text-large']} {...other} />
  );
}