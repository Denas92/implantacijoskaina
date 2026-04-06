import type { AllOnPageData } from "@/lib/allOnPage.types";

/** Numatytasis All-on edukacinio puslapio turinys — sutampa su seed ir gali būti perrašytas Sanity. */
export const DEFAULT_ALL_ON_PAGE: AllOnPageData = {
  seo: {
    title: "All-on-4 ir All-on-6: immediate loading, etapai, pterygoid ir zygominiai implantai",
    description:
      "Kas yra All-on-X, kada rinktis 4 ar 6 implantus, immediate loading ir laikinas protezas, pasvirti implantai, pterygoid ir zygominiai sprendimai sunkiai viršutinio žandikaulio atrofijai. Edukacija, ne diagnozė.",
    ogTitle: "All-on-4 / All-on-6 — pilnas gidas",
    ogDescription:
      "Nuo konsultacijos iki galutinio protezo: etapai, rizikos, išsamūs paaiškinimai lietuviškai.",
  },
  hero: {
    kicker: "Edukacija",
    title: "All-on-4 ir All-on-6: kaip veikia fiksuotas protezas ant implantų",
    lead:
      "All-on-X reiškia, kad visas dantų lankas viename žandikaulyje atkuriamas ant riboto skaičiaus implantų ir pritvirtinamas fiksuotas protezas — ne išimamas kaip klasikinis protezas ant gleivinės. Žemiau — etapai, immediate loading, laikinas ir nuolatinis protezas, pasvirti implantai bei specifiniai sprendimai (pterygoid, zygominiai), kada kaulo nepakanka įprastai implantacijai.",
    disclaimer:
      "Čia pateikiama bendroji edukacinė informacija. Ji neatstoja klinikinės apžiūros, diagnostikos ar individualaus gydymo plano — sprendimus priima gydytojas implantologas po išsamios konsultacijos.",
  },
  whatIs: {
    title: "Kas tiksliai yra „All-on“ ir kuo skiriasi nuo išimamo protezo",
    body:
      "Tradicinis visiškas bedantis žandikaulis dažnai sprendžiamas išimamu protezu ant gleivinės — jis gali judėti, reikalauja klijų arba spaustuko, o kramtymo jėga perduodama į gleivinę, ne į kaulą. All-on-X koncepcijoje implantai yra inkilai kaule; ant jų fiksuojamas tiltas ar plokštė su dantų lanku. Todėl protezas jaučiasi stabilesnis, o kramtymo apkrova dalinai perduodama į kaulą per implantus.\n\n„4“ ar „6“ skaičius nurodo implantų skaičių viename žandikaulyje (dažniausiai strategiškai išdėstytų), o ne vainikėlių skaičių. Tikslias pozicijas, pasvirusius implantus ir papildomus sprendimus parenka gydytojas pagal 3D vaizdą, kaulo kiekį ir klinikinę situaciją.",
  },
  compare4vs6: {
    title: "All-on-4 vs All-on-6: kada dažniau vienas, kada kitas pasirinkimas",
    intro:
      "Nėra vienos lentelės „visiems“: sprendimas priklauso nuo žandikaulio pločio ir formos, likusio kaulo, sąkandžio, paros sukandimo jėgos, ar planuojama atkurti abu žandikaulius vienu metu, ir nuo to, kokį apkrovimo rezervą norima palikti protezui.",
    fourTitle: "All-on-4 (keturi implantai)",
    fourBody:
      "Keturi strategiškai išdėstyti implantai gali būti pakankami, kai kaulas ir sąkandis leidžia gerai paskirstyti jėgas ir kai protezo konstrukcija bei medžiaga atitinka planą. Tai dažnas startinis planas, ypač kai reikia racionaliai paskirstyti biudžetą arba kai anatomija riboja implantų skaičių — bet ne visada optimalu esant labai dideliam kramtymo krūviui ar siauram žandikauliui be papildomų priemonių.\n\nGydytojas vertina, ar keturi inkilai saugiai „laikys“ planuojamą protezą visoje kramtymo zonoje, įskaitant užpakalinius dantis.",
    sixTitle: "All-on-6 (šeši implantai)",
    sixBody:
      "Šeši implantai dažnai suteikia didesnį paskirstymo plotą ir apkrovos rezervą — tai gali būti svarbu platesniam žandikauliui, didesniam kramtymo krūviui, kai norima sumažinti apkrovimą vienam implantui arba kai klinikinė situacija reikalauja papildomo stabilumo. Tai nereiškia, kad „6 visada geriau už 4“ kiekvienu atveju — kaina ir chirurginė apimtis didesnės, todėl sprendimas turi būti pagrįstas diagnostika, o ne tik skaičiumi.",
  },
  journey: {
    title: "Tipinė kelionė: nuo konsultacijos iki galutinio protezo",
    steps: [
      {
        title: "Konsultacija ir diagnostika (dažnai 3D)",
        body:
          "Renkama anamnezė, vertinama burnos būklė, sąkandis, minkštieji audiniai. 3D vaizdas leidžia pamatyti kaulo aukštį ir plotą, artimas struktūras (pvz. sinusų zoną), ir suplanuoti implantų kryptis bei ilgius.",
      },
      {
        title: "Gydymo planas ir sutikimas",
        body:
          "Aprašomas etapų planas: implantų skaičius ir padėtis, ar numatomas immediate loading, kokio tipo laikinas ir galutinis protezas, numatomos kontrolės. Pasirašomas informuotas sutikimas pagal tai, ką aptarėte su komanda.",
      },
      {
        title: "Chirurgija: implantų įvedimas",
        body:
          "Procedūros apimtis priklauso nuo atvejo — kartu gali būti dantų šalinimas, kaulo modeliavimas ar kiti veiksmai, jei tai numatyta plane. Uždaroji planavimo dalis (šablonai, gidas) priklauso nuo klinikos protokolo.",
      },
      {
        title: "Laikinas (provizorinis) protezas — dažnai „immediate“ kontekste",
        body:
          "Daugelyje planų tą pačią dieną ar netrukus po chirurgijos pacientas gauna laikina protezą ant implantų ar atramų — kad būtų estetika ir dalinė funkcija, kol vyksta gijimas. Tai nėra galutinė restauracija: medžiagos ir tikslumas vėliau keičiami į ilgalaikį sprendimą.",
      },
      {
        title: "Gijimas ir kontrolės",
        body:
          "Kaulas ir minkštieji audiniai adaptuojasi; būtinos higiena ir kontrolės. Gydytojas stebi stabilumą, uždegimo požymius, sąkandžio funkciją. Šiame etape galima koreguoti laikino protezo dalis ar apkrovos rekomendacijas.",
      },
      {
        title: "Galutinis fiksuotas protezas",
        body:
          "Po gijimo pagaminamas nuolatinis tiltas/plokštė su dantų lanku — dažnai kitos medžiagos, tikslesnis sąkandis ir estetika nei laikino etapo metu. Toliau — reguliari profesionali higiena ir periodinės apžiūros.",
      },
    ],
  },
  immediateLoading: {
    title: "Immediate loading ir „immediate function“: ką tai reiškia praktikoje",
    labels: {
      terms: "Terminai",
      whenOften: "Kam dažniau tinka",
      whenNot: "Kada gali būti neįmanoma ar nepatartina",
      risks: "Rizikos ir kompromisai",
    },
    terms:
      "„Immediate loading“ dažnai reiškia, kad implantui ar atramai per tam tikrą laiką po chirurgijos pridedamas apkrovimas — pavyzdžiui, laikinas protezas fiksuojamas taip, kad būtų funkcija ir estetika. „Immediate function“ terminą klinikos naudoja šiek tiek skirtingai: svarbu ne pavadinimas, o ar planas apima ankstyvą apkrovimą, kokia minkšta yra dieta, kokios kontrolės numatytos ir ar pasiektas pakankamas pirminis stabilumas.\n\nŠiame puslapyje naudojame bendrą principą: ankstyvas protezas ≠ galutinis protezas; ankstyva apkrova reikalauja drausmės ir stebėjimo.",
    whenOften:
      "Ankstyvesnis laikino protezo fiksavimas dažniau įmanomas, kai kaulas ir implantų stabilumas leidžia parinkti atitinkamą protokolą, kai infekcinė kontrolė gera, pacientas gali laikytis minkštos dietos ir kontrolių, ir kai komanda turi patirties su tokiais atvejais.\n\nTikslias taisykles nustato individualus planas — ne bendras straipsnis.",
    whenNot:
      "Ankstyvas apkrovimas gali būti neįmanomas ar nepatartinas, jei yra aktyvi infekcija, prasta burnos higiena ir neįsipareigojimas priežiūrai, reikšmingi sisteminiai rizikos veiksniai be kontrolės, nepakankamas pirminis implantų stabilumas, ar kai anatomija ir planas reikalauja gijimo be ankstyvos apkrovos. Tai nėra „blogas pacientas“ — tai saugumo ribos, kurias nustato diagnostika.",
    risks:
      "Ankstyva apkrova prieš pilną gijimą reiškia kompromisą: estetika ir funkcija anksčiau, bet didesnis poreikis vengti kieto maisto, kruopščiai prižiūrėti higieną ir laikytis vizitų. Per didelė apkrova per anksti gali prisidėti prie komplikacijų rizikos — todėl protokolas turi būti konservatyvus, kai abejojama.\n\nJei kas nors skauda, juda ar atrodo neįprastai — reikia kreiptis į kliniką, ne laukti.",
  },
  provisionalToFinal: {
    title: "Kodėl keliauja per laikiną protezą ir tik vėliau — į nuolatinį",
    labels: {
      whyTwoSteps: "Kodėl du etapai",
      typicalTimeline: "Tipinis laiko tarpas",
      materialsNote: "Medžiagos ir galutinis protezas",
    },
    whyTwoSteps:
      "Po implantacijos kaulas ir dantenų kontūrai tam tikrą laiką keičiasi — ankstyvas protezas negali visada tiksliai atitikti to, koks bus sąkandis po mėnesių. Laikinas etapas leidžia funkciją ir estetiką dabar, o galutinis — pagaminti pagal subrendusią situaciją, su ilgalaikėmis medžiagomis ir tikslesniu sąkandžiu.\n\nTaip pat laikinas protezas leidžia įvertinti estetiką, fonetiką ir komfortą prieš brangų galutinį darbą.",
    typicalTimeline:
      "Tipinis intervalas tarp laikino ir galutinio etapo labai svyruoja: nuo kelių mėnesių iki ilgesnio laikotarpio priklausomai nuo gijimo, kaulo kokybės, ar buvo papildomų procedūrų, ir nuo klinikos protokolo. Čia nurodyti galima tik kaip orientacinį principą — ne kaip garantiją.\n\nTikslias datas sako gydytojas po kontrolių.",
    materialsNote:
      "Laikinas protezas dažnai būna iš medžiagų ir konstrukcijos, kurios tinka ankstyvam etapui ir greitesniam pritaikymui. Galutinis protezas gali būti skirtingų konstrukcijų (pvz. metalas su akrilu, cirkonio tiltai ir pan.) — tai siejama su jūsų klinikos pasiūlymu ir su skaičiuoklėje matomais „galutinio protezo“ variantais, jei lyginate biudžetus.\n\nTerminų ir kainų nuoseklumas su individualia sąmata visada pirmiau už bendrą straipsnį.",
  },
  tiltedImplants: {
    title: "Pasvirti (tilted) užpakaliniai implantai All-on plane",
    body:
      "All-on koncepcijoje užpakaliniai implantai kartais įvedami pasvirusiai — ne „dėl grožio“, o kad būtų išnaudotas turimas kaulas ir sumažinta poreikis invazyvioms papildomoms procedūroms priekinėje zonoje arba kad būtų saugiau apeiti anatomines struktūras (pvz. priekyje išsaugoti daugiau kaulo, užpakalyje — optimizuoti ilgį ir kryptį pagal 3D planą). Tai bendras principas; konkretūs kampai ir pozicijos priklauso nuo jūsų anatomijos ir chirurgo plano.\n\nPasvirus implantas nėra „prastesnis“ — tai dažnai planuotas sprendimas viso žandikaulio atkūrime.",
  },
  pterygoid: {
    title: "Pterygoid implantai: papildomas inkilas užpakalinėje zonoje",
    labels: {
      whatIs: "Kas tai",
      whenConsidered: "Kada svarstoma",
      whenNot: "Kada gali netikti / alternatyvos",
    },
    whatIs:
      "Pterygoid sritis yra užpakalinė viršutinio žandikaulio zona, kur implantas gali būti nukreiptas į tankesnio kaulo sritį (dažnai apibūdinama kaip inkilavimas link pterygoid plokštės krypties). Tai būdas gauti papildomą inkilą tada, kai įprastoje kramtymo zonoje kaulo nepakanka ir reikia išnaudoti gilesnę / kitokią anatomiją.\n\nProcedūra reikalauja patirties ir tikslaus 3D planavimo.",
    whenConsidered:
      "Svarstoma, kai standartinės pozicijos užpakalyje negali duoti saugaus inkilo be papildomo kaulo augmentacijos, arba kai strategiškai norima išvengti alternatyvų (pvz. sinus lift + vėlesnė implantacija), priklausomai nuo atvejo. Tai individualus sprendimas, o ne „visiems bedantiems viršutiniam žandikauliui“.",
    whenNot:
      "Netinka arba nėra pirmas pasirinkimas, kai anatomija neleidžia saugiai, kai rizika nervų ar struktūrų pažeidimui vertinama kaip per didelė, kai yra kontraindikacijų chirurgijai, ar kai kitas planas (papildomas kaulas, kiti implantų tipai) yra saugesnis. Čia būtina gydytojo ir dažnai visos komandos nuomonė.",
  },
  zygomatic: {
    title: "Zygominiai implantai ir kiti ilgieji sprendimai viršutiniam žandikauliui",
    labels: {
      whatIs: "Kas yra zygominiai implantai",
      whenConsidered: "Kada svarstoma",
      otherApproaches: "Kitos kryptys ir individualūs sprendimai",
    },
    whatIs:
      "Zygominiai implantai yra ilgesni implantai, kurie inkilą ieško skruosto kaulo (zygomatic bone) srityje, kai viršutinio žandikaulio alveolinėje dalyje kaulo trūksta tiek, kad standartiniai implantai negali saugiai inkilti be didelės augmentacijos. Tai sunkios atrofijos atvejų įrankis, reikalaujantis specializuotos patirties.\n\nTerminas „ilgieji implantai“ kartais vartojamas ir kitiems individualiems protokolams — svarbu ne pavadinimas, o ar sprendimas pagrįstas 3D diagnostika ir indikacijomis.",
    whenConsidered:
      "Svarstoma esant ženkliai viršutinio žandikaulio kaulo netekčiai, kai norima fiksuoto protezo ant implantų ir kai alternatyva — daug etapų su augmentacija — yra nepageidautina arba kliniškai nepriimtina. Kiekvienas atvejis skaičiuojamas individualiai: kaulo plotis ir aukštis, sinusų būklė, sąkandis apatinio žandikaulio atžvilgiu.",
    otherApproaches:
      "Be zygomatinių, sunkiems atvejams egzistuoja ir kitos strategijos: papildomas kaulas (onlay, sinus lift ir pan.), kombinuoti planai, kartais extra-maxillary / alternatyvios kryptys — priklausomai nuo mokyklos ir chirurgo patirties. Šios sritys netinka savidiagnostikai: jei girdite kelis skirtingus pasiūlymus, klausinėkite, kodėl planas būtent toks ir kokios alternatyvos buvo atmestos.",
  },
  contraindications: {
    title: "Kada All-on-X nebūtinai tinkamiausias kelias",
    body:
      "Nors All-on-X plačiai naudojamas visiško bedančio žandikaulio atveju, visada verta aptarti alternatyvas: ar dar galima išsaugoti bent kai kuriuos dantis, ar išimamas protezas su implantų atrama kita forma, ar reikia tik dalinio atkūrimo. Kontraindikacijos chirurgijai bendrai (nekontroliuojamos ligos, rizikingi įpročiai be noro keisti elgesį, aktyvi infekcija be gydymo) lieka galioti ir čia.\n\nJūsų atvejis gali būti unikalus — šis tekstas padeda klausinėti gydytojo, o ne pakeisti konsultaciją.",
  },
  faqSectionTitle: "Dažniausiai užduodami klausimai",
  faqs: [
    {
      question: "Ar All-on-4 visada pigiau nei All-on-6?",
      answer:
        "Dažnai keturi implantai reiškia mažesnes chirurgines ir medžiagų sąnaigas nei šeši, bet galutinė kaina priklauso ir nuo laikino bei nuolatinio protezo tipo, chirurgijos apimties, ar reikia papildomų procedūrų, ir nuo klinikos. Lyginkite sąmatas eilutėmis, ne tik implantų skaičių.",
    },
    {
      question: "Ar gausiu dantis tą pačią dieną po implantacijos?",
      answer:
        "Daug planų numato laikina protezą labai anksti — kartais tą pačią dieną — bet tai priklauso nuo stabilumo, plano ir klinikos protokolo. „Dantys tą pačią dieną“ nėra garantija kiekvienam; svarbu, ką tiksliai reiškia jūsų gydytojas (estetinis laikinas, minkšta dieta, kontrolės).",
    },
    {
      question: "Kuo skiriasi laikinas ir nuolatinis protezas?",
      answer:
        "Laikinas — dažniausiai ankstyvam etapui po implantacijos: funkcija ir estetika, kol vyksta gijimas. Nuolatinis — pagamintas po subrendusios situacijos, su ilgalaikėmis medžiagomis ir tikslesniu sąkandžiu. Ankstyvas protezas retai yra galutinis sprendimas visomis prasmėmis.",
    },
    {
      question: "Ar immediate loading saugu?",
      answer:
        "Gali būti saugu, kai indikacijos atitinka ir pacientas laikosi nurodymų; rizika auga, kai apkrova per didelė per anksti, higiena prasta ar ignoruojamos kontrolės. Saugumas priklauso nuo individualaus plano, ne nuo to, ar straipsnyje parašyta gražiai.",
    },
    {
      question: "Kodėl implantai kartais statomi pasvirusiai?",
      answer:
        "Kad būtų geriau išnaudotas kaulas, sumažintas poreikis papildomoms procedūroms arba saugiau apeitos anatominės zonos — pagal 3D planą. Tai dažnas All-on planų elementas, kai jį pateisina diagnostika.",
    },
    {
      question: "Kas yra pterygoid implantas paprastais žodžiais?",
      answer:
        "Tai implantas, kurio inkilas nukreiptas į užpakalinę viršutinio žandikaulio sritį, kur galima rasti papildomo kaulo, kai įprastoje vietoje jo per mažai. Sprendimas individualus ir reikalauja patyrusio chirurgo.",
    },
    {
      question: "Kam reikalingi zygominiai implantai?",
      answer:
        "Sunkiai viršutinio žandikaulio atrofijai, kai standartiniai implantai neįmanomi be didelės augmentacijos, o norima fiksuoto protezo ant implantų strategijos. Tai specializuota sritis — ne bendras „pasirinkimas iš katalogo“.",
    },
    {
      question: "Ar zygominiai ir pterygoid yra tas pats?",
      answer:
        "Ne. Zygominiai inkilą ieško skruosto kaulo srityje, pterygoid — kitoje užpakalinėje strategijoje. Abu naudojami sunkiems atvejams, bet anatomija, indikacijos ir rizikos skiriasi; sprendimą priima komanda pagal vaizdą ir patirtį.",
    },
    {
      question: "Kiek laiko trunka visas gydymas?",
      answer:
        "Chirurgija dažnai viena ar kelios dienos etapais, bet visas kelias iki galutinio protezo — mėnesiai ir daugiau, priklausomai nuo gijimo ir plano. Orientacinį laiką sako tik jūsų klinika po apžiūros.",
    },
    {
      question: "Ar galima derinti su finansavimu ar daliniais etapais?",
      answer:
        "Daug klinikų siūlo etapais mokėti arba naudoti finansavimo partnerius — tai klausimas į kliniką ir jūsų sąmatą. Mūsų svetainėje galite peržiūrėti ir finansavimo skyrių, jei toks yra, bet sąlygos visada individualios.",
    },
  ],
  ctas: {
    sectionTitle: "Toliau",
    sectionAriaLabel: "Veiksmai",
    primaryLabel: "Skaičiuoti orientacinę kainą",
    primaryHref: "/#skaiciuokle",
    secondaryLabel: "Konsultacija ir kontaktai",
    secondaryHref: "/kontaktai",
    tertiaryLabel: "Finansavimo galimybės",
    tertiaryHref: "/finansavimas",
  },
};
