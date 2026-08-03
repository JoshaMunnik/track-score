// region imports

import styles from './CardButton.module.css';
import {SectionTitle} from "../text/SectionTitle.tsx";
import {NormalText} from "../text/NormalText.tsx";
import {Button} from "./Button.tsx";
import {ButtonType} from "../../../types/enums/ui/ButtonType.ts";

// endregion

// region local types

type CardButtonProps = Readonly<{
  /**
   * Image to show at the top
   */
  image: string;

  /**
   * Title to show below the image
   */
  title: string;

  /**
   * Description to show below the title
   */
  description: string;

  /**
   * Path to navigate to when the user clicks the button
   */
  to?: string;

  /**
   * Callback that is called when the user clicks the button
   */
  onClick?: () => void;
}>;

// endregion

// region exports

/**
 * This component renders a big button with an image at the top, title and description below it.
 */
export function CardButton({image, title, description, to, onClick}: CardButtonProps) {
  return (
    <Button
      type={ButtonType.Content}
      to={to}
      onClick={onClick}
      className={styles['card-button']}
    >
      <img src={image} alt={title} className={styles['card-button--image']} />
      <div className={styles['card-button--content']}>
        <SectionTitle>{title}</SectionTitle>
        <NormalText>{description}</NormalText>
      </div>
    </Button>
  )
}

// endregion