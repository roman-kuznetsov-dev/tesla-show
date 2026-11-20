export type QuizOption = {
  value: string;
  label: string;
  meta?: string; // скрытый ключ для рекомендации (например, 'adults', 'small')
};

export type QuizStep = {
  id: string;
  title: string;
  options: QuizOption[];
};

// 1. Общий вопрос (с него начинают все)
export const generalStep: QuizStep = {
  id: 'eventType',
  title: 'Какое мероприятие планируете?',
  options: [
    { value: 'wedding', label: '💍 Свадьба', meta: 'wedding' },
    { value: 'corporate', label: '🏢 Корпоратив', meta: 'corporate' },
    { value: 'graduation', label: '🎓 Выпускной', meta: 'graduation' },
    { value: 'birthday', label: '🎂 День рождения', meta: 'birthday' },
  ],
};

// 2. Ветки вопросов для каждого типа мероприятия
export const branchSteps: Record<string, QuizStep[]> = {
  wedding: [
    {
      id: 'when',
      title: 'Когда свадьба?',
      options: [
        { value: 'month', label: 'В ближайший месяц' },
        { value: '2_3_months', label: 'Через 2–3 месяца' },
        { value: 'half_year', label: 'Через полгода и больше' },
        { value: 'planning', label: 'Пока только планируем' },
      ],
    },
    {
      id: 'age',
      title: 'Кто в основном будет среди гостей?',
      options: [
        { value: 'adults', label: 'Только взрослые', meta: 'adults' },
        { value: 'mixed', label: 'Взрослые + дети', meta: 'mixed' },
        { value: 'kids', label: 'Много детей', meta: 'kids' },
        { value: 'unknown', label: 'Сложно сказать', meta: 'adults' },
      ],
    },
    {
      id: 'windows',
      title: 'Где будет проходить и какие там окна?',
      options: [
        { value: 'small', label: 'Зал/ресторан, окон мало или они небольшие', meta: 'small' },
        { value: 'big', label: 'Зал/ресторан, большие окна / панорамное остекление', meta: 'big' },
        { value: 'none', label: 'Помещение без окон', meta: 'none' },
        { value: 'outdoor', label: 'Улица / шатёр', meta: 'outdoor' },
        { value: 'unknown', label: 'Ещё не выбрали / не знаю', meta: 'unknown' },
      ],
    },
    {
      id: 'priority',
      title: 'Что важнее в шоу?',
      options: [
        { value: 'wow', label: 'Вау-эффект и зрелищность' },
        { value: 'interactive', label: 'Интерактив с гостями' },
        { value: 'photo', label: 'Красивые фото и видео' },
        { value: 'science', label: 'Научно-познавательная часть' },
      ],
    },
  ],
  corporate: [
    {
      id: 'when',
      title: 'Когда мероприятие?',
      options: [
        { value: 'month', label: 'В ближайший месяц' },
        { value: '2_3_months', label: 'Через 2–3 месяца' },
        { value: 'half_year', label: 'Через полгода и больше' },
        { value: 'planning', label: 'Пока присматриваемся' },
      ],
    },
    {
      id: 'age',
      title: 'Кто в основном будет в зале?',
      options: [
        { value: 'adults', label: 'Взрослая аудитория (18+)', meta: 'adults' },
        { value: 'mixed', label: 'Смешанная (взрослые + дети)', meta: 'mixed' },
        { value: 'families', label: 'Семьи с детьми', meta: 'families' },
        { value: 'youth', label: 'В основном молодёжь', meta: 'youth' },
      ],
    },
    {
      id: 'windows',
      title: 'Где будет проходить и какие там окна?',
      options: [
        { value: 'small', label: 'Зал/ресторан, окон мало или они небольшие', meta: 'small' },
        { value: 'big', label: 'Зал/ресторан, большие окна / панорамное остекление', meta: 'big' },
        { value: 'office_small', label: 'Офис (окон мало / небольшие)', meta: 'small' },
        { value: 'office_big', label: 'Офис (большие окна / панорамное остекление)', meta: 'big' },
        { value: 'none', label: 'Помещение без окон', meta: 'none' },
        { value: 'outdoor', label: 'Улица / open air', meta: 'outdoor' },
        { value: 'unknown', label: 'Ещё не выбрали / не знаю', meta: 'unknown' },
      ],
    },
    {
      id: 'priority',
      title: 'Что важно для компании?',
      options: [
        { value: 'wow', label: 'Вау-эффект и зрелищность' },
        { value: 'interactive', label: 'Интерактив с сотрудниками' },
        { value: 'content', label: 'Контент для соцсетей' },
        { value: 'science', label: 'Научно-познавательный формат' },
      ],
    },
  ],
  graduation: [
    {
      id: 'when',
      title: 'Когда выпускной?',
      options: [
        { value: 'month', label: 'В ближайший месяц' },
        { value: '2_3_months', label: 'Через 2–3 месяца' },
        { value: 'half_year', label: 'Через полгода и больше' },
        { value: 'planning', label: 'Пока только планируем' },
      ],
    },
    {
      id: 'age',
      title: 'Какой возраст выпускников?',
      options: [
        { value: '4class', label: '4 класс (10–11 лет)', meta: '4class' },
        { value: '9class', label: '9 класс (15–16 лет)', meta: '9class' },
        { value: '11class', label: '11 класс (17–18 лет)', meta: '11class' },
        { value: 'students', label: 'Студенты / взрослые', meta: 'students' },
      ],
    },
    {
      id: 'windows',
      title: 'Где будет проходить и какие там окна?',
      options: [
        { value: 'school_small', label: 'Школа/актовый зал, окон мало или они небольшие', meta: 'small' },
        { value: 'school_big', label: 'Школа/актовый зал, большие окна', meta: 'big' },
        { value: 'cafe_small', label: 'Ресторан/кафе, окон мало или они небольшие', meta: 'small' },
        { value: 'cafe_big', label: 'Ресторан/кафе, большие окна / панорамное остекление', meta: 'big' },
        { value: 'none', label: 'Помещение без окон', meta: 'none' },
        { value: 'outdoor', label: 'Улица / open air', meta: 'outdoor' },
        { value: 'unknown', label: 'Ещё не выбрали / не знаю', meta: 'unknown' },
      ],
    },
    {
      id: 'priority',
      title: 'Что важнее для выпускного?',
      options: [
        { value: 'wow', label: 'Вау-эффект и зрелищность' },
        { value: 'interactive', label: 'Интерактив с выпускниками' },
        { value: 'content', label: 'Контент для соцсетей и памятных видео' },
        { value: 'science', label: 'Научно-познавательная часть' },
      ],
    },
  ],
  birthday: [
    {
      id: 'age',
      title: 'Кто главный герой праздника?',
      options: [
        { value: 'child_under7', label: 'Ребёнок (до 7 лет)', meta: 'child_under7' },
        { value: 'child_7_12', label: 'Ребёнок (7–12 лет)', meta: 'child_7_12' },
        { value: 'teen', label: 'Подросток (12–17 лет)', meta: 'teen' },
        { value: 'adult', label: 'Взрослый (18+)', meta: 'adult' },
        { value: 'jubilee', label: 'Юбилей (50+)', meta: 'adult' },
      ],
    },
    {
      id: 'when',
      title: 'Когда день рождения?',
      options: [
        { value: 'month', label: 'В ближайший месяц' },
        { value: '2_3_months', label: 'Через 2–3 месяца' },
        { value: 'half_year', label: 'Через полгода и больше' },
        { value: 'planning', label: 'Пока только планируем' },
      ],
    },
    {
      id: 'windows',
      title: 'Где будет проходить и какие там окна?',
      options: [
        { value: 'home_small', label: 'Дом/квартира, окон мало или они небольшие', meta: 'small' },
        { value: 'home_big', label: 'Дом/квартира, большие окна', meta: 'big' },
        { value: 'cafe_small', label: 'Кафе/ресторан, окон мало или они небольшие', meta: 'small' },
        { value: 'cafe_big', label: 'Кафе/ресторан, большие окна / панорамное остекление', meta: 'big' },
        { value: 'none', label: 'Помещение без окон', meta: 'none' },
        { value: 'outdoor', label: 'Дача/улица', meta: 'outdoor' },
        { value: 'unknown', label: 'Ещё не выбрали / не знаю', meta: 'unknown' },
      ],
    },
    {
      id: 'priority',
      title: 'Что важнее в шоу?',
      options: [
        { value: 'wow', label: 'Вау-эффект и зрелищность' },
        { value: 'interactive', label: 'Интерактив с гостями' },
        { value: 'photo', label: 'Красивые фото и видео' },
        { value: 'science', label: 'Научно-познавательная часть' },
      ],
    },
  ],
};