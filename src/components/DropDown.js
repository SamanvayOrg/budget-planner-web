import {MenuItem, Select} from "@mui/material";
import * as React from "react";
import {t} from "i18next";

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
						{t(item)}
					</MenuItem>);
			})}
		</Select>
	)
}
export default DropDown;