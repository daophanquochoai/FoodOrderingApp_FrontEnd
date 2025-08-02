import { TextStyleKit } from '@tiptap/extension-text-style'
import { TextAlign } from '@tiptap/extension-text-align'
import type { Editor } from '@tiptap/react'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import './styles.css'
import { useEffect } from 'react'
import { BoldOutlined, ItalicOutlined, StrikethroughOutlined, UndoOutlined, RedoOutlined, UnderlineOutlined, UnorderedListOutlined, OrderedListOutlined, AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined, MenuOutlined } from '@ant-design/icons'

const extensions = [TextStyleKit, StarterKit, TextAlign.configure({ types: ['heading', 'paragraph'] }) ];

function MenuBar({ editor }: { editor: Editor }) {
  const editorState = useEditorState({
    editor,
    selector: ctx => {
      return {
        isBold: ctx.editor.isActive('bold') ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive('italic') ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive('strike') ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isUnderline: ctx.editor.isActive('underline') ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
        isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
        isAlignLeft: ctx.editor.isActive({ textAlign: 'left' }) ?? false,
        isAlignCenter: ctx.editor.isActive({ textAlign: 'center' }) ?? false,
        isAlignRight: ctx.editor.isActive({ textAlign: 'right' }) ?? false,
        isAlignJustify: ctx.editor.isActive({ textAlign: 'justify' }) ?? false,
        isBulletList: ctx.editor.isActive('bulletList') ?? false,
        isOrderedList: ctx.editor.isActive('orderedList') ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
      }
    },
  })

  const baseBtnClass = 'hover:bg-gray-200 px-2 py-1 rounded-md scale-150 m-4'

  return (
    <div className="">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState.canBold}
        className={`${baseBtnClass} ${editorState.isBold ? 'is-active' : ''}`}
        type="button"
      >
        <BoldOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editorState.canItalic}
        className={`${baseBtnClass} ${editorState.isItalic ? 'is-active' : ''}`}
        type="button"
      >
        <ItalicOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editorState.canStrike}
        className={`${baseBtnClass} ${editorState.isStrike ? 'is-active' : ''}`}
        type="button"
      >
        <StrikethroughOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editorState.canUnderline}
        className={`${baseBtnClass} ${editorState.isUnderline ? 'is-active' : ''}`}
        type="button"
      >
        <UnderlineOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${baseBtnClass} ${editorState.isHeading1 ? 'is-active' : ''}`}
        type="button"
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${baseBtnClass} ${editorState.isHeading2 ? 'is-active' : ''}`}
        type="button"
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${baseBtnClass} ${editorState.isHeading3 ? 'is-active' : ''}`}
        type="button"
      >
        H3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${baseBtnClass} ${editorState.isBulletList ? 'is-active' : ''}`}
        type="button"
      >
        <UnorderedListOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${baseBtnClass} ${editorState.isOrderedList ? 'is-active' : ''}`}
        type="button"
      >
        <OrderedListOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`${baseBtnClass} ${editorState.isAlignLeft ? 'is-active' : ''}`}
        type="button"
      >
        <AlignLeftOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`${baseBtnClass} ${editorState.isAlignCenter ? 'is-active' : ''}`}
        type="button"
      >
        <AlignCenterOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`${baseBtnClass} ${editorState.isAlignRight ? 'is-active' : ''}`}
        type="button"
      >
        <AlignRightOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`${baseBtnClass} ${editorState.isAlignJustify ? 'is-active' : ''}`}
        type="button"
      >
        <MenuOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editorState.canUndo}
        className={baseBtnClass}
        type="button"
      >
        <UndoOutlined />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editorState.canRedo}
        className={baseBtnClass}
        type="button"
      >
        <RedoOutlined />
      </button>
    </div>
  )
}

// Nội dung mẫu
const initialContent = `
<h1>Taste Trail Restaurant</h1>
<h2>Locations</h2>
<ul>
  <li><strong>Main Branch</strong>: 123 Nguyễn Huệ, Quận 1, TP.HCM
    <ul>
      <li>Phone: (028) 3822-1234</li>
      <li>Hours: 7:00 AM - 10:00 PM daily</li>
    </ul>
  </li>
</ul>
<h2>Services</h2>
<ul>
  <li>Dine-in</li>
  <li>Takeaway</li>
  <li>Delivery</li>
  <li>Private events</li>
</ul>
<h2>Restaurant Highlights</h2>
<ul>
  <li>Established in 2015</li>
  <li>Specializes in fusion Vietnamese cuisine</li>
  <li>Chef-driven menu changes seasonally</li>
</ul>
`;

interface RTEProps {
  value?: string;
  onChange?: (html: string) => void;
}

const isContentEmpty = (html: string): boolean => {
  // Loại bỏ tất cả khoảng trắng và các thẻ HTML phổ biến còn lại khi xóa nội dung
  const cleaned = html
    .replace(/<p><\/p>/g, '')
    .replace(/<p>\s*<\/p>/g, '')
    .replace(/<p>&nbsp;<\/p>/g, '')
    .replace(/<p><br><\/p>/g, '')
    .replace(/<p><br\/><\/p>/g, '')
    .replace(/<p>\s*<br\/?>\s*<\/p>/g, '')
    .replace(/\s+/g, '');
  
  return cleaned.length === 0;
};

const RTE = ({ value, onChange }: RTEProps) => {
  const editor = useEditor({
    extensions,
    content: value || initialContent,
    onUpdate: ({ editor }) => {
      if (onChange) {
        const htmlContent = editor.getHTML();
        onChange(isContentEmpty(htmlContent) ? '' : htmlContent);
      }
    }
  });

  useEffect(() => {
    if (editor && value && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div>
      {editor && <MenuBar editor={editor} />}
      <div className='p-3 border'>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default RTE;