import type { User } from "../types";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export const UserTable = ({ users, onEdit, onDelete }: UserTableProps) => {
  if (users.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No users found.</p>
        <p className="text-sm mt-1">Click &quot;+ Add User&quot; to create one.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Email</th>
            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Age</th>
            <th className="py-3 px-4 text-sm font-semibold text-gray-600">Created At</th>
            <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 px-4 text-sm text-gray-900">{user.name}</td>
              <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
              <td className="py-3 px-4 text-sm text-gray-600">{user.age}</td>
              <td className="py-3 px-4 text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-4 text-right">
                <button
                  onClick={() => onEdit(user)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
