import React, { useState, useEffect } from "react";
import "./App.css";
import AddStudent from "./components/AddStudent";
import ListStudents from "./components/ListStudents";
import StudentPlacement from "./components/StudentPlacement";
import SearcStudent from "./components/SearcStudent";
import Pagination from "./components/Pagination";

interface Student {
  id: string;
  name: string;
  dayOfBirth: string;
  email: string;
  status: boolean;
}

export default function App() {
  const [reload, setReload] = useState<boolean>(false);
  const [listStudent, setListStudent] = useState<Student[]>(() => {
    const studentLists = localStorage.getItem("students");
    return studentLists ? JSON.parse(studentLists) : [];
  });
  const [filteredStudents, setFilteredStudents] =
    useState<Student[]>(listStudent);

  useEffect(() => {
    const studentLists = localStorage.getItem("students");
    setListStudent(studentLists ? JSON.parse(studentLists) : []);
  }, [reload]);

  useEffect(() => {
    setFilteredStudents(listStudent);
  }, [listStudent]);

  const reloadUI = (): void => {
    setReload(!reload);
  };

  const addStudent = (student: Student) => {
    const newStudentList = [...listStudent, student];
    setListStudent(newStudentList);
    localStorage.setItem("students", JSON.stringify(newStudentList));
    reloadUI();
  };

  const handleBlock = (id: string) => {
    const updatedList = listStudent.map((student) =>
      student.id === id ? { ...student, status: !student.status } : student
    );
    setListStudent(updatedList);
    localStorage.setItem("students", JSON.stringify(updatedList));
    reloadUI();
  };

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredStudents(listStudent);
      return;
    }
    const filtered = listStudent.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  return (
    <>
      <AddStudent addStudent={addStudent} />
      <div style={{ display: "flex", justifyContent: "end", gap: "15px" }}>
        <StudentPlacement />
        <SearcStudent onSearch={handleSearch} />
      </div>
      <ListStudents
        listStudent={filteredStudents}
        reload={reload}
        handleBlock={handleBlock}
        reloadUI={reloadUI}
      />
      <Pagination />
    </>
  );
}
