import forge from 'node-forge';

export default async function handler(req, res) {
  const { action, key, message } = req.body;

  try {
    // Asegúrate de que la clave tenga una longitud válida (16, 24 o 32 bytes)
    if (![16, 24, 32].includes(key.length)) {
      return res.status(400).json({ error: 'La clave debe tener una longitud de 16, 24 o 32 bytes.' });
    }

    if (action === 'encrypt') {
      // Cifrar el mensaje
      const cipher = forge.cipher.createCipher('CAMELLIA/ECB/PKCS7', forge.util.createBuffer(key));
      cipher.start({ iv: '' }); // No se necesita IV para ECB
      cipher.update(forge.util.createBuffer(message, 'utf8'));
      cipher.finish();
      const ciphertext = cipher.output.toHex(); // Convertir a hexadecimal

      return res.status(200).json({ ciphertext });
    } else if (action === 'decrypt') {
      // Descifrar el mensaje
      const decipher = forge.cipher.createDecipher('CAMELLIA/ECB/PKCS7', forge.util.createBuffer(key));
      decipher.start({ iv: '' });
      decipher.update(forge.util.createBuffer(forge.util.hexToBytes(message))); // Convertir hexadecimal a bytes
      decipher.finish();
      const plaintext = decipher.output.toString('utf8');

      return res.status(200).json({ plaintext });
    } else {
      return res.status(400).json({ error: 'Acción no válida.' });
    }
  } catch (error) {
    console.error('Error en el procesamiento de Camellia:', error);
    return res.status(500).json({ error: 'Error en el procesamiento de la solicitud.' });
  }
}
