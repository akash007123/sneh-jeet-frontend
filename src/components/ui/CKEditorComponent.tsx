import { useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface CKEditorComponentProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CKEditorComponent = ({ value, onChange, placeholder }: CKEditorComponentProps) => {
  const editorRef = useRef<CKEditor<ClassicEditor> | null>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.editor) {
      // Update editor content when value prop changes externally
      const editor = editorRef.current.editor;
      if (editor.getData() !== value) {
        editor.setData(value);
      }
    }
  }, [value]);

  return (
    <CKEditor
      ref={editorRef}
      editor={ClassicEditor}
      data={value}
      onChange={(event: unknown, editor: ClassicEditor) => {
        const data = editor.getData();
        onChange(data);
      }}
      config={{
        placeholder: placeholder || 'Start writing...',
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'underline',
          'strikethrough',
          '|',
          'bulletedList',
          'numberedList',
          '|',
          'link',
          'blockquote',
          'insertTable',
          '|',
          'undo',
          'redo'
        ],
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
        }
      }}
    />
  );
};

export default CKEditorComponent;