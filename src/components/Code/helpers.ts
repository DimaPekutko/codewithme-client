import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";

const LANGUAGES = {
  js: javascript(),
  python: python(),
};

export const getLangExtension = (lang: Lang) => LANGUAGES[lang];
