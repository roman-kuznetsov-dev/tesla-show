export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';

export default async function AdminDashboard() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: 'desc' },
    include: { quizAnswers: true },
    take: 50,
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Заявки ({leads.length})</h2>

      {leads.length === 0 ? (
        <p className="text-muted">Пока заявок нет.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-muted text-sm">
                <th className="py-3 px-2">Дата</th>
                <th className="py-3 px-2">Имя</th>
                <th className="py-3 px-2">Телефон</th>
                <th className="py-3 px-2">Статус</th>
                <th className="py-3 px-2">Ответы</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-2 text-sm">
                    {new Date(lead.createdAt).toLocaleString('ru-RU')}
                  </td>
                  <td className="py-3 px-2 font-medium">{lead.name}</td>
                  <td className="py-3 px-2">{lead.phone}</td>
                  <td className="py-3 px-2">
                    <span className="px-2 py-1 rounded-full text-xs bg-primary/20 text-primary">
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-2">
                    {lead.quizAnswers.length > 0 ? (
                      <details className="cursor-pointer">
                        <summary className="text-sm text-primary">
                          Показать ({lead.quizAnswers.length})
                        </summary>
                        <ul className="mt-2 text-xs space-y-1 text-muted">
                          {lead.quizAnswers.map((ans) => (
                            <li key={ans.id}>
                              <strong>{ans.questionId}:</strong> {ans.answer}
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <span className="text-muted text-sm">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}