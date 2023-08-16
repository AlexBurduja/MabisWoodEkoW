import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, firstName, lastName, phoneNumber, street, streetNo, block, apartamentNo, total, pdfBytes } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // e.g., 'gmail'
      auth: {
        user: 'alex20011508@gmail.com',
        pass: 'Sorana2015!',
      },
    });

    await transporter.sendMail({
      from: 'alex20011508@gmail.com',
      to: email,
      subject: `Comanda de la ${email} (${firstName} ${lastName})`,
      html: `
        <p>${firstName} ${lastName} a facut o plata in valoare de ${total} RON</p>
        <p>Nume : ${firstName} ${lastName} ( ${email} )</p>
        <p>Telefon : <b>${phoneNumber}</b></p>
        <p>Strada : <b>${street}</b></p>
        <p>Nr. : <b>${streetNo}</b></p>
        <p>Bloc : <b>${block}</b></p>
        <p>Apartament : <b>${apartamentNo}</b></p>
      `,
      attachments: [
        {
          filename: 'invoice.pdf',
          content: pdfBytes,
          contentType: 'application/pdf',
        },
      ],
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while sending the email' });
  }
}
