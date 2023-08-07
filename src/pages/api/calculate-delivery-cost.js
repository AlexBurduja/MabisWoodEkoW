import axios from 'axios';

export default async function handler(req, res) {
  const { destination } = req.query;

  const apiKey = 'AIzaSyBoQfvBoQIBv3PogXlCpH67LWePQ_ttBCo'; 
  const origin = 'Pitesti, Arges, Romania';

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(
        origin
      )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`
    );

    const distanceText = response.data.rows[0].elements[0].distance.text;
    const distanceInKm = parseFloat(distanceText.replace(' km', ''));
    

    const deliveryCost = distanceInKm * 7; 

    res.status(200).json({ deliveryCost, distanceText });
  } catch (error) {
    console.error('Error calculating delivery cost:', error);
    res.status(500).json({ error: 'An error occurred while calculating delivery cost.' });
  }
}
