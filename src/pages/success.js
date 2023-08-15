import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import emailjs from "emailjs-com"
import {FiCheckCircle} from 'react-icons/fi'
import { collection, getDocs, writeBatch } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { FirebaseAuthContext } from '../../FirebaseAuthContext'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-toastify'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { Image } from 'image-js'

const hi = async (email, firstName, lastName, phoneNumber, street, streetNo, block, apartamentNo, total, pdfBytes) => {
  const base64Pdf = arrayBufferToBase64(pdfBytes);

  emailjs.send('service_eyuz8pg', 'template_xeem2dd', {
    subject: `Comanda de la ${email} (${firstName} ${lastName})`,
    metoda: `${firstName} ${lastName} a facut o plata in valoare de ${total} RON`,
    name: `Nume : ${firstName} ${lastName} ( ${email} )`,
    phone: `Telefon : <b>${phoneNumber}</b>`,
    street: `Strada :<b>${street}</b>`,
    streetNo: `Nr. :<b>${streetNo}</b>`,
    bloc: `Bloc : <b>${block}</b>`,
    apartNo: `Apartament : <b>${apartamentNo}</b>`,
    attachment: [{ name: 'invoice.pdf', type: 'application/pdf', content: base64Pdf }],
  }, 'crU6K8bQnftB81z-j');
};

function arrayBufferToBase64(arrayBuffer) {
  const binary = new Uint8Array(arrayBuffer);
  const buffer = Buffer.from(binary);
  const base64 = buffer.toString('base64');
  return base64;
}

const SuccessPage = () => {

  const { user } = useContext(FirebaseAuthContext)

  const [countdown, setCountdown] = useState(5)
  const router = useRouter()

  
  useEffect(() => {
    const email = localStorage.getItem("email");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const phoneNumber = localStorage.getItem("phoneNumber");
    const street = localStorage.getItem("street");
    const streetNo = localStorage.getItem("streetNo");
    const block = localStorage.getItem("block");
    const apartamentNo = localStorage.getItem("apartamentNo");
    const isCompanyChecked = localStorage.getItem("isCompanyChecked");
    const companyName = localStorage.getItem("companyName");
    const companyCui = localStorage.getItem("companyCui");
    const total = localStorage.getItem("total");
    
    handleGenerateInvoice();

    
    



    let intervalId;
    let timeoutId;

    const startCountdown = () => {
      
      // intervalId = setInterval(() => {
      //   setCountdown(countdown => countdown - 1);
      // }, 1000);

      // timeoutId = setTimeout(() => {
      //   router.push('/')
      // }, 5000);
    
    };

    const deleteCartUponSuccess = async () => {
      
      if(user?.uid){
        
        const userDoc = collection(db, `users/${user.uid}/cart`)
        
        const q =await getDocs(userDoc)
        
        const batch = writeBatch(db)
        q.forEach(doc => {
        batch.delete(doc.ref)
      })
      
      batch.commit()
    }
  
    if(!user?.uid){
      const clientId = sessionStorage.getItem("clientId")
  
      const userDoc = collection(db, `guestCarts/${clientId}/cart`)
      
      const q =await getDocs(userDoc)
      
      const batch = writeBatch(db)
      q.forEach(doc => {
        batch.delete(doc.ref)
      })
      
      batch.commit()
    }
  
  }

    if(!email ||!firstName || !lastName || !phoneNumber){
      // toast.error("You should not be here! Redirecting to home page.")
      // router.push('/')
      return;
    } else {
      hi(email, firstName, lastName, phoneNumber, street, streetNo, block, apartamentNo, total);

      // startCountdown()

      // setTimeout(() => {
      //   deleteCartUponSuccess();
      //   localStorage.removeItem("email")
      //   localStorage.removeItem("firstName")
      //   localStorage.removeItem("lastName")
      //   localStorage.removeItem("phoneNumber")
      //   localStorage.removeItem("street")
      //   localStorage.removeItem("streetNo")
      //   localStorage.removeItem("block")
      //   localStorage.removeItem("apartamentNo")
      //   localStorage.removeItem("total")
      //   localStorage.removeItem("companyCui")
      //   localStorage.removeItem("companyName")
      //   localStorage.removeItem("isCompanyChecked")
      //   localStorage.removeItem("total")
      // }, 4800)
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };

  }, [router, user?.uid]);

  function random5DigitNumber (){
    const min = 10000
    const max = 99999

    return Math.floor(Math.random() * (max - min + 1)) + min 
  }

  function getDate(){
    const d = new Date();
    const day = d.getDate();
    const month = d.getMonth() + 1; 
    const year = d.getFullYear();

    const formattedDate = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;

    return formattedDate;
  }

  const handleGenerateInvoice = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]);

    const cart = JSON.parse(localStorage.getItem('cart'));
    const judetSelected = localStorage.getItem('judet');
    const orasSelected =  localStorage.getItem('orase');
    const deliveryKm = localStorage.getItem('deliveryKm');
    const deliveryPrice = localStorage.getItem('deliveryPrice');
    const email = localStorage.getItem("email");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const phoneNumber = localStorage.getItem("phoneNumber");
    const street = localStorage.getItem("street");
    const streetNo = localStorage.getItem("streetNo");
    const block = localStorage.getItem("block");
    const apartamentNo = localStorage.getItem("apartamentNo");
    const isCompanyChecked = localStorage.getItem("isCompanyChecked");
    const companyName = localStorage.getItem("companyName");
    const companyCui = localStorage.getItem("companyCui");
    
    // async function compressAndOptimizeImage(imageArrayBuffer) {
    //   const image = await Image.load(imageArrayBuffer);
      
    //   // Resize the image to a smaller size while maintaining aspect ratio
    //   const resizedImage = image.resize({ width: 200 }); // Adjust the width as needed
    
    //   // Convert the resized image back to ArrayBuffer
    //   const compressedImageArrayBuffer = resizedImage.toBuffer('image/png');
    
    //   return compressedImageArrayBuffer;
    // }
    
    const response = await fetch('/api/get-image');
    const imageArrayBuffer = await response.arrayBuffer();

    // const compressedImageArrayBuffer = await compressAndOptimizeImage(imageArrayBuffer);
    // const compressedImageUint8Array = new Uint8Array(compressedImageArrayBuffer);

    const logoPng = await pdfDoc.embedPng(imageArrayBuffer);
    const logoDims = logoPng.scale(0.4);

    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const topMargin = 40;

    page.drawImage(logoPng, {
      x: page.getWidth() - logoDims.width - topMargin,
      y: page.getHeight() - logoDims.height - topMargin,
      width: logoDims.width,
      height: logoDims.height,
    });

    page.drawText(`Numar Factura: #MW${random5DigitNumber()}`, {x: page.getWidth() - logoDims.width - 50, y: page.getHeight() - logoDims.height - 60, size: 14});
    page.drawText(`Data Facturare: ${getDate()}`, {x: page.getWidth() - logoDims.width - 50, y: page.getHeight() - logoDims.height - 80, size: 14});
    
    // Add text for company name, products, prices, delivery, and subtotal
    const streetText = `Str. ${street} Nr. ${streetNo}, Bloc.${block}, Ap.${apartamentNo}, ${judetSelected}, ${orasSelected}`;
    const phone = phoneNumber;

    // Calculate the width of streetText in pixels
    const streetTextWidth = (await pdfDoc.embedFont(StandardFonts.Helvetica)).widthOfTextAtSize(streetText, 12);

    // Calculate the maximum width allowed for the streetText
    const maxStreetTextWidth = 300;

    // Calculate the Y-coordinate for the phone number text
    let phoneNumberY;

    if (streetTextWidth > maxStreetTextWidth) {
        phoneNumberY = page.getHeight() - logoDims.height - 110;
    } else {
        phoneNumberY = page.getHeight() - logoDims.height - 100;
    }

    page.drawText(`Mabis Wood Eko`, { x: topMargin, y: page.getHeight() - logoDims.height + topMargin * 2, size: 18, color: rgb(0, 0, 0), font:boldFont });
    page.drawText(`Strada Alunis Nr.190B, Comuna Bogati, Judet Arges`, { x: 40, y: 752, size: 12, color: rgb(0, 0, 0) });
    page.drawText(`www.mabiswood.ro`, { x: 40, y: 732, size: 12, color: rgb(0, 0, 0) });
    page.drawText(`+40721648424`, { x: 40, y: 712, size: 12, color: rgb(0, 0, 0) });

    page.drawText('Date facturare:', {x: 40, y: page.getHeight() - logoDims.height - 40, size: 12, color: rgb(0,0,0)})
    page.drawLine({start: {x:40, y:page.getHeight()- logoDims.height - 40 - 5}, end: {x:100 + 50, y:page.getHeight() - logoDims.height - 40 - 5}, thickness: 1, color: rgb(0,0,0)})

    page.drawText(`${firstName} ${lastName} (${email})`, {x: 40, y: page.getHeight() - logoDims.height - 60, size: 12, color: rgb(0,0,0)})
    page.drawText(streetText, { x: 40, y: page.getHeight() - logoDims.height - 80, size: 12, color: rgb(0, 0, 0), maxWidth: maxStreetTextWidth, lineHeight: 12 });
    page.drawText(phone, { x: 40, y: phoneNumberY, size: 12, color: rgb(0, 0, 0) });



  const tableHeaders = ['Produs', 'Cantitate', 'Pret/buc', 'Pret Total'];
  const headerTextSize = 12;
  const lineHeight = 20;
  const tableWidth = page.getWidth() * 0.9; // Set table width to 90% of the page width
  const startX = (page.getWidth() - tableWidth) / 2;
  let y = page.getHeight() - logoDims.height - 180; // Adjust this value based on your layout

  // Draw table header row
  let headerX = startX;
  for (const header of tableHeaders) {
    page.drawText(header, { x: headerX, y, size: headerTextSize, color: rgb(0, 0, 0) });
    headerX += tableWidth / 4; // Divide the table width by the number of columns
  }

  // Draw horizontal line under the headers
  const headerLineY = y - 5;
  page.drawLine({ start: { x: startX, y: headerLineY }, end: { x: startX + tableWidth, y: headerLineY }, thickness: 1, color: rgb(0, 0, 0) });

  y -= lineHeight;

  // Draw table rows for each cart item
    for (const item of cart) {
      const { title, quantity, price, kg } = item;
      const total = quantity * price;

      let rowX = startX;
      page.drawText(title + `(${kg}KG)`, { x: rowX, y, size: 12, color: rgb(0, 0, 0) });
      rowX += tableWidth / 4;
      page.drawText(quantity.toString(), { x: rowX, y, size: 12, color: rgb(0, 0, 0) });
      rowX += tableWidth / 4;
      page.drawText(`${price} RON`, { x: rowX, y, size: 12, color: rgb(0, 0, 0) });
      rowX += tableWidth / 4;
      page.drawText(`${total} RON`, { x: rowX, y, size: 12, color: rgb(0, 0, 0) });

      // Draw horizontal line under each row
      const rowLineY = y - 5;
      page.drawLine({ start: { x: startX, y: rowLineY }, end: { x: startX + tableWidth, y: rowLineY }, thickness: 1, color: rgb(0, 0, 0) });

      y -= lineHeight;
    }

    const subtotal = cart.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);
    
    page.drawText('Subtotal: ', { x: startX + tableWidth - 150, y, size: 12, font: boldFont, color: rgb(0.55,0.55,0.55) });
    page.drawText(`${subtotal} RON`, { x: startX + tableWidth - 80, y, size: 12, color: rgb(0, 0, 0) });
    
    page.drawText('Livrare: ', { x: startX + tableWidth - 150, y: y - 20, size: 12, font: boldFont, color: rgb(0.55,0.55,0.55) });
    page.drawText(deliveryKm <= 25 ? 'GRATIS' : `${Number(deliveryPrice).toFixed(2)} RON`, { x: startX + tableWidth - 80 , y: y - 20, size: 12, color: rgb(0, 0, 0) });
    
    page.drawLine({start: {x: startX + tableWidth, y: y-5}, end: {x: startX+tableWidth - 90 , y: y-5}, color: rgb(0.55,0.55,0.55)})
    page.drawLine({start: {x: 350, y: y-25}, end: {x: startX+tableWidth , y: y-25}})

    page.drawText('Pret final: ', { x: 360, y: y - 50, size: 15, font: boldFont, color: rgb(0,0,0) });
    page.drawText(`${Number(deliveryPrice) + Number(subtotal)} RON`, { x: 460, y: y - 50, size: 15, color: rgb(0, 0, 0), font: boldFont });
    
    page.drawLine({start: {x: 440, y: y-60}, end: {x: startX+tableWidth , y: y-60}})
    
    
    const pdfBytes = await pdfDoc.save();

    // Create a blob from the PDF bytes and open it in a new tab
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

    return (
      <div className='successFlex'>
      <ToastContainer />
      <div className='successBackground'>

      <div className='successIcon'>
        <FiCheckCircle  className='successIcon__icon'/>
      </div>

      <div>
        <h1>Success</h1>
      </div>
      
      <div className='successText'>
        <p>We received your purchase request.</p>
        <p>We&apos;ll be in touch shortly. :)</p>
      </div>

      {countdown}

      </div>
    </div>  
  )
}

export default SuccessPage
