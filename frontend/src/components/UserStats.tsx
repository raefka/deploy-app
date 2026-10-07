import type { User } from "../types";

type StatCardProps = {
  label: string;
  value: string | number;
};

const StatCard = ({ label, value }: StatCardProps) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
  </div>
);

export const UserStats = ({ users }: { users: User[] }) => {
  const totalUsers = users.length;

  const uniqueNames = new Set(
    users.map((u) => u.name.trim().toLowerCase())
  ).size;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
      <StatCard label="Total Users" value={totalUsers} />
      <StatCard label="Unique Names" value={uniqueNames} />
    </div>
  );
};