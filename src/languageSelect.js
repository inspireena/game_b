import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { Button, List, ListItem, ListSubheader, Popover } from "@mui/material";

const languageMap = {
  en: { label: "English", dir: "ltr", active: true },
  hd: { label: "Hindi", dir: "ltr", active: false },
  kr: { label: "Korean", dir: "ltr", active: false },
  ja:{label: "japanese", dir:"ltr", active : false}
};

const LanguageSelect = () => {
  const selected = (localStorage.getItem("i18nextLng") || "en").substring(0,2);
  const { t } = useTranslation();
  const [menuAnchor, setMenuAnchor] =useState(null);
  useEffect(() => {
    if(languageMap[selected])
   { document.body.dir = languageMap[selected].dir};
  }, [menuAnchor, selected]);
console.log('language', languageMap[selected]);
  return (
    <div className="d-flex justify-content-end align-items-center language-select-root">
      <Button onClick={({ currentTarget }) => setMenuAnchor(currentTarget)}>
        {/* reena */}
        {languageMap[selected] && languageMap[selected].label}
        {/* <ArrowDropDown fontSize="small" /> */}
      </Button>
      <Popover
        open={!!menuAnchor}
        anchorEl={menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <div>
          <List>
            <ListSubheader>{t("select_language")}</ListSubheader>
            {Object.keys(languageMap)?.map(item => (
              <ListItem
                button
                key={item}
                onClick={() => {
                  i18next.changeLanguage(item);
                  setMenuAnchor(null);
                }}
              >
                {languageMap[item].label}
              </ListItem>
            ))}
          </List>
        </div>
      </Popover>
    </div>
  );
};

export default LanguageSelect;
