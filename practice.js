const tools = [
 { name: "alonž", file: "alonz.png", hint: "zahnutá skleněná trubička k převádění kapalin nebo plynů" },
  { name: "Büchnerova nálevka", file: "buchnerova-nalevka.png", hint: "nálevka na rychlou filtraci s odsáváním" },
  { name: "byreta", file: "byreta.png", hint: "Při titraci dávkuje roztok po kapkách a umožňuje odečíst vydaný objem" },
  { name: "chladič", file: "chladic.png", hint: "Ochladí páry při destilaci, takže zkondenzují na kapalinu" },
  { name: "dělená pipeta", file: "delena-pipeta.png", hint: "Umožňuje odměřit a přenést různé malé objemy kapaliny podle stupnice" },
  { name: "dělicí nálevka", file: "delici-nalevka.png", hint: "odděluje dvě nemísitelné kapaliny" },
  { name: "destilační baňka", file: "destilacni-banka.png", hint: "baňka s boční trubičkou pro destilaci" },
  { name: "držák zkumavek", file: "drzak-zkumavek.png", hint: "slouží k bezpečnému držení zkumavky při zahřívání" },
  { name: "exsikátor", file: "exsikator.png", hint: "Udržuje vzorky v suchém prostředí nad vysoušedlem" },
  { name: "frakční baňka", file: "frakcni-banka.png", hint: "Při destilaci odvádí vznikající páry boční trubičkou do chladiče" },
  { name: "gumové rukavice", file: "gumove-rukavice.png", hint: "chrání ruce při práci v laboratoři" },
  { name: "hodinové sklo", file: "hodinove-sklo.png", hint: "mělké kulaté sklíčko na malé množství látky" },
  { name: "kádinka", file: "kadinka.png", hint: "základní nádoba na míchání a zahřívání" },
  { name: "kahan", file: "kahan.png", hint: "zdroj plamene v laboratoři" },
  { name: "kleště", file: "kleste.png", hint: "pomáhají uchopit horké předměty" },
  { name: "kuželová baňka", file: "kuzelova-banka.png", hint: "Slouží k míchání roztoku krouživým pohybem; úzké hrdlo omezuje rozstřikování" },
  { name: "nálevka", file: "nalevka.png", hint: "pomůcka k přelévání nebo filtraci" },
  { name: "navažovací lodička", file: "navazovaci-lodicka.png", hint: "pomáhá navážit malé množství pevné látky" },
  { name: "nedělená pipeta", file: "nedelena-pipeta.png", hint: "Přenáší jeden přesně stanovený objem kapaliny; má jedinou rysku" },
  { name: "ochranné brýle", file: "ochranne-bryle.png", hint: "chrání oči při pokusech" },
  { name: "odměrná baňka", file: "odmerna-banka.png", hint: "Slouží k přípravě roztoku na přesný objem doplněním k jediné rysce" },
  { name: "odměrný válec", file: "odmerny-valec.png", hint: "odměřuje objem kapalin" },
  { name: "odsávací baňka", file: "odsavaci-banka.png", hint: "baňka s postranním vývodem pro odsávání" },
  { name: "Petriho miska", file: "Petriho-miska.png", hint: "mělká miska na kultivaci nebo pozorování" },
  { name: "promývačka", file: "promyvacka (kopie).png", hint: "skleněná lahvička, do které zavádíme plyny a tím je čistíme" },
  { name: "skleněná vana", file: "sklenena-vana.png", hint: "nádoba na zachytávání plynů nad vodou" },
  { name: "stojan", file: "stojan.png", hint: "drží kruhy, svorky nebo aparaturu" },
  { name: "stojan na zkumavky", file: "stojan-na-zkumavky.png", hint: "udržuje zkumavky přehledně vedle sebe" },
  { name: "střička", file: "stricka.png", hint: "plastová lahvička na oplachování" },
  { name: "triangl", file: "triangl.png", hint: "trojúhelníková podložka pro zahřívání kelímku" },
  { name: "U-trubice", file: "U-trubice.png", hint: "Může sloužit jako kapalinový manometr k porovnání tlaků podle výšky hladin" },
  { name: "železný kruh", file: "zelezny-kruh.png", hint: "Připevňuje se na laboratorní stojan a podpírá nálevku nebo síťku pod nádobou" },
  { name: "žíhací kelímek", file: "zihaci-kelimek.png", hint: "malá nádoba na zahřívání v plameni" },
  { name: "zkumavka", file: "zkumvka.png", hint: "úzká skleněná trubička na pokusy" }
];

const ROUND_LENGTH = 10;
let round = [];
let locked = false;
let currentIndex = 0;
let score = 0;
let answers = [];

const startScreen = document.querySelector("#startScreen");
const quizScreen = document.querySelector("#quizScreen");
const resultScreen = document.querySelector("#resultScreen");
const startBtn = document.querySelector("#startBtn");
const againBtn = document.querySelector("#againBtn");
const questionNumber = document.querySelector("#questionNumber");
const questionText = document.querySelector("#questionText");
const choices = document.querySelector("#choices");
const scoreNow = document.querySelector("#scoreNow");
const progressBar = document.querySelector("#progressBar");
const feedback = document.querySelector("#feedback");
const finalScore = document.querySelector("#finalScore");
const resultMessage = document.querySelector("#resultMessage");
const resultList = document.querySelector("#resultList");

function imagePath(item) {
  return `obrazky/${item.file}`;
}

function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function startGame() {
  round = shuffle(tools).slice(0, ROUND_LENGTH);

  currentIndex = 0;
  score = 0;
  answers = [];
  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  document.querySelector("#practiceShell").classList.remove("hidden");
  renderQuestion();
}

function renderQuestion() {
  const correct = round[currentIndex];
  locked = false;
  // Tyto dva obrázky mohou znázorňovat stejný typ baňky.
  const similar = new Set(["destilační baňka", "frakční baňka"]);
  const wrong = shuffle(tools.filter(item => item.name !== correct.name &&
    !(similar.has(correct.name) && similar.has(item.name)))).slice(0, 3);
  const options = shuffle([correct, ...wrong]);
  document.querySelector("#nextBtn").classList.add("hidden");

  questionNumber.textContent = currentIndex + 1;
  questionText.textContent = correct.name;
  scoreNow.textContent = score;
  feedback.textContent = "Vyber správný obrázek.";
  progressBar.style.width = `${(currentIndex / ROUND_LENGTH) * 100}%`;
  choices.innerHTML = "";

  options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "choice";
    button.type = "button";
    button.dataset.name = option.name;
    button.setAttribute("aria-label", `Možnost ${String.fromCharCode(65 + index)}`);
    button.innerHTML = `
      <span class="option-letter" aria-hidden="true">${String.fromCharCode(65 + index)}</span>
      <img src="${imagePath(option)}" alt="">
      <span class="answer-label hidden">${option.name}</span>
    `;
    button.addEventListener("click", () => chooseAnswer(option, correct));
    choices.append(button);
  });
}

function chooseAnswer(selected, correct) {
  if (locked) return;
  locked = true;
  const isCorrect = selected.name === correct.name;
  if (isCorrect) score += 1;

  answers.push({
    question: correct,
    selected,
    isCorrect,
    prompt: questionText.textContent,
    byUse: false
  });

  [...choices.children].forEach(button => {
    const label = button.dataset.name;
    button.disabled = true;
    button.querySelector(".answer-label").classList.remove("hidden");
    button.setAttribute("aria-label", label);
    if (label === correct.name) button.classList.add("is-correct");
    if (label === selected.name && !isCorrect) button.classList.add("is-wrong");
  });

  scoreNow.textContent = score;
  progressBar.style.width = `${((currentIndex + 1) / ROUND_LENGTH) * 100}%`;
  feedback.textContent = isCorrect
    ? `Správně! ${correct.name}.`
    : `Správná odpověď: ${correct.name}.`;
  const usage = document.createElement("p");
  usage.style.cssText = "margin:10px 0 0;font-size:15px;font-weight:500;line-height:1.5";
  const hint = correct.hint.charAt(0).toUpperCase() + correct.hint.slice(1).replace(/[.]+$/, "") + ".";
  usage.textContent = `Použití: ${hint}`;
  feedback.append(usage);
  const next = document.querySelector("#nextBtn");
  next.textContent = currentIndex === ROUND_LENGTH - 1 ? "Zobrazit výsledky →" : "Další otázka →";
  next.classList.remove("hidden");
  next.focus({ preventScroll: true });
}

function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  progressBar.style.width = "100%";
  finalScore.textContent = `${score}/${ROUND_LENGTH}`;

  if (score === ROUND_LENGTH) {
    resultMessage.textContent = "Fantastické! Jsi mistr laboratorních pomůcek.";
  } else if (score >= 7) {
    resultMessage.textContent = "Skvělá práce! Už se v laboratoři skoro neztratíš.";
  } else if (score >= 4) {
    resultMessage.textContent = "Dobrá mise! Pár pomůcek ještě potrénuj a bude to super.";
  } else {
    resultMessage.textContent = "Neboj, každý vědec začínal tréninkem. Zkus hru ještě jednou.";
  }

  resultList.innerHTML = "";
  answers.forEach((answer, index) => {
    const item = document.createElement("article");
    item.className = `result-item ${answer.isCorrect ? "correct" : "wrong"}`;
    item.innerHTML = `
      <img src="${imagePath(answer.question)}" alt="${answer.question.name}">
      <div>
        <h3>${index + 1}. ${answer.question.name}</h3>
        <p class="review-prompt">Použití: ${answer.question.hint}</p>
        <p>${answer.isCorrect ? "Vybráno správně." : `Tvoje volba: ${answer.selected.name}.`}</p>
      </div>
    `;
    resultList.append(item);
  });
}

startBtn.addEventListener("click", startGame);
againBtn.addEventListener("click", startGame);

document.querySelector("#nextBtn").addEventListener("click", () => {
  if (!locked) return;
  currentIndex += 1;
  if (currentIndex < ROUND_LENGTH) renderQuestion();
  else showResults();
});
