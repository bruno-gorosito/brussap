import { XIcon } from "lucide-react";
import { ReactNode, useState, forwardRef, useImperativeHandle } from "react";

export interface ModalHandles {
  abrirModal: () => void;
  cerrarModal: () => void;
}

interface ModalProps {
  children: ReactNode;       // Contenido del modal
  title?: string;            // Título opcional
  footer?: ReactNode;        // Footer opcional
  className?: string;        // Clases adicionales para el contenedor
  bodyClass?: string;        // Clases adicionales para el body
}

export const Modal = forwardRef<ModalHandles, ModalProps>(
  ({ children, title, footer, className, bodyClass }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    // Exponer métodos al componente padre
    useImperativeHandle(ref, () => ({
      abrirModal: () => setIsOpen(true),
      cerrarModal: () => setIsOpen(false),
    }));

    if (!isOpen) return null;

    /* const handleClickOutOfModal = (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        setIsOpen(false);
      }
    } */


    return (
      <div className="contenedor-modal">
        <div className={`${className || ""}`}>
          <div className="modal">
            {/* Header */}
            {title && (
              <div className="header-modal">
                <h3 className="">{title}</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn aspect-square !rounded-full"
                >
                  <XIcon className="size-5" />
                </button>
              </div>
            )}

            {/* Body */}
            <div className={`p-4 ${bodyClass || ""}`}>
              {children}
            </div>

            {/* Footer */}
            {footer && (
              <div className="footer">{footer}</div>
            )}

          </div>
        </div>
      </div>
    );
  }
);

Modal.displayName = "Modal";
