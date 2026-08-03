import {NormalText, type NormalTextProps} from "./NormalText.tsx";
import {resolveClassName} from "../styledHelpers.ts";
import styles from './SmallText.module.css';

export function SmallText({className, ...other}: NormalTextProps) {
  return (
    <NormalText className={resolveClassName(className) + ' ' + styles['text-small']} {...other} />
  );
}