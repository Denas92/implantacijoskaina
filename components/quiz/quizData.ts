import type { QuizAnswers } from "./quizLogic";

export type QuizOption<T extends string = string> = {
  value: T;
  label: string;
  description?: string;
};

export type QuizStepDef = {
  id: keyof QuizAnswers;
  title: string;
  subtitle?: string;
  options: QuizOption[];
};

export const QUIZ_STEPS: QuizStepDef[] = [
  {
    id: "q1",
    title: "Ar jums trūksta danties ar dantų?",
    subtitle: "Pasirinkite artimiausią situaciją.",
    options: [
      { value: "one_few", label: "Taip — trūksta vieno ar kelių dantų" },
      { value: "many_missing", label: "Taip — trūksta daugelio ar beveik visų dantų" },
      { value: "loose", label: "Ne — bet dantis ar dantys juda, silpsta" },
      {
        value: "none",
        label: "Ne — viskas gerai",
        description: "Šiuo metu implantai greičiausiai neaktualūs.",
      },
    ],
  },
  {
    id: "q2",
    title: "Kiek laiko jau trūksta danties (ar dantų)?",
    options: [
      { value: "lt_month", label: "Mažiau nei mėnesį" },
      { value: "m1_6", label: "1–6 mėnesiai" },
      { value: "gt6m", label: "Daugiau nei 6 mėnesius" },
      { value: "gt_year", label: "Daugiau nei metus" },
    ],
  },
  {
    id: "q3",
    title: "Ar naudojate išimamą protezą?",
    options: [
      { value: "denture_bad", label: "Taip — ir man nepatinka" },
      { value: "denture_ok", label: "Taip — bet man tinka" },
      { value: "no_denture", label: "Ne" },
    ],
  },
  {
    id: "q4",
    title: "Kas jums svarbiausia sprendžiant apie gydymą?",
    options: [
      { value: "aesthetics", label: "Estetika ir natūralus vaizdas" },
      { value: "function", label: "Funkcija — noriu normaliai kramtyti" },
      { value: "longevity", label: "Ilgaamžiškumas" },
      { value: "price", label: "Kaina" },
    ],
  },
  {
    id: "q5",
    title: "Ar bijote chirurginių procedūrų?",
    options: [
      { value: "very_afraid", label: "Labai bijau" },
      { value: "somewhat", label: "Šiek tiek nerimą kelia" },
      { value: "not_afraid", label: "Nebijau" },
    ],
  },
  {
    id: "q6",
    title: "Koks jūsų amžius?",
    subtitle: "Naudojame tik rekomendaciniams tekstams — ne diagnozei.",
    options: [
      { value: "y18_35", label: "18–35" },
      { value: "y36_55", label: "36–55" },
      { value: "y56_70", label: "56–70" },
      { value: "y70plus", label: "70+" },
    ],
  },
  {
    id: "q7",
    title: "Ar turite lėtinių ligų? (pvz., diabetas, osteoporozė ir pan.)",
    options: [
      { value: "no_chronic", label: "Ne" },
      {
        value: "chronic",
        label: "Taip",
        description: "Prieš bet kokią procedūrą būtinas gydytojo vertinimas.",
      },
    ],
  },
];
