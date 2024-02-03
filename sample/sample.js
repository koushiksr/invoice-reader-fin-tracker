function extractValueWithConditions(billArray, conditions) {
  conditions = conditions.split("");
  const conditionSet = new Set(conditions);

  for (let i = 0; i < billArray.length; i++) {
    let dynamicConditionMet = true;

    for (let j = 0; j < conditions.length; j++) {
      if (billArray[i]?.toLowerCase() !== conditions[j]) {
        dynamicConditionMet = false;
        break;
      }
      i++;
    }

    if (dynamicConditionMet) {
      let value = "";
      while (
        i < billArray.length &&
        (!isNaN(billArray[i]) || conditionSet.has(billArray[i]))||billArray[i ] === "."|| (billArray[i ] === "."&& billArray[i+1 ] === ".")
      ) {
        value += billArray[i];
        i++;
      }
      let result = parseFloat(value)!=="NaN"?parseFloat(value):value;
      return isNaN(result) ? null : result;
    }
  }

  return null;
}

let billArray =
  "TaxInvoice/BillofSupply/CashMemo(OriginalforRecipient)*ASSPL-AmazonSellerServicesPvt.Ltd.,ARIPL-AmazonRetailIndiaPvt.Ltd.(onlywhereAmazonRetailIndiaPvt.Ltd.fulfillmentcenterisco-located)CustomersdesirousofavailinginputGSTcreditarerequestedtocreateaBusinessaccountandpurchaseonAmazon.in/businessfromBusinesseligibleoffersPleasenotethatthisinvoiceisnotademandforpaymentPage1of1ForShivShaktiTraders:AuthorizedSignatoryOrderNumber:402-7797401-2704355InvoiceNumber:IN-523OrderDate:05.11.2023InvoiceDetails:PB-408402355-2324InvoiceDate:05.11.2023Sl.NoDescriptionUnitPriceQtyNetAmountTaxRateTaxTypeTaxAmountTotalAmount1NICTORPolyvinylChlorideAdjustableSkippingRopeforMemandWomen(Blue,Black)|B08KS6J226(NICTOR-Blue-Black-Skipping_Rope)HSN:9506₹134.751₹134.7518%IGST₹24.25₹159.00TOTAL:₹24.25₹159.00AmountinWords:OneHundredFifty-nineonlyWhethertaxispayableunderreversecharge-NoSoldBy:ShivShaktiTraders*927amritviharbacksideverkamilkplantJALANDHAR,PUNJAB,144001INPANNo:BVCPR8908LGSTRegistrationNo:03BVCPR8908L1Z6DynamicQRCode:BillingAddress:RaviswamyPICAMPPvtLtd,BuildingNo:2,Hustlehubtechpark,HsrLayoutBENGALURU,KARNATAKA,560102INState/UTCode:29ShippingAddress:RaviswamyPRaviswamyPICAMPPvtLtd,BuildingNo:2,Hustlehubtechpark,HsrLayoutBENGALURU,KARNATAKA,560102INState/UTCode:29Placeofsupply:KARNATAKAPlaceofdelivery:KARNATAKA";

let conditions = ["gst:₹", "total:₹","orderdate:"];



for (let i = 0; i < conditions.length; i++) {
  const element = conditions[i];
  let extractedValue = extractValueWithConditions(billArray, conditions[i]);
  console.log("Extracted Value:", extractedValue);
}
// function extractDateWithConditions(billArray, conditions) {
//     conditions = conditions.split("");
//     const conditionSet = new Set(conditions);
  
//     for (let i = 0; i < billArray.length; i++) {
//       let dynamicConditionMet = true;
  
//       for (let j = 0; j < conditions.length; j++) {
//         if (billArray[i]?.toLowerCase() !== conditions[j]) {
//           dynamicConditionMet = false;
//           break;
//         }
//         i++;
//       }
  
//       if (dynamicConditionMet) {
//         let date = "";
//         let dotCount = 0;
  
//         while (i < billArray.length && (conditionSet.has(billArray[i]) || dotCount < 2)) {
//           if (billArray[i] === '.') {
//             dotCount++;
//           }
//           date += billArray[i];
//           i++;
//         }
  
//         // Continue capturing characters until a non-numeric character is encountered
//         while (i < billArray.length && !isNaN(billArray[i])) {
//           date += billArray[i];
//           i++;
//         }
  
//         return date.trim();
//       }
//     }
  
//     return null;
//   }
  
// //   let billArray =
// //     "gst:₹1000TaxInvoice/BillofSupply/CashMemo(OriginalforRecipient)*ASSPL-AmazonSellerServicesPvt.Ltd.,ARIPL-AmazonRetailIndiaPvt.Ltd.(onlywhereAmazonRetailIndiaPvt.Ltd.fulfillmentcenterisco-located)CustomersdesirousofavailinginputGSTcreditarerequestedtocreateaBusinessaccountandpurchaseonAmazon.in/businessfromBusinesseligibleoffersPleasenotethatthisinvoiceisnotademandforpaymentPage1of1ForShivShaktiTraders:AuthorizedSignatoryOrderNumber:402-7797401-2704355InvoiceNumber:IN-523OrderDate:05.11.2023InvoiceDetails:PB-408402355-2324InvoiceDate:05.11.2023Sl.NoDescriptionUnitPriceQtyNetAmountTaxRateTaxTypeTaxAmountTotalAmount1NICTORPolyvinylChlorideAdjustableSkippingRopeforMemandWomen(Blue,Black)|B08KS6J226(NICTOR-Blue-Black-Skipping_Rope)HSN:9506₹134.751₹134.7518%IGST₹24.25₹159.00TOTAL:₹24.25₹159.00AmountinWords:OneHundredFifty-nineonlyWhethertaxispayableunderreversecharge-NoSoldBy:ShivShaktiTraders*927amritviharbacksideverkamilkplantJALANDHAR,PUNJAB,144001INPANNo:BVCPR8908LGSTRegistrationNo:03BVCPR8908L1Z6DynamicQRCode:BillingAddress:RaviswamyPICAMPPvtLtd,BuildingNo:2,Hustlehubtechpark,HsrLayoutBENGALURU,KARNATAKA,560102INState/UTCode:29ShippingAddress:RaviswamyPRaviswamyPICAMPPvtLtd,BuildingNo:2,Hustlehubtechpark,HsrLayoutBENGALURU,KARNATAKA,560102INState/UTCode:29Placeofsupply:KARNATAKAPlaceofdelivery:KARNATAKA";
  
//    conditions = ["orderdate:"];
  
//   for (let i = 0; i < conditions.length; i++) {
//     const element = conditions[i];
//     let extractedDate = extractDateWithConditions(billArray, conditions[i]);
//     console.log("Extracted Date:", extractedDate);
//   }
  