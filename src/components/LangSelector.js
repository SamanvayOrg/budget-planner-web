import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, Select, FormControl } from '@mui/material';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem('language') || 'en'
  );

  useEffect(() => {
    i18n.changeLanguage(selectedLang);
  }, [selectedLang, i18n]);

  const changeLanguage = (event) => {
    const lang = event.target.value;
    setSelectedLang(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <FormControl variant="standard" sx={{ m: 2, minWidth: 100, margin: '0px 16px 0px 0px' }}>
      <Select value={selectedLang} onChange={changeLanguage}>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="mr">Marathi</MenuItem>
        <MenuItem value="hi">Hindi</MenuItem>
        <MenuItem value="gu">Gujarati</MenuItem>
        <MenuItem value="ta">Tamil</MenuItem>
        <MenuItem value="bn">Bengali</MenuItem>
        <MenuItem value="kn">Kannada</MenuItem>
        <MenuItem value="te">Telugu</MenuItem>
      </Select>
    </FormControl>
  );
};

export default LanguageSwitcher;
