import { useState, useEffect } from "react";
import "./Table.css";
import swal from "sweetalert";
import "./Model.css";

interface Student {
  id: string;
  name: string;
  dayOfBirth: string;
  email: string;
  status: boolean;
}

interface ListStudentsProps {
  listStudent: Student[];
  reload: boolean;
  handleBlock: (id: string) => void;
  reloadUI: () => void;
}

export default function ListStudents({
  listStudent,
  reload,
  handleBlock,
  reloadUI,
}: ListStudentsProps) {
  const [cartLocal, setCartLocal] = useState<Student[]>(() => {
    const students = localStorage.getItem("students");
    return students ? JSON.parse(students) : [];
  });

  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<Student>({
    id: "",
    name: "",
    dayOfBirth: "",
    email: "",
    status: false,
  });

  const updateCartLocal = (updateStudent: Student[]) => {
    localStorage.setItem("students", JSON.stringify(updateStudent));
    setCartLocal(updateStudent);
  };

  const removeFromCart = (itemId: string) => {
    console.log(itemId);

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const updateStudent = cartLocal.filter((item) => item.id !== itemId);
        updateCartLocal(updateStudent);
        reloadUI();
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  const handleEdit = (student: Student) => {
    setEditStudent(student);
    setFormData(student);
  };

  const saveEditStudent = () => {
    if (editStudent) {
      const updatedList = cartLocal.map((student) =>
        student.id === editStudent.id ? formData : student
      );
      updateCartLocal(updatedList);
      setEditStudent(null);
      reloadUI();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const students = localStorage.getItem("students");
    setCartLocal(students ? JSON.parse(students) : []);
  }, [reload]);

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Mã sinh viên</th>
            <th scope="col">Tên sinh viên</th>
            <th scope="col">Ngày sinh</th>
            <th scope="col">Email</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {listStudent.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.dayOfBirth}</td>
              <td>{item.email}</td>
              <td>{item.status ? "Đã hoàn thành" : "Chưa hoàn thành"}</td>
              <td style={{ display: "flex", gap: "20px" }}>
                <button
                  onClick={() => handleBlock(item.id)}
                  style={{ backgroundColor: "violet" }}
                  className="btn2"
                >
                  Chặn
                </button>
                <button
                  onClick={() => handleEdit(item)}
                  style={{ backgroundColor: "orange" }}
                  className="btn2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ backgroundColor: "red" }}
                  className="btn2"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editStudent && (
        <div className="modal-body">
          <form>
            <label htmlFor="id">Mã Sinh viên</label>
            <input
              name="id"
              onChange={handleChange}
              type="text"
              value={formData.id}
              disabled
            />
            <label htmlFor="name">Tên sinh viên</label>
            <input
              name="name"
              onChange={handleChange}
              type="text"
              value={formData.name}
            />
            <label htmlFor="dayOfBirth">Ngày sinh</label>
            <input
              name="dayOfBirth"
              onChange={handleChange}
              type="date"
              value={formData.dayOfBirth}
            />
            <label htmlFor="email">Email</label>
            <input
              name="email"
              onChange={handleChange}
              type="email"
              value={formData.email}
            />
            <button type="button" onClick={saveEditStudent}>
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
