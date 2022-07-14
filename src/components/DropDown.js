import {MenuItem, Select} from "@mui/material";
import * as React from "react";

const DropDown = ({list, value, label, onSelect}) => {

	return (
		<Select
			value={value}
			label={label}
			onChange={onSelect}
		>
			{list.map((item, index) => {
				return (
					<MenuItem
						key={index}
						value={item}>
						{item}
					</MenuItem>);
			})}
		</Select>
	)
}
export default DropDown;