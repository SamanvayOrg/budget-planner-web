import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import * as React from "react";
import {t} from "i18next";

const DropDown = ({list, value, label, onSelect, ...props}) => {

    return (
        <FormControl >
            <InputLabel id="label">{label}</InputLabel>
            <Select {...props}
                    value={value}
                    label={label}
                    onChange={onSelect}
                    autoWidth
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
        </FormControl>
    )
}
export default DropDown;