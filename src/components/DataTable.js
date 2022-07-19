import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import _ from "lodash";


const DataTable = ({headings, rows}) => {
	return (<TableContainer component={Paper}>
		<Table sx={{minWidth: 600}} aria-label="simple table">
			<TableHead>
				<TableRow >
					{_.map(headings, (heading,index) => {
						return <TableCell key={index} >{heading}</TableCell>
					})}
				</TableRow>
			</TableHead>
			<TableBody>
				{_.map(rows,row => (
					<TableRow
						key={row.name}
						sx={{'&:last-child td, &:last-child th': {border: 0}}}
					>
						<TableCell key={row.name.index}>{row.name}</TableCell>
						<TableCell key={row.revised.index}>{row.revised}</TableCell>
						<TableCell key={row.budgeted.index}>{row.budgeted}</TableCell>
					</TableRow>))}
			</TableBody>
		</Table>
	</TableContainer>);
}
export default DataTable;