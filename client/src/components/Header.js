import React from "react";
import "./Header.css";
import bdm from "../images/bdmlogo.jpeg";
import cbse from "../images/cbselogo.jpeg";

function Header({ user }) {
  console.log(user);
  return (
    <div className="header">
      <div className={`item1 ${user ? '' : 'full-width'}`}>
        <img src={cbse} alt="CBSE" width="150px" />
        <div>
          <h1 style={{ color: "rgb(233, 68, 68)", margin: "0px", padding: "0px" }}>
            <strong>BDM Public School Meerganj Bareilly</strong>
          </h1>
          <h3 style={{ margin: "0px", padding: "0px" }}>
            (C.B.S.E. Coeducational, Senior Secondary, English Medium School)
          </h3>
          <h1 style={{ color: "yellow", margin: "5px 0px" }}>Online Mock Test for</h1>
          <h2 style={{ color: "white", marginTop: "0px" }}>
            Information Technology (Skill code - 402)
          </h2>
        </div>
        <img src={bdm} alt="BDM" width="250px" />
      </div>

      {/* Conditionally render item2 only if user exists */}
      {user ? (
        <div className="item2" style={{ justifySelf: "end", fontWeight: "bold", color: "white", background: "blue" }}>
          <h2 style={{ textAlign: "center", padding: "0px", margin: "2px" }}>Student Details</h2>
          <table border="black" cellPadding="5px" width="100%">
            <tbody>
              <tr>
                <td width="30%">Roll No:</td>
                <td width="70%">{user?.rollNo}</td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>{user?.name}</td>
              </tr>
              <tr>
                <td>Class:</td>
                <td>{user?.class}</td>
              </tr>
              <tr>
                <td>Section:</td>
                <td>{user?.section}</td>
              </tr>
              <tr>
                <td>DOB:</td>
                <td>{user?.dob}</td>
              </tr>
              <tr>
                <td>Subject:</td>
                <td>IT</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="item2" style={{ width: "100%" }}>
          {/* Empty div to fill the space when user is not present */}
          <center><h1>Welcome Learners</h1></center>
        </div>
      )}
    </div>
  );
}

export default Header;
