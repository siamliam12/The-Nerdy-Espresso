"use client"
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
//   Image as ImageIcon,
  Code,
  Quote,
  ListOrdered,
  List
} from 'lucide-react'

interface BlogEditorProps {
    initialContent?: string;
    onSave?: (content: string) => void;
  }

const Editor = ({ initialContent = '', onSave }: BlogEditorProps) => {
  const [isSaving, setIsSaving] = useState(false)
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full rounded-lg',
        },
      }),
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-lg focus:outline-none max-w-3xl mx-auto p-4 min-h-[70vh]',
      },
    },
    onUpdate: ({ editor }) => {
      onSave(editor.getHTML())
    },
    immediatelyRender: false // Add this line
  })

  const handleSave = async () => {
    if (!editor || !onSave) return
    
    setIsSaving(true)
    try {
      await onSave(editor.getHTML())
    } catch (error) {
      console.error('Error saving content:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (!editor) return null

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Floating Format Menu */}
      {editor && (
        <BubbleMenu 
          editor={editor} 
          tippyOptions={{ duration: 100 }}
          className="bg-white shadow-lg rounded-lg px-2 py-1 flex gap-1 border"
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'bg-gray-200' : ''}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'bg-gray-200' : ''}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}
          >
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}
          >
            <Heading2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'bg-gray-200' : ''}
          >
            <Code className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'bg-gray-200' : ''}
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
        </BubbleMenu>
      )}

      {/* Top Toolbar */}
      <div className="sticky top-0 z-10 bg-white border-b mb-4 p-2">
        <div className="flex gap-2">
          
          <Button 
            variant="default"
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Draft'}
          </Button>
        </div>
      </div>
      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  )
}

export default Editor