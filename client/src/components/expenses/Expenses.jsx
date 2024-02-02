import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../utils/Spinner";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./expense.css";
const Expenses = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [expData, setExpData] = useState(null);
  const [resData, setResData] = useState(null);
  const [data, setData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formFinalData, setFormFinalData] = useState({
    invoiceDate: "",
    // panNo: "",
    // GSTNO: "",
    // orderNo: "",
    // invoiceDetails: "",
    // unitPrice: "",
    // qty: "",
    // netAmount: "",
    // taxRate: "",
    // taxType: "",
    // taxAmount: "",
    // totaltaxAmount: "",
    // totalAmount: "",
  });
  useEffect(() => {
    expenseData();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    const formData = new FormData();
    formData.append("pdfFile", event.target.files[0]);

    axios
      .post(`http://localhost:5000/expense/upload/${data}`, formData)
      .then((response) => {
        setResData(response.data.data);
        if (response.status === 200) {
          setData(true);
          console.log(response.data.data);
          setFormFinalData(response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`http://localhost:5000/expense/upload/${data}`, formFinalData)
      .then((response) => {
        if (response.status == 200) {
          setSuccess(true);
          expenseData();
        }
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const expenseData = () => {
    axios
      .get("http://localhost:5000/expense/getall")
      .then((response) => {
        if (response.data !== undefined || response.data !== null) {
          setExpData(response.data);
        } else {
          console.log("expense data is empty");
        }
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();

    setFormFinalData({
      ...formFinalData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = (e) => {
  // e.preventDefault();
  // console.log('Form submitted:', formData);
  // Add logic to send the data to the server or perform further actions
  // };

  const excludeFields = ["_id", "__v"];
  pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

  return (
    <>
      <div>
        <input type="file" onChange={handleFileChange} accept=".pdf" />
        {/* <button onClick={handleUpload}>Upload PDF</button> */}
      </div>
      <div>
        {file && (
          <div className="mainpdfreaderdiv">
            <div>
              <h1 style={{ textAlign: "center" }}>
                <u>PDF data</u>
              </h1>
              <Document file={file}>
                <Page pageNumber={1} />
                {/* <Page pageNumber={2} />
            <Page pageNumber={3} />
            <Page pageNumber={4} /> */}
              </Document>
            </div>
            {resData ? (
              <div>
                <div>
                  <h1 style={{ textAlign: "center" }}>
                    <u>Parsed data </u>
                  </h1>
                  <table>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "center" }}>Feilds</th>
                        <th style={{ textAlign: "center" }}>Values</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(resData).map(([key, value]) => (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              ""
            )}
            <div>
              <h1>form</h1>
              <div>
                <form onSubmit={handleUpload}>
                  <label htmlFor="invoiceDate">Invoice Date:</label>
                  <input
                    type="text"
                    id="invoiceDate"
                    name="invoiceDate"
                    value={formFinalData.invoiceDate}
                    onChange={handleChange}
                  />
                  <label htmlFor="panNo">Pan Number:</label>
                  <input
                    type="text"
                    id="panNo"
                    name="panNo"
                    value={formFinalData.panNo}
                    onChange={handleChange}
                  /> 

                  <label htmlFor="GSTNO">GST Number:</label>
                  <input
                    type="text"
                    id="GSTNO"
                    name="GSTNO"
                    value={formFinalData.GSTNO}
                    onChange={handleChange}
                  />

                  <label htmlFor="orderNo">Order Number:</label>
                  <input
                    type="text"
                    id="orderNo"
                    name="orderNo"
                    value={formFinalData.orderNo}
                    onChange={handleChange}
                  />

                  <label htmlFor="invoiceDetails">Invoice Details:</label>
                  <input
                    type="text"
                    id="invoiceDetails"
                    name="invoiceDetails"
                    value={formFinalData.invoiceDetails}
                    onChange={handleChange}
                  />

                  <label htmlFor="unitPrice">Unit Price:</label>
                  <input
                    type="number"
                    id="unitPrice"
                    name="unitPrice"
                    value={formFinalData.unitPrice}
                    onChange={handleChange}
                  />

                  <label htmlFor="qty">Quantity:</label>
                  <input
                    type="number"
                    id="qty"
                    name="qty"
                    value={formFinalData.qty}
                    onChange={handleChange}
                  />

                  <label htmlFor="netAmount">Net Amount:</label>
                  <input
                    type="number"
                    id="netAmount"
                    name="netAmount"
                    value={formFinalData.netAmount}
                    onChange={handleChange}
                  />

                  <label htmlFor="taxRate">Tax Rate:</label>
                  <input
                    type="number"
                    id="taxRate"
                    name="taxRate"
                    value={formFinalData.taxRate}
                    onChange={handleChange}
                  />

                  <label htmlFor="taxType">Tax Type:</label>
                  <input
                    type="text"
                    id="taxType"
                    name="taxType"
                    value={formFinalData.taxType}
                    onChange={handleChange}
                  />

                  <label htmlFor="taxAmount">Tax Amount:</label>
                  <input
                    type="number"
                    id="taxAmount"
                    name="taxAmount"
                    value={formFinalData.taxAmount}
                    onChange={handleChange}
                  />

                  <label htmlFor="totaltaxAmount">Total Tax Amount:</label>
                  <input
                    type="number"
                    id="totaltaxAmount"
                    name="totaltaxAmount"
                    value={formFinalData.totaltaxAmount}
                    onChange={handleChange}
                  />

                  <label htmlFor="totalAmount">Total Amount:</label>
                  <input
                    type="number"
                    id="totalAmount"
                    name="totalAmount"
                    value={formFinalData.totalAmount}
                    onChange={handleChange}
                  />
                  {success ? (
                    <p>File uploaded successfully!</p>
                  ) : (
                    <button type="submit">Upload PDF</button>
                  )}

                  {/* <button type="submit">Upload PDF</button> */}

                  {/* <button type="submit">Submit</button> */}
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      {loading ? (
        <Spinner color={"#36D7B7"} loading={loading} size={150} />
      ) : expData ? (
        <div className="expense-container">
          {Object.keys(expData).map((category) => {
            const categoryTotal = expData[category].reduce((acc, item) => {
              const filteredItem = Object.fromEntries(
                Object.entries(item).filter(
                  ([key]) => !excludeFields.includes(key)
                )
              );
              return (
                acc +
                Object.values(filteredItem).reduce(
                  (sum, value) => sum + value,
                  0
                )
              );
            }, 0);

            return (
              <div key={category} className="category">
                <h2>{category.toUpperCase()}</h2>
                <div className="items">
                  {expData[category].map((item) => (
                    <div key={item._id} className="item">
                      {Object.entries(item).map(([key, value]) =>
                        excludeFields.includes(key) ? null : (
                          <p key={key}>
                            {key}: {value}
                          </p>
                        )
                      )}
                    </div>
                  ))}
                </div>
                <div className="total">
                  <p>Total: {categoryTotal}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Expenses;
