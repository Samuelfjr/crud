/**
 * Nome do arquivo: ordens.js
 * Data de criação:
 * Autor: mateus micael p.rabelo
 * Matrícula: 01609372
 *
 * Descrição:
 * Este arquivo é responsável pelo CRUD da collection ordens de serviço
 * fazendo a manipulação dos dados conformme o tipo de requisição realizada.
 *
 * Este script é parte o curso de ADS.
 */

import db from "./firebase.js";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const getData = async () => {
      let data = [];

      const ordens = await getDocs(collection(db, "ordensServico"));

      ordens.forEach((doc) => {
        let tempData = doc.data();
        tempData["id"] = doc.id;
        data.push(tempData);

        //data[doc.id] = doc.data();
      });
      res.status(200).json(data);
    };

    getData();
  } else if (req.method == "POST") {
    const insertData = async (client, date, describe, cost) => {
      await addDoc(collection(db, "ordensServico"), {
        status: "iniciado",
        client: client,
        date: date,
        describe: describe,
        cost: cost,
      });
      if (insertData) {
        res.status(201).json("Usuário criado com sucesso");
      } else {
        res.status(500).json("Erro ao inserir o usuário no banco");
      }
    };

    const update = async (id, status, client, date, describe, cost) => {
      // Organiza a inserção dos dados
      const idOrdem = id;
      const valid_ordem = doc(db, "ordensServico", idOrdem);

      // Atualiza os dados
      await updateDoc(valid_ordem, {
        status: status,
        client: client,
        date: date,
        describe: describe,
        cost: cost,
      }).then(() => {
        res.status(200).json("Dados alterados com sucesso");
      });
    };

    const dataReceived = req.body;
    if (dataReceived.id) {
      console.log("Dados:", dataReceived);
      update(
        dataReceived.id,
        dataReceived.status,
        dataReceived.client,
        dataReceived.date,
        dataReceived.describe,
        dataReceived.cost
      );
      res.json("Alterar");
    } else {
      insertData(
        dataReceived.client,
        dataReceived.date,
        dataReceived.describe,
        dataReceived.cost
      );
    }
  } else if (req.method == "PUT") {
    const getOrdem = async (data) => {
      const id = data.id;
      const datadb = await getDoc(doc(db, "ordensServico", id));
      let tempData = datadb.data();
      tempData["id"] = datadb.id;
      res.status(302).json(tempData);
    };
    const dataReceived = req.query;
    if (
      (dataReceived.id,
      dataReceived.status &&
        dataReceived.client &&
        dataReceived.date &&
        dataReceived.describe &&
        dataReceived.cost)
    ) {
      console.log("Dados recebidos: ", dataReceived);
      res.json("Dados recebidos: ", dataReceived);
    } else {
      getOrdem(dataReceived);
    }
  } else if (req.method == "DELETE") {
    const deleto = async (id, table) => {
      console.log(id);

      const idClient = id;
      const valid_usuario = doc(db, table, idClient);

      await deleteDoc(valid_usuario).then(() => {
        res.status(200).json("Ordem apagada");
      });
    };
    const dataReceived = req.query;
    deleto(dataReceived.id, "ordensServico");
  }
}
