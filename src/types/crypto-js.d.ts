declare module "crypto-js" {
    export const MD5: (message: string) => string;
    export const AES: {
      encrypt: (message: string, key: string) => { toString: () => string };
      decrypt: (cipherText: string, key: string) => { toString: (format: any) => string };
    };
    // Añadir otras funciones de crypto-js que necesites
  }
  