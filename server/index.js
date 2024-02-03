import dotenv from "dotenv";
dotenv.config();

import express from "express";
// import mysql from 'mysql';
// import PdfReader from 'pdfreader';
import iconv from 'iconv-lite';

import mongoose from "mongoose";
import * as jschardet from 'jschardet';

import cors from "cors";
import Sales from "./models/sales/salesModel.js";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { PdfReader } from "pdfreader";
import CapitalExpModel from "./models/expensses/capitalExpModel.js";
import ComponeyOverheadModel from "./models/expensses/componeyOverheadModel.js";
import MiscExpModel from "./models/expensses/miscExpModel.js";
import RevenueExpModel from "./models/expensses/revenueExpModel.js";
import StatutoryModel from "./models/expensses/statutoryModel.js";
import BillDetailsModel from "./models/expensses/billDetailsModel.js";

const app = express();
app.use(cors());
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//-------------------------------------sales--------------------------------------------------------------------
app.post("/sales", async (req, res) => {
  try {
    if (req.body !== undefined) {
      const {
        customerName,
        contactEmail,
        contactPhone,
        softwareType,
        salesperson,
        saleDate,
        licenseType,
        quantity,
        transactionAmount,
        leadSource,
        internalNotes,
      } = req.body;
      const emailExist = await Sales.find({ contactEmail });
      let sales;
      if (emailExist.length > 0) {
        res.status(201).json({
          message: "Email already exists. Please use a different email.",
        });
      } else {
        sales = await Sales.create({
          customerName,
          contactEmail,
          contactPhone,
          softwareType,
          salesperson,
          saleDate,
          licenseType,
          quantity,
          transactionAmount,
          leadSource,
          internalNotes,
        });
        if (sales) {
          res.json({ message: "Sales data saved successfully" });
        }
      }
    } else {
      res.status(500).json({ message: "Error saving sales data" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving sales data" });
  }
});
app.get("/sales/getAll", async (req, res) => {
  try {
    const sales = await Sales.find();
    if (sales) {
      res.status(200).send(sales);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting sales data" });
  }
});

//-------------------------------------expensses----------------------------------------------------------------
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
app.use(express.static(join(__dirname, "public")));

app.get("/expense/getall", async (req, res) => {
  try {
    let capital = await CapitalExpModel.find();
    let statutory = await StatutoryModel.find();
    let overhead = await ComponeyOverheadModel.find();
    let miscexp = await MiscExpModel.find();
    let revenue = await RevenueExpModel.find();
    if (capital || statutory || overhead || miscexp || revenue) {
      res.status(200).send({ capital, statutory, overhead, miscexp, revenue });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting expense data" });
  }
});
app.post("/expense/upload/:data", upload.single("pdfFile"), async (req, res) => {
  let invoiceDate, GST, SGST, CGST, salary, buildingExp, totalcost, ComputersExpe,
  panNo, misc, GSTNO, orderNo, invoiceDetails, unitPrice, qty, netAmount,
  taxRate, taxType, taxAmount, totaltaxAmount, totalAmount;  
  let pdfText
  let allWordOfPDF = [];
  let pdfTextString = "";
  let reciptType = "";
  let stringWithoutSpaces;
  try {
   if(typeof req.file!="undefined"){
     pdfText = await parsePdf(req.file.buffer);
     pdfText.forEach((a) => {
       allWordOfPDF.push(...a.split(" "));
      });
      pdfTextString = allWordOfPDF.join(" ");
      
      // if (pdfTextString.includes("Amazon")) {
        //   stringWithoutSpaces = pdfText;
        //   reciptType = "Amazon";
        // } else {
          stringWithoutSpaces = pdfText.join("").replace(/\s/g, "");
          // reciptType = "Plain";
          // }
          console.log(stringWithoutSpaces);
  }
    if (req.params.data == "null") {
      const keywordData = await keywordDetetctor(
        stringWithoutSpaces,
        reciptType
      );
      ({
        invoiceDate,
        GST,
        SGST,
        CGST, 
        salary,
        buildingExp,
        totalcost,
        ComputersExpe,
        panNo,
        misc,
        GSTNO,
        orderNo,
        invoiceDetails,
        unitPrice,
        qty,
        netAmount,
        taxRate,
        taxType,
        taxAmount,
        totaltaxAmount,
        totalAmount,
      } = keywordData);
    } 
  
    if(req.params.data=="true") {
      ({
        GST,
        SGST,
        CGST,
        salary,
        buildingExp,
        totalcost,
        ComputersExpe,
        panNo,
        misc,
        GSTNO,
        orderNo,
        invoiceDetails,
        unitPrice,
        qty,
        netAmount,
        taxRate,
        taxType,
        taxAmount,
        totaltaxAmount,
        totalAmount,
      } = req.body);
    }
    if (req.params.data=="true") {
      if (ComputersExpe != 0 || netAmount != 0) {
        await CapitalExpModel.create({ ComputersExpe, netAmount });
      }
      if (GST != 0 || SGST != 0 || CGST != 0 || totaltaxAmount != 0) {
        await StatutoryModel.create({
          GST,
          SGST,
          CGST,
          amazontaxcost: totaltaxAmount,
        });
      }
      if (salary != 0) {
        await ComponeyOverheadModel.create({ salary });
      }
      if (misc != 0) {
        await MiscExpModel.create({ misc });
      }
      if (buildingExp != 0) {
        await RevenueExpModel.create({ buildingExp });
      }
      if (
        invoiceDate!=0||
        GST != 0 ||
        SGST != 0 ||
        CGST != 0 ||
        salary != 0 ||
        buildingExp != 0 ||
        totalcost != 0 ||
        ComputersExpe != 0 ||
        panNo != 0 ||
        misc != 0 ||
        GSTNO != 0 ||
        orderNo != 0 ||
        invoiceDetails != 0 ||
        unitPrice != 0 ||
        qty != 0 ||
        netAmount != 0 ||
        taxRate != 0 ||
        taxType != 0 ||
        taxAmount != 0 ||
        totaltaxAmount != 0 ||
        totalAmount != 0
      ) {
        await BillDetailsModel.create({
          GST,
          SGST,
          CGST,
          salary,
          buildingExp,
          totalcost,
          ComputersExpe,
          panNo,
          misc,
          GSTNO,
          orderNo,
          invoiceDetails,
          unitPrice,
          qty,
          netAmount,
          taxRate,
          taxType,
          taxAmount,
          totaltaxAmount,
          totalAmount,
        });
      }
    }
    res.json({
      data: {
        invoiceDate,
        GST,
        SGST,
        CGST,
        salary,
        buildingExp,
        totalcost,
        ComputersExpe,
        panNo,
        misc,
        GSTNO,
        orderNo,
        invoiceDetails,
        unitPrice,
        qty,
        netAmount,
        taxRate,
        taxType,
        taxAmount,
        totaltaxAmount,
        totalAmount,
      },
      message: "expense data saved successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

async function parsePdf(bufferData) {
  return new Promise((resolve, reject) => {
    const rows = [];
    // const pdfTextBuffer = [];

    new PdfReader().parseBuffer(bufferData, function (err, item) {
      if (err) {
        reject(err);
      } else if (!item) {
        // const pdfText = Buffer.concat(pdfTextBuffer).toString('binary');
        // const utf8Text = iconv.decode(Buffer.from(pdfText, 'binary'), 'utf-8');
        resolve(rows);
      } else if (item.text) {
        // pdfTextBuffer.push(Buffer.from(item.text, 'binary'));
        rows.push(item.text);
      }
    });
  });
}

async function keywordDetetctor(billArray, reciptType) {
  let invoiceDate
  let GSTNO
  let panNo
  let orderNo
  let invoiceDetails
  let unitPrice
  let qty
  let netAmount
  let taxRate
  let taxType
  let taxAmount
  let totaltaxAmount
  let totalAmount
  let GST
  let SGST
  let CGST
  let salary
  let totalcost
  let ComputersExpe
  let buildingExp
  let misc

  // if (reciptType === "Amazon") {
    // console.log("Amazon recipt");
  // if(reciptType === "Plain" ){
  //  console.log(billArray,"plain recipt");
    for (let i = 0; i + 3 < billArray.length; i++) {
      if (
        billArray[i].toLowerCase() === "s" &&
        billArray[i + 1].toLowerCase() === "g" &&
        billArray[i + 2].toLowerCase() === "s" &&
        billArray[i + 3].toLowerCase() === "t"
      ) {
        let cost = "";
        for (
          let i = 0;
          10 > billArray[i + 3].toLowerCase() || billArray[i + 3] === ".";
          i++
        ) {
          cost = cost + billArray[i + 3];
        }
        GST = CGST+ parseInt(cost);
      }
      if (
        billArray[i].toLowerCase() === "c" &&
        billArray[i + 1].toLowerCase() === "g" &&
        billArray[i + 2].toLowerCase() === "s" &&
        billArray[i + 3].toLowerCase() === "t"
      ) {
        let cost = "";
        for (
          let i = 0;
          10 > billArray[i + 3].toLowerCase() || billArray[i + 3] === ".";
          i++
        ) {
          cost = cost + billArray[i + 3];
        }
        GST = parseInt(cost);
      }
      if (
        billArray[i].toLowerCase() === "m" &&
        billArray[i + 1].toLowerCase() === "i" &&
        billArray[i + 2].toLowerCase() === "s" &&
        billArray[i + 3].toLowerCase() === "c"
      ) {
        let cost = "";
        for (
          let i = 0;
          10 > billArray[i + 3].toLowerCase() || billArray[i + 3] === ".";
          i++
        ) {
          cost = cost + billArray[i + 3];
        }
        misc =  SGST+parseInt(cost);
      }
      if (
        billArray[i].toLowerCase() === "r" &&
        billArray[i + 1].toLowerCase() === "e" &&
        billArray[i + 2].toLowerCase() === "n" &&
        billArray[i + 3].toLowerCase() === "t"
      ) {
        let cost = "";
        for (
          let i = 0;
          10 > billArray[i + 3].toLowerCase() || billArray[i + 3] === ".";
          i++
        ) {
          cost = cost + billArray[i + 3];
        }
        buildingExp = parseInt(cost);
      }
    }
    for (let i = 0; i + 2 < billArray.length; i++) {
      if (
        billArray[i].toLowerCase() === "g" &&
        billArray[i + 1].toLowerCase() === "s" &&
        billArray[i + 2].toLowerCase() === "t"
      ) {
        let cost = "";
        for (
          let i = 0;
          10 > billArray[i + 3].toLowerCase() || billArray[i + 3] === ".";
          i++
        ) {
          cost = cost + billArray[i + 3];
        }
        GST =  parseInt(cost);
      }
    }
    for (let i = 0; i + 5 < billArray.length; i++) {
      if (
        billArray[i].toLowerCase() === "s" &&
        billArray[i + 1].toLowerCase() === "a" &&
        billArray[i + 2].toLowerCase() === "l" &&
        billArray[i + 3].toLowerCase() === "a" &&
        billArray[i + 4].toLowerCase() === "r" &&
        billArray[i + 5] === "y"
      ) {
        let cost = "";
        for (
          let i = 0;
          10 > billArray[i + 3].toLowerCase() || billArray[i + 3] === ".";
          i++
        ) {
          cost = cost + billArray[i + 3];
        }
        salary = parseInt(cost);
      }
    }
    for (let i = 0; i + 7 < billArray.length; i++) {
      if (
        billArray[i].toLowerCase() === "c" &&
        billArray[i + 1].toLowerCase() === "o" &&
        billArray[i + 2].toLowerCase() === "m" &&
        billArray[i + 3].toLowerCase() === "p" &&
        billArray[i + 4].toLowerCase() === "u" &&
        billArray[i + 5].toLowerCase() === "t" &&
        billArray[i + 6].toLowerCase() === "e" &&
        billArray[i + 7].toLowerCase() === "r"
      ) {
        let cost = "";
        for (
          let i = 0;
          10 > billArray[i + 3].toLowerCase() || billArray[i + 3] === ".";
          i++
        ) {
          cost = cost + billArray[i + 3];
        }
        ComputersExpe =  parseInt(cost);
      }
    }
    for (let i = 0; i + 5 < billArray.length; i++) {
      if (
        billArray[i].toLowerCase() === "t" &&
        billArray[i + 1].toLowerCase() === "o" &&
        billArray[i + 2].toLowerCase() === "t" &&
        billArray[i + 3].toLowerCase() === "a" &&
        billArray[i + 4].toLowerCase() === "l"
      ) {
        let cost = "";
        for (
          let i = 0;
          10 > billArray[i + 3].toLowerCase() || billArray[i + 3] === ".";
          i++
        ) {
          cost = cost + billArray[i + 3];
        }
        totalcost =parseInt(cost);
      }
    }
    for (let i = 0; i + 4 < billArray.length; i++) {
      if (
        billArray[i].toLowerCase() === "p" &&
        billArray[i + 1].toLowerCase() === "a" &&
        billArray[i + 2].toLowerCase() === "n" &&
        billArray[i + 3].toLowerCase() === "n" &&
        billArray[i + 4].toLowerCase() === "o"
      ) {
        let cost = "";
        for (let i = 0; i < 11; i++) {
          cost = cost + billArray[i + 3];
        }
        panNo =  cost;
      }
    }
    console.log({
      invoiceDate,
      GST,
      SGST,
      CGST,
      salary,
      totalcost,
      ComputersExpe,
      buildingExp,
      panNo,
      misc,
    });
    return {
      invoiceDate,
      GST,
      SGST,
      CGST,
      salary,
      totalcost,
      ComputersExpe,
      buildingExp,
      panNo,
      misc,
    };
  // }else{
  //   console.log(billArray,"other")
  //   for (let i = 0; i < billArray.length; i++) {
  //     if (billArray[i].toLowerCase() === "Invoice Date :".toLowerCase()) {
  //       invoiceDate = billArray[i + 1];
  //     }
  //     if (billArray[i].toLowerCase() === "Invoice no :".toLowerCase()) {
  //       invoiceDate = billArray[i + 1];
  //     }
  //     if (billArray[i].toLowerCase() === "dated :".toLowerCase()) {
  //       invoiceDate = billArray[i + 1];
  //     }
  //     if (billArray[i].toLowerCase() === "PAN No:".toLowerCase()) {
  //       panNo = billArray[i + 1];
  //     }
  //     if (billArray[i].toLowerCase() === "PAN No :".toLowerCase()) {
  //       panNo = billArray[i + 1];
  //     }
  //     if (billArray[i].toLowerCase() === "GST Registration No:".toLowerCase()) {
  //       GSTNO = billArray[i + 1];
  //     }
  //     if (billArray[i].toLowerCase() === "GST".toLowerCase()) {
  //       GSTNO = billArray[i + 1];
  //       console.log(billArray[i]);
  //       console.log(billArray[i+1]);
  //       console.log(GSTNO);
  //     }
  //     if (billArray[i].toLowerCase() === "Order Number:".toLowerCase()) {
  //       orderNo = billArray[i + 1];
  //     }
  //     if (billArray[i].toLowerCase() === "Invoice Details :".toLowerCase()) {
  //       invoiceDetails = billArray[i + 1];
  //     }
  //     if (billArray[i].toLowerCase() === "Unit".toLowerCase() && billArray[i + 1].toLowerCase() === "Price".toLowerCase()) {
  //       unitPrice = parseFloat(billArray[i + 18].replace("₹", ""));
  //     }
  //     if (billArray[i].toLowerCase() === "Qty".toLowerCase()) {
  //       qty = parseFloat(billArray[i + 17]);
  //     }
  //     if (billArray[i].toLowerCase() === "Net".toLowerCase() && billArray[i + 1].toLowerCase() === "Amount".toLowerCase()) {
  //       netAmount = parseFloat(billArray[i + 17].replace("₹", ""));
  //     }
  //     if (billArray[i].toLowerCase() === "Tax".toLowerCase() && billArray[i + 1].toLowerCase() === "Rate".toLowerCase()) {
  //       taxRate = parseFloat(billArray[i + 16].replace("%", ""));
  //     }
  //     if (billArray[i].toLowerCase() === "Tax".toLowerCase() && billArray[i + 1].toLowerCase() === "Type".toLowerCase()) {
  //       taxType = billArray[i + 15];
  //     }
  //     if (billArray[i].toLowerCase() === "Tax".toLowerCase() && billArray[i + 1].toLowerCase() === "Amount".toLowerCase()) {
  //       taxAmount = parseFloat(billArray[i + 17].replace("₹", ""));
  //     }
  //     if (billArray[i].toLowerCase() === "TOTAL:".toLowerCase()) {
  //       totaltaxAmount = parseFloat(billArray[i + 1].replace("₹", ""));
  //       totalAmount = parseFloat(billArray[i + 2].replace("₹", ""));
  //     }
  //     if (billArray[i].toLowerCase() === "TOTAL".toLowerCase()) {
  //       totaltaxAmount = parseFloat(billArray[i + 1].replace("₹", ""));
  //       totalAmount = parseFloat(billArray[i + 2].replace("₹", ""));
  //     }
  //     if (billArray[i].toLowerCase() === "GRAND TOTAL".toLowerCase()) {
  //       totaltaxAmount = parseFloat(billArray[i + 1].replace("₹", ""));
  //       totalAmount = parseFloat(billArray[i + 2].replace("₹", ""));
  //     }
  //     if (billArray[i].toLowerCase() === "GRAND TOTAL :".toLowerCase()) {
  //       totaltaxAmount = parseFloat(billArray[i + 1].replace("₹", ""));
  //       totalAmount = parseFloat(billArray[i + 2].replace("₹", ""));
  //     }
  //     if (billArray[i].toLowerCase() === "TOTAL=".toLowerCase()) {
  //       totaltaxAmount = parseFloat(billArray[i + 1].replace("₹", ""));
  //       totalAmount = parseFloat(billArray[i + 2].replace("₹", ""));
  //     }
  //     if (billArray[i].toLowerCase() === "TOTAL=".toLowerCase()) {
  //       totaltaxAmount = parseFloat(billArray[i + 1].replace("₹", ""));
  //       totalAmount = parseFloat(billArray[i + 2].replace("₹", ""));
  //     }
  //     if (billArray[i].toLowerCase() === "TOTAL rs. ".toLowerCase()) {
  //       totaltaxAmount = parseFloat(billArray[i + 1].replace("₹", ""));
  //       totalAmount = parseFloat(billArray[i + 2].replace("₹", ""));
  //       console.log(totalAmount,"tota");
  //     }
  //     if (billArray[i].toLowerCase() === "GRAND TOTAL=".toLowerCase()) {
  //       totaltaxAmount = parseFloat(billArray[i + 1].replace("₹", ""));
  //       totalAmount = parseFloat(billArray[i + 2].replace("₹", ""));
  //     }
  //     if (billArray[i].toLowerCase() === "GRAND TOTAL =".toLowerCase()) {
  //       totaltaxAmount = parseFloat(billArray[i + 1].replace("₹", ""));
  //       totalAmount = parseFloat(billArray[i + 2].replace("₹", ""));
  //     }
   
  //   }
  //   return {
  //     invoiceDate,
  //     panNo,
  //     GSTNO,
  //     orderNo,
  //     invoiceDetails,
  //     unitPrice,
  //     qty,
  //     netAmount,
  //     taxRate,
  //     taxType,
  //     taxAmount,
  //     totaltaxAmount,
  //     totalAmount,
  //   };
  
  // }
}

//configuration
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});

mongoose
  .connect(process.env.mongoURL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));
//--------------------------------------------------------end-of-code------------------------------------------
