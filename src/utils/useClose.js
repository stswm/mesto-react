import {useEffect} from 'react'

export default function useClose(isOpen, handleClose) {
  useEffect(() => {
    if (!isOpen) return;
    
    function handleESC(e) {
      if (e.key === "Escape") {
        handleClose()
      }
    }

    document.addEventListener("keydown", handleESC);

    return () => document.removeEventListener("keydown", handleESC);
  }, [isOpen]);
} 