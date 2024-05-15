import React, { useState } from "react";

interface Student {
  id: string;
  name: string;
  dayOfBirth: string;
  email: string;
  status: boolean;
}

interface AddStudentProps {
  addStudent: (student: Student) => void;
}

export default function AddStudent({ addStudent }: AddStudentProps) {
  const [student, setStudent] = useState<Student>({
    id: "",
    name: "",
    dayOfBirth: "",
    email: "",
    status: true,
  });

  const handleAdd = () => {
    addStudent(student);
    setStudent({
      id: "",
      name: "",
      dayOfBirth: "",
      email: "",
      status: true,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setStudent({ ...student, [name]: value });
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Quản lý sinh viên</h3>
        <div className="add-student">
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Thêm sinh viên
          </button>
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Thêm mới sinh viên
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <form>
                    <label htmlFor="id">Mã Sinh viên</label>
                    <input
                      name="id"
                      onChange={handleChange}
                      type="text"
                      value={student.id}
                    />
                    <label htmlFor="name">Tên sinh viên</label>
                    <input
                      name="name"
                      onChange={handleChange}
                      type="text"
                      value={student.name}
                    />
                    <label htmlFor="dayOfBirth">Ngày sinh</label>
                    <input
                      name="dayOfBirth"
                      onChange={handleChange}
                      type="date"
                      value={student.dayOfBirth}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                      name="email"
                      onChange={handleChange}
                      type="email"
                      value={student.email}
                    />
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAdd}
                  >
                    Thêm mới
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
