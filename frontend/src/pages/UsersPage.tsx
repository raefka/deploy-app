import { useState, useEffect, useCallback } from "react";
import type { User, CreateUserData } from "../types";
import * as userService from "../services/userService";
import { UserTable } from "../components/UserTable";
import { UserForm } from "../components/UserForm";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Notification } from "../components/Notification";

type NotificationState = {
  message: string;
  type: "success" | "error";
};

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [notification, setNotification] = useState<NotificationState | null>(null);

  const showNotification = useCallback((message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
    } catch {
      showNotification("Failed to load users", "error");
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreate = async (data: CreateUserData) => {
    try {
      setIsSubmitting(true);
      await userService.createUser(data);
      setShowForm(false);
      showNotification("User created successfully", "success");
      fetchUsers();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to create user";
      showNotification(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data: CreateUserData) => {
    if (!editingUser) return;
    try {
      setIsSubmitting(true);
      await userService.updateUser(editingUser._id, data);
      setEditingUser(null);
      showNotification("User updated successfully", "success");
      fetchUsers();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to update user";
      showNotification(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingUser) return;
    try {
      setIsDeleting(true);
      await userService.deleteUser(deletingUser._id);
      setDeletingUser(null);
      showNotification("User deleted successfully", "success");
      fetchUsers();
    } catch {
      showNotification("Failed to delete user", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Users Management Dashboard</h1>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add User
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
          ) : (
            <UserTable
              users={users}
              onEdit={(user) => setEditingUser(user)}
              onDelete={(user) => setDeletingUser(user)}
            />
          )}
        </div>
      </div>

      {showForm && (
        <UserForm
          onSubmit={handleCreate}
          onClose={() => setShowForm(false)}
          isLoading={isSubmitting}
        />
      )}

      {editingUser && (
        <UserForm
          user={editingUser}
          onSubmit={handleUpdate}
          onClose={() => setEditingUser(null)}
          isLoading={isSubmitting}
        />
      )}

      {deletingUser && (
        <ConfirmDialog
          message={`Are you sure you want to delete ${deletingUser.name}?`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingUser(null)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
};
