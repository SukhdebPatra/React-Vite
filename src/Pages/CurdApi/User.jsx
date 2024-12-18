import React, { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);
  const [inputData, setInputData] = useState({
    name: "",
    email: "",
    id: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const getData = () => {
    axios
      .get(`http://localhost:5000/users`)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
        console.log(users);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // debugger
    if (isEditMode) {
      const updatedData = {
        name: inputData.name,
        Useremail: inputData.email,
        id: inputData.id,
      };
      axios
        .put(`http://localhost:5000/users/${inputData.id}`, updatedData)
        .then((res) => {
          console.log(res.data);
          //    const updatedUsers = users.map((user) =>
          //   user.id === inputData.id ? res.data : user
          // );
          // setUsers(updatedUsers)
          setInputData({ name: "", email: "", id: null });
          setIsEditMode(false); // Reset edit mode after saving
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const data = {
        name: inputData.name,
        Useremail: inputData.email,
        id: inputData.id,
      };
      axios
        .post(`http://localhost:5000/users/`, data)
        .then((res) => {
          console.log(res.data);

          setUsers([...users, res.data]); // Add new user to the state
          setInputData({ name: "", email: "", id: "" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleEditPreFillData = (user) => {
    setInputData({
      name: user.name,
      email: user.Useremail,
      id: user.id, // Set the ID so we know which user to update
    });
    setIsEditMode(true);
  };
  const hadnleDelete = (userId) => {
    console.log(userId);
    axios
      .delete(`http://localhost:5000/users/${userId}`)
      .then((res) => {
        console.log(res.data, "user deleted");
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <div className="container">
          <h3>{isEditMode ? "Edit User" : "Add New User"}</h3>
          <div className="row">
            <div className="col-6 mb-2">
              <input
                type="text"
                placeholder="enter your Id"
                className="form-control"
                name="id"
                id=""
                value={inputData.id || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <input
                type="text"
                placeholder="enter your name"
                className="form-control"
                name="name"
                id=""
                value={inputData.name || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <input
                type="text"
                placeholder="enter your Email"
                className="form-control"
                name="email"
                id=""
                onChange={handleChange}
                value={inputData.email || ""}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-6 mt-3">
              <button className="btn btn-primary">
                {" "}
                {isEditMode ? "Save Changes" : "Add User"}
              </button>
            </div>
          </div>
        </div>
      </form>
      <h3>Users List</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Oprations</th>
          </tr>
        </thead>
        <tbody>
          {
            // Array.isArray(users) && users.length > 0 ? (
            users.map((user, id) => (
              <tr key={user.id}>
                <td>{user.id} -</td>
                <td>{user.name}</td>
                <td>{user.Useremail}</td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => handleEditPreFillData(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => hadnleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
            // ) : (
            //   <p>No users found</p>
            // )
          }
        </tbody>
      </table>
    </>
  );
};

export default User;
