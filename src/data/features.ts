import {
  Zap,
  Orbit,
  Lightbulb,
  Music,
  Mic,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    icon: Zap,
    title: 'Катушка Тесла',
    description:
      'Познакомьтесь с легендарной катушкой Тесла — источником настоящих молний.',
  },
  {
    icon: Orbit,
    title: 'Плазменные шары',
    description:
      'Прикоснитесь к светящимся плазменным шарам — молнии внутри шара реагируют на вашу руку.',
  },
  {
    icon: Lightbulb,
    title: 'Лампы силой мысли',
    description:
      'Зажгите лампы силой мысли — как настоящие джедаи! Управляйте светом без проводов.',
  },
  {
    icon: Music,
    title: 'Угадай мелодию',
    description:
      'Сыграйте в «Угадай мелодию» с музыкальными молниями — каждая нота звучит через разряд.',
  },
  {
    icon: Mic,
    title: 'Интерактив с ведущим',
    description:
      'Поучаствуйте в увлекательном интерактиве — ведущий вовлекает гостей в каждый эксперимент.',
  },
  {
    icon: Sparkles,
    title: 'Банана-бластер',
    description:
      'Увидите специального гостя — Банана-бластер! Он взрывается снопом искр и вызывает восторг.',
  },
];