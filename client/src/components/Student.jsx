// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import StudentCard from "./card/StudentCard";
// import { useSelector } from "react-redux";
// import { Button } from "@mui/material";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import StudentRegistrationForm from "../components/form/StudentRegistrationForm";

// const StudentList = () => {
//   const [students, setStudents] = useState([]);
//   const { username } = useSelector((state) => state.login);
//   const [open, setOpen] = useState(false);
//   const [Class,setClass] = useState();
//   const [id,setId] = useState();
//   const [empty,setEmpty]=useState(false);
//   const [url,setUrl] =useState('http://localhost:3000/students');
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${url}`);

//         const data = response.data;
//         data?setEmpty(false):setEmpty(true)
//         console.log("1st", data);
//         const normalizedData = Array.isArray(data) ? data : [data];
//         setStudents(normalizedData);
//         console.log("2nd", students);
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//       }
//     };
//     fetchData();
//   }, [url]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = async(e)=>{
//     e.preventDefault();
//     if(!id&&!Class){
//       setUrl('http://localhost:3000/students');
//     }else if(!id){
//       setUrl(`http://localhost:3000/students/${Class}`);
//     }else{
//       setUrl(`http://localhost:3000/students/${Class}/${id}`);
//     }
//     console.log(id,Class);
//   }

//   return (
//     <>
//       <h1 className="text-center text-2xl mb-4">Student List</h1>

//       <h1>{empty&&<h1>hello world</h1>}</h1>
//       {username && (
//         <div className="flex justify-start mb-4 pl-5">
//           <Button variant="contained" color="primary" onClick={handleClickOpen}>
//             Add Student
//           </Button>
//         </div>
//       )}

//       <form onClick={handleSubmit} className="flex flex-col justify-center items-center p-4 bg-gray-100 rounded-lg shadow-md w-2/4 lg:w-2/5  mx-auto mt-2">
//       <div className="flex flex-col w-full mb-4">
//         <input
//           placeholder="Class"
//           onChange={(e)=>{setClass(e.target.value)}}
//           type='number'
//           className="border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//         />
//         <input
//           placeholder="ID"
//           onChange={(e)=>{setId(e.target.value)}}
//           type="number"
//           className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
//         />
//       </div>
//       <div className="w-full flex justify-center">
//         <button
//           type="submit"
//           className="m-2 bg-teal-500 w-full md:w-1/2 p-2 rounded-md text-white hover:bg-lime-500 transition-colors duration-300 ease-in-out"
//         >
//           Submit
//         </button>
//       </div>
//     </form>

//       <div className="flex flex-row flex-wrap justify-center items-center gap-[20px] m-10">
//         {students.map((student, index) => (
//           <StudentCard
//             key={index}
//             name={student.name}
//             fatherName={student.fatherName}
//             motherName={student.motherName}
//             Class={student.Class}
//             address={student.address}
//             photo={`../../public/image/${student?.photo}`}
//             phone={student.phone}
//             id={student.id}
//           />
//         ))}
//       </div>

//       <StudentRegistrationForm open={open} handleClose={handleClose} />
//       <ToastContainer />
//     </>
//   );
// };

// export default StudentList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentCard from "./card/StudentCard";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentRegistrationForm from "../components/form/StudentRegistrationForm";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const { username } = useSelector((state) => state.login);
  const [open, setOpen] = useState(false);
  const [Class, setClass] = useState();
  const [id, setId] = useState();
  const [empty, setEmpty] = useState(false);
  const [url, setUrl] = useState("http://localhost:3000/students");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}`);

        const data = response.data;
        setEmpty(!data || (Array.isArray(data) && data.length === 0));
        console.log("1st", data);
        const normalizedData = Array.isArray(data) ? data : [data];
        setStudents(normalizedData);
        console.log("2nd", students);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setEmpty(true); // Set empty to true in case of an error
      }
    };
    fetchData();
  }, [url]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id && !Class) {
      setUrl("http://localhost:3000/students");
    } else if (!id) {
      setUrl(`http://localhost:3000/students/${Class}`);
    } else {
      setUrl(`http://localhost:3000/students/${Class}/${id}`);
    }
    console.log(id, Class);
  };

  return (
    <>
      <h1 className="text-center text-2xl mb-4">Student List</h1>

      {username && (
        <div className="flex justify-start mb-4 pl-5">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleClickOpen}
          >
            Add Student
          </button>
        </div>
      )}

      <form
        onClick={handleSubmit}
        className="flex flex-col justify-center items-center p-4 bg-gray-100 rounded-lg shadow-md w-2/4 lg:w-2/5 mx-auto mt-2"
      >
        <div className="flex flex-col w-full mb-4">
          <input
            placeholder="Class"
            onChange={(e) => {
              setClass(e.target.value);
            }}
            type="number"
            className="border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            placeholder="ID"
            onChange={(e) => {
              setId(e.target.value);
            }}
            type="number"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="m-2 bg-teal-500 w-full md:w-1/2 p-2 rounded-md text-white hover:bg-lime-500 transition-colors duration-300 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>

      {empty && (
        <h1 className="text-center text-xl text-gray-500 mt-4">
          No students found
        </h1>
      )}

      <div className="flex flex-row flex-wrap justify-center items-center gap-[20px] m-10">
        {students.map((student, index) => (
          <StudentCard
            key={index}
            name={student.name}
            fatherName={student.fatherName}
            motherName={student.motherName}
            Class={student.Class}
            address={student.address}
            photo={`../../public/image/${student?.photo}`}
            phone={student.phone}
            id={student.id}
          />
        ))}
      </div>

      <StudentRegistrationForm open={open} handleClose={handleClose} />
      <ToastContainer />
    </>
  );
};

export default StudentList;
