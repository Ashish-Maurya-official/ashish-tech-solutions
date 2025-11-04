import { useEffect } from 'react';

export default function useKeyboardShortcuts({
  onUndo,
  onRedo,
  onDelete,
  onDuplicate,
  onSave,
  onCopy,
  onPaste,
  onSelectAll,
  onNudge,
  onBringForward,
  onSendBackward,
  onGroup,
  onUngroup,
  enabled = true
}) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing in input fields
      const isTyping = ['INPUT', 'TEXTAREA'].includes(e.target.tagName) || 
                       e.target.isContentEditable;
      
      if (isTyping) return;

      const ctrl = e.ctrlKey || e.metaKey; // Support both Ctrl (Windows) and Cmd (Mac)
      const shift = e.shiftKey;

      // Ctrl+Z - Undo
      if (ctrl && e.key === 'z' && !shift) {
        e.preventDefault();
        onUndo?.();
        return;
      }

      // Ctrl+Y or Ctrl+Shift+Z - Redo
      if ((ctrl && e.key === 'y') || (ctrl && shift && e.key === 'z')) {
        e.preventDefault();
        onRedo?.();
        return;
      }

      // Delete or Backspace - Delete selected elements
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        onDelete?.();
        return;
      }

      // Ctrl+D - Duplicate
      if (ctrl && e.key === 'd') {
        e.preventDefault();
        onDuplicate?.();
        return;
      }

      // Ctrl+S - Save
      if (ctrl && e.key === 's') {
        e.preventDefault();
        onSave?.();
        return;
      }

      // Ctrl+C - Copy
      if (ctrl && e.key === 'c') {
        e.preventDefault();
        onCopy?.();
        return;
      }

      // Ctrl+V - Paste
      if (ctrl && e.key === 'v') {
        e.preventDefault();
        onPaste?.();
        return;
      }

      // Ctrl+A - Select All
      if (ctrl && e.key === 'a') {
        e.preventDefault();
        onSelectAll?.();
        return;
      }

      // Ctrl+] - Bring Forward
      if (ctrl && e.key === ']') {
        e.preventDefault();
        onBringForward?.();
        return;
      }

      // Ctrl+[ - Send Backward
      if (ctrl && e.key === '[') {
        e.preventDefault();
        onSendBackward?.();
        return;
      }

      // Ctrl+G - Group
      if (ctrl && e.key === 'g' && !shift) {
        e.preventDefault();
        onGroup?.();
        return;
      }

      // Ctrl+Shift+G - Ungroup
      if (ctrl && shift && e.key === 'G') {
        e.preventDefault();
        onUngroup?.();
        return;
      }

      // Arrow keys - Nudge elements
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const distance = shift ? 10 : 1; // Shift for larger nudge
        const direction = {
          ArrowUp: { x: 0, y: -distance },
          ArrowDown: { x: 0, y: distance },
          ArrowLeft: { x: -distance, y: 0 },
          ArrowRight: { x: distance, y: 0 }
        }[e.key];
        
        onNudge?.(direction);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    enabled,
    onUndo,
    onRedo,
    onDelete,
    onDuplicate,
    onSave,
    onCopy,
    onPaste,
    onSelectAll,
    onNudge,
    onBringForward,
    onSendBackward,
    onGroup,
    onUngroup
  ]);
}
