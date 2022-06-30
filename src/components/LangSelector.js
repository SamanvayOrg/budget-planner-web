import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {MenuItem, Select} from "@mui/material";
import FormControl from "@mui/material/FormControl";

const LangSelector = () => {
	const {i18n} = useTranslation();
	const [selectedLang, setSelectedLang] = useState('en');

	const changeLanguage = (event) => {
		console.log('event', event);
		setSelectedLang(event.target.value);
		i18n.changeLanguage(event.target.value);
	}
	const languages = [{value: 'en', title: 'English'}, {value: 'mr', title: 'Marathi'},]
	// const languages = 111;


	return (
		<FormControl variant="standard" sx={{m: 2, minWidth: 120}}>
			<Select
				labelId="demo-simple-select-standard-label"
				id="demo-simple-select-standard"
				value={selectedLang}
				onChange={changeLanguage}
				label="Age"
			>
				{languages.map(option => {
					return (<MenuItem key={option.value} value={option.value}>
						{option.title}
					</MenuItem>)
				})}
			</Select>
		</FormControl>
	)
}

export default LangSelector;
