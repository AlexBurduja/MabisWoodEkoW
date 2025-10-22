import axios from 'axios';

function removeDiacritics(str = '') {
  return str.normalize?.("NFD")?.replace(/[\u0300-\u036f]/g, "") ?? str;
}

// Mapare cod auto → nume complet (fără diacritice preferabil)
const judeteMap = {
  AB: "Alba", AR: "Arad", AG: "Arges", BC: "Bacau", BH: "Bihor", BN: "Bistrita-Nasaud",
  BT: "Botosani", BV: "Brasov", BR: "Braila", BZ: "Buzau", CS: "Caras-Severin",
  CL: "Calarasi", CJ: "Cluj", CT: "Constanta", CV: "Covasna", DB: "Dambovita",
  DJ: "Dolj", GL: "Galati", GR: "Giurgiu", GJ: "Gorj", HR: "Harghita", HD: "Hunedoara",
  IL: "Ialomita", IS: "Iasi", IF: "Ilfov", MM: "Maramures", MH: "Mehedinti", MS: "Mures",
  NT: "Neamt", OT: "Olt", PH: "Prahova", SM: "Satu Mare", SJ: "Salaj", SB: "Sibiu",
  SV: "Suceava", TR: "Teleorman", TM: "Timis", TL: "Tulcea", VS: "Vaslui", VL: "Valcea",
  VN: "Vrancea", B: "Bucuresti"
};

export default async function handler(req, res) {
  const { auto } = req.query;

  if (!auto || !judeteMap[auto]) {
    return res.status(400).json({ error: 'Invalid or missing "auto" parameter.' });
  }

  // InfoCUI pare să prefere numele fără diacritice, așa cum ai observat
  const judetName = removeDiacritics(judeteMap[auto]);

  try {
    const response = await axios.get(
      `https://www.infocui.ro/system/api/localitati?key=f78dcc5db221d1fed537ad67b05b727bb9345f61&judet=${encodeURIComponent(judetName)}`
    );

    // debug: logăm structura primită odată (poți elimina la final)
    // console.log("InfoCUI response raw:", response.data);

    const resp = response.data ?? {};
    // posibile locuri unde se află array-ul
    const candidates = [
      resp,                // dacă API ar returna direct array (rar)
      resp.data,           // forma pe care ai arătat-o
      resp.orase,          // fallback numit 'orase'
      resp.localities      // alt fallback ipotetic
    ];

    // găsim primul element care e array
    const array = candidates.find(c => Array.isArray(c)) || [];

    const orase = array.map(city => {
      // city poate folosi diferite chei: 'locality', 'localitate', 'nume'
      const rawName = city.locality || city.localitate || city.nume || city.local || "";
      return {
        ...city,
        nume: removeDiacritics(rawName)
      };
    });

    return res.status(200).json({ orase });
  } catch (error) {
    console.error('Error fetching orase:', error.response?.data ?? error.message);
    return res.status(500).json({ error: 'An error occurred while fetching orase.' });
  }
}
