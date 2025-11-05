// Next 15: searchParams is a Promise in server components
export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>
}) {
  const { orderId } = await searchParams;

  return (
    <main className="main">
      <h1 className="text-2xl font-extrabold mb-2">پرداخت موفق</h1>
      <p className="text-slate-600">
        سفارش شما ثبت شد.{" "}
        {orderId ? (
          <>
            شماره سفارش: <span className="font-mono">{orderId}</span>
          </>
        ) : null}
      </p>
    </main>
  );
}
