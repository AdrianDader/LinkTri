

interface ClipboardCopyButtonProps {
  text: string;               // Lo que se va a copiar
  onCopied?: () => void;      // Opcional: callback después de copiar
  icon?: React.ReactNode;     // Opcional: icono personalizado (si no quieres usar uno por defecto)
}

const ClipboardCopyButton: React.FC<ClipboardCopyButtonProps> = ({
  text,
  onCopied,
  icon
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      if (onCopied) onCopied();
      else;
    } catch (err) {
      console.error("Error al copiar al portapapeles:", err);
    }
  };

  return (
    <span
      onClick={handleCopy}
      style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}
      title="Copiar"
    >
      {icon || <span className="material-symbols-outlined">content_copy</span>}
    </span>
  );
};

export default ClipboardCopyButton;
