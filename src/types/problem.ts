type ProblemStatus = "active" | "disabled";

type ProblemCategory = {
  id: number;
  name: string;
};

type ProblemPreview = {
  id: number;
  title: string;
  categories: ProblemCategory[];
  langs: Lang[];
  complexity_level: number;
  desc: string;
  tags: string[];
  status: ProblemStatus;
};

type ProblemTest = {
  id: number;
  code: string;
};

type LangProblem = {
  id: number;
  language: Lang;
  code_context: string;
  initial_code: string;
  assertions: ProblemTest[];
};

type ProblemFull = ProblemPreview & {
  lang_problems: LangProblem[];
};

type BaseProblem = {
  title: string;
  desc: string;
  complexity_level: number;
  categories: ProblemCategory[];
  status: string;
};

type LangProblemFull = LangProblem & {
  problem: BaseProblem;
};
