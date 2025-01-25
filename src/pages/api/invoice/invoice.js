import axios from "axios";
import { Attachment, EmailParams, MailerSend, Recipient, Sender } from "mailersend";
import fs from "fs"

export default async function handler(req, res) {
    if (req.method === "POST") {
        const order = req.body
        console.log(order.order.client.firstName)
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
                    "issueDate": "2021-02-09",
                    "seriesName": "FCT",
                    "dueDate": "2021-02-28",
                    "deliveryDate": "2021-02-28",
                    "products": order.order.products.map((item) => ({
                        name: item.title,
                        code: item.id,
                        isDiscount: false,
                        measuringUnitName: 'tona',
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
                        Buffer.from(pdfResponse.data, "binary").toString("base64"), // Convert arraybuffer to Base64
                        `invoice_${seriesName}_${number}.pdf`, // File name
                        "attachment" // Attachment type
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
                .setHtml("<strong>This is the HTML content</strong>")
                .setText("This is the text content")
    
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
