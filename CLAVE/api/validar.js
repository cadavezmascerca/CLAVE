export default function handler(req, res) {
  // Configurar cabeceras para permitir peticiones correctas
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Relación secreta de claves
  const KEY_MAP = {
    "381": "1",
    "749": "2",
    "152": "3",
    "904": "4",
    "618": "5",
    "427": "6",
    "835": "7",
    "296": "8",
    "570": "9",
    "ABC": "10"
  };

  const SECRET_BINARY = "01000101 01101110 01110110 01101001 01100001 01110010 00100000 01101100 01100001 00100000 01110000 01100001 01101100 01100001 01100010 01110010 01100001 00100000 00100010 01001100 01101111 01100111 01110010 01100001 01100100 01101111 00100000 01100001 01101110 00100000 01100111 01110010 01110101 01110000 01101111 00100000 01100100 01101001 01100101 00100000 01010100 01101101 01101100 01100101 01100111 01110010 01100101 01101101 00101110";

  // Si piden el premio final
  if (req.method === 'GET' && req.query.action === 'win') {
    return res.status(200).json({ msg: SECRET_BINARY });
  }

  // Si envían una respuesta para validar
  if (req.method === 'POST') {
    // Asegurar que el cuerpo de la petición se lea bien como JSON
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        body = {};
      }
    }

    const { key, guess } = body || {};
    
    if (!key || !guess) {
      return res.status(400).json({ correct: false });
    }

    const expected = KEY_MAP[key];
    const isCorrect = (String(guess).trim() === expected);

    return res.status(200).json({ correct: isCorrect });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}
