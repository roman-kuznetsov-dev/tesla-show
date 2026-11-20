'use client';

import { useReducer } from 'react';
import { generalStep, branchSteps } from '@/data/quiz';
import { recommendations } from '@/data/recommendations';
import { Loader2, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';

type State = {
  step: number;
  answers: Record<string, string>;
  name: string;
  phone: string;
  status: 'idle' | 'submitting' | 'success' | 'error';
  errorMessage?: string;
};

type Action =
  | { type: 'ANSWER'; questionId: string; value: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_CONTACTS'; name: string; phone: string }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; message: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ANSWER':
      return { ...state, answers: { ...state.answers, [action.questionId]: action.value } };
    case 'NEXT_STEP':
      return { ...state, step: state.step + 1 };
    case 'PREV_STEP':
      return { ...state, step: Math.max(0, state.step - 1) };
    case 'SET_CONTACTS':
      return { ...state, name: action.name, phone: action.phone };
    case 'SUBMIT_START':
      return { ...state, status: 'submitting', errorMessage: undefined };
    case 'SUBMIT_SUCCESS':
      return { ...state, status: 'success' };
    case 'SUBMIT_ERROR':
      return { ...state, status: 'error', errorMessage: action.message };
    default:
      return state;
  }
}

export default function Quiz() {
  const [state, dispatch] = useReducer(reducer, {
    step: 0,
    answers: {},
    name: '',
    phone: '',
    status: 'idle',
  });

  const selectedType = state.answers['eventType'];
  const TOTAL_STEPS = 6;
  const currentBranch = selectedType ? branchSteps[selectedType] : [];
  const currentSteps = [generalStep, ...currentBranch];
  
  const isContactStep = state.step === 5;
  const currentQuestion = !isContactStep ? currentSteps[state.step] : null;

  // Формируем ключ для рекомендации (например, "wedding_adults_small")
  const getRecommendationKey = () => {
    if (!selectedType) return null;
    const type = generalStep.options.find(o => o.value === selectedType)?.meta || 'wedding';
    
    const ageAnswer = state.answers['age'];
    const age = branchSteps[selectedType].find(s => s.id === 'age')?.options.find(o => o.value === ageAnswer)?.meta || 'adults';

    const windowsAnswer = state.answers['windows'];
    const windows = branchSteps[selectedType].find(s => s.id === 'windows')?.options.find(o => o.value === windowsAnswer)?.meta || 'unknown';

    return `${type}_${age}_${windows}`;
  };

  const recKey = getRecommendationKey();
  // Если ключ не найден, берем дефолтную заглушку
  const recommendation = recKey ? (recommendations[recKey] || { package: 'Тесла Шоу', text: 'Оставьте контакт, и мы подберем лучший вариант!' }) : null;

  const handleSelect = (questionId: string, value: string) => {
    dispatch({ type: 'ANSWER', questionId, value });
    setTimeout(() => { dispatch({ type: 'NEXT_STEP' }); }, 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SUBMIT_START' });

    try {
      const answersArray = Object.entries(state.answers).map(([key, val], index) => ({
        questionId: key,
        answer: val,
        order: index,
      }));

      const body = {
        name: state.name,
        phone: state.phone,
        answers: answersArray,
        idempotencyKey: crypto.randomUUID(), // Генерируем UUID
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка сервера');

      dispatch({ type: 'SUBMIT_SUCCESS' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Неизвестная ошибка';
      dispatch({ type: 'SUBMIT_ERROR', message });
    }
  };

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-500">
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
        <h3 className="text-2xl font-bold mb-2">Заявка отправлена!</h3>
        <p className="text-muted">Мы уже изучаем ваши ответы и свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  if (isContactStep) {
    return (
      <div className="flex flex-col min-h-[450px] animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="w-full bg-white/10 h-1 mb-8 rounded-full overflow-hidden">
          <div className="bg-primary h-full w-full transition-all duration-300" />
        </div>

        <div className="flex-1">
          <span className="text-primary text-sm font-medium mb-2 block">Последний шаг</span>
          <h3 className="text-xl md:text-2xl font-bold mb-4">Куда вам позвонить?</h3>
          
          {recommendation && (
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
              <p className="text-sm text-primary font-semibold mb-1">Мы рекомендуем: {recommendation.package}</p>
              <p className="text-sm text-muted leading-relaxed">{recommendation.text}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Ваше имя"
              value={state.name}
              onChange={(e) => dispatch({ type: 'SET_CONTACTS', name: e.target.value, phone: state.phone })}
              required
              className="w-full p-4 rounded-xl bg-background border border-white/10 focus:border-primary outline-none"
            />
            <input
              type="tel"
              placeholder="Ваш телефон"
              value={state.phone}
              onChange={(e) => dispatch({ type: 'SET_CONTACTS', name: state.name, phone: e.target.value })}
              required
              className="w-full p-4 rounded-xl bg-background border border-white/10 focus:border-primary outline-none"
            />

            {state.status === 'error' && (
              <p className="text-red-400 text-sm">{state.errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={state.status === 'submitting' || !state.name || !state.phone}
              className="w-full py-4 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {state.status === 'submitting' ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Отправка...</>
              ) : (
                <>Получить расчёт <ArrowRight className="w-5 h-5" /></>
              )}
            </button>
          </form>
        </div>

        <button
          type="button"
          onClick={() => dispatch({ type: 'PREV_STEP' })}
          className="mt-6 text-sm text-muted hover:text-white flex items-center justify-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Вернуться к вопросам
        </button>
      </div>
    );
  }

  if (currentQuestion) {
    const currentAnswer = state.answers[currentQuestion.id];

    return (
      <div className="flex flex-col min-h-[450px] animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="w-full bg-white/10 h-1 mb-8 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-500"
            style={{ width: `${(state.step / TOTAL_STEPS) * 100}%` }}
          />
        </div>

        <div className="flex-1">
          <span className="text-primary text-sm font-medium mb-2 block">
            Шаг {state.step + 1} из {TOTAL_STEPS}
          </span>
          <h3 className="text-xl md:text-2xl font-bold mb-6">{currentQuestion.title}</h3>

          <div className="space-y-3">
            {currentQuestion.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleSelect(currentQuestion.id, opt.value)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                  currentAnswer === opt.value
                    ? 'border-primary bg-primary/10'
                    : 'border-white/10 hover:border-primary/40 hover:bg-white/5'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {state.step > 0 && (
          <button
            onClick={() => dispatch({ type: 'PREV_STEP' })}
            className="mt-6 text-sm text-muted hover:text-white flex items-center justify-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Назад
          </button>
        )}
      </div>
    );
  }

  return null;
}