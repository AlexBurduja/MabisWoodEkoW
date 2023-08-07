export default async function handler(req, res) {
    const destination = req.query.destination;
  
    if (!destination) {
      return res.status(400).json({ error: 'Missing destination parameter' });
    }
  
    try {
      // Calculate delivery cost using the method from previous responses
      const deliveryCost = await calculateDeliveryCost(destination);
      
      if (deliveryCost !== null) {
        res.status(200).json({ deliveryCost });
        console.log(`Delivery cost to ${destination}: ${deliveryCost} Lei`);
      } else {
        res.status(500).json({ error: 'Error calculating delivery cost' });
      }
    } catch (error) {
      console.error('Error calculating delivery cost:', error);
      res.status(500).json({ error: 'Error calculating delivery cost' });
    }
  }