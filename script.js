/**
 * ANIME QUIZ MASTER - JAVASCRIPT ENGINE
 * Sistema completo de Quiz com consumo de API, sintetizador de som e múltiplos modos.
 */

// ==========================================================================
// 1. BANCO DE DADOS LOCAL / FALLBACK (PT-BR & CITAÇÕES)
// ==========================================================================
const CURATED_QUESTIONS_PTBR = [
  {
    question: "Qual é o nome da técnica ocular mais poderosa do clã Uchiha em Naruto?",
    options: ["Mangekyou Sharingan", "Byakugan", "Rinnegan", "Tenseigan"],
    answer: "Mangekyou Sharingan",
    difficulty: "Fácil",
    category: "Naruto"
  },
  {
    question: "Em One Piece, qual Fruta do Diabo (Akuma no Mi) Monkey D. Luffy consumiu?",
    options: ["Gomu Gomu no Mi (Hito Hito no Mi: Nika)", "Mera Mera no Mi", "Ope Ope no Mi", "Gura Gura no Mi"],
    answer: "Gomu Gomu no Mi (Hito Hito no Mi: Nika)",
    difficulty: "Fácil",
    category: "One Piece"
  },
  {
    question: "Em Attack on Titan (Shingeki no Kyojin), qual o nome do Titã herdado por Eren Yeager de seu pai?",
    options: ["Titã de Ataque", "Titã Blindado", "Titã Colossal", "Titã Bestial"],
    answer: "Titã de Ataque",
    difficulty: "Médio",
    category: "Attack on Titan"
  },
  {
    question: "Qual é o verdadeiro nome do assassino 'Kira' no anime Death Note?",
    options: ["Light Yagami", "L Lawliet", "Mello", "Teru Mikami"],
    answer: "Light Yagami",
    difficulty: "Fácil",
    category: "Death Note"
  },
  {
    question: "Em Jujutsu Kaisen, qual é o nome da Expansão de Domínio de Satoru Gojo?",
    options: ["Vazio Ilimitado (Muryoukuusho)", "Santuário Malevolente", "Jardim das Sombras", "Caixão da Montanha de Ferro"],
    answer: "Vazio Ilimitado (Muryoukuusho)",
    difficulty: "Médio",
    category: "Jujutsu Kaisen"
  },
  {
    question: "Qual é a lei fundamental da Alquimia em Fullmetal Alchemist?",
    options: ["Troca Equivalente", "Conservação de Matéria", "Transmutação Divina", "Purificação Espiritual"],
    answer: "Troca Equivalente",
    difficulty: "Fácil",
    category: "Fullmetal Alchemist"
  },
  {
    question: "Em Demon Slayer (Kimetsu no Yaiba), qual Respiração Tanjiro Kamado aprendeu primeiro com Urokodaki?",
    options: ["Respiração da Água", "Respiração das Chamas", "Dança do Deus do Fogo", "Respiração do Sol"],
    answer: "Respiração da Água",
    difficulty: "Fácil",
    category: "Demon Slayer"
  },
  {
    question: "Qual o planeta natal dos Saiyajins no universo de Dragon Ball Z antes de sua destruição?",
    options: ["Planeta Vegeta", "Planeta Namekusei", "Planeta Sadala", "Planeta Kaioh"],
    answer: "Planeta Vegeta",
    difficulty: "Médio",
    category: "Dragon Ball Z"
  },
  {
    question: "Em Hunter x Hunter, qual é o tipo de Nen do protagonista Gon Freecss?",
    options: ["Intensificação (Enhancement)", "Transformação", "Emissão", "Materialização"],
    answer: "Intensificação (Enhancement)",
    difficulty: "Médio",
    category: "Hunter x Hunter"
  },
  {
    question: "Qual personagem em Bleach possui a espada Zanpakuto chamada 'Zangetsu'?",
    options: ["Ichigo Kurosaki", "Renji Abarai", "Sosuke Aizen", "Byakuya Kuchiki"],
    answer: "Ichigo Kurosaki",
    difficulty: "Fácil",
    category: "Bleach"
  },
  {
    question: "Em My Hero Academia (Boku no Hero), qual era o nome do poder herdado por Deku?",
    options: ["One For All", "All For One", "Half-Cold Half-Hot", "Explosion"],
    answer: "One For All",
    difficulty: "Fácil",
    category: "My Hero Academia"
  },
  {
    question: "Em Neon Genesis Evangelion, qual o número da Unidade EVA pilotada por Shinji Ikari?",
    options: ["Unidade-01", "Unidade-00", "Unidade-02", "Unidade-06"],
    answer: "Unidade-01",
    difficulty: "Médio",
    category: "Evangelion"
  }
];

const CURATED_QUOTES = [
  {
    quote: "“Se você não gosta do seu destino, não o aceite. Em vez disso, tenha a coragem de mudá-lo do jeito que você quer.”",
    options: ["Naruto Uzumaki", "Monkey D. Luffy", "Eren Yeager", "Saitama"],
    answer: "Naruto Uzumaki",
    category: "Naruto"
  },
  {
    quote: "“O poder não vem de um desejo. Vem da necessidade.”",
    options: ["Goku", "Vegeta", "Piccolo", "Gohan"],
    answer: "Goku",
    category: "Dragon Ball Z"
  },
  {
    quote: "“Se você vencer, você vive. Se você perder, você morre. Se você não lutar, você não pode vencer!”",
    options: ["Eren Yeager", "Levi Ackerman", "Erwin Smith", "Mikasa Ackerman"],
    answer: "Eren Yeager",
    category: "Attack on Titan"
  },
  {
    quote: "“Eu não me importo se eu morrer tentando, porque este é o meu sonho!”",
    options: ["Monkey D. Luffy", "Roronoa Zoro", "Sanji", "Portgas D. Ace"],
    answer: "Monkey D. Luffy",
    category: "One Piece"
  },
  {
    quote: "“Eu serei o Deus deste novo mundo.”",
    options: ["Light Yagami", "L Lawliet", "Ryuk", "Lelouch vi Britannia"],
    answer: "Light Yagami",
    category: "Death Note"
  },
  {
    quote: "“Não se preocupe, eu sou o mais forte.”",
    options: ["Satoru Gojo", "Sukuna", "Megumi Fushiguro", "Yuji Itadori"],
    answer: "Satoru Gojo",
    category: "Jujutsu Kaisen"
  },
  {
    quote: "“Eu sou apenas um cara que é um herói por diversão.”",
    options: ["Saitama", "Genos", "Mumen Rider", "King"],
    answer: "Saitama",
    category: "One Punch Man"
  }
];

// ==========================================================================
// 2. MOTOR DE ÁUDIO SINTETIZADO (WEB AUDIO API)
// ==========================================================================
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type, duration, gainValue = 0.15) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio error:", e);
    }
  }

  playClick() {
    this.playTone(600, 'sine', 0.06, 0.1);
  }

  playCorrect() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    // Chime melodioso
    [659.25, 783.99, 987.77].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'triangle', 0.25, 0.15), i * 70);
    });
  }

  playWrong() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    this.playTone(180, 'sawtooth', 0.35, 0.18);
  }

  playStreak() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'sine', 0.2, 0.2), i * 60);
    });
  }

  playVictory() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const chords = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    chords.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 'triangle', 0.4, 0.2), i * 90);
    });
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

const sound = new SoundEngine();

// ==========================================================================
// 3. ESTADO DA APLICAÇÃO
// ==========================================================================
const state = {
  mode: 'trivia_api',
  difficulty: 'any',
  amount: 5,
  questions: [],
  currentIndex: 0,
  score: 0,
  streak: 0,
  maxStreak: 0,
  userAnswers: [],
  timer: null,
  timeLeft: 15,
  isLocked: false,
  timeAttackTotalTime: 60
};

// ==========================================================================
// 4. ELEMENTOS DO DOM
// ==========================================================================
const dom = {
  // Telas
  screenHome: document.getElementById('screenHome'),
  screenLoading: document.getElementById('screenLoading'),
  screenQuiz: document.getElementById('screenQuiz'),
  screenResults: document.getElementById('screenResults'),

  // Configuração
  modeCards: document.querySelectorAll('.mode-card'),
  diffButtons: document.querySelectorAll('#difficultyGroup .segment-btn'),
  amountButtons: document.querySelectorAll('#amountGroup .segment-btn'),
  standardOptions: document.getElementById('standardOptions'),
  startQuizBtn: document.getElementById('startQuizBtn'),
  soundToggleBtn: document.getElementById('soundToggleBtn'),
  soundIcon: document.getElementById('soundIcon'),
  loadingText: document.getElementById('loadingText'),

  // Recordes Home
  homeHighScore: document.getElementById('homeHighScore'),
  homeMaxStreak: document.getElementById('homeMaxStreak'),

  // HUD Quiz
  quizBadgeCategory: document.getElementById('quizBadgeCategory'),
  quizBadgeDiff: document.getElementById('quizBadgeDiff'),
  quizBadgeMode: document.getElementById('quizBadgeMode'),
  quizCurrentScore: document.getElementById('quizCurrentScore'),
  quizStreakContainer: document.getElementById('quizStreakContainer'),
  quizStreakText: document.getElementById('quizStreakText'),
  quizProgressBar: document.getElementById('quizProgressBar'),
  quizQuestionCount: document.getElementById('quizQuestionCount'),
  timerBox: document.getElementById('timerBox'),
  quizTimerText: document.getElementById('quizTimerText'),

  // Card Pergunta
  quoteContext: document.getElementById('quoteContext'),
  questionText: document.getElementById('questionText'),
  optionsGrid: document.getElementById('optionsGrid'),
  quizFooterFeedback: document.getElementById('quizFooterFeedback'),
  feedbackMessage: document.getElementById('feedbackMessage'),
  nextQuestionBtn: document.getElementById('nextQuestionBtn'),

  // Resultados
  rankTrophy: document.getElementById('rankTrophy'),
  rankTitle: document.getElementById('rankTitle'),
  rankFeedback: document.getElementById('rankFeedback'),
  resultFinalScore: document.getElementById('resultFinalScore'),
  resultAccuracyCount: document.getElementById('resultAccuracyCount'),
  resultAccuracyPercent: document.getElementById('resultAccuracyPercent'),
  resultMaxStreak: document.getElementById('resultMaxStreak'),
  toggleReviewBtn: document.getElementById('toggleReviewBtn'),
  reviewList: document.getElementById('reviewList'),
  reviewArrow: document.getElementById('reviewArrow'),
  playAgainBtn: document.getElementById('playAgainBtn'),
  changeModeBtn: document.getElementById('changeModeBtn')
};

// ==========================================================================
// 5. FUNÇÕES UTILITÁRIAS
// ==========================================================================
function decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function showScreen(screenEl) {
  [dom.screenHome, dom.screenLoading, dom.screenQuiz, dom.screenResults].forEach(s => {
    s.classList.remove('active');
  });
  screenEl.classList.add('active');
}

function updateHomeStats() {
  const high = localStorage.getItem('anime_quiz_high_score') || 0;
  const streak = localStorage.getItem('anime_quiz_max_streak') || 0;
  dom.homeHighScore.textContent = `${high} pts`;
  dom.homeMaxStreak.textContent = `${streak}x 🔥`;
}

// ==========================================================================
// 6. BUSCA DE DADOS (APIs & FALLBACKS)
// ==========================================================================
async function fetchTriviaQuestions(amount, difficulty) {
  let url = `https://opentdb.com/api.php?amount=${amount}&category=31&type=multiple`;
  if (difficulty && difficulty !== 'any') {
    url += `&difficulty=${difficulty}`;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Erro na requisição da API");
    const data = await res.json();

    if (data.response_code === 0 && data.results && data.results.length > 0) {
      return data.results.map(item => {
        const cleanQuestion = decodeHtml(item.question);
        const cleanCorrect = decodeHtml(item.correct_answer);
        const cleanIncorrect = item.incorrect_answers.map(decodeHtml);
        const options = shuffleArray([cleanCorrect, ...cleanIncorrect]);

        return {
          question: cleanQuestion,
          options: options,
          answer: cleanCorrect,
          category: "Anime & Mangá",
          difficulty: item.difficulty.toUpperCase()
        };
      });
    } else {
      throw new Error("A API não retornou dados suficientes.");
    }
  } catch (err) {
    console.warn("Falha na API OpenTDB, utilizando banco local:", err);
    return shuffleArray(CURATED_QUESTIONS_PTBR).slice(0, amount);
  }
}

async function fetchQuoteQuestions(amount) {
  try {
    const res = await fetch('https://animechan.xyz/api/random');
    if (res.ok) {
      const data = await res.json();
      if (data && data.quote && data.character) {
        const fakeNames = ["Naruto Uzumaki", "Luffy", "Goku", "Eren Yeager", "Satoru Gojo", "Levi", "Light Yagami", "Tanjiro"]
          .filter(n => n !== data.character);
        const shuffledFakes = shuffleArray(fakeNames).slice(0, 3);
        const options = shuffleArray([data.character, ...shuffledFakes]);

        const singleApiQuote = {
          quote: `“${data.quote}”`,
          options: options,
          answer: data.character,
          category: data.anime || "Anime Quote"
        };
        const rest = shuffleArray(CURATED_QUOTES).slice(0, amount - 1);
        return [singleApiQuote, ...rest];
      }
    }
  } catch (e) {
    console.log("AnimeChan indisponível, usando acervo clássico.");
  }

  return shuffleArray(CURATED_QUOTES).slice(0, amount);
}

// ==========================================================================
// 7. CONTROLE DO JOGO
// ==========================================================================
async function startQuiz() {
  sound.playClick();
  showScreen(dom.screenLoading);
  dom.loadingText.textContent = "Preparando a arena de batalha...";

  state.score = 0;
  state.streak = 0;
  state.maxStreak = 0;
  state.currentIndex = 0;
  state.userAnswers = [];
  state.isLocked = false;
  clearInterval(state.timer);

  try {
    if (state.mode === 'trivia_api') {
      state.questions = await fetchTriviaQuestions(state.amount, state.difficulty);
    } else if (state.mode === 'ptbr_curated') {
      state.questions = shuffleArray(CURATED_QUESTIONS_PTBR).slice(0, state.amount);
    } else if (state.mode === 'quotes') {
      state.questions = await fetchQuoteQuestions(state.amount);
    } else if (state.mode === 'time_attack') {
      state.questions = shuffleArray([...CURATED_QUESTIONS_PTBR, ...CURATED_QUOTES]).slice(0, 15);
      state.timeLeft = 60;
    }

    if (!state.questions || state.questions.length === 0) {
      state.questions = shuffleArray(CURATED_QUESTIONS_PTBR).slice(0, 5);
    }

    showScreen(dom.screenQuiz);
    loadQuestion(0);
  } catch (e) {
    state.questions = shuffleArray(CURATED_QUESTIONS_PTBR).slice(0, 5);
    showScreen(dom.screenQuiz);
    loadQuestion(0);
  }
}

function loadQuestion(index) {
  if (index >= state.questions.length) {
    finishQuiz();
    return;
  }

  state.currentIndex = index;
  state.isLocked = false;
  const currentQ = state.questions[index];

  const total = state.questions.length;
  dom.quizQuestionCount.textContent = `Pergunta ${index + 1} de ${total}`;
  dom.quizProgressBar.style.width = `${((index) / total) * 100}%`;
  dom.quizCurrentScore.textContent = state.score;

  dom.quizBadgeCategory.textContent = currentQ.category || "Anime";
  dom.quizBadgeDiff.textContent = currentQ.difficulty || "Geral";
  dom.quizBadgeMode.textContent = state.mode.replace('_', ' ').toUpperCase();

  dom.quizFooterFeedback.classList.add('hidden');

  if (currentQ.quote) {
    dom.quoteContext.classList.remove('hidden');
    dom.questionText.textContent = `${currentQ.quote}\n\n👉 De quem é essa frase?`;
  } else {
    dom.quoteContext.classList.add('hidden');
    dom.questionText.textContent = currentQ.question;
  }

  dom.optionsGrid.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];

  currentQ.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.dataset.option = opt;
    btn.innerHTML = `
      <span class="option-letter">${letters[idx] || (idx + 1)}</span>
      <span class="option-text">${opt}</span>
    `;
    btn.addEventListener('click', () => handleOptionSelect(opt, btn));
    dom.optionsGrid.appendChild(btn);
  });

  startTimer();
}

function startTimer() {
  clearInterval(state.timer);

  if (state.mode === 'time_attack') {
    dom.quizTimerText.textContent = `${state.timeLeft}s`;
    state.timer = setInterval(() => {
      state.timeLeft--;
      dom.quizTimerText.textContent = `${state.timeLeft}s`;

      if (state.timeLeft <= 10) {
        dom.timerBox.classList.add('urgent');
      } else {
        dom.timerBox.classList.remove('urgent');
      }

      if (state.timeLeft <= 0) {
        clearInterval(state.timer);
        finishQuiz();
      }
    }, 1000);
  } else {
    state.timeLeft = 15;
    dom.quizTimerText.textContent = `${state.timeLeft}s`;
    dom.timerBox.classList.remove('urgent');

    state.timer = setInterval(() => {
      state.timeLeft--;
      dom.quizTimerText.textContent = `${state.timeLeft}s`;

      if (state.timeLeft <= 5) {
        dom.timerBox.classList.add('urgent');
      }

      if (state.timeLeft <= 0) {
        clearInterval(state.timer);
        handleTimeOut();
      }
    }, 1000);
  }
}

function handleOptionSelect(selectedOption, clickedBtn) {
  if (state.isLocked) return;
  state.isLocked = true;

  if (state.mode !== 'time_attack') {
    clearInterval(state.timer);
  }

  const currentQ = state.questions[state.currentIndex];
  const isCorrect = selectedOption === currentQ.answer;

  state.userAnswers.push({
    question: currentQ.quote ? `${currentQ.quote} (Autor: ${currentQ.answer})` : currentQ.question,
    userChoice: selectedOption,
    isCorrect: isCorrect,
    correctChoice: currentQ.answer
  });

  const allButtons = dom.optionsGrid.querySelectorAll('.option-btn');
  allButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.option === currentQ.answer) {
      btn.classList.add('correct');
    } else if (btn === clickedBtn && !isCorrect) {
      btn.classList.add('wrong');
    }
  });

  if (isCorrect) {
    state.streak++;
    if (state.streak > state.maxStreak) state.maxStreak = state.streak;

    let multiplier = 1;
    if (state.streak >= 4) multiplier = 3;
    else if (state.streak >= 2) multiplier = 2;

    const gainedPoints = 100 * multiplier + (state.timeLeft * 5);
    state.score += gainedPoints;

    if (state.mode === 'time_attack') {
      state.timeLeft += 4;
      dom.quizTimerText.textContent = `${state.timeLeft}s`;
    }

    if (state.streak >= 2) {
      sound.playStreak();
      dom.quizStreakText.textContent = `🔥 ${state.streak}x COMBO (+${multiplier}x Pts)`;
      dom.quizStreakContainer.classList.remove('hidden');
    } else {
      sound.playCorrect();
    }

    dom.feedbackMessage.className = 'feedback-msg correct';
    dom.feedbackMessage.textContent = `✨ Resposta Correta! +${gainedPoints} pts`;
  } else {
    state.streak = 0;
    dom.quizStreakContainer.classList.add('hidden');
    sound.playWrong();

    dom.feedbackMessage.className = 'feedback-msg wrong';
    dom.feedbackMessage.textContent = `❌ Incorreto! A resposta correta era: ${currentQ.answer}`;
  }

  dom.quizCurrentScore.textContent = state.score;
  dom.quizFooterFeedback.classList.remove('hidden');

  if (state.mode === 'time_attack') {
    setTimeout(() => {
      loadQuestion(state.currentIndex + 1);
    }, 900);
  }
}

function handleTimeOut() {
  if (state.isLocked) return;
  state.isLocked = true;

  const currentQ = state.questions[state.currentIndex];
  state.streak = 0;
  dom.quizStreakContainer.classList.add('hidden');
  sound.playWrong();

  state.userAnswers.push({
    question: currentQ.quote ? currentQ.quote : currentQ.question,
    userChoice: "Tempo Esgotado",
    isCorrect: false,
    correctChoice: currentQ.answer
  });

  const allButtons = dom.optionsGrid.querySelectorAll('.option-btn');
  allButtons.forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.option === currentQ.answer) {
      btn.classList.add('correct');
    }
  });

  dom.feedbackMessage.className = 'feedback-msg wrong';
  dom.feedbackMessage.textContent = `⏰ Tempo Esgotado! Resposta: ${currentQ.answer}`;
  dom.quizFooterFeedback.classList.remove('hidden');
}

// ==========================================================================
// 8. TELA FINAL E RESULTADOS
// ==========================================================================
function finishQuiz() {
  clearInterval(state.timer);
  sound.playVictory();
  showScreen(dom.screenResults);

  dom.quizProgressBar.style.width = '100%';

  const prevHigh = parseInt(localStorage.getItem('anime_quiz_high_score') || '0', 10);
  const prevStreak = parseInt(localStorage.getItem('anime_quiz_max_streak') || '0', 10);

  if (state.score > prevHigh) {
    localStorage.setItem('anime_quiz_high_score', state.score);
  }
  if (state.maxStreak > prevStreak) {
    localStorage.setItem('anime_quiz_max_streak', state.maxStreak);
  }

  const totalQuestions = state.userAnswers.length;
  const correctCount = state.userAnswers.filter(a => a.isCorrect).length;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  dom.resultFinalScore.textContent = state.score;
  dom.resultAccuracyCount.textContent = `${correctCount} / ${totalQuestions}`;
  dom.resultAccuracyPercent.textContent = `${accuracy}%`;
  dom.resultMaxStreak.textContent = `${state.maxStreak}x 🔥`;

  let rank = "Novato (Rank D)";
  let icon = "🌱";
  let feedback = "Você está apenas começando sua jornada no mundo dos animes!";

  if (accuracy >= 90) {
    rank = "Mestre Otaku Supremo (Rank S)";
    icon = "👑";
    feedback = "Lendário! Seu nível de conhecimento sobre o universo dos animes é absoluto!";
  } else if (accuracy >= 70) {
    rank = "Veterano dos Animes (Rank A)";
    icon = "⚡";
    feedback = "Excelente desempenho! Você claramente assiste a muitos episódios.";
  } else if (accuracy >= 50) {
    rank = "Aventureiro Anime (Rank B)";
    icon = "⚔️";
    feedback = "Muito bom! Você conhece o básico dos maiores clássicos.";
  } else if (accuracy >= 30) {
    rank = "Entusiasta (Rank C)";
    icon = "📜";
    feedback = "Um bom começo! Vale a pena maratonar mais algumas séries.";
  }

  dom.rankTrophy.textContent = icon;
  dom.rankTitle.textContent = rank;
  dom.rankFeedback.textContent = feedback;

  renderReviewList();
  updateHomeStats();
}

function renderReviewList() {
  dom.reviewList.innerHTML = '';
  state.userAnswers.forEach((ans, i) => {
    const item = document.createElement('div');
    item.className = `review-item ${ans.isCorrect ? 'was-correct' : 'was-wrong'}`;
    item.innerHTML = `
      <div class="review-q">${i + 1}. ${ans.question}</div>
      <div class="review-ans">
        Sua Resposta: <strong>${ans.userChoice}</strong> ${ans.isCorrect ? '✅' : '❌'} 
        ${!ans.isCorrect ? `| Correta: <strong style="color: var(--success);">${ans.correctChoice}</strong>` : ''}
      </div>
    `;
    dom.reviewList.appendChild(item);
  });
}

// ==========================================================================
// 9. EVENT LISTENERS E INICIALIZAÇÃO
// ==========================================================================
function setupEventListeners() {
  dom.soundToggleBtn.addEventListener('click', () => {
    const isEnabled = sound.toggle();
    dom.soundIcon.textContent = isEnabled ? '🔊' : '🔇';
  });

  dom.modeCards.forEach(card => {
    card.addEventListener('click', () => {
      sound.playClick();
      dom.modeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.mode = card.dataset.mode;

      if (state.mode === 'time_attack') {
        dom.standardOptions.classList.add('hidden');
      } else {
        dom.standardOptions.classList.remove('hidden');
      }
    });
  });

  dom.diffButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      dom.diffButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.difficulty = btn.dataset.diff;
    });
  });

  dom.amountButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      dom.amountButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.amount = parseInt(btn.dataset.amount, 10);
    });
  });

  dom.startQuizBtn.addEventListener('click', startQuiz);

  dom.nextQuestionBtn.addEventListener('click', () => {
    sound.playClick();
    loadQuestion(state.currentIndex + 1);
  });

  dom.toggleReviewBtn.addEventListener('click', () => {
    sound.playClick();
    const isHidden = dom.reviewList.classList.toggle('hidden');
    dom.reviewArrow.textContent = isHidden ? '▼' : '▲';
  });

  dom.playAgainBtn.addEventListener('click', startQuiz);
  dom.changeModeBtn.addEventListener('click', () => {
    sound.playClick();
    showScreen(dom.screenHome);
  });

  // Atalhos: 1-4 ou A-D para responder, Enter para avançar
  window.addEventListener('keydown', (e) => {
    if (dom.screenQuiz.classList.contains('active')) {
      const key = e.key.toUpperCase();
      const options = dom.optionsGrid.querySelectorAll('.option-btn');

      if (!state.isLocked) {
        if (key === '1' || key === 'A') options[0]?.click();
        if (key === '2' || key === 'B') options[1]?.click();
        if (key === '3' || key === 'C') options[2]?.click();
        if (key === '4' || key === 'D') options[3]?.click();
      } else if (e.key === 'Enter' && !dom.quizFooterFeedback.classList.contains('hidden')) {
        dom.nextQuestionBtn.click();
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  updateHomeStats();
});