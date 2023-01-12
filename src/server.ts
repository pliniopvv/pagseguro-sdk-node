// import { readFile } from 'fs';
// import express from 'express';
// import http from 'http';
// import * as paypal from 'paypal-node-sdk';

// const app = express();
// const server = http.createServer(app);
// const port = 3001;

// let URL_SUCESS = "https://d6df970286b5.ngrok.io/sucess";
// let URL_CANCEL = "https://d6df970286b5.ngrok.io/cancel";

// app.use(express.json());
// app.get("/:rota", (req, res) => {
//     console.log("GET");
//     console.log("rota> ", req.params.rota);
//     console.log("body> ", req.body);

//     res.status(200).send({ rota: req.params.rota });
// });
// app.post("/:rota", (req, res) => {
//     console.log("POST");
//     console.log("rota> ", req.params.rota);
//     console.log("body> ", req.body);

//     res.status(200).send({ rota: req.params.rota });
// });

// let pag = function (req: any, res: any) {
//     readFile("./src/paypalConfig.json", "UTF-8", (err1, data) => {
//         readFile("./src/paypal-products.json", "UTF-8", (err2, jsonProducts) => {
//             let products = JSON.parse(jsonProducts).products;
//             let paypalConfig = JSON.parse(data);

//             console.log("paypalConfig> ", paypalConfig);
//             console.log("products> ", products);

//             paypal.configure(paypalConfig);
//             let prodmen = products[0];

//             // criando carrinho
//             const carrinho = [{
//                 "name": prodmen.titulo,
//                 "sku": prodmen.id,
//                 "price": prodmen.preco.toFixed(2),
//                 "currency": 'BRL',
//                 "quantity": 1
//             }];
//             const valor = [{
//                 "currency": "BRL",
//                 "total": prodmen.preco.toFixed(2)
//             }];
//             const descricao = prodmen.descricao;
//             const json_pagamento = {
//                 "intent": "sale",
//                 "payer": { "payment_method": "paypal" },
//                 "redirect_urls": {
//                     "return_url": URL_SUCESS,
//                     "cancel_url": URL_CANCEL
//                 },
//                 "transactions": [{
//                     "item_list": { "items": carrinho },
//                     "amount": valor,
//                     "description": descricao
//                 }]
//             };
//             // @ts-ignore
//             let payment = paypal.payment.create(json_pagamento, (err, pagamento) => {
//                 if (err)
//                     console.warn("Err> ", err);
//                 else
//                     pagamento.links.forEach((link: any) => {
//                         if (link.rel === 'approval_url') return console.log('link red> ', res.redirect(link.href));
//                     });
//             });

//             // sucesso

//             // cancela compra
//         });
//     });
// }

// app.listen(port);
// console.log("listening> ", port);