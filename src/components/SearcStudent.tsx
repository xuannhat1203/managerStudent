import React, { useState } from "react";
interface SearchStudentProps {
  onSearch: (searchTerm: string) => void;
}

export default function SearchStudent({ onSearch }: SearchStudentProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <div>
      <input
        onKeyDown={handleKeyDown}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ height: "25px", width: "250px" }}
        type="text"
        placeholder="Tìm từ khóa theo tên hoặc email"
      />
    </div>
  );
}
