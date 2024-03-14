// // let text =
// //   "InvoiceDatedfgdgg:13-04-2019gfdgdfgdfdfgOrderDate:05/11/2023ReceiptDatevsfsf:Dec25,2022hyhfrtyryrtBillDate:2022-12-31ytryrytrytyhrPaymentDate:2023/01/15tryDeliveryDate:Jan5,2023yrytryrDueDate15-Feb-2023ShipDate2023-03-20ArrivalDate:Mar25,2023CompletionDate:2023/04/10PurchaseDate:Apr15,2023StartDate:2023-05-01EndDate:May31,2023BookingDate:Jun10,2023ReservationDate:2023/07/20DepartureDate:Jul25,2023ReturnDate:2023-08-05RenewalDate:Aug10,2023ExpiryDate:2023/09/15InstallmentDate:Sep20,2023SubscriptionDate:2023-10-01AnniversaryDate:Oct05,2023MembershipDate:2023/11/15EnrollmentDate:Nov20,2023AnniversaryDate:Dec25,2023BirthdayDate:2024-01-10AnniversaryDate:Jan15,2024ContractDate:2024/02/20EngagementDate:Feb25,2024GraduationDate:2024-03-05AppointmentDate:Mar10,2024InterviewDate:2024/04/15OfferDate:Apr20,2024SigningDate:2024-05-01CeremonyDate:May05,2024ElectionDate:2024/06/10IndependenceDate:Jun15,2024DeclarationDate:2024-07-20ConstitutionDate:Jul25,2024FormationDate:2024/08/05IncorporationDate:Aug10,2024EstablishmentDate:2024-09-15FoundationDate:Sep20,2024OpeningDate:2024/10/01LaunchDate:Oct05,2024AnniversaryDate:2024-11-10CommemorationDate:Nov15,2024RecognitionDate:2024/12/20HolidayDate:Dec25,2024FestivityDate:2025-01-01CelebrationDate:Jan05,2025NewYearDate:2025/02/10ValentineDate:Feb14,2025SaintPatrickDate:2025-03-17AprilFoolDate:Mar01,2025MotherDayDate:2025/04/15FatherDayDate:Apr20,2025EasterDate:2025-05-01MemorialDayDate:May05,2025LaborDayDate:2025/06/10IndependenceDayDate:Jun15,2025BastilleDayDate:2025-07-20NationalDayDate:Jul25,2025VictoryDayDate:2025/08/05ThanksgivingDate:Aug10,2025HalloweenDate:2025-09-15ChristmasDate:2025/10/01HanukkahDate:Oct05,2025DiwaliDate:2025-11-10EidDate:Nov15,2025CarnivalDate:2025/12/20HoliDate:Dec25,2025MakarSankrantiDate:2026-01-01PongalDate:Jan05,2026RepublicDayDate:2026/02/10InternationalWomensDayDate:Feb14,2026EarthDayDate:2026-03-17WorldHealthDayDate:2026/04/15InternationalWorkersDayDate:May01,2026InternationalYouthDayDate:2026-05-01InternationalDayofFamiliesDate:2026/06/10InternationalDayofFriendshipDate:Jul15,2026InternationalPeaceDayDate:2026-09-21WorldChildrensDayDate:2026/11/20HumanRightsDayDate:Dec10,2026NewYearsEveDate:2026-12-31LeapYearDate:2027/02/29OlympicsDate:2027-07-23WorldCupDate:2027/11/22";
// // let text = `InvoiceDate:13-04-2019OrderDate:05/11/2023ReceiptDate:Dec25,2022BillDate:2022-12-31SushankSinhanof205vgnsouthernavenuekatagkolathur,RegisteredMobile:9884206798UserNamedk_sinhaInvoiceNo2365518BillingDate13-4-2019BillingPeriod13-4-2019To13-05-2019PaidDatePreviousPaymentsPreviousBalanceCurrentMonthChargesAmountpayableAmountPaid00706.82706.820.00CurrentMonthBillDetails:DescriptionQuantityUnitCostTotalINTERCROWN_FUP_100MB_400GB_599(13-4-2019To13-05-2019)1599.00599.00SGST@9%onRs.599.00153.9153.91CGST@9%onRs.599.00153.9153.91TOTAL:706.82GRANDTOTAL:706.82PANNo:AABCL4079LGSTNo:33AABCL4079L1ZBHSN/SACNo:998422***Thisiscomputergeneratedreceiptnosignaturerequired***Thankyouforyourpromptpayment.`;
// // let text = `TaxInvoice/BillofSupply/CashMeeiceisnotademandforpedSignatoryOrderNumber:402-7797401-2704355InvoiceNumber:IN-523InvoiceDetails:PB-408402355-2324InvoiceDate:05.11.2023Sl.NoDescriptionUnitPriceQtyNetAmountTaxRateTaxypeTaxAmountTotalAmount1NICTORPolyvinylChlorideAdjustableSkippingRopeforMemandWomen(Blue,Black)|B08KS6J226(NICTOR-Blue-Black-Skipping_Rope)HSN:9506₹134.751₹134.7518%IGST₹24.25₹159.00TOTAL:₹24.25₹159.00AmountinWords:OneHundredFifty-nineonlyWhethertaxispayableunderreversecharge-NoSoldBy:ShivShaktiTraders*927amritviharbacksideverkamilkplantJALANDHAR,PUNJAB,144001INPANNo:BVCPR8908LGSTRegistrationNo:03BVCPR8908L1Z6DynamicQRCode:BillingAddress:RaviswamyPICAMPPvtLtd,BuildingNo:2,Hustlehubtechpark,HsrLayoutBENGALURU,KARNATAKA,560102INState/UTCode:29ShippingAddress:RaviswamyPRaviswamyPICAMPPvtLtd,BuildingNo:2,Hustlehubtechpark,HsrLayoutBENGALURU,KARNATAKA,560102INState/UTCode:29Placeofsupply:KARNATAKAPlaceofdelivery:KARNATAKAOrderDate:15.12.2023`;
// // let text = "";
// // const datePatterns = [
// //   // Common date formats
// //   /\d{2}[-/.]\d{2}[-/.]\d{4}/g, // dd-mm-yyyy or dd/mm/yyyy or dd.mm.yyyy
// //   /\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}/g, // dd Mon yyyy
// //   /\d{4}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}/g, // yyyy Mon dd
// //   /(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}/g, // Mon dd
// //   // Less common date formats
// //   // Add less common date formats here
// //   // Special cases
// //   /[A-Za-z]{3}\d{2},\d{4}/g, // Dec25,2022
// //   /[A-Za-z]{3}\d{1,2},\d{4}/g, // Jan5,2023
// //   /\d{2}-[A-Za-z]{3}-\d{4}/g, // 15-Feb-2023
// //   /\d{4}-\d{1,2}-\d{1,2}/g, // yyyy-mm-dd
// //   /\d{1,2}\/\d{1,2}\/\d{4}/g, // mm/dd/yyyy
// //   /\d{4}\/\d{1,2}\/\d{1,2}/g, // yyyy/mm/dd
// //   /\d{4}\.\d{1,2}\.\d{1,2}/g, //yyyy.mm.dd
// //   /\d{2}\.\d{2}\.\d{4}/g, // dd.mm.yyyy
// //   /\d{4}[.-/]\d{1,2}[.-/]\d{1,2}/g, // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
// //   /\d{4}[.-/]\d{2}[.-/]\d{2}/g, // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
// //   /\d{4}[.-/]\d{2}[.-/]\d{2}/g, // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
// //   /\d{4}[.-/]\d{2}[.-/]\d{2}/g, // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
// //   /\d{4}[.-/]\d{2}[.-/]\d{2}/g, // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
// //   /\d{4}[.-/]\d{2}[.-/]\d{2}/g, // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
// //   /\d{4}[.-/]\d{2}[.-/]\d{2}/g, // yyyy-mm-dd or yyyy/mm/dd or yyyy.mm.dd
// //   /\d{2}[-/.]\d{2}[-/.]\d{2}/g, // mm-dd-yy or mm/dd/yy or mm.dd.yy
// //   /\d{1,2}[-/.]\d{1,2}[-/.]\d{2}/g, // dd-mm-yy or dd/mm/yy or dd.mm.yy
// //   /\d{2}[-/]\d{2}[-/]\d{2}/g, // dd-mm-yy or dd/mm/yy (e.g., 01-01-23 or 01/01/23)
// //   /\d{2}-\d{2}-\d{2}/g, // yy-mm-dd (e.g., 23-01-01)
// //   /\d{2}\/\d{2}\/\d{2}/g, // yy/mm/dd (e.g., 23/01/01)
// //   /\d{2}\.\d{2}\.\d{2}/g, // dd.mm.yy
// // ];

// // const keywords = [
// //   "OrderDate",
// //   "InvoiceDate",
// //   "BillingDate",
// //   "Invoice",
// //   "Order",
// //   "Receipt",
// //   "Bill",
// //   "Payment",
// //   "Delivery",
// //   "Due",
// //   "Ship",
// //   "Arrival",
// //   "Completion",
// //   "Purchase",
// //   "Start",
// //   "End",
// //   "Booking",
// //   "Reservation",
// //   "Departure",
// //   "Return",
// //   "Renewal",
// //   "Expiry",
// //   "Installment",
// //   "Subscription",
// //   "Anniversary",
// //   "Membership",
// //   "Enrollment",
// //   "Birthday",
// //   "Contract",
// //   "Engagement",
// //   "Graduation",
// //   "Appointment",
// //   "Interview",
// //   "Offer",
// //   "Signing",
// //   "Ceremony",
// //   "Election",
// //   "Independence",
// //   "Declaration",
// //   "Constitution",
// //   "Incorporation",
// //   "Establishment",
// //   "Foundation",
// //   "Opening",
// //   "Launch",
// //   "Commemoration",
// //   "Recognition",
// //   "Holiday",
// //   "Festivity",
// //   "Celebration",
// //   "NewYear",
// //   "Valentine",
// //   "SaintPatrick",
// //   "AprilFool",
// //   "MotherDay",
// //   "FatherDay",
// //   "Easter",
// //   "MemorialDay",
// //   "LaborDay",
// //   "BastilleDay",
// //   "NationalDay",
// //   "VictoryDay",
// //   "Thanksgiving",
// //   "Halloween",
// //   "Christmas",
// //   "Hanukkah",
// //   "Diwali",
// //   "Eid",
// //   "Carnival",
// //   "Holi",
// //   "MakarSankranti",
// //   "Pongal",
// //   "RepublicDay",
// //   "InternationalWomensDay",
// //   "EarthDay",
// //   "WorldHealthDay",
// //   "InternationalWorkersDay",
// //   "InternationalYouthDay",
// //   "InternationalDayofFamilies",
// //   "InternationalDayofFriendship",
// //   "InternationalPeaceDay",
// //   "WorldChildrensDay",
// //   "HumanRightsDay",
// //   "NewYearsEve",
// //   "LeapYear",
// //   "Olympics",
// //   "WorldCup",
// // ];

function extractContextByKeywords(text, patterns, keywords) {
  text = text.toLowerCase();
  keywords = keywords.map((k) => k.toLowerCase());
  const result = [];
  const seen = new Set();

  patterns.forEach((pattern) => {
    const matches = Array.from(text.matchAll(pattern));
    matches.forEach((match) => {
      const index = match.index;
      const matchedText = match[0];
      const startIndex = Math.max(0, index - 20);
      const context = text.substring(startIndex, index);
      keywords.forEach((keyword) => {
        if (context.includes(keyword)) {
          const key = `${keyword}-${matchedText}`;
          if (!seen.has(key)) {
            result.push({ keyword, matchedText });
            seen.add(key);
          }
        }
      });
    });
  });

  return result;
}

const patterns = [
  /[a-z]{5}\d{4}[a-z]/g,
  /[a-z]{5}\d{4}[a-z]/g,
  /[a-z]{5}\d{4}[a-z]/g,
  /[a-z]{5}\d{4}[a-z]/g,
];
const keywords = ["pan", "panno"];
const text =
  "InvoiceDate:13-04-2019OrderDate:05/11/2023ReceiptDatedqwdodkowkdowkdowkowkoijiemfewmjdfikwPANNo:BVCPR8908L";
const result = extractContextByKeywords(text, patterns, keywords);
console.log(result);
