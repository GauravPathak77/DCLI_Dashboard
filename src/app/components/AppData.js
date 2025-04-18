'use client';

import React, { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import SearchBar from './SearchBar';
import Table from './Table';

export default function AppData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editedRowIndex, setEditedRowIndex] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: resp } = await axios.get('http://localhost:3000/api/get_data');
      setData(resp);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (idx) => setEditedRowIndex(idx);

  const handleSubmitClick = async (field, idx) => {
    const row = data[idx];
    try {
      await axios.post('http://localhost:3000/api/edit_data', {
        id: row.id,
        field,
        value: inputValue,
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
    setEditedRowIndex(null);
  };

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;

  const display = searchQuery
  ? data.filter((d) =>
      [d.Serial_Number, d.License_Number, d.Container_ID]
        .some((field) => field?.toString().toLowerCase().includes(searchQuery.toLowerCase()))
    )
  : data;

  const paginated = display.slice(indexOfFirst, indexOfLast);

  return (
    <div>
      <SearchBar onSearch={(q) => { setSearchQuery(q); setCurrentPage(1); }} />
      {loading ? (
        <Spinner animation="border" role="status" />
      ) : (
        <>
          <Table
            data={paginated}
            editedRowIndex={editedRowIndex}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleEditClick={handleEditClick}
            handleSubmitClick={handleSubmitClick}
            indexOfFirstRow={indexOfFirst}
          />
          <p className="page_index">{currentPage}</p>
          <div className="pagination">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="back_btn">First</button>
            <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1} className="back_btn">Back</button>
            <button onClick={() => setCurrentPage((p) => p + 1)} disabled={currentPage === Math.ceil(display.length / rowsPerPage)} className="next_btn">Next</button>
            <button onClick={() => setCurrentPage(Math.ceil(display.length / rowsPerPage))} disabled={currentPage === Math.ceil(display.length / rowsPerPage)} className="back_btn">Last</button>
          </div>
        </>
      )}
    </div>
  );
}
