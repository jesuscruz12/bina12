import { NextResponse } from 'next/server';

// Función para cifrar con César
const cifrarCesar = (mensaje, desplazamiento) => {
  let resultado = "";
  for (let i = 0; i < mensaje.length; i++) {
    let codigo = mensaje.charCodeAt(i);
    if (codigo >= 65 && codigo <= 90) {
      resultado += String.fromCharCode(((codigo - 65 + desplazamiento) % 26) + 65);
    } else if (codigo >= 97 && codigo <= 122) {
      resultado += String.fromCharCode(((codigo - 97 + desplazamiento) % 26) + 97);
    } else {
      resultado += mensaje.charAt(i);
    }
  }
  return resultado;
};

// Función para descifrar con César
const descifrarCesar = (mensaje, desplazamiento) => {
  let resultado = "";
  for (let i = 0; i < mensaje.length; i++) {
    let codigo = mensaje.charCodeAt(i);
    if (codigo >= 65 && codigo <= 90) {
      resultado += String.fromCharCode(((codigo - 65 - desplazamiento + 26) % 26) + 65);
    } else if (codigo >= 97 && codigo <= 122) {
      resultado += String.fromCharCode(((codigo - 97 - desplazamiento + 26) % 26) + 97);
    } else {
      resultado += mensaje.charAt(i);
    }
  }
  return resultado;
};

// Función para cifrar con Escítala
const cifrarEscitala = (mensaje, columnas) => {
  let resultado = "";
  for (let i = 0; i < columnas; i++) {
    for (let j = i; j < mensaje.length; j += columnas) {
      resultado += mensaje[j];
    }
  }
  return resultado;
};

// Función para descifrar con Escítala
const descifrarEscitala = (mensaje, columnas) => {
  let filas = Math.ceil(mensaje.length / columnas);
  let resultado = new Array(mensaje.length);
  let index = 0;

  for (let i = 0; i < columnas; i++) {
    for (let j = i; j < mensaje.length; j += columnas) {
      resultado[j] = mensaje[index++];
    }
  }
  return resultado.join("");
};

// Manejador de solicitudes
export async function POST(request) {
  const { type, message, key } = await request.json();

  let result;
  if (type === "cesar") {
    const desplazamiento = parseInt(key);
    result = { result: cifrarCesar(message, desplazamiento) };
  } else if (type === "escitala") {
    const columnas = parseInt(key);
    result = { result: cifrarEscitala(message, columnas) };
  } else {
    return NextResponse.json({ error: "Tipo de cifrado no válido." }, { status: 400 });
  }

  return NextResponse.json(result);
}

export async function DELETE(request) {
  const { type, message, key } = await request.json();

  let result;
  if (type === "cesar") {
    const desplazamiento = parseInt(key);
    result = { result: descifrarCesar(message, desplazamiento) };
  } else if (type === "escitala") {
    const columnas = parseInt(key);
    result = { result: descifrarEscitala(message, columnas) };
  } else {
    return NextResponse.json({ error: "Tipo de cifrado no válido." }, { status: 400 });
  }

  return NextResponse.json(result);
}
