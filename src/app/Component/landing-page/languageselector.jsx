import React from 'react';
import { useTranslation } from 'react-i18next';
import '@/i18n'; // cleaner using path alias `@`

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className='ms-3'>
      <select id="lang" onChange={handleChangeLanguage} value={i18n.language}>
        <option value="en">{t('English')}</option>
        <option value="hi">{t('Hindi')}</option>
        <option value="ar">{t('Arabic')}</option>
        <option value="ta">{t('Tamil')}</option>
        {/* <option value="te">Telugu</option>
        <option value="bn">Bengali</option>
        <option value="ml">Malayalam</option>
        <option value="gu">Gujarati</option>
        <option value="kn">Kannada</option>
        <option value="mr">Marathi</option> */}
      </select>
    </div>
  );
};

export default LanguageSelector;
