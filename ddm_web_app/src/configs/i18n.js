import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import i18next from "i18next";

const resources = {
        en: {
            translation: {
                hello: "Hello, World!",
                content: "This is a simple example of a page rendered by the server.",
                gameTitle: "DDM"
            }
        },
        pt: {
            translation: {
                hello: "Olá, Mundo!",
                content: "Este é um exemplo simples de uma página renderizada pelo servidor.",
                gameTitle: "DDM"
            }
        }
}

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: 'hn',
        fallbackLng: 'sp',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
    });

export default i18n;