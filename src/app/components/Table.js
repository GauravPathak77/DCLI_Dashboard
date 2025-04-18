'use client';

import React, { useState, useEffect } from 'react';

export default function Table({
  data,
  editedRowIndex,
  inputValue,
  setInputValue,
  handleEditClick,
  handleSubmitClick,
  indexOfFirstRow,
}) {
  const [angles, setAngles] = useState([]);

  useEffect(() => {
    setAngles(data.map(() => 0));
  }, [data]);

  const rotate = (i, delta) => {
    setAngles((a) => {
      const na = [...a];
      na[i] = (na[i] + delta + 360) % 360;
      return na;
    });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>S. No.</th>
          <th>License Number</th>
          <th>Serial Number</th>
          <th>Container ID</th>
          <th>DOT Number</th>
          <th>Mudflap</th>
          <th>Tail Light</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={i}>
            <td>{indexOfFirstRow + i + 1}</td>
            <td>{item.License_Number}</td>
            <td>{item.Serial_Number}</td>
            <td>{item.Container_ID}</td>
            <td>
              <div>{item.DOT_Number}</div>
              <div>
                {editedRowIndex === indexOfFirstRow + i ? (
                  <>
                    <input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button onClick={() => handleSubmitClick('DOT_Number', indexOfFirstRow + i)} className="edit_btn">
                      Submit
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleEditClick(indexOfFirstRow + i)} className="edit_btn" style={{display: 'none'}}>
                    Edit
                  </button>
                )}
              </div>
            </td>
            <td>{item.Mudflap ? 'Yes' : 'No'}</td>
            <td>{item.Tail_Light ? 'Yes' : 'No'}</td>
            <td>
  {item.Image && item.Image.startsWith('data:image/') ? (
    <>
      <img
        src={item.Image}
        alt="Detection"
        style={{
          transform: `rotate(${angles[i]}deg)`,
          maxWidth: '100px',
          maxHeight: '100px',
        }}
      />
      <div>
        <button onClick={() => rotate(i, -90)} className="rotate_btn">
          <img className="rotate-img" src="/images/rotate-left.png" alt="Rotate Left" />
        </button>
        <button onClick={() => rotate(i, 90)} className="rotate_btn">
          <img className="rotate-img" src="/images/rotate-right.png" alt="Rotate Right" />
        </button>
      </div>
      <button
        onClick={() => {
          const link = document.createElement('a');
          link.href = item.Image;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.click();
        }}
        className="view"
      >
        View
      </button>
    </>
  ) : (
    <div>Loading image...</div>
  )}
</td>

          </tr>
        ))}
      </tbody>
    </table>
  );
}
