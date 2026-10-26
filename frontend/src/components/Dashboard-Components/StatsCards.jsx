import { FolderKanban, CircleCheckBig, PlayCircle, Users, Star } from "lucide-react";

export default function StatsCards({ stats, activeCount = 0 }) {
  const cards = [
    {
      title: "My Projects",
      icon: FolderKanban,
      value: stats?.noOfProjects ?? 0,
      iconBg: "#EDE4F7",
      iconColor: "#7A3A93",
    },
    {
      title: "Completed Projects",
      icon: CircleCheckBig,
      value: stats?.completedProjects ?? 0,
      iconBg: "#E4EEFB",
      iconColor: "#3B6FB6",
    },
    {
      title: "Active Projects",
      icon: PlayCircle,
      value: activeCount,
      iconBg: "#F1E4FB",
      iconColor: "#8B3AB0",
    },
    {
      title: "Collaborators",
      icon: Users,
      value: stats?.collaborators ?? 0,
      iconBg: "#EDE4F7",
      iconColor: "#7A3A93",
    },
    {
      title: "Rating",
      icon: Star,
      value: stats?.rating ? `${stats.rating} / 5` : "0 / 5",
      iconBg: "#FBE4EC",
      iconColor: "#C23A73",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
      {cards.map(({ title, icon: Icon, value, iconBg, iconColor }) => (
        <div
          key={title}
          className="flex min-h-35 items-center gap-4 rounded-2xl bg-white px-5 py-5"
          style={{ boxShadow: "0 4px 24px rgba(91,31,115,0.06)" }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: iconBg }}
          >
            <Icon size={20} style={{ color: iconColor }} />
          </div>
          <div className="min-w-0">
            <p className="text-2xl font-bold text-gray-900 leading-none">
              {value}
            </p>
            <p className="text-xs text-gray-500 mt-1.5 truncate">{title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}