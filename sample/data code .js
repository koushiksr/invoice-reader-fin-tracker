// final invoice id code
function findMatchedDates(text, datePatterns, keywords) {
  let matchedDates = [];
  let processedIndices = []; // To keep track of the indices that have been processed

  for (let i = 0; i < datePatterns.length; i++) {
    const pattern = datePatterns[i];
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const date = match[0];
      let index = match.index;

      // Check if this index has already been processed
      if (processedIndices.includes(index)) {
        continue; // Skip this index
      }

      const startIndex = Math.max(index - 50, 0);
      const substring = text.substring(startIndex, index);

      // Check if this date has already been matched
      const alreadyMatched = matchedDates.some(
        (matchedDate) => matchedDate.index === index
      );

      if (!alreadyMatched) {
        // Check for the keyword in the substring
        let matchedKeyword = "";
        keywords.some((keyword) => {
          if (substring.includes(keyword)) {
            matchedKeyword = keyword;
            return true;
          }
          return false;
        });
        matchedDates.push({
          date: date,
          keyword: matchedKeyword,
          index: index,
        });

        // Update processed indices
        for (let j = index; j < index + date.length; j++) {
          processedIndices.push(j);
        }

        // Update index for the next iteration
        index += date.length;
      }
    }
  }

  return matchedDates;
}

// Sample PDF text extracted from the document
let text = `TaxInvoice/BillofSupply/CashMeeiceisnotademandforpedSignatoryOrderNumber:402-7797401-2704355InvoiceNumber:IN-523InvoiceDetails:PB-408402355-2324InvoiceDate:05.11.2023Sl.NoDescriptionUnitPriceQtyNetAmountTaxRateTaxypeTaxAmountTotalAmount1NICTORPolyvinylChlorideAdjustableSkippingRopeforMemandWomen(Blue,Black)|B08KS6J226(NICTOR-Blue-Black-Skipping_Rope)HSN:9506₹134.751₹134.7518%IGST₹24.25₹159.00TOTAL:₹24.25₹159.00AmountinWords:OneHundredFifty-nineonlyWhethertaxispayableunderreversecharge-NoSoldBy:ShivShaktiTraders*927amritviharbacksideverkamilkplantJALANDHAR,PUNJAB,144001INPANNo:BVCPR8908LGSTRegistrationNo:03BVCPR8908L1Z6DynamicQRCode:BillingAddress:RaviswamyPICAMPPvtLtd,BuildingNo:2,Hustlehubtechpark,HsrLayoutBENGALURU,KARNATAKA,560102INState/UTCode:29ShippingAddress:RaviswamyPRaviswamyPICAMPPvtLtd,BuildingNo:2,Hustlehubtechpark,HsrLayoutBENGALURU,KARNATAKA,560102INState/UTCode:29Placeofsupply:KARNATAKAPlaceofdelivery:KARNATAKAOrderDate:15.12.2023`;

const datePatterns = [
  // /\d{2}[.-/]\d{2}[.-/]\d{2}/g, // mm-dd-yy or mm/dd/yy or mm.dd.yy
  // /\d{2}[-/.]\d{2}[-/.]\d{2}/g, // mm-dd-yy or mm/dd/yy or mm.dd.yy
  // /\d{2}\d{2}\d{2}/g, // ddmmyy (e.g., 010123)
  /\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}/g, // dd Mon yyyy
  /\d{4}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}/g, // yyyy Mon dd
  /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}/g, // Mon dd
  // /\d{2}\d{2}\d{4}/g, // ddmmyyyy (e.g., 01012023)
  // /\d{4}\d{2}\d{2}/g, // yyyymmdd (e.g., 20230101)

  /\d{1,2}[.-/]\d{1,2}[.-/]\d{2}/g, // dd-mm-yy or dd/mm/yy or dd.mm.yy
  /\d{2}[-/]\d{2}[-/]\d{2}/g, // dd-mm-yy or dd/mm/yy (e.g., 01-01-23 or 01/01/23)
  /\d{2}-\d{2}-\d{2}/g, // yy-mm-dd (e.g., 23-01-01)
  /\d{2}\/\d{2}\/\d{2}/g, // yy/mm/dd (e.g., 23/01/01)
  /\d{2}\/\d{2}\/\d{2}/, // mm/dd/yy (e.g., 01/01/23)
  /\d{1,2}-\d{1,2}-\d{2}/g, // dd-mm-yy
  /\d{2}\.\d{2}\.\d{2}/, // yy.mm.dd (e.g., 23.01.01)
  /\d{2}\.\d{2}\.\d{2}/g, // dd.mm.yy
  /\d{1,2}[-/.]\d{1,2}[-/.]\d{2}/g, // dd-mm-yy or dd/mm/yy or dd.mm.yy
  /\d{1,2}\.\d{1,2}\.\d{4}/g, // dd.mm.yyyy
  /\d{1,2}[.-/]\d{1,2}[.-/]\d{4}/g, // dd-mm-yyyy or dd/mm/yyyy or dd.mm.yyyy
  /\d{4}[.-/]\d{1,2}[.-/]\d{1,2}/g, // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
  /\d{2}[.-/]\d{2}[.-/]\d{4}/g, // mm -dd-yyyy or mm/dd/yyyy or mm.dd.yyyy
  /\d{4}[.-/]\d{2}[.-/]\d{2}/g, // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
  /\d{4}\.\d{1,2}\.\d{1,2}/g, //yyyy.mm.dd
  /\d{1,2}[-/.]\d{1,2}[-/.]\d{4}/g, // dd-mm-yyyy or dd/mm/yyyy or dd.mm.yyyy
  /\d{4}[-/.]\d{1,2}[-/.]\d{1,2}/g, // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
  /\d{2}\.\d{2}\.\d{4}/g, // dd.md.yyyy
  /\d{2}-\d{2}-\d{4}/g, // 13-04-2019
  /\d{2}\/\d{2}\/\d{4}/g, // 05/11/2023
  /[A-Za-z]{3}\d{2},\d{4}/g, // Dec25,2022
  /\d{4}\/\d{2}\/\d{2}/g, // 2023/01/15
  /[A-Za-z]{3}\d{1,2},\d{4}/g, // Jan5,2023
  /\d{2}-[A-Za-z]{3}-\d{4}/g, // 15-Feb-2023
  /\d{4}-\d{1,2}-\d{1,2}/g, // yyyy-mm-dd
  /\d{1,2}\/\d{1,2}\/\d{4}/g, // mm/dd/yyyy
  /\d{4}\/\d{1,2}\/\d{1,2}/g, // yyyy/mm/dd
  /\d{2}[-/]\d{2}[-/]\d{4}/g, // dd-mm-yyyy or dd/mm/yyyy (e.g., 01-01-2023 or 01/01/2023)
  /\d{4}[-/]\d{2}[-/]\d{2}/g, // yyyy-mm-dd (e.g., 2023-01-01)
  /\d{4}-\d{2}-\d{2}/g, // yyyy-mm-dd (e.g., 2023-01-01)
  /\d{1,2}-\d{1,2}-\d{4}/g, // dd-mm-yyyy
  /\d{4}\.\d{2}\.\d{2}/, // yyyy.mm.dd (e.g., 2023.01.01)
  /\d{2}\.\d{2}\.\d{4}/, // dd.mm.yyyy (e.g., 01.01.2023)
  /\d{4}\.\d{2}\.\d{2}/g, // yyyy.mm.dd
  /\d{2}[-/.]\d{2}[-/.]\d{4}/g, // dd-mm-yyyy or dd/mm/yyyy or dd.mm.yyyy
  /\d{4}[-/.]\d{2}[-/.]\d{2}/g, // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
  /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}\s+\d{4}/g, // Mon dd yyyy
  /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+\d{4}/g, // Mon dd, yyyy
  /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[.-/]\d{1,2}[.-/]\d{4}/g, // Mon-dd-yyyy or Mon.dd.yyyy or Mon/dd/yyyy
  /\d{1,2}[.-/](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[.-/]\d{4}/g, // dd-Mon-yyyy or dd.Mon.yyyy or dd/Mon/yyyy
  /\d{4}[.-/](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[.-/]\d{1,2}/g, // yyyy-Mon-dd or yyyy.Mon.dd or yyyy/Mon/dd
  /\d{1,2}[.-/](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g, // dd-Mon or dd.Mon
  /\d{4}[.-/](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g, // yyyy-Mon or yyyy.Mon
];

const keywords = [
  "OrderDate",
  "InvoiceDate",
  "BillingDate",
  "Invoice",
  "Order",
  "Receipt",
  "Bill",
  "Payment",
  "Delivery",
  "Due",
  "Ship",
  "Arrival",
  "Completion",
  "Purchase",
  "Start",
  "End",
  "Booking",
  "Reservation",
  "Departure",
  "Return",
  "Renewal",
  "Expiry",
  "Installment",
  "Subscription",
  "Anniversary",
  "Membership",
  "Enrollment",
  "Birthday",
  "Contract",
  "Engagement",
  "Graduation",
  "Appointment",
  "Interview",
  "Offer",
  "Signing",
  "Ceremony",
  "Election",
  "Independence",
  "Declaration",
  "Constitution",
  "Incorporation",
  "Establishment",
  "Foundation",
  "Opening",
  "Launch",
  "Commemoration",
  "Recognition",
  "Holiday",
  "Festivity",
  "Celebration",
  "NewYear",
  "Valentine",
  "SaintPatrick",
  "AprilFool",
  "MotherDay",
  "FatherDay",
  "Easter",
  "MemorialDay",
  "LaborDay",
  "BastilleDay",
  "NationalDay",
  "VictoryDay",
  "Thanksgiving",
  "Halloween",
  "Christmas",
  "Hanukkah",
  "Diwali",
  "Eid",
  "Carnival",
  "Holi",
  "MakarSankranti",
  "Pongal",
  "RepublicDay",
  "InternationalWomensDay",
  "EarthDay",
  "WorldHealthDay",
  "InternationalWorkersDay",
  "InternationalYouthDay",
  "InternationalDayofFamilies",
  "InternationalDayofFriendship",
  "InternationalPeaceDay",
  "WorldChildrensDay",
  "HumanRightsDay",
  "NewYearsEve",
  "LeapYear",
  "Olympics",
  "WorldCup",
];

// Call the function and store the result
const matchedDates = findMatchedDates(text, datePatterns, keywords);

// Console the matched data
console.log(matchedDates);

// let text =
//   "InvoiceDatedfgdgg:13-04-2019gfdgdfgdfdfgOrderDate:05/11/2023ReceiptDatevsfsf:Dec25,2022hyhfrtyryrtBillDate:2022-12-31ytryrytrytyhrPaymentDate:2023/01/15tryDeliveryDate:Jan5,2023yrytryrDueDate15-Feb-2023ShipDate2023-03-20ArrivalDate:Mar25,2023CompletionDate:2023/04/10PurchaseDate:Apr15,2023StartDate:2023-05-01EndDate:May31,2023BookingDate:Jun10,2023ReservationDate:2023/07/20DepartureDate:Jul25,2023ReturnDate:2023-08-05RenewalDate:Aug10,2023ExpiryDate:2023/09/15InstallmentDate:Sep20,2023SubscriptionDate:2023-10-01AnniversaryDate:Oct05,2023MembershipDate:2023/11/15EnrollmentDate:Nov20,2023AnniversaryDate:Dec25,2023BirthdayDate:2024-01-10AnniversaryDate:Jan15,2024ContractDate:2024/02/20EngagementDate:Feb25,2024GraduationDate:2024-03-05AppointmentDate:Mar10,2024InterviewDate:2024/04/15OfferDate:Apr20,2024SigningDate:2024-";
// "05-01CeremonyDate:May05,2024ElectionDate:2024/06/10IndependenceDate:Jun15,2024DeclarationDate:2024-07-20ConstitutionDate:Jul25,2024FormationDate:2024/08/05IncorporationDate:Aug10,2024EstablishmentDate:2024-09-15FoundationDate:Sep20,2024OpeningDate:2024/10/01LaunchDate:Oct05,2024AnniversaryDate:2024-11-10CommemorationDate:Nov15,2024RecognitionDate:2024/12/20HolidayDate:Dec25,2024FestivityDate:2025-01-01CelebrationDate:Jan05,2025NewYearDate:2025/02/10ValentineDate:Feb14,2025SaintPatrickDate:2025-03-17AprilFoolDate:Mar01,2025MotherDayDate:2025/04/15FatherDayDate:Apr20,2025EasterDate:2025-05-01MemorialDayDate:May05,2025LaborDayDate:2025/06/10IndependenceDayDate:Jun15,2025BastilleDayDate:2025-07-20NationalDayDate:Jul25,2025VictoryDayDate:2025/08/05ThanksgivingDate:Aug10,2025HalloweenDate:2025-09-15ChristmasDate:2025/10/01HanukkahDate:Oct05,2025DiwaliDate:2025-11-10EidDate:Nov15,2025CarnivalDate:2025/12/20HoliDate:Dec25,2025MakarSankrantiDate:2026-01-01PongalDate:Jan05,2026RepublicDayDate:2026/02/10InternationalWomensDayDate:Feb14,2026EarthDayDate:2026-03-17WorldHealthDayDate:2026/04/15InternationalWorkersDayDate:May01,2026InternationalYouthDayDate:2026-05-01InternationalDayofFamiliesDate:2026/06/10InternationalDayofFriendshipDate:Jul15,2026InternationalPeaceDayDate:2026-09-21WorldChildrensDayDate:2026/11/20HumanRightsDayDate:Dec10,2026NewYearsEveDate:2026-12-31LeapYearDate:2027/02/29OlympicsDate:2027-07-23WorldCupDate:2027/11/22";
// let text = `InvoiceDate:13-04-2019OrderDate:05/11/2023ReceiptDate:Dec25,2022BillDate:2022-12-31SushankSinhanof205vgnsouthernavenuekatagkolathur,RegisteredMobile:9884206798UserNamedk_sinhaInvoiceNo2365518BillingDate13-4-2019BillingPeriod13-4-2019To13-05-2019PaidDatePreviousPaymentsPreviousBalanceCurrentMonthChargesAmountpayableAmountPaid00706.82706.820.00CurrentMonthBillDetails:DescriptionQuantityUnitCostTotalINTERCROWN_FUP_100MB_400GB_599(13-4-2019To13-05-2019)1599.00599.00SGST@9%onRs.599.00153.9153.91CGST@9%onRs.599.00153.9153.91TOTAL:706.82GRANDTOTAL:706.82PANNo:AABCL4079LGSTNo:33AABCL4079L1ZBHSN/SACNo:998422***Thisiscomputergeneratedreceiptnosignaturerequired***Thankyouforyourpromptpayment.`;
// function getRandomInt(min, max) {-
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

//------------------------------------------------------------------------------------------
// // Sample PDF text extracted from the document
// // const pdfText = `TaxInvoice/BillofSupply/CashMemo(OriginalforRecipient)*ASSPL-AmazonSellerServicesPvt.Ltd.,ARIPL-AmazonRetailIndiaPvt.Ltd.(onlywhereAmazonRetailIndiaPvt.Ltd.fulfillmentcenterisco-located)CustomersdesirousofavailinginputGSTcreditarerequestedtocreateaBusinessaccountandpurchaseonAmazon.in/businessfromBusinesseligibleoffersPleasenotethatthisinvoiceisnotademandforpaymentPage1of1ForShivShaktiTraders:AuthorizedSignatoryOrderNumber:402-7797401-2704355InvoiceNumber:IN-523OrderDate:05.11.2023InvoiceDetails:PB-408402355-2324InvoiceDate:05.11.2023Sl.NoDescriptionUnitPriceQtyNetAmountTaxRateTaxTypeTaxAmountTotalAmount1NICTORPolyvinylChlorideAdjustableSkippingRopeforMemandWomen(Blue,Black)|B08KS6J226(NICTOR-Blue-Black-Skipping_Rope)HSN:9506₹134.751₹134.7518%IGST₹24.25₹159.00TOTAL:₹24.25₹159.00AmountinWords:OneHundredFifty-nineonlyWhethertaxispayableunderreversecharge-NoSoldBy:ShivShaktiTraders*927amritviharbacksideverkamilkplantJALANDHAR,PUNJAB,144001INPANNo:BVCPR8908LGSTRegistrationNo:03BVCPR8908L1Z6DynamicQRCode:BillingAddress:RaviswamyPICAMPPvtLtd,BuildingNo:2,Hustlehubtechpark,HsrLayoutBENGALURU,KARNATAKA,560102INState/UTCode:29ShippingAddress:RaviswamyPRaviswamyPICAMPPvtLtd,BuildingNo:2,Hustlehubtechpark,HsrLayoutBENGALURU,KARNATAKA,560102INState/UTCode:29Placeofsupply:KARNATAKAPlaceofdelivery:KARNATAKA`;
// // const pdfText1 = `SushankSinhanof205vgnsouthernavenuekatagkolathur,RegisteredMobile:9884206798UserNamedk_sinhaInvoiceNo2365518BillingDate13-4-2019BillingPeriod13-4-2019To13-05-2019PaidDatePreviousPaymentsPreviousBalanceCurrentMonthChargesAmountpayableAmountPaid00706.82706.820.00CurrentMonthBillDetails:DescriptionQuantityUnitCostTotalINTERCROWN_FUP_100MB_400GB_599(13-4-2019To13-05-2019)1599.00599.00SGST@9%onRs.599.00153.9153.91CGST@9%onRs.599.00153.9153.91TOTAL:706.82GRANDTOTAL:706.82PANNo:AABCL4079LGSTNo:33AABCL4079L1ZBHSN/SACNo:998422***Thisiscomputergeneratedreceiptnosignaturerequired***Thankyouforyourpromptpayment.`;
// const text =
//   "InvoiceDate:13-04-2019OrderDate:05/11/2023ReceiptDate:Dec25,2022BillDate:2022-12-31PaymentDate:2023/01/15DeliveryDate:Jan5,2023DueDate:15-Feb-2023ShipDate:2023-03-20ArrivalDate:Mar25,2023CompletionDate:2023/04/10PurchaseDate:Apr15,2023StartDate:2023-05-01EndDate:May31,2023BookingDate:Jun10,2023ReservationDate:2023/07/20DepartureDate:Jul25,2023ReturnDate:2023-08-05RenewalDate:Aug10,2023ExpiryDate:2023/09/15InstallmentDate:Sep20,2023SubscriptionDate:2023-10-01AnniversaryDate:Oct05,2023MembershipDate:2023/11/15EnrollmentDate:Nov20,2023AnniversaryDate:Dec25,2023BirthdayDate:2024-01-10AnniversaryDate:Jan15,2024ContractDate:2024/02/20EngagementDate:Feb25,2024GraduationDate:2024-03-05AppointmentDate:Mar10,2024InterviewDate:2024/04/15OfferDate:Apr20,2024SigningDate:2024-";
// // "05-01CeremonyDate:May05,2024ElectionDate:2024/06/10IndependenceDate:Jun15,2024DeclarationDate:2024-07-20ConstitutionDate:Jul25,2024FormationDate:2024/08/05IncorporationDate:Aug10,2024EstablishmentDate:2024-09-15FoundationDate:Sep20,2024OpeningDate:2024/10/01LaunchDate:Oct05,2024AnniversaryDate:2024-11-10CommemorationDate:Nov15,2024RecognitionDate:2024/12/20HolidayDate:Dec25,2024FestivityDate:2025-01-01CelebrationDate:Jan05,2025NewYearDate:2025/02/10ValentineDate:Feb14,2025SaintPatrickDate:2025-03-17AprilFoolDate:Mar01,2025MotherDayDate:2025/04/15FatherDayDate:Apr20,2025EasterDate:2025-05-01MemorialDayDate:May05,2025LaborDayDate:2025/06/10IndependenceDayDate:Jun15,2025BastilleDayDate:2025-07-20NationalDayDate:Jul25,2025VictoryDayDate:2025/08/05ThanksgivingDate:Aug10,2025HalloweenDate:2025-09-15ChristmasDate:2025/10/01HanukkahDate:Oct05,2025DiwaliDate:2025-11-10EidDate:Nov15,2025CarnivalDate:2025/12/20HoliDate:Dec25,2025MakarSankrantiDate:2026-01-01PongalDate:Jan05,2026RepublicDayDate:2026/02/10InternationalWomensDayDate:Feb14,2026EarthDayDate:2026-03-17WorldHealthDayDate:2026/04/15InternationalWorkersDayDate:May01,2026InternationalYouthDayDate:2026-05-01InternationalDayofFamiliesDate:2026/06/10InternationalDayofFriendshipDate:Jul15,2026InternationalPeaceDayDate:2026-09-21WorldChildrensDayDate:2026/11/20HumanRightsDayDate:Dec10,2026NewYearsEveDate:2026-12-31LeapYearDate:2027/02/29OlympicsDate:2027-07-23WorldCupDate:2027/11/22";
// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// //--------------------------------------------------------------
// const datePatterns = [
//   /\d{2}-\d{2}-\d{4}/g, // Matches patterns like 13-04-2019
//   /\d{2}\/\d{2}\/\d{4}/g, // Matches patterns like 05/11/2023
//   /[A-Za-z]{3}\d{2},\d{4}/g, // Matches patterns like Dec25,2022
//   /\d{4}-\d{2}-\d{2}/g, // Matches patterns like 2022-12-31
//   /\d{4}\/\d{2}\/\d{2}/g, // Matches patterns like 2023/01/15
//   /[A-Za-z]{3}\d{1,2},\d{4}/g, // Matches patterns like Jan5,2023
//   /\d{2}-[A-Za-z]{3}-\d{4}/g, // Matches patterns like 15-Feb-2023
//   /[A-Za-z]{3}\d{1,2},\d{4}/g, // Matches patterns like Mar25,2023
//   /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+\d{4}\b/, // Mon dd, yyyy
//   /\b\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\b/, // dd Mon yyyy
//   /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}\s+\d{4}\b/, // Mon dd yyyy
//   /\b\d{4}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}\b/, // yyyy Mon dd
//   /\b\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/, // dd Mon
//   /\b\d{1,2}-\d{1,2}-\d{4}\b/, // dd-mm-yyyy
//   /\b\d{4}-\d{1,2}-\d{1,2}\b/, // yyyy-mm-dd
//   /\b\d{1,2}\/\d{1,2}\/\d{4}\b/, // mm/dd/yyyy
//   /\b\d{4}\/\d{1,2}\/\d{1,2}\b/, // yyyy/mm/dd
//   /\b\d{1,2}\.\d{1,2}\.\d{4}\b/, // dd.mm.yyyy
//   /\b\d{4}\.\d{1,2}\.\d{1,2}\b/, // yyyy.mm.dd
//   /\b\d{1,2}:\d{1,2}:\d{1,2}\b/, // hh:mm:ss
//   /\b\d{1,2}[-/.]\d{1,2}[-/.]\d{4}\b/, // dd-mm-yyyy or dd/mm/yyyy or dd.mm.yyyy
//   /\b\d{4}[-/.]\d{1,2}[-/.]\d{1,2}\b/, // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
//   /\b\d{1,2}[-/.]\d{1,2}[-/.]\d{2}\b/, // dd-mm-yy or dd/mm/yy or dd.mm.yy
//   /\b\d{2}[-/.]\d{2}[-/.]\d{4}\b/, // mm-dd-yyyy or mm/dd/yyyy or mm.dd.yyyy
//   /\b\d{4}[-/.]\d{2}[-/.]\d{2}\b/, // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
//   /\b\d{2}[-/.]\d{2}[-/.]\d{2}\b/, // mm-dd-yy or mm/dd/yy or mm.dd.yy
//   /\b\d{2}:\d{2}:\d{2}\b/, // hh:mm:ss
//   /\b\d{1,2}:\d{1,2}\s*(?:AM|PM)\b/i, // hh:mm AM/PM
// ];

// // Define an array of keywords to search for
// const keywords = [
//   "Invoice",
//   "Order",
//   "Receipt",
//   "Bill",
//   "Payment",
//   "Delivery",
//   "Due",
//   "Ship",
//   "Arrival",
//   "Completion",
//   "Purchase",
//   "Start",
//   "End",
//   "Booking",
//   "Reservation",
//   "Departure",
//   "Return",
//   "Renewal",
//   "Expiry",
//   "Installment",
//   "Subscription",
//   "Anniversary",
//   "Membership",
//   "Enrollment",
//   "Birthday",
//   "Contract",
//   "Engagement",
//   "Graduation",
//   "Appointment",
//   "Interview",
//   "Offer",
//   "Signing",
//   "Ceremony",
//   "Election",
//   "Independence",
//   "Declaration",
//   "Constitution",
//   "Incorporation",
//   "Establishment",
//   "Foundation",
//   "Opening",
//   "Launch",
//   "Commemoration",
//   "Recognition",
//   "Holiday",
//   "Festivity",
//   "Celebration",
//   "NewYear",
//   "Valentine",
//   "SaintPatrick",
//   "AprilFool",
//   "MotherDay",
//   "FatherDay",
//   "Easter",
//   "MemorialDay",
//   "LaborDay",
//   "BastilleDay",
//   "NationalDay",
//   "VictoryDay",
//   "Thanksgiving",
//   "Halloween",
//   "Christmas",
//   "Hanukkah",
//   "Diwali",
//   "Eid",
//   "Carnival",
//   "Holi",
//   "MakarSankranti",
//   "Pongal",
//   "RepublicDay",
//   "InternationalWomensDay",
//   "EarthDay",
//   "WorldHealthDay",
//   "InternationalWorkersDay",
//   "InternationalYouthDay",
//   "InternationalDayofFamilies",
//   "InternationalDayofFriendship",
//   "InternationalPeaceDay",
//   "WorldChildrensDay",
//   "HumanRightsDay",
//   "NewYearsEve",
//   "LeapYear",
//   "Olympics",
//   "WorldCup",
// ];

// // Initialize an array to store matched dates and their corresponding words
// const matchedDates = [];

// // Match each pattern against the text and push the matches to the array
// datePatterns.forEach((pattern) => {
//   let match;
//   while ((match = pattern.exec(text)) !== null) {
//     const index = match.index;
//     const lastTwentyChars = text.substring(index - 20, index);
//     const matchedKeyword = keywords.find((keyword) =>
//       lastTwentyChars.includes(keyword)
//     );
//     matchedDates.push({
//       date: match[0],
//       lastTwentyChars: lastTwentyChars,
//       keyword: matchedKeyword,
//     });
//   }
// });

// // Log all matched dates and their corresponding last 20 characters and keywords
// console.log(matchedDates);

//----------------------------------------------------------------
// // Define a regular expression to match the date pattern
// const dateRegex = /(\d{1,2}-\d{1,2}-\d{4})/;
// const pattern1 = /\b\d{1,2}-\d{1,2}-\d{4}\b/;
// const pattern2 = /\b\d{4}-\d{1,2}-\d{1,2}\b/;
// const pattern3 =
//   /\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?) (?:0?[1-9]|[12][0-9]|3[01]), (?:19|20)?\d{2}\b/;
// const pattern4 =
//   /\b(?:0?[1-9]|[12][0-9]|3[01]) (?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?), (?:19|20)?\d{2}\b/;
// const pattern5 = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/;
// const pattern6 = /\b\d{4}\/\d{1,2}\/\d{1,2}\b/;
// const pattern7 = /\b\d{1,2}\.\d{1,2}\.\d{4}\b/;
// const pattern8 = /\b\d{4}\.\d{1,2}\.\d{1,2}\b/;

// // Initialize an empty object to store the parsed data
// let parsedData = {};

// // Match the date pattern in the PDF text
// const match = pdfText.match(dateRegex);

// // If a match is found, store it in the parsed data
// if (match && match[0]) {
//   parsedData["InvoiceDate"] = match[0];
// }

// // Output the parsed data
// console.log(parsedData);
///////////////////////////////////------------------------------------------14th date

//--------------------------------------------------------------
// const datePatterns = [
//   /\d{2}-\d{2}-\d{4}/g, // Matches patterns like 13-04-2019
//   /\d{2}\/\d{2}\/\d{4}/g, // Matches patterns like 05/11/2023
//   /[A-Za-z]{3}\d{2},\d{4}/g, // Matches patterns like Dec25,2022
//   /\d{4}-\d{2}-\d{2}/g, // Matches patterns like 2022-12-31
//   /\d{4}\/\d{2}\/\d{2}/g, // Matches patterns like 2023/01/15
//   /[A-Za-z]{3}\d{1,2},\d{4}/g, // Matches patterns like Jan5,2023
//   /\d{2}-[A-Za-z]{3}-\d{4}/g, // Matches patterns like 15-Feb-2023
//   /[A-Za-z]{3}\d{1,2},\d{4}/g, // Matches patterns like Mar25,2023
//   /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+\d{4}/, // Mon dd, yyyy
//   /\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}/, // dd Mon yyyy
//   /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}\s+\d{4}/, // Mon dd yyyy
//   /\d{4}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}/, // yyyy Mon dd
//   /\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/, // dd Mon
//   /\d{1,2}-\d{1,2}-\d{4}/, // dd-mm-yyyy
//   /\d{4}-\d{1,2}-\d{1,2}/, // yyyy-mm-dd
//   /\d{1,2}\/\d{1,2}\/\d{4}/, // mm/dd/yyyy
//   /\d{4}\/\d{1,2}\/\d{1,2}/, // yyyy/mm/dd
//   /\d{1,2}:\d{1,2}:\d{1,2}/, // hh:mm:ss
//   /\d{2}:\d{2}:\d{2}/, // hh:mm:ss
//   /\d{1,2}:\d{1,2}\s*(?:AM|PM)/i, // hh:mm AM/PM
//   // Matches patterns like ddmmyyyy (e.g., 01012023)
//   /\d{2}\d{2}\d{4}/,
//   // Matches patterns like ddmmyy (e.g., 010123)
//   /\d{2}\d{2}\d{2}/,
//   // Matches patterns like mmddyyyy (e.g., 01012023)
//   /\d{2}\d{2}\d{4}/,
//   // Matches patterns like mmddyy (e.g., 010123)
//   /\d{2}\d{2}\d{2}/,
//   // Matches patterns like yyyymmdd (e.g., 20230101)
//   /\d{4}\d{2}\d{2}/,
//   // Matches patterns like yyddmm (e.g., 230101)
//   /\d{2}\d{2}\d{2}/,
//   // Matches patterns like dd-mm-yyyy or dd/mm/yyyy (e.g., 01-01-2023 or 01/01/2023)
//   /\d{2}[-/]\d{2}[-/]\d{4}/,
//   // Matches patterns like dd-mm-yy or dd/mm/yy (e.g., 01-01-23 or 01/01/23)
//   /\d{2}[-/]\d{2}[-/]\d{2}/,
//   // Matches patterns like mm-dd-yyyy or mm/dd/yyyy (e.g., 01-01-2023 or 01/01/2023)
//   /\d{2}[-/]\d{2}[-/]\d{4}/,
//   // Matches patterns like mm-dd-yy or mm/dd/yy (e.g., 01-01-23 or 01/01/23)
//   /\d{2}[-/]\d{2}[-/]\d{2}/,
//   // Matches patterns like yyyy-mm-dd (e.g., 2023-01-01)
//   /\d{4}[-/]\d{2}[-/]\d{2}/,
//   // Matches patterns like yy-mm-dd (e.g., 23-01-01)
//   /\d{2}[-/]\d{2}[-/]\d{2}/,
//   // Matches patterns like yyy-mm-dd (e.g., 2023-01-01)
//   /\d{4}-\d{2}-\d{2}/,
//   // Matches patterns like yy-mm-dd (e.g., 23-01-01)
//   /\d{2}-\d{2}-\d{2}/,
//   // Matches patterns like dd-mm-yyyy (e.g., 01-01-2023)
//   /\d{2}-\d{2}-\d{4}/,
//   // Matches patterns like dd-mm-yy (e.g., 01-01-23)
//   /\d{2}-\d{2}-\d{2}/,
//   // Matches patterns like mm-dd-yyyy (e.g., 01-01-2023)
//   /\d{2}-\d{2}-\d{4}/,
//   // Matches patterns like mm-dd-yy (e.g., 01-01-23)
//   /\d{2}-\d{2}-\d{2}/,
//   // Matches patterns like yyyy/mm/dd (e.g., 2023/01/01)
//   /\d{4}\/\d{2}\/\d{2}/,
//   // Matches patterns like yy/mm/dd (e.g., 23/01/01)
//   /\d{2}\/\d{2}\/\d{2}/,
//   // Matches patterns like dd/mm/yyyy (e.g., 01/01/2023)
//   /\d{2}\/\d{2}\/\d{4}/,
//   // Matches patterns like dd/mm/yy (e.g., 01/01/23)
//   /\d{2}\/\d{2}\/\d{2}/,
//   // Matches patterns like mm/dd/yyyy (e.g., 01/01/2023)
//   /\d{2}\/\d{2}\/\d{4}/,
//   // Matches patterns like mm/dd/yy (e.g., 01/01/23)
//   /\d{2}\/\d{2}\/\d{2}/,
//   /\d{2}\/\d{2}\/\d{4}/g, // Matches patterns like 05/11/2023
//   /\d{4}\/\d{2}\/\d{2}/g, // Matches patterns like 2023/01/15
//   /\d{2}\/\d{2}\/\d{4}/g, // mm/dd/yyyy
//   /\d{4}\/\d{2}\/\d{2}/g, // yyyy/mm/dd
//   /\d{2}\/\d{2}\/\d{2}/g, // mm/dd/yy
//   /\d{2}-\d{2}-\d{4}/g, // Matches patterns like 13-04-2019
//   /\d{2}-[A-Za-z]{3}-\d{4}/g, // Matches patterns like 15-Feb-2023
//   /\d{1,2}-\d{1,2}-\d{4}/g, // dd-mm-yyyy
//   /\d{4}-\d{2}-\d{2}/g, // yyyy-mm-dd
//   /\d{1,2}-\d{1,2}-\d{2}/g, // dd-mm-yy
//   /\d{2}-\d{2}-\d{4}/g, // dd-mm-yyyy
//   /\d{2}-\d{2}-\d{2}/g, // dd-mm-yy
//   /\d{2}-[A-Za-z]{3}-\d{4}/g, // dd-Mon-yyyy
//   /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+\d{4}/g, // Mon dd, yyyy
//   /\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}/g, // dd Mon yyyy
//   /\d{4}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}/g, // yyyy Mon dd
//   ///.............................................................
//   // Matches patterns like yyyy.mm.dd (e.g., 2023.01.01)
//   /\d{4}\.\d{2}\.\d{2}/,
//   // Matches patterns like yy.mm.dd (e.g., 23.01.01)
//   /\d{2}\.\d{2}\.\d{2}/,
//   // Matches patterns like dd.mm.yyyy (e.g., 01.01.2023)
//   /\d{2}\.\d{2}\.\d{4}/,
//   // Matches patterns like dd.mm.yy (e.g., 01.01.23)
//   /\d{2}\.\d{2}\.\d{2}/,
//   // Matches patterns like mm.dd.yyyy (e.g., 01.01.2023)
//   /\d{2}\.\d{2}\.\d{4}/,
//   // Matches patterns like mm.dd.yy (e.g., 01.01.23)
//   /\d{2}\.\d{2}\.\d{2}/,
//   /\d{4}\.\d{2}\.\d{2}/g, // Matches patterns like 2023.01.01
//   /\d{2}\.\d{2}\.\d{4}/g, // dd.mm.yyyy
//   /\d{2}\.\d{2}\.\d{2}/g, // dd.mm.yy
//   /\d{2}\.\d{2}\.\d{4}/g, // mm.dd.yyyy
//   /\d{2}\.\d{2}\.\d{2}/g, // mm.dd.yy
//   /\d{4}\.\d{2}\.\d{2}/g, // yyyy.mm.dd
//   /\d{2}\.\d{2}\.\d{4}/g, // mm.dd.yyyy
//   /\d{2}\.\d{2}\.\d{2}/g, // mm.dd.yy
//   /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[.-/]\d{1,2}[.-/]\d{4}/g, // Mon-dd-yyyy or Mon.dd.yyyy or Mon/dd/yyyy
//   /\d{1,2}[.-/](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[.-/]\d{4}/g, // dd-Mon-yyyy or dd.Mon.yyyy or dd/Mon/yyyy
//   /\d{4}[.-/](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[.-/]\d{1,2}/g, // yyyy-Mon-dd or yyyy.Mon.dd or yyyy/Mon/dd
//   /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}/g, // Mon dd
//   /\d{1,2}[.-/](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g, // dd-Mon or dd.Mon
//   /\d{4}[.-/](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)/g, // yyyy-Mon or yyyy.Mon
//   /\d{1,2}[.-/]\d{1,2}[.-/]\d{4}/g, // dd-mm-yyyy or dd/mm/yyyy or dd.mm.yyyy
//   /\d{4}[.-/]\d{1,2}[.-/]\d{1,2}/g, // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
//   /\d{1,2}[.-/]\d{1,2}[.-/]\d{2}/g, // dd-mm-yy or dd/mm/yy or dd.mm.yy
//   /\d{2}[.-/]\d{2}[.-/]\d{4}/g, // mm -dd-yyyy or mm/dd/yyyy or mm.dd.yyyy
//   /\d{4}[.-/]\d{2}[.-/]\d{2}/g, // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
//   /\d{2}[.-/]\d{2}[.-/]\d{2}/g, // mm-dd-yy or mm/dd/yy or mm.dd.yy
//   /\d{1,2}\.\d{1,2}\.\d{4}/, // dd.mm.yyyy
//   /\d{4}\.\d{1,2}\.\d{1,2}/, //
//   /\d{1,2}[-/.]\d{1,2}[-/.]\d{4}/, // dd-mm-yyyy or dd/mm/yyyy or dd.mm.yyyy
//   /\d{4}[-/.]\d{1,2}[-/.]\d{1,2}/, // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
//   /\d{1,2}[-/.]\d{1,2}[-/.]\d{2}/, // dd-mm-yy or dd/mm/yy or dd.mm.yy
//   /\d{2}[-/.]\d{2}[-/.]\d{4}/, // mm-dd-yyyy or mm/dd/yyyy or mm.dd.yyyy
//   /\d{4}[-/.]\d{2}[-/.]\d{2}/, // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
//   /\d{2}[-/.]\d{2}[-/.]\d{2}/, // mm-dd-yy or mm/dd/yy or mm.dd.yy
// ];

//
// const datePatterns = [
//   /\d{2}\/\d{2}\/\d{4}/g, // Matches patterns like 05/11/2023
//   /\d{4}\/\d{2}\/\d{2}/g, // Matches patterns like 2023/01/15
//   /\b\d{2}\/\d{2}\/\d{4}\b/g, // mm/dd/yyyy
//   /\b\d{4}\/\d{2}\/\d{2}\b/g, // yyyy/mm/dd
//   /\b\d{2}\/\d{2}\/\d{2}\b/g, // mm/dd/yy
//   /\d{4}\.\d{2}\.\d{2}/g, // Matches patterns like 2023.01.01
//   /\b\d{2}\.\d{2}\.\d{4}\b/g, // dd.mm.yyyy
//   /\b\d{2}\.\d{2}\.\d{2}\b/g, // dd.mm.yy
//   /\b\d{2}\.\d{2}\.\d{4}\b/g, // mm.dd.yyyy
//   /\b\d{2}\.\d{2}\.\d{2}\b/g, // mm.dd.yy
//   /\b\d{4}\.\d{2}\.\d{2}\b/g, // yyyy.mm.dd
//   /\b\d{2}\.\d{2}\.\d{4}\b/g, // mm.dd.yyyy
//   /\b\d{2}\.\d{2}\.\d{2}\b/g, // mm.dd.yy
//   /\d{2}-\d{2}-\d{4}/g, // Matches patterns like 13-04-2019
//   /\d{2}-[A-Za-z]{3}-\d{4}/g, // Matches patterns like 15-Feb-2023
//   /\b\d{1,2}-\d{1,2}-\d{4}\b/g, // dd-mm-yyyy
//   /\b\d{4}-\d{2}-\d{2}\b/g, // yyyy-mm-dd
//   /\b\d{1,2}-\d{1,2}-\d{2}\b/g, // dd-mm-yy
//   /\b\d{2}-\d{2}-\d{4}\b/g, // dd-mm-yyyy
//   /\b\d{2}-\d{2}-\d{2}\b/g, // dd-mm-yy
//   /\b\d{2}-[A-Za-z]{3}-\d{4}\b/g, // dd-Mon-yyyy
//   /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2},\s+\d{4}\b/g, // Mon dd, yyyy
//   /\b\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\b/g, // dd Mon yyyy
//   /\b\d{4}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}\b/g, // yyyy Mon dd
//   /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[.-/]\d{1,2}[.-/]\d{4}\b/g, // Mon-dd-yyyy or Mon.dd.yyyy or Mon/dd/yyyy
//   /\b\d{1,2}[.-/](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[.-/]\d{4}\b/g, // dd-Mon-yyyy or dd.Mon.yyyy or dd/Mon/yyyy
//   /\b\d{4}[.-/](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[.-/]\d{1,2}\b/g, // yyyy-Mon-dd or yyyy.Mon.dd or yyyy/Mon/dd
//   /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}\b/g, // Mon dd
//   /\b\d{1,2}[.-/](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g, // dd-Mon or dd.Mon
//   /\b\d{4}[.-/](?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/g, // yyyy-Mon or yyyy.Mon
//   /\b\d{1,2}[.-/]\d{1,2}[.-/]\d{4}\b/g, // dd-mm-yyyy or dd/mm/yyyy or dd.mm.yyyy
//   /\b\d{4}[.-/]\d{1,2}[.-/]\d{1,2}\b/g, // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
//   /\b\d{1,2}[.-/]\d{1,2}[.-/]\d{2}\b/g, // dd-mm-yy or dd/mm/yy or dd.mm.yy
//   /\b\d{2}[.-/]\d{2}[.-/]\d{4}\b/g, // mm -dd-yyyy or mm/dd/yyyy or mm.dd.yyyy
//   /\b\d{4}[.-/]\d{2}[.-/]\d{2}\b/g, // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
//   /\b\d{2}[.-/]\d{2}[.-/]\d{2}\b/g, // mm-dd-yy or mm/dd/yy or mm.dd.yy
// ];
