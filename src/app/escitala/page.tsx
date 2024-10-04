"use client";

import { useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CifradoPage() {
  // Estado para Escítala
  const [escitalaResult, setEscitalaResult] = useState("");
  const [escitalaMessage, setEscitalaMessage] = useState("");
  const [escitalaKey, setEscitalaKey] = useState(0); // Cambia a un número

  // Estado para César
  const [cesarResult, setCesarResult] = useState("");
  const [cesarMessage, setCesarMessage] = useState("");
  const [cesarKey, setCesarKey] = useState(0); // Cambia a un número

  // Función para cifrar usando Escítala
  const encryptWithEscitala = async () => {
    if (!escitalaKey || !escitalaMessage) {
      alert("Por favor, ingrese tanto la clave como el mensaje.");
      return;
    }

    if (escitalaKey <= 0) {
      alert("La clave debe ser un número mayor que 0.");
      return;
    }

    try {
      const response = await fetch('/api/encryption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: "escitala", message: escitalaMessage, key: escitalaKey }),
      });
      const data = await response.json();
      setEscitalaResult(data.result);
    } catch (error) {
      console.error('Error al cifrar:', error);
    }
  };

  // Función para descifrar usando Escítala
  const decryptWithEscitala = async () => {
    if (!escitalaKey || !escitalaMessage) {
      alert("Por favor, ingrese tanto la clave como el mensaje cifrado.");
      return;
    }

    if (escitalaKey <= 0) {
      alert("La clave debe ser un número mayor que 0.");
      return;
    }

    try {
      const response = await fetch('/api/encryption', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: "escitala", message: escitalaMessage, key: escitalaKey }),
      });
      const data = await response.json();
      setEscitalaResult(data.result);
    } catch (error) {
      console.error('Error al descifrar:', error);
    }
  };

  // Función para cifrar usando César
  const encryptWithCesar = async () => {
    if (!cesarKey || !cesarMessage) {
      alert("Por favor, ingrese tanto la clave como el mensaje.");
      return;
    }

    if (cesarKey < 0) {
      alert("La clave debe ser un número mayor o igual a 0.");
      return;
    }

    try {
      const response = await fetch('/api/encryption', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: "cesar", message: cesarMessage, key: cesarKey }),
      });
      const data = await response.json();
      setCesarResult(data.result);
    } catch (error) {
      console.error('Error al cifrar:', error);
    }
  };

  // Función para descifrar usando César
  const decryptWithCesar = async () => {
    if (!cesarKey || !cesarMessage) {
      alert("Por favor, ingrese tanto la clave como el mensaje cifrado.");
      return;
    }

    if (cesarKey < 0) {
      alert("La clave debe ser un número mayor o igual a 0.");
      return;
    }

    try {
      const response = await fetch('/api/encryption', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: "cesar", message: cesarMessage, key: cesarKey }),
      });
      const data = await response.json();
      setCesarResult(data.result);
    } catch (error) {
      console.error('Error al descifrar:', error);
    }
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Cifrado Escítala y César</h1>

      <Row>
        {/* Sección Escítala */}
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Cifrado Escítala</Card.Title>
              <Form.Group>
                <Form.Label>Clave (Número de columnas):</Form.Label>
                <Form.Control
                  type="number"
                  value={escitalaKey || ''} // Si escitalaKey es 0, mostramos una cadena vacía
                  onChange={(e) => setEscitalaKey(Number(e.target.value))} // Convierte el valor a número
                  placeholder="Ingrese la clave"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Mensaje:</Form.Label>
                <Form.Control
                  type="text"
                  value={escitalaMessage}
                  onChange={(e) => setEscitalaMessage(e.target.value)}
                  placeholder="Ingrese el mensaje"
                />
              </Form.Group>
              <Button variant="primary" onClick={encryptWithEscitala} className="mb-3">
                Cifrar
              </Button>
              <Button variant="success" onClick={decryptWithEscitala} className="mb-3">
                Descifrar
              </Button>
              <Form.Group>
                <Form.Label>Resultado:</Form.Label>
                <Form.Control as="textarea" rows={2} readOnly value={escitalaResult} />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        {/* Sección César */}
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Cifrado César</Card.Title>
              <Form.Group>
                <Form.Label>Clave (Desplazamiento):</Form.Label>
                <Form.Control
                  type="number"
                  value={cesarKey || ''} // Si cesarKey es 0, mostramos una cadena vacía
                  onChange={(e) => setCesarKey(Number(e.target.value))} // Convierte el valor a número
                  placeholder="Ingrese la clave"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Mensaje:</Form.Label>
                <Form.Control
                  type="text"
                  value={cesarMessage}
                  onChange={(e) => setCesarMessage(e.target.value)}
                  placeholder="Ingrese el mensaje"
                />
              </Form.Group>
              <Button variant="primary" onClick={encryptWithCesar} className="mb-3">
                Cifrar
              </Button>
              <Button variant="success" onClick={decryptWithCesar} className="mb-3">
                Descifrar
              </Button>
              <Form.Group>
                <Form.Label>Resultado:</Form.Label>
                <Form.Control as="textarea" rows={2} readOnly value={cesarResult} />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
