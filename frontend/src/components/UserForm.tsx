import { useState, useEffect, type FormEvent } from "react";
import type { User, CreateUserData } from "../types";

interface UserFormProps {
  user?: User | null;
  onSubmit: (data: CreateUserData) => Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  age?: string;
}

export const UserForm = ({ user, onSubmit, onClose, isLoading }: UserFormProps) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [age, setAge] = useState(user?.age?.toString() || "");
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAge(user.age.toString());
    }
  }, [user]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!age.trim()) {
      newErrors.age = "Age is required";
    } else if (isNaN(Number(age)) || Number(age) < 0) {
      newErrors.age = "Age must be a positive number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await onSubmit({ name: name.trim(), email: email.trim(), age: Number(age) });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {user ? "Edit User" : "Add User"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.age ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="25"
              min="0"
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : user ? "Update User" : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
