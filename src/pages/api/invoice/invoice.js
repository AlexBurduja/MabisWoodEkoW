import axios from "axios";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            // Create the invoice
            const createInvoiceResponse = await axios.post(
                "https://ws.smartbill.ro/SBORO/api/invoice",
                {
                    "companyVatCode": "RO46728003",
                    "client": {
                        "name": "Intelligent IT",
                        "vatCode": "RO12345678",
                        "isTaxPayer": true,
                        "address": "str. Sperantei, nr. 5",
                        "city": "Sibiu",
                        "country": "Romania",
                        "email": "office@intelligent.ro",
                    },
                    "issueDate": "2021-02-09",
                    "seriesName": "FCT",
                    "dueDate": "2021-02-28",
                    "deliveryDate": "2021-02-28",
                    "products": [
                        {
                            "name": "Peleti20",
                            "code": "P_20",
                            "isDiscount": false,
                            "measuringUnitName": "tona",
                            "currency": "RON",
                            "quantity": 10,
                            "price": 300,
                            "isService": false,
                        },
                    ],
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
                        Authorization:
                            "Basic YnVyZHVqYV9hbGV4MTRAeWFob28uY29tOjAwM3wwZThhZDZhODFiZTZiY2U4Y2MzYjllODYwYWI0YTk4Ng==",
                    },
                    responseType: "arraybuffer", // Important to handle binary data
                }
            );

            // Set the response headers to send the PDF
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
                "Content-Disposition",
                `attachment; filename=invoice_${seriesName}_${number}.pdf`
            );

            console.log(pdfResponse.data)
            res.status(200).send(pdfResponse.data);
        } catch (error) {
            console.error(
                "Error:",
                error.response?.data || error.message || "Internal Server Error"
            );
            res.status(500).json({
                error: error.response?.data || "Internal Server Error",
            });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
