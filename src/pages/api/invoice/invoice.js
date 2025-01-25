import axios from "axios";
import { Attachment, EmailParams, MailerSend, Recipient, Sender } from "mailersend";
import fs from "fs"

export default async function handler(req, res) {
    if (req.method === "POST") {
        const order = req.body
        const date = new Date();
        try {
            // Create the invoice
            const createInvoiceResponse = await axios.post(
                "https://ws.smartbill.ro/SBORO/api/invoice",
                {
                    "companyVatCode": "RO46728003",
                    "client": {
                        "name": `${order.order.client.firstName} ${order.order.client.lastName}`,
                        "isTaxPayer": true,
                        "address": `Str. ${order.order.client.street} Nr.${order.order.client.streetNo}, Bl.${order.order.client.block}, Ap.${order.order.client.apartamentNo}`,
                        "city": `${order.order.client.city}, ${order.order.client.state}`,
                        "country": "Romania",
                        "email": `${order.order.client.email}`,
                    },
                    "issueDate": `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                    "seriesName": "FCT",
                    // "dueDate": "2021-02-28",
                    // "deliveryDate": "2021-02-28",
                    "products": order.order.products.map((item) => ({
                        name: item.title + ' ' + `${item.kg} KG` ,
                        code: item.id,
                        isDiscount: false,
                        measuringUnitName: 'KG',
                        currency: 'RON',
                        quantity: item.quantity,
                        price: item.price,
                        isService: false,
                    }))
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization:
                            "Basic YnVyZHVqYV9hbGV4MTRAeWFob28uY29tOjAwM3wwZThhZDZhODFiZTZiY2U4Y2MzYjllODYwYWI0YTk4Ng==",
                    },
                }
            );

            // Extract seriesName and number from the response
            const seriesName = createInvoiceResponse.data.series;
            const number = createInvoiceResponse.data.number;

            if (!seriesName || !number) {
                throw new Error("Missing seriesName or number in response.");
            }

            // Fetch the PDF
            const pdfResponse = await axios.get(
                "https://ws.smartbill.ro/SBORO/api/invoice/pdf",
                {
                    params: {
                        cif: "46728003",
                        seriesname: seriesName,
                        number: number,
                    },
                    headers: {
                        Accept: "application/octet-stream",
                        Authorization: "Basic YnVyZHVqYV9hbGV4MTRAeWFob28uY29tOjAwM3wwZThhZDZhODFiZTZiY2U4Y2MzYjllODYwYWI0YTk4Ng==",
                    },
                    responseType: "arraybuffer",
                }
            );

            const sendMail = async () => {
                const mailerSend = new MailerSend({
                    apiKey: 'mlsn.15191c4c92666aeee1b6fc562900c33b42c5094d798b94dd0f548eb2ac3f80ff'
                })
    
                const attachments = [
                    new Attachment(
                        Buffer.from(pdfResponse.data, "binary").toString("base64"),
                        `MabisWE_Factura_${order.order.client.firstName}_${order.order.client.lastName}.pdf`,
                        "attachment"
                    ),
                ];
    
                const recipients =[
                    new Recipient(`${order.order.client.email}`, `${order.order.client.firstName + '' + order.order.client.lastName}`)
                ] 

    
                const sentFrom = new Sender('plm@trial-neqvygmpmjdg0p7w.mlsender.net', "Mabis Wood Eko")
    
                const emailParams = new EmailParams()
                .setFrom(sentFrom)
                .setTo(recipients)
                .setReplyTo(sentFrom)
                .setAttachments(attachments)
                .setSubject("Mabis Wood Eko Invoice")
                .setHtml(`
                    <!DOCTYPE html>
                    <html lang="ro">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Felicitări pentru Achiziție</title>
                        <style>
                            body {
                                margin: 0;
                                font-family: 'Arial', sans-serif;
                                background-color: #f4f4f9;
                                color: #333;
                                line-height: 1.6;
                            }
            
                            .email-container {
                                max-width: 600px;
                                margin: 0 auto;
                                background: #ffffff;
                                border: 1px solid #e0e0e0;
                                border-radius: 10px;
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                overflow: hidden;
                            }
            
                            .email-header {
                                background-color: #3e497a;
                                color: white;
                                text-align: center;
                                padding: 20px;
                            }
            
                            .email-body {
                                padding: 30px;
                                text-align: center;
                            }
            
                            .email-body h1 {
                                font-size: 26px;
                                color: #3e497a;
                                margin-bottom: 20px;
                            }
            
                            .email-body p {
                                font-size: 16px;
                                margin-bottom: 20px;
                            }
            
                            .email-body .button {
                                display: inline-block;
                                background-color: #3e497a;
                                color: #fff;
                                padding: 10px 20px;
                                font-size: 16px;
                                text-decoration: none;
                                border-radius: 5px;
                                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                            }
            
                            .email-footer {
                                background-color: #f4f4f9;
                                text-align: center;
                                padding: 15px;
                                font-size: 12px;
                                color: #888;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="email-container">
                            <div class="email-header">
                                <div class="email-header_left">
                                    <h2>Mabis Wood Eko</h2>
                                </div>
                            </div>
                            <div class="email-body">
                                <h1>Felicitări pentru achiziție!</h1>
                                <p>Dragă <strong>${order.order.client.firstName} ${order.order.client.lastName}</strong>,</p>
                                <p>Îți mulțumim că ai ales Mabis Wood Eko. Comanda ta a fost procesată cu succes, iar factura este atașată acestui email.</p>
                                <p>Sperăm că produsele noastre îți vor aduce satisfacție deplină.</p>
                                <a href="#" class="button">Aveti factura atasata mai jos!</a>
                            </div>
                            <div class="email-footer">
                                <p>© 2025 Mabis Wood Eko. Toate drepturile rezervate.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `)
    
                await mailerSend.email.send(emailParams)
            }

            await sendMail();

            res.status(200).json({message: "Invoice created and email sent successfully!"});
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: error.response?.data || "Internal Server Error",
            });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
