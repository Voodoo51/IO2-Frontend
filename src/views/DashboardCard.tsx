export function DashboardCard({ title, description, onClick }: {title: string, description: string, onClick: any}) {
   return (
    <div onClick={onClick}
      className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition cursor-pointer border border-slate-100">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-500">{description}</p>
    </div>
  );
}