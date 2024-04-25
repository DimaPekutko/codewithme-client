const pythonContext = `# define some context here (e.g. types for arguments)\n`;
const jsContext = `// define some context here (e.g. prototypes for arguments)\n`;

const pythonProblemTemplate = `
def my_problem_name(arg1: int, arg2: str, *args, **kwargs):
    pass
`;
const jsProblemTemplate = `
const myProblemName = (arg1, arg2) => {

}
`;

const pythonAssertTemplate = `# Write assertion, e.g: assert my_problem_name(...) == 2\n`;
const jsAssertTemplate = `// Write assertion, e.g: assert(my_problem_name(...), 2)\n`;

const CONTEXT_TEMPLATE = {
  python: pythonContext,
  js: jsContext,
};

const PROBLEM_TEMPLATE = {
  python: pythonProblemTemplate,
  js: jsProblemTemplate,
};

const ASSERT_TEMPLATE = {
  python: pythonAssertTemplate,
  js: jsAssertTemplate,
};

export const getLangContextTemplate = (lang: Lang) => CONTEXT_TEMPLATE[lang];
export const getLangProblemTemplate = (lang: Lang) => PROBLEM_TEMPLATE[lang];
export const getLangAssertTemplate = (lang: Lang) => ASSERT_TEMPLATE[lang];
