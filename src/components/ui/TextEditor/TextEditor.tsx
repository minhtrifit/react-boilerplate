import { useEffect, useMemo, useRef, useState } from 'react';
import JoditEditor, { Jodit } from 'jodit-react';

import './styles.scss';

interface TextEditorProps {
  value: string;
  height?: number;
  onChange: (data: any) => void;
  placeholder?: string;
  toolbarSticky?: boolean;
  [x: string]: any;
}

const buttons = [
  'undo',
  'redo',
  '|',
  'bold',
  'strikethrough',
  'underline',
  'italic',
  '|',
  'superscript',
  'subscript',
  '|',
  'align',
  '|',
  'ul',
  'ol',
  'outdent',
  'indent',
  '|',
  // "font",
  'fontsize',
  'brush',
  'paragraph',
  '|',
  'image',
  'link',
  'table',
  '|',
  'hr',
  'eraser',
  'copyformat',
  '|',
  'fullsize',
  'selectall',
  // "print",
  // "|",
  // "source",
];

export const TextEditor = ({
  value,
  height = 350,
  onChange,
  placeholder = '',
  toolbarSticky = false,
  ...rest
}: TextEditorProps) => {
  const editor = useRef<Jodit>(null);
  const defaultValueSet = useRef<boolean>(false);
  const [defaultValue, setDefaultValue] = useState(value);

  useEffect(() => {
    if (defaultValue && editor.current && !defaultValueSet.current) {
      editor.current.setEditorValue(defaultValue);
      defaultValueSet.current = true;
    }
  }, [defaultValue]);

  const config = useMemo(
    () => ({
      readonly: false,
      height: height,
      disablePlugins: ['mobile'],
      buttons: buttons,
      addNewLine: false,
      autofocus: false,
      toolbarSticky: false,
      placeholder: placeholder || 'Start writing...',
      uploader: {
        insertImageAsBase64URI: true,
      },
    }),
    [],
  );

  return (
    <div className='reset-tw'>
      <JoditEditor
        config={config}
        value={`${defaultValue}`}
        className={toolbarSticky ? 'sticky-toolbar' : ''}
        onChange={onChange}
      />
    </div>
  );
};
