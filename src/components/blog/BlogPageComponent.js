import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import DOMPurify from 'dompurify';

// Dynamically import the Editor component only on the client-side
const DynamicEditor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  { ssr: false }
);

function BlogPageComponent() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSave = () => {
    const html = convertContentToHTML(editorState.getCurrentContent());

    console.log(html)

    const body = {
        text: html
    }

    const ref = collection(db, 'blog')

    addDoc(ref, body)
  };

  const convertContentToHTML = (contentState) => {
    return convertToHTML({
      blockToHTML: (block) => {
        if (block.type === 'header-one') {
          return <h1 />;
        }

      },
      styleToHTML: (style) => {
        if (style === 'BOLD') {
          return <strong />;
        }
        if (style === 'ITALIC') {
          return <em />;
        }
        if (style === 'UNDERLINE') {
          return <u />;
        }
      },
    })(contentState);
  };

  
//   useEffect(() => {
//     const html = convertContentToHTML(editorState.getCurrentContent());
//     console.log(html);
//   }, [editorState]);

const [blogs, setBlogs] = useState([])

useEffect(() => {
    const getBlogs = async () => {

        const ref = collection(db,'blog')
        const data = await getDocs(ref);
        setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getBlogs();
}, [])

function HtmlRenderer({ htmlString }) {
    const sanitizedHtml = DOMPurify.sanitize(htmlString);
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
  }

  const [preview,setPreview] = useState('')

  
  const previewWriting = () => {
    const html = convertContentToHTML(editorState.getCurrentContent());
    
    setPreview(html)
  }

  const html = convertContentToHTML(editorState.getCurrentContent());
  console.log(html)

  return (
    <div>
        <label>Title</label>
        <input type='text' />
        
      <DynamicEditor
        editorState={editorState}
        toolbar={{

            options: ['inline', 'blockType', 'fontSize', 'list', 'emoji', 'history',],

            inline: { options: ['bold', 'italic', 'underline'] },
            blockType: { options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'] },
            fontSize: { options: [8, 10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72] },
          }}
        onEditorStateChange={handleEditorChange}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={previewWriting}>Preview</button>

      {blogs.map((obj,index) =>{
          return(
          <div key={index}>
            <HtmlRenderer htmlString={obj.text} />
            
          </div>
          )
        })}

        {preview && (
            <HtmlRenderer htmlString={preview} />
        )}
    
    </div>
  );
}

export default BlogPageComponent;
