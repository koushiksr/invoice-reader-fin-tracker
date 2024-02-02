import React, { useState,useEffect  } from "react";
import "./sales.css";
const required = (value) => Boolean(value);
import axios from "axios";
import Spinner from "../../utils/Spinner"


function Sales() {
  const [formData, setFormData] = useState({
    customerName: "",
    contactEmail: "",
    contactPhone: "",
    softwareType: "",
    salesperson: "",
    saleDate: "",
    licenseType: "",
    quantity: 0,
    transactionAmount: 0,
    leadSource: "",
    internalNotes: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [salesData, setSalesData] = useState([]);
  const [totalrevenue, setTotalrevenue] = useState();
  const [totalQuantity, setTotalQuantity] = useState();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/sales/getAll");
        console.log("API Response:", response.data);
        if (response.data) {
          setSalesData(response.data);
        }
        let total=0;
        let total1=0;
        response.data.map((sale) => {
          total = total + parseInt(sale.transactionAmount);
          total1 = total1 + parseInt(sale.quantity);
      });
            // localStorage.setItem("total",total)
       setTotalrevenue(total);
       setTotalQuantity(total1);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchData();
  }, [data]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
  setIsLoading(true)
    event.preventDefault();

    let hasErrors = false;
    const newErrors = {};
    if (
      !formData.customerName ||
      !formData.contactEmail ||
      !formData.contactPhone ||
      !formData.softwareType ||
      !formData.licenseType ||
      !formData.salesperson ||
      !formData.saleDate ||
      !formData.quantity ||
      !formData.transactionAmount ||
      !formData.leadSource ||
      !formData.internalNotes
    ) {
      alert("All fields are required");
      return;
    }
    if (!formData.customerName.trim()) {
      alert("customerName is required ");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      alert("Invalid email address");
      return;
    }
    if (!/^\d{10}$/.test(formData.contactPhone)) {
      alert("Invalid phone number");
      return;
    }
    if (!formData.salesperson.trim()) {
      alert("salesperson is required ");
      return;
    }
    if (!formData.quantity.trim()) {
      alert("quantity is required ");
      return;
    }
    if (!formData.transactionAmount.trim()) {
      alert("transactionAmount is required ");
      return;
    }
    if (!formData.leadSource.trim()) {
      alert("leadSource is required ");
      return;
    }
    if (!formData.internalNotes.trim()) {
      alert("internalNotes is required ");
      return;
    }
    if (!formData.saleDate > new Date()) {
      alert("internalNotes is required ");
      return;
    }

    for (const field in formData) {
      if (required(formData[field])) {
        if (!formData[field]) {
          hasErrors = true;
          newErrors[field] = "This field is required.";
        }
      }
    }

    setErrors(hasErrors ? newErrors : {});

    if (!hasErrors) {
      console.log(formData);
      
      try {
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:5000/sales",
          formData
          );
                if(response.data.message){
                alert(response.data.message)
                }
                if(response.status==200){
               setData(response.data);
              //  formData={}
                }
      } catch (error) {
        setErrors(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
 
  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
      {loading ?<Spinner color={'#36D7B7'} loading={loading} size={150} />: 
      <div className="mainDiv">
          <form onSubmit={handleSubmit}>
            <h2>Sales Information</h2>
            <div className="form-group">
              <label htmlFor="customerName">Customer Name:</label>
              <input
                type="text"
                name="customerName"
                id="customerName"
                value={formData.customerName}
                onChange={handleChange}
                required
              />
              {errors.customerName && (
                <p className="error">{errors.customerName}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="contactEmail">Customer Email:</label>
              <input
                type="text"
                name="contactEmail"
                id="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
              />
              {errors.contactEmail && (
                <p className="error">{errors.contactEmail}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="contactPhone">Customer Phone:</label>
              <input
                type="number"
                name="contactPhone"
                id="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                required
              />
              {errors.contactPhone && (
                <p className="error">{errors.contactPhone}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="licenseType">License Type:</label>
              <select
                name="licenseType"
                id="licenseType"
                value={formData.licenseType}
                onChange={handleChange}
                required
              >
                <option value="">Select a license type</option>
                <option value="individual">Individual</option>
                <option value="team">Team</option>
                <option value="enterprise">Enterprise</option>
                <option value="educational">Educational</option>
                <option value="non-profit">Non-Profit</option>
              </select>
              {errors.licenseType && (
                <p className="error">{errors.licenseType}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="softwareType">Software Type:</label>
              <select
                name="softwareType"
                id="softwareType"
                value={formData.softwareType}
                onChange={handleChange}
                required
              >
                <option value="">Select a license type</option>
                <option value="individual">Individual</option>
                <option value="team">Team</option>
                <option value="enterprise">Enterprise</option>
                <option value="educational">Educational</option>
                <option value="non-profit">Non-Profit</option>
              </select>
              {errors.softwareType && (
                <p className="error">{errors.softwareType}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="leadSource">leadSource:</label>
              <input
                type="text"
                name="leadSource"
                id="leadSource"
                value={formData.leadSource}
                onChange={handleChange}
                required
              />
              {errors.leadSource && (
                <p className="error">{errors.leadSource}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="saleDate">saleDate:</label>
              <input
                type="date"
                name="saleDate"
                id="saleDate"
                value={formData.saleDate}
                onChange={handleChange}
                required
              />
              {errors.saleDate && <p className="error">{errors.saleDate}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="salesperson">salesperson:</label>
              <input
                type="text"
                name="salesperson"
                id="salesperson"
                value={formData.salesperson}
                onChange={handleChange}
                required
              />
              {errors.salesperson && (
                <p className="error">{errors.salesperson}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min={1}
              />
              {errors.quantity && <p className="error">{errors.quantity}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="transactionAmount">Transaction Amount:</label>
              <input
                type="number"
                name="transactionAmount"
                id="transactionAmount"
                value={formData.transactionAmount}
                onChange={handleChange}
                min={0}
              />
              {errors.transactionAmount && (
                <p className="error">{errors.transactionAmount}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="internalNotes">Internal Notes:</label>
              <textarea
                name="internalNotes"
                id="internalNotes"
                value={formData.internalNotes}
                onChange={handleChange}
              />
            </div>

            <button type="submit" disabled={Object.keys(errors).length > 0}>
              Submit Sale
            </button>
          </form>
          <div>
            <h1>Sales Data:</h1>
            <ul>
              <li>Total Revenue : {totalrevenue}</li>
              <li>Total Quantity : {totalQuantity}</li>
            </ul>
          </div>
        </div>
      }
    </>
  );
}

export default Sales;
