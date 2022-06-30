import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {MenuItem, Select} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import {useDispatch, useSelector} from "react-redux";
import {fetchLanguage, i18LangSelector} from "../slices/i18nReducer";
import _ from "lodash";
import {languages} from "../config";

const LangSelector = () => {
	const {i18n} = useTranslation();
	const dispatch = useDispatch();
	const {language} = useSelector(i18LangSelector);
	const [selectedLang, setSelectedLang] = useState('en');

	const changeLanguage = (event) => {
		dispatch(fetchLanguage(event.target.value));
		setSelectedLang(event.target.value);
		i18n.changeLanguage(event.target.value);
	}


	return (
		<FormControl variant="standard" sx={{m: 2, minWidth: 120}}>
			<Select
				labelId="demo-simple-select-standard-label"
				id="demo-simple-select-standard"
				value={!_.isNull(language) ? language : selectedLang}
				onChange={changeLanguage}
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
