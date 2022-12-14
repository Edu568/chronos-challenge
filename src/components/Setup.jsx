import React, { useState } from "react";
import axios from "axios";
import StellarSdk from "stellar-sdk";
import swal from 'sweetalert';
const Setup = ({ setSecret, setKey, setImport, importSecret }) => {
  const [error, setError] = useState("");
  const createAccount = async () => {
     
    const mySwal = alert(swal)

      const pair = StellarSdk.Keypair.random();
      const secret = pair.secret();
      const publicK = pair.publicKey();
       const response = await axios(
         `https://friendbot.stellar.org?addr=${encodeURIComponent(
           pair.publicKey()
         )}`
       );


    setSecret(secret);
    setKey(publicK);
  
  };



    const importAcc = () => {
         console.log(importSecret);
         if (importSecret.length === 56) {
           try {
             const acc = StellarSdk.KeyPair.fromSecret(importSecret);
             const accPublic = acc.publicKey();
             const accSecret = acc.secret();
             setSecret(accSecret);
             setError("");
           } catch (error) {
             setError("Invalid Secret Key");
           }
           
         } else {
          swal("careful", "Clave secreta invalida", "error");
         }
    };
    return (
      <>
        <h1 className="titulo">Bienvenido a Stellar</h1>
        <span className="sub">
          Crea tu billetera de forma instantanea y segura
        </span>
        <p className="buton">
          {" "}
          <button
            className="bg-blue-600 text-white border-solid rounded border-gray-500 w-[150px] mt-5"
            onClick={() => createAccount()}
          >
            Crear Cuenta
          </button>
        </p>
        <p className="sub">Si ya tienes cuenta, importala!</p>
        <div className="flex">
          <input
            type="text"
            placeholder="Ingresa tu llave privada"
            className="text-center"
            value={importSecret}
            onChange={(e) => setImport(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white border-solid rounded border-gray-500 w-[100px]"
            onClick={importAcc}
          >
            Importar
          </button>
        </div>
        {error && <span className="text-red-600 my-3">{error}</span>}
      </>
    );
  };

export default Setup;
