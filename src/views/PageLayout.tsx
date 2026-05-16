import { useNavigate } from "react-router-dom";

export function PageLayout({ title, children }: {title: string, children: any}) {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white rounded-3xl shadow-lg p-6">
        <div>
          <p className="text-slate-500">View</p>
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="rounded-2xl bg-slate-900 text-white px-5 py-3"
        >
          Back to Dashboard
        </button>
      </div>

      {children}
    </div>
  );
}