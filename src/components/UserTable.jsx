import React from 'react';
import { Table, Button } from 'react-bootstrap';

function DataTable({ headers, data, actions }) {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {headers.map((header, idx) => (
            <th key={idx}>{header}</th>
          ))}
          {actions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            {Object.values(item).map((value, idx) => (
              <td key={idx}>{value}</td>
            ))}
            {actions && (
              <td>
                {actions.map((action, idx) => (
                  <Button key={idx} variant="primary" className="mr-2">{action.label}</Button>
                ))}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DataTable;
