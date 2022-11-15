import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import _ from "lodash";
import {darken} from '@mui/material';
import { useTheme } from '@mui/material/styles'

const DataTable = ({style = {}, headings, rows, title, highlight = false}) => {
	const theme = useTheme();
	const styles = {
		darkBackground: {
			color: '#ffffff',
			background: darken(theme.palette.primary.main, 0.2)
		},
		headingStyle: {
			color: '#616161',
			fontSize: 20,
		},
		subHeadingStyle: {
			color: '#616161',
			fontSize: 16,
		},
		itemStyle: {
			fontSize: 16,
		}
	};
	const makeDark = (style) => ({
		...style,
		...styles.darkBackground
	});
	const makeDarker = (style) => (
		{
			...makeDark(style),
			background: darken(theme.palette.primary.main, 0.4)
		}
	)

	const makeDarkConditionally = (style) => highlight ? makeDark(style) : style;

	return (<TableContainer component={Paper}>
		<Table sx={{minWidth: 450}} style={style} aria-label="simple table">
			<TableHead>
				<TableRow><TableCell align="center" colSpan={3} style={makeDarker(styles.headingStyle)}>{title}</TableCell></TableRow>
				<TableRow>
					{_.map(headings, (heading, index) => {
						return <TableCell key={index} style={makeDarkConditionally(styles.subHeadingStyle)}>{heading}</TableCell>
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
							<TableCell key={index} style={makeDarkConditionally(styles.itemStyle)}>{item}</TableCell>
						))}

					</TableRow>))}
			</TableBody>
		</Table>
	</TableContainer>);
}
export default DataTable;
