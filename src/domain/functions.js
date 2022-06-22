import {useEffect} from "react";
import {allMunicipalityDetailsSelector, fetchMunicipalityDetails} from "../slices/municipalityReducer";
import {useDispatch, useSelector} from "react-redux";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ActionButton from "../components/ActionButton";
import * as React from "react";
import {useStyles} from "../components/BasicSelect";

const GetMunicipalityName = () => {
	const dispatch = useDispatch();
	const {details} = useSelector(allMunicipalityDetailsSelector)

	useEffect(() => {
		dispatch(fetchMunicipalityDetails());
	}, [dispatch]);

	return details ? details.name + ' ' + details.cityClass + ' ' : ''


}

const GetCategory = (onChange) => {

	const classes=useStyles();
    const [category, setCategory] = React.useState('');
    const handleChange = (event) => {
        setCategory(event.target.value);
        onChange(event.target.value);
    };

	const data = [{value: 'abc'},
		{value: 'abc'},
		{value: 'abc'},
		{value: 'abc'},
		{value: 'abc'},
		{value: 'abc'},
		{value: 'abc'}]

    return(
		<Box sx={{minWidth: 100}}>
			<FormControl fullWidth>

				<Select className={classes.drop}
				        value={category}
				        onChange={handleChange}
				>

					{data?.map(option => {
						return (<MenuItem key={option.value} value={option.value}>
							{option.value}
						</MenuItem>);
					})}
				</Select>
			</FormControl>
			<ActionButton/>

		</Box>
	)

}

export {GetMunicipalityName,GetCategory}