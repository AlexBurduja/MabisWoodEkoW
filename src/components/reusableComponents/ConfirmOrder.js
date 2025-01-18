import { doc } from "firebase/firestore";
import { db } from "../../../firebase-config";

export async function confirmOrder({ order, payment }) {
    // Here you can handle order processing logic. For example:
    console.log('Processing order:', order);
    console.log('Payment status:', payment.status);
  
    // You can validate the order and payment here
    if (payment.status !== 'SUCCESS') {
      throw new Error('Payment failed');
    }

    await setDoc(doc(db, `orders/${order.orderId}`), {
        order: order,
        payment: payment
    })

    // You can perform any other logic you need, such as updating inventory, notifying the user, etc.
    console.log('Order processed successfully');
}