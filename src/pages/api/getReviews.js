export default async function handler(req, res) {
    const { language } = req.query;
  
    try {
      const placeId = 'ChIJM_cvQl-TskARjkRh2NmgQ6I'; // Replace with your Google My Business place ID
      const apiKey = 'AIzaSyBoQfvBoQIBv3PogXlCpH67LWePQ_ttBCo'; // Replace with your Google Maps API key
  
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&language=${language}&key=${apiKey}`
      );
  
      const data = await response.json();
      const reviews = data.result.reviews || [];
  
      res.status(200).json({ reviews });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  }
  