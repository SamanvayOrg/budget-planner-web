import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import _ from "lodash";

const boldText = {
	fontWeight: 'bold',
	color: 'black',
	fontFamily: "Lato",
}


const DataTable = ({headings, rows, title, highlight = false}) => {
	console.log('highlight', highlight);
	return (<TableContainer component={Paper}>
		<Table sx={{minWidth: 450}} aria-label="simple table">
			<TableHead>
				<TableRow><TableCell align="center" colSpan={3} style={{
					fontSize: 20,
					fontWeight: "700",
					color: "#616161",
					fontFamily: "Lato",
				}}>{title}</TableCell></TableRow>
				<TableRow>
					{_.map(headings, (heading, index) => {
						return <TableCell key={index}>{heading}</TableCell>
					})}
				</TableRow>
			</TableHead>
			<TableBody>
				{_.map(rows, row => (
					<TableRow
						key={row.name}
						sx={{'&:last-child td, &:last-child th': {border: 0}}}
					>
						{_.map(row,(item,index) =>(
							<TableCell key={index}  style={highlight? boldText: {}}>{item}</TableCell>
						))}

					</TableRow>))}
			</TableBody>
		</Table>
	</TableContainer>);
}
export default DataTable;
