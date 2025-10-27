// src/components/widgets/WidgetArea.tsx
export function WidgetArea({ widgets }: { widgets?: { id: string; title?: string | null; content?: string | null }[] | null }) {
  if (!widgets || widgets.length === 0) return null;
  return (
    <div className="space-y-6">
      {widgets.map(w => (
        <div key={w.id} className="prose max-w-none">
          {w.title && <h3 className="text-base font-medium">{w.title}</h3>}
          {w.content && <div dangerouslySetInnerHTML={{ __html: w.content }} />}
        </div>
      ))}
    </div>
  );
}