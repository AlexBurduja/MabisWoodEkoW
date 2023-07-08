import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import DOMPurify from 'dompurify';

const DynamicEditor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  { ssr: false }
);

function BlogPageComponent() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleSave = async () => {
    const html = convertContentToHTML(editorState.getCurrentContent());
    const modifiedHTML = html.replace(/<p><\/p>/g, '<br>');
  
    // Upload the image file to Firebase Storage
    const storage = getStorage();
    const imageRef = ref(storage, `blog-images/${selectedImage.name}`);
    await uploadBytes(imageRef, selectedImage);
  
    const imageURL = await getDownloadURL(imageRef);
  
    const body = {
      text: modifiedHTML,
      imageURL: imageURL 
    };
  
    const blogRef = collection(db, 'blog');
    await addDoc(blogRef, body);
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
    const modifiedHTML = html.replace(/<p><\/p>/g, '<br>');
    
    setPreview(modifiedHTML)
  }

  const [title, setTitle] = useState('')
  const [selectedImage, setSelectedImage] = useState([])

  console.log(selectedImage)

  return (
    <div>

    <div className="deliveryAddress_inputs">
      <div className='deliveryAddress_inputs__input' >
        <input type="email" required="required" value={title} onChange={(event) => setTitle(event.target.value)}></input>
        <span>Titlu</span>
      </div>
     </div>

     {/* <input type='file' onChange={(event) => setSelectedImage(event.target.files)}/> */}

<div className='fileUploadContainerWrapper'>
     <div className="fileUploadContainer">
              <input
                type="file" onChange={(event) => setSelectedImage(event.target.files)} accept="image/*, .pdf"
              />
          
              
              <label  onClick={() => handleUpload('ci')} 
              className={selectedImage.length > 0 ? 'uploadButton uploadButtonActive': 'uploadButton'}
              id='inputFileUploadBtn'>
                {selectedImage ? 'Upload!' : ''} 
              </label>

              <label onClick={() => setSelectedImage([])} className={selectedImage.length > 0 ? 'uploadXButton uploadXButtonActive' : 'uploadXButton'} id='inputFileXBtn'>
                {selectedImage ? 'X' : ''}
              </label>

      </div>
</div>
        
      <DynamicEditor
        editorState={editorState}
        toolbarStyle={{backgroundColor: '#f2f2f2'}}
        
        toolbar={{

            options: ['inline', 'blockType', 'list', 'emoji', 'history',],

            inline: { options: ['bold', 'italic', 'underline'] },
            blockType: { options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'] }
          }}
        onEditorStateChange={handleEditorChange}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={previewWriting}>Preview</button>

      {/* {blogs.map((obj,index) =>{
          return(
          <div key={index}>
            <HtmlRenderer htmlString={obj.text} />
            
          </div>
          )
        })} */}

        {preview && (
            <HtmlRenderer htmlString={preview} />
        )}
    
    </div>
  );
}

export default BlogPageComponent;
