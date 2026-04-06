import type { QuizEngineCopy } from "@/lib/quiz/quizContentTypes";

export const DEFAULT_QUIZ_ENGINE_COPY: QuizEngineCopy = {
  tierByQ4: {
    aesthetics: {
      tier: "straumann_slactive",
      explanation:
        "Jums svarbi estetika — dažnai renkamasi SLActive paviršių ir kokybišką vainikėlio darbą.",
    },
    function: {
      tier: "standard",
      explanation:
        "Jums svarbi kramtymo funkcija — patikimas standartinis implantas su geru planavimu dažnai yra optimalus pasirinkimas.",
    },
    longevity: {
      tier: "straumann_slactive",
      explanation:
        "Ilgaamžiškumui rekomenduojame premium liniją su plačiai dokumentuota klinikine istorija.",
    },
    price: {
      tier: "standard",
      explanation:
        "Jei pirmiausia svarbi kaina, standartiniai implantai suteikia gerą santykį kainos ir kokybės — vis tiek su individualiu planu.",
    },
  },
  positionByQ4: {
    aesthetics: "anterior",
    function: "posterior",
    longevity: "mixed",
    price: "posterior",
  },
  ageByQ6: {
    y18_35: "Jūsų amžiuje implantas dažnai yra investicija į dešimtmečius be papildomų kompromisų.",
    y36_55:
      "Šiame etape implantacija paprastai yra labai tinkamas laikas — kaulas ir bendra sveikata dažnai dar būna palankūs.",
    y56_70:
      "Amžius pats savaime retai yra kliūtis — svarbesnis individualus sveikatos ir burnos būklės vertinimas.",
    y70plus:
      "Vyresniame amžiuje sprendimas visada individualus: svarbios lėtinės ligos, vaistai ir kaulo būklė — būtina gydytojo konsultacija.",
  },
  priorityLineByQ4: {
    aesthetics: "Jūsų prioritetas — estetika ir natūrali išvaizda.",
    function: "Jūsų prioritetas — saugus kramtymas ir komfortas.",
    longevity: "Jūsų prioritetas — ilgaamžiškumas ir patikimumas.",
    price: "Jūsų prioritetas — protinga kaina be nereikalingų permokų.",
  },
  headlines: {
    q1_many_missing: "Verta kalbėti apie viso žandikaulio ar didelės dalies dantų atkūrimą",
    q1_loose: "Dantų judėjimas reikalauja dėmesio — implantas gali būti viena iš priemonių",
    q1_one_few_high: "Tikėtina, kad implantas yra logiškas sprendimas — verta planuoti konsultaciją",
    q1_one_few: "Vieno ar kelių dantų atkūrimas implantu dažnai būna tinkamas kelias",
    score30: "Jūsų atsakymai rodo, kad verta profesionalios implantologo konsultacijos",
    default: "Rekomenduojame individualų vertinimą su gydytoju",
  },
  leads: {
    high: "Trumpas testas negali pakeisti diagnostikos, bet jūsų situacijos požymiai dažnai sutampa su atvejais, kai implantacija būna svarstoma pirmoje eilėje.",
    mid: "Daugelis žmonių su panašiais požymiais renkasi konsultaciją, kad sužinotų visas galimybes — nuo implanto iki alternatyvų.",
    low: "Net ir švelnesni simptomai verti aiškaus plano: konsultacijoje galėsite ramiai palyginti variantus.",
  },
  orientedNote:
    "Orientacinė 1 implanto sąmata pagal jūsų nurodytą prioritetą (vienas žandikaulis, be komplikacijų scenarijaus). Tiksli suma po 3D diagnostikos.",
};
