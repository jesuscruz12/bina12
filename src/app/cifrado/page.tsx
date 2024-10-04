"use client";

import { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CifradoPage() {
  // Estado para Schnorr
  const [schnorrResult, setSchnorrResult] = useState({ signature: "", verified: false });
  const [schnorrMessage, setSchnorrMessage] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  // Estado para MD5
  const [md5Message, setMd5Message] = useState("");
  const [md5Hash, setMd5Hash] = useState("");

  // Estados para Camellia
  const [camelliaKey, setCamelliaKey] = useState("");
  const [camelliaMessage, setCamelliaMessage] = useState("");
  const [camelliaCiphertext, setCamelliaCiphertext] = useState("");
  const [camelliaPlaintext, setCamelliaPlaintext] = useState("");

  // Funciones para firma Schnorr
  const signSchnorrMessage = async () => {
    try {
      const response = await fetch('/api/schnorrSign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ privateKey, message: schnorrMessage }),
      });
      const data = await response.json();
      setSchnorrResult({ signature: data.signature, verified: false });
    } catch (error) {
      console.error('Error al generar la firma:', error);
    }
  };

  const verifySchnorrSignature = async () => {
    try {
      const response = await fetch('/api/schnorrVerify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ privateKey, message: schnorrMessage, signature: schnorrResult.signature }),
      });
      const data = await response.json();
      setSchnorrResult({ ...schnorrResult, verified: data.verified });
    } catch (error) {
      console.error('Error al verificar la firma:', error);
    }
  };

  // Función para generar hash MD5
  const generateMD5Hash = async () => {
    try {
      const response = await fetch('/api/md5Hash', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: md5Message }),
      });
      const data = await response.json();
      setMd5Hash(data.md5);
    } catch (error) {
      console.error('Error al generar el hash MD5:', error);
    }
  };

  // Función para cifrar usando Camellia
  const encryptWithCamellia = async () => {
    if (!camelliaKey || !camelliaMessage) {
      alert("Por favor, ingrese tanto la clave como el mensaje.");
      return;
    }

    if (![16, 24, 32].includes(camelliaKey.length)) {
      alert("La clave debe tener una longitud de 16, 24 o 32 caracteres.");
      return;
    }

    try {
      const response = await fetch('/api/camellia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'encrypt', key: camelliaKey, message: camelliaMessage }),
      });
      const data = await response.json();
      if (response.ok) {
        setCamelliaCiphertext(data.ciphertext);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error al cifrar:', error);
    }
  };

  // Función para descifrar usando Camellia
  const decryptWithCamellia = async () => {
    if (!camelliaKey || !camelliaCiphertext) {
      alert("Por favor, ingrese tanto la clave como el mensaje cifrado.");
      return;
    }

    try {
      const response = await fetch('/api/camellia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'decrypt', key: camelliaKey, message: camelliaCiphertext }),
      });
      const data = await response.json();
      if (response.ok) {
        setCamelliaPlaintext(data.plaintext);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error al descifrar:', error);
    }
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Cifrado de Camellia, Firma Schnorr y Hash MD5</h1>
      
      <Row>
        {/* Cifrado de Clave Schnorr */}
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Schnorr Signature</Card.Title>
              <Form.Group>
                <Form.Label>Clave Privada:</Form.Label>
                <Form.Control
                  type="text"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  placeholder="Ingrese su clave privada"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Mensaje para Firmar:</Form.Label>
                <Form.Control
                  type="text"
                  value={schnorrMessage}
                  onChange={(e) => setSchnorrMessage(e.target.value)}
                  placeholder="Ingrese el mensaje a firmar"
                />
              </Form.Group>
              <Button variant="primary" onClick={signSchnorrMessage} className="mb-3">
                Firmar Mensaje
              </Button>
              <Form.Group>
                <Form.Label>Firma Generada:</Form.Label>
                <Form.Control as="textarea" rows={2} readOnly value={schnorrResult.signature} />
              </Form.Group>
              <Button variant="success" onClick={verifySchnorrSignature} className="mb-3">
                Verificar Firma
              </Button>
              <Form.Group>
                <Form.Label>Estado de Verificación:</Form.Label>
                <Form.Control type="text" readOnly value={schnorrResult.verified ? "Verificada" : "No Verificada"} />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* MD5 Hash */}
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Generador de Hash MD5</Card.Title>
              <Form.Group>
                <Form.Label>Mensaje a Hashear:</Form.Label>
                <Form.Control
                  type="text"
                  value={md5Message}
                  onChange={(e) => setMd5Message(e.target.value)}
                  placeholder="Ingrese el mensaje a hashear"
                />
              </Form.Group>
              <Button variant="primary" onClick={generateMD5Hash} className="mb-3">
                Generar Hash MD5
              </Button>
              <Form.Group>
                <Form.Label>Hash Generado:</Form.Label>
                <Form.Control as="textarea" rows={2} readOnly value={md5Hash} />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Cifrado Camellia */}
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Cifrado con Camellia</Card.Title>
              <Form.Group>
                <Form.Label>Clave (16, 24 o 32 caracteres):</Form.Label>
                <Form.Control
                  type="text"
                  value={camelliaKey}
                  onChange={(e) => setCamelliaKey(e.target.value)}
                  placeholder="Ingrese su clave"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Mensaje a Cifrar:</Form.Label>
                <Form.Control
                  type="text"
                  value={camelliaMessage}
                  onChange={(e) => setCamelliaMessage(e.target.value)}
                  placeholder="Ingrese el mensaje a cifrar"
                />
              </Form.Group>
              <Button variant="primary" onClick={encryptWithCamellia} className="mb-3">
                Cifrar
              </Button>
              <Form.Group>
                <Form.Label>Texto Cifrado:</Form.Label>
                <Form.Control as="textarea" rows={2} readOnly value={camelliaCiphertext} />
              </Form.Group>
              <Button variant="success" onClick={decryptWithCamellia} className="mb-3">
                Descifrar
              </Button>
              <Form.Group>
                <Form.Label>Texto Descifrado:</Form.Label>
                <Form.Control as="textarea" rows={2} readOnly value={camelliaPlaintext} />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
