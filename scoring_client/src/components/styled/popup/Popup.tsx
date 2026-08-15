// region imports

import styles from './Popup.module.css';
import {type PropsWithChildren, useEffect, useRef} from "react";

// endregion

// region exports

export type PopupProps = Readonly<PropsWithChildren<{
  /**
   * This action is called when the dialog has been closed. A dialog can be closed by either
   * clicking the backdrop (outside the dialog box) or by pressing the ESC key.
   */
  onClose: () => void;

  /**
   * Set to `true` to show the dialog.
   */
  open: boolean;
}>>;

/**
 * {@link Popup} uses a dialog tag to display itself. The dialog is shown via a `showModal` call.
 */
export function Popup({open, onClose, children}: PopupProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(
    () => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      if (open && !dialog.open) {
        dialog.showModal(); // modal popup
      } else if (!open && dialog.open) {
        dialog.close();
      }
    },
    [open]
  );

  useEffect(
    () => {
      const dialog = dialogRef.current;
      if (!dialog) return;

      const handleCancel = (event: Event) => {
        // ESC key triggers "cancel" event
        event.preventDefault(); // keep controlled behavior in React state
        onClose();
      };

      const handleClick = (event: MouseEvent) => {
        // Close when clicking backdrop (outside the dialog box)
        const rect = dialog.getBoundingClientRect();
        const isInDialog =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;
        if (!isInDialog) {
          onClose();
        }
      };

      dialog.addEventListener("cancel", handleCancel);
      dialog.addEventListener("click", handleClick);

      return () => {
        dialog.removeEventListener("cancel", handleCancel);
        dialog.removeEventListener("click", handleClick);
      };
    },
    [onClose]
  );

  return (
    <dialog ref={dialogRef} className={styles['popup-dialog']} onClose={onClose}>
      {children}
    </dialog>
  );
}

// endregion