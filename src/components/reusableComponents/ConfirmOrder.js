import { addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";

export async function confirmOrder({ order, payment }) {
    // Here you can handle order processing logic. For example:
    console.log('Processing order:', order.orderID);
    console.log('Payment status:', payment.status);

    await updateDoc(doc(db, `orders/${order.orderID}`), {
        order: order,
        payment: payment
    })

    // You can perform any other logic you need, such as updating inventory, notifying the user, etc.
    console.log('Order processed successfully');
}