import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import DOMPurify from 'dompurify';
import Image from 'next/image';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const DynamicEditor = dynamic(
  () => import('react-draft-wysiwyg').then((module) => module.Editor),
  { ssr: false }
);

function BlogCreatePageComponent() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
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
  const [autor, setAutor] = useState('')
  const [selectedImage, setSelectedImage] = useState([])
  const [imagePreview, setImagePreview] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage([file]);


    const reader = new FileReader();

    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };

    reader.readAsDataURL(file);
  };

  const date = new Date()
  const blogPostDate = date.toLocaleString('en-US', {day:'2-digit'})
  const blogPostMonth = date.toLocaleString('en-US', {month: 'long'})


  const handleSave = async () => {
    const html = convertContentToHTML(editorState.getCurrentContent());
    const modifiedHTML = html.replace(/<p><\/p>/g, '<br>');
  
  
    const storage = getStorage();
    const imageRef = ref(storage, `blog-images/${selectedImage[0].name}`);
    await uploadBytes(imageRef, selectedImage[0]);
  
    const imageURL = await getDownloadURL(imageRef);
    console.log(imageURL)
  
    const body = {
      titlu: title,
      autor: autor,
      text: modifiedHTML,
      imageURL: imageURL,
      postDay: blogPostDate,
      postMonth: blogPostMonth
    };
  
    const blogRef = collection(db, 'blog');
    await addDoc(blogRef, body);
  };
  return (
    <div>

      <div className='blogCreationForm'>

    <div className="deliveryAddress_inputs">
      <div className='deliveryAddress_inputs__input' >
        <input type="text" required="required" value={title} onChange={(event) => setTitle(event.target.value)}></input>
        <span>Titlu</span>
      </div>

      <div className='deliveryAddress_inputs__input' >
        <input type="text" required="required" value={autor} onChange={(event) => setAutor(event.target.value)}></input>
        <span>Autor</span>
      </div>
     </div>

     <div className="fileUploadContainer">
      <p style={{textAlign: 'center'}}>Poza Blogului</p>  
              <input
                id="fileInput"
                type="file" onChange={handleFileChange} accept="image/*"
              />      
{/*               
              <label onClick={() => handleUpload('ci')} 
              className={selectedImage.length > 0 ? 'uploadButton uploadButtonActive': 'uploadButton'}
              id='inputFileUploadBtn'>
                {selectedImage ? 'Upload!' : ''} 
              </label>

              <label onClick={handleClearFile} className={selectedImage.length > 0 ? 'uploadXButton uploadXButtonActive' : 'uploadXButton'} id='inputFileXBtn'>
                {selectedImage ? 'X' : ''}
              </label> */}

      </div>      

      {imagePreview && (
        <Image src={imagePreview} alt="Preview" height={200} width={200} />
      )}

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

      <div>
        <button onClick={handleSave}>Save</button>
        <button onClick={previewWriting}>Preview</button>
      </div>

        {preview && (
          <div className='previewDiv'>
            <h1 style={{textAlign: 'center'}}>{title}</h1>
            <p style={{textAlign: 'center'}}>Postat de <span style={{ fontSize: '18px', fontWeight: 'bold'}}>{autor}</span></p>

            <div className='imageDivBlog'>
            
            <div style={{ width: '400px', height: '400px', position: 'relative' }}>
              <Image src={imagePreview} alt="Preview" fill="fill"  style={{ objectFit: 'cover', objectPosition: 'center' }} />
            </div>

            <div className='datesBlog'>
              <div>{blogPostDate}</div>
              <div>{blogPostMonth}</div>
            </div>

              <div className='htmlRenderer'>
              <HtmlRenderer htmlString={preview} />
              </div>
            </div>
            
          </div>
        )}
        </div>
    
    </div>
  );
}

export default BlogCreatePageComponent;
