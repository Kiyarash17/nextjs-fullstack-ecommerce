// app/(store)/loading.tsx
export default function CatalogLoading() {
  return (
    <main className="main">
      <div className="h-7 w-40 rounded-xl bg-slate-200 mb-4 animate-pulse" />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="card-base p-4">
            <div className="aspect-[16/10] w-full rounded-xl bg-slate-200 animate-pulse" />
            <div className="h-4 w-2/3 mt-4 rounded bg-slate-200 animate-pulse" />
            <div className="h-4 w-1/3 mt-2 rounded bg-slate-200 animate-pulse" />
            <div className="h-10 w-full mt-4 rounded-xl bg-slate-200 animate-pulse" />
          </div>
        ))}
      </div>
    </main>
  );
}
