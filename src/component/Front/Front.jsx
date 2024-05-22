import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
let id  = ""

export default function Front() {
  useEffect(() => {
    getData();
  }, []);

  const [btnupdate, setBtnUpdate
  ] = useState(false)

  const [datainput, setDataInput] = useState({
    Name: "",
    Price: "",
    Category: "",
    Description: "",
    Model: "",
  });

  const [dataValue, setdataValue] = useState([]);

  function changeDataInput(e) {
    let newDataInput = { ...datainput };

    newDataInput[e.target.name] = e.target.value;

    setDataInput(newDataInput);
  }

  async function sendData() {
    await axios.post(
      "https://664a6605a300e8795d41ddd6.mockapi.io/front",
      datainput
    );
    getData();
    document.getElementById("form").reset();
  }

  async function getData() {
    let { data } = await axios.get(
      "https://664a6605a300e8795d41ddd6.mockapi.io/front"
    );

    setdataValue(data);
  }
  async function deleteUser(id) {
    await axios.delete(
      `https://664a6605a300e8795d41ddd6.mockapi.io/front/${id}`
    );

    toast.success("مسحتلك أمووو ")
    getData();
  }
  function updateValue(index) {
    setBtnUpdate(true)

    id = index.id

    document.getElementById("name").value = index.Name;
    document.getElementById("price").value = index.Price;
    document.getElementById("category").value = index.Category;
    document.getElementById("description").value = index.Description;
    document.getElementById("Model").value = index.Model;
  }
 async  function updateUser() {
   await axios.put(`https://664a6605a300e8795d41ddd6.mockapi.io/front/${id}`,{
      Name: document.getElementById("name").value,
      Price: document.getElementById("price").value,
      Category: document.getElementById("category").value,
      Description: document.getElementById("description").value,
      Model: document.getElementById("Model").value,
    });
    getData()
    setBtnUpdate(false)
    
    document.getElementById("form").reset();
  }



  function submitData(e) {
    e.preventDefault();

    
    if(document.getElementById("name").value ==""){
        toast.error("الرجاء ادخال الاسم وصحصح كده ")

    }
    else{

        sendData();
        toast.success("اتسجل ي ريس  ")
    }


  }
  function updateDataUser(e) {
    e.preventDefault();
    updateUser()

    
  }

  return (
    <>
      <div className="   container mt-5">
        <h1 className="text-success text-center fw-bolder">
          تسجيل دبلومه Front-end
        </h1>
        <form id="form">
          <div>
            <input
              type="text"
              onChange={changeDataInput}
              name="Name"
              className="form-control mb-3"
              id="name"
              placeholder="أسم ألمتدرب "
            />

            <input
              type="text"
              onChange={changeDataInput}
              name="Price"
              className="form-control mb-3"
              id="price"
              placeholder="ألمبلغ ألمحجوز بي "
            />

            <input
              type="text"
              onChange={changeDataInput}
              name="Category"
              className="form-control mb-3"
              id="category"
              placeholder="ألمبلغ ألمتبقي "
            />

            <input
              type="text"
              onChange={changeDataInput}
              name="Description"
              className="form-control mb-3"
              id="description"
              placeholder=" رقم تلفون الطالب اللي حجز بي"
            />
            <input
              type="text"
              onChange={changeDataInput}
              name="Model"
              className="form-control mb-3"
              id="Model"
              placeholder="نوع ألدبلومه "
            />
          </div>
        {!btnupdate?  <button
            className="btn btn-outline-primary mx-2 btn-add"
            onClick={submitData}
            id="submit"
          >
            تسجيل ألطالب
          </button>:""}


          {btnupdate?<button className="btn btn-outline-warning  btn-update" 
          id="update"
          onClick={updateDataUser}>
            أضافه ألتعديل{" "}
          </button>:""}
        </form>
        <table className="table mt-5 text-center table-responsive table-bordered  table-hover  text-capitalize  ">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">أسم ألطالب</th>
              <th scope="col">ألمبلغ المحجوز بي</th>
              <th scope="col">ألمبلغ ألمتبقي</th>
              <th scope="col">رقم تلفون ألطالب</th>
              <th scope="col">حاجز اي</th>
              <th scope="col">مسح </th>
              <th scope="col">تعديل </th>
            </tr>
          </thead>
          <tbody id="tbody">
            {dataValue.map((x) => (
              <tr key={x.id}>
                <th scope="row">{x.id}</th>
                <td>{x.Name}</td>
                <td>{x.Price}</td>
                <td>{x.Category}</td>
                <td>{x.Description}</td>
                <td>{x.Model}</td>
                <td>
                  {" "}
                  <button
                    className="btn btn-outline-danger "
                    onClick={() => deleteUser(x.id)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-warning "
                    onClick={() => updateValue(x)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
