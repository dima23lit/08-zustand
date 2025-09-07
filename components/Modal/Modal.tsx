'use client'

import css from "@/components/Modal/Modal.module.css"
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface ModalProps {
    children: React.ReactNode,
    onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
    const handleBackDrop = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose()
            }
        }
        window.addEventListener("keydown", handleEsc)
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handleEsc)
            document.body.style.overflow = "";
        }
    }, [onClose])
    
    return createPortal (
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackDrop}>
            <div className={css.modal}>
                {children}
            </div>
        </div>,
        document.body
    )
}