import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";

import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, funding, valume, trade) {
  return { name, calories, fat, carbs, funding, valume, trade };
}

const rows = [
  createData("Frozen ", 159, 6.0, 24, 4.0, 9, 11),
  createData("sandwich", 237, 9.0, 37, 4.3, 5, 6),
  createData("Eclair", 262, 16.0, 24, 6.0, 2, 4),
  createData("Cupcake", 305, 3.7, 67, 4.3, 8, 1),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 2, 6),
];

const OverviewDataTable = () => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#171722" }}>
              <TableCell style={{ color: "white" }} align="left">
                Market
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Index Price
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                24 change
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                1h Funding
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                Open Interest
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                24 Volume
              </TableCell>
              <TableCell style={{ color: "white" }} align="right">
                24 Trades
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.funding}</TableCell>
                <TableCell align="right">{row.funding}</TableCell>
                <TableCell align="right">{row.valume}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OverviewDataTable;
