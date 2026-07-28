export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-[var(--color-text-primary)]">
          ScrapCo
        </h1>
        <p className="text-[var(--color-text-secondary)] text-lg">
          Office Clearance & Scrap Buyers
        </p>
        <div className="w-16 h-1 bg-[var(--color-accent)] mx-auto rounded-full" />
        <p className="text-[var(--color-text-muted)] text-sm">
          Theme smoke test — dark background + accent color
        </p>
      </div>
    </main>
  );
}
