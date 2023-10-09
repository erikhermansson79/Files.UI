import React from "react";

const defaultValue = {
    locale: 'en',
    setLocale: () => { }
}

export const LocaleContext = React.createContext(defaultValue);