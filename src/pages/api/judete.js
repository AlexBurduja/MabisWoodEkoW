function removeDiacritics(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export default async function handler(req, res) {
  try {
    const judete = [
      { nume: "Alba", auto: "AB" },
      { nume: "Arad", auto: "AR" },
      { nume: "Argeș", auto: "AG" },
      { nume: "Bacău", auto: "BC" },
      { nume: "Bihor", auto: "BH" },
      { nume: "Bistrița-Năsăud", auto: "BN" },
      { nume: "Botoșani", auto: "BT" },
      { nume: "Brașov", auto: "BV" },
      { nume: "Brăila", auto: "BR" },
      { nume: "Buzău", auto: "BZ" },
      { nume: "Caraș-Severin", auto: "CS" },
      { nume: "Călărași", auto: "CL" },
      { nume: "Cluj", auto: "CJ" },
      { nume: "Constanța", auto: "CT" },
      { nume: "Covasna", auto: "CV" },
      { nume: "Dâmbovița", auto: "DB" },
      { nume: "Dolj", auto: "DJ" },
      { nume: "Galați", auto: "GL" },
      { nume: "Giurgiu", auto: "GR" },
      { nume: "Gorj", auto: "GJ" },
      { nume: "Harghita", auto: "HR" },
      { nume: "Hunedoara", auto: "HD" },
      { nume: "Ialomița", auto: "IL" },
      { nume: "Iași", auto: "IS" },
      { nume: "Ilfov", auto: "IF" },
      { nume: "Maramureș", auto: "MM" },
      { nume: "Mehedinți", auto: "MH" },
      { nume: "Mureș", auto: "MS" },
      { nume: "Neamț", auto: "NT" },
      { nume: "Olt", auto: "OT" },
      { nume: "Prahova", auto: "PH" },
      { nume: "Satu Mare", auto: "SM" },
      { nume: "Sălaj", auto: "SJ" },
      { nume: "Sibiu", auto: "SB" },
      { nume: "Suceava", auto: "SV" },
      { nume: "Teleorman", auto: "TR" },
      { nume: "Timiș", auto: "TM" },
      { nume: "Tulcea", auto: "TL" },
      { nume: "Vaslui", auto: "VS" },
      { nume: "Vâlcea", auto: "VL" },
      { nume: "Vrancea", auto: "VN" },
      { nume: "București", auto: "B" }
    ].map(j => ({
      nume: removeDiacritics(j.nume),
      numeOriginal: j.nume,
      auto: j.auto
    }));

    res.status(200).json({ judete });
  } catch (error) {
    console.error('Error fetching judete:', error);
    res.status(500).json({ error: 'An error occurred while fetching judete.' });
  }
}
