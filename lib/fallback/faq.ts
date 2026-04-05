import type { FaqItem } from "@/lib/sanity.types";

/** Kai Sanity dar neprijungta ar tuščia — pavyzdinis turinys */
export const fallbackFaqs: FaqItem[] = [
  {
    _id: "fb-kainos-1",
    category: "kainos",
    question_lt: "Kiek kainuoja vienas dantų implantas Vilniuje?",
    answer_lt:
      "Orientacinės kainos dažnai prasideda nuo ~549 € už standartinį implantą (be vainikėlio ir papildomų etapų). Galutinė suma priklauso nuo implanto linijos, vainikėlio tipo ir ar reikia papildomų procedūrų. Naudokite skaičiuoklę arba užsiregistruokite konsultacijai.",
    order: 1,
  },
  {
    _id: "fb-kainos-2",
    category: "kainos",
    question_lt: "Ar kaina apima viską: implantą, atramą ir vainikėlį?",
    answer_lt:
      "Pilna „vieno danties“ sąmata paprastai apima implantą, atramą ir galutinį vainikėlį, taip pat planavimą ir sterilias medžiagas pagal klinikos protokolą. Tikslias eilutes gausite po 3D diagnostikos.",
    order: 2,
  },
  {
    _id: "fb-proc-1",
    category: "procedura",
    question_lt: "Kiek trunka implantacijos procedūra?",
    answer_lt:
      "Pats implanto įsriegimas dažnai užtrunka nuo keliolikos iki keliasdešimties minučių vienam implantui, priklausomai nuo situacijos. Visas gydymas nuo planavimo iki galutinio vainikėlio gali trukti kelis mėnesius dėl kaulo gijimo.",
    order: 3,
  },
  {
    _id: "fb-gij-1",
    category: "gijimas",
    question_lt: "Ar po implantacijos bus skausminga?",
    answer_lt:
      "Daugelis pacientų jaučia lengvą diskomfortą kelias dienas, kurį galima malšinti pagal gydytojo rekomendacijas. Implantacija be pjūvio dažnai siejama su švelnesniu pooperaciniu periodu.",
    order: 4,
  },
  {
    _id: "fb-riz-1",
    category: "rizikos",
    question_lt: "Kokios yra implantacijos rizikos?",
    answer_lt:
      "Kaip ir bet kuri chirurginė procedūra, implantacija turi rizikų: infekcija, kaulo integracijos sutrikimai, nervų zonos ypatumai. Rizikas sumažina 3D planavimas, patyręs chirurgas ir griežta higiena.",
    order: 5,
  },
  {
    _id: "fb-priez-1",
    category: "prieziura",
    question_lt: "Kaip prižiūrėti implantus namuose?",
    answer_lt:
      "Kasdienė burnos higiena (dantų šepetėlis, tarpdantinės priemonės), reguliarūs higienos vizitai ir dantų gydytojo patikros padeda išlaikyti implantą ir minkštus audinius sveikus.",
    order: 6,
  },
];
