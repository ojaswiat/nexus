// app/todos/page.tsx
"use client";

import type {
    TTodoCreateFormSchema,
    TTodoDeleteFormSchema,
    TTodoToggleFormSchema,
    TTodoUpdateFormSchema,
} from "@/lib/forms";
import type { TTodo } from "@/lib/types";

import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Spinner,
    Tooltip,
    useDisclosure,
} from "@heroui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { find, map, sortBy } from "lodash-es";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
    createTodo,
    deleteTodo,
    getTodosByUser,
    toggleTodoStatus,
    updateTodo,
} from "@/actions/todo";
import AddTodoItem from "@/components/todo/AddTodoItem";
import EditTodoItem from "@/components/todo/EditTodoItem";
import TodoItem from "@/components/todo/TodoItem";
import { EAlertType } from "@/lib/types";
import useAlertStore from "@/stores/AlertStore";

export default function TodosPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const alertStore = useAlertStore();

    // Modal state
    const {
        isOpen: isAddOpen,
        onOpen: onAddOpen,
        onClose: onAddClose,
    } = useDisclosure();

    const {
        isOpen: isEditOpen,
        onOpen: onEditOpen,
        onClose: onEditClose,
    } = useDisclosure();

    // Selected todo for editing
    const [selectedTodo, setSelectedTodo] = useState<TTodo | null>(null);

    // Fetch todos
    const { data, error, isLoading } = useQuery({
        queryKey: ["todos"],
        queryFn: async () => {
            const response = await getTodosByUser();

            if (response.error) {
                throw new Error(response.error);
            }

            const { data } = response;

            return sortBy(data, (todo: TTodo) => Number(todo.completed));
        },
    });

    // Create todo mutation with optimistic updates
    const createMutation = useMutation({
        mutationFn: async (newTodoData: TTodoCreateFormSchema) => {
            const result = await createTodo(newTodoData);

            if (result.error) {
                throw new Error(result.error);
            }

            return result.data;
        },
        onMutate: async (newTodoData) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["todos"] });

            // Snapshot the previous value
            const previousTodos = queryClient.getQueryData(["todos"]);

            // Create optimistic todo
            const optimisticTodo = {
                id: `temp-${Date.now()}`,
                title: newTodoData.title,
                description: newTodoData.description || null,
                completed: false,
                userId: "temp-user-id", // Will be filled by the server
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            // Optimistically update to the new value
            queryClient.setQueryData(["todos"], (old: TTodo[] = []) => {
                return [optimisticTodo, ...old];
            });

            // Return a context object with the snapshot
            return { previousTodos };
        },
        onSuccess: () => {
            alertStore.notify({
                type: EAlertType.SUCCESS,
                message: "Todo created successfully",
            });
            onAddClose();
        },
        onError: (error, _, context) => {
            // Roll back to the previous value on error
            queryClient.setQueryData(["todos"], context?.previousTodos);
            alertStore.notify({
                type: EAlertType.ERROR,
                message: error.message || "Failed to create todo",
            });
        },
        onSettled: () => {
            // Refetch after error or success
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    // Update todo mutation with optimistic updates
    const updateMutation = useMutation({
        mutationFn: async (updatedTodoData: TTodoUpdateFormSchema) => {
            const result = await updateTodo(updatedTodoData);

            if (result.error) {
                throw new Error(result.error);
            }

            return result.data;
        },
        onMutate: async (updatedTodoData) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["todos"] });

            // Snapshot the previous value
            const previousTodos = queryClient.getQueryData(["todos"]);

            // Optimistically update
            queryClient.setQueryData(["todos"], (old: TTodo[] = []) => {
                return old.map((todo) =>
                    todo.id === updatedTodoData.id
                        ? {
                              ...todo,
                              title: updatedTodoData.title,
                              description: updatedTodoData.description,
                              completed:
                                  updatedTodoData.completed !== undefined
                                      ? updatedTodoData.completed
                                      : todo.completed,
                              updatedAt: new Date(),
                          }
                        : todo,
                );
            });

            // Return context
            return { previousTodos };
        },
        onSuccess: () => {
            alertStore.notify({
                type: EAlertType.SUCCESS,
                message: "Todo updated successfully",
            });
            setSelectedTodo(null);
            onEditClose();
        },
        onError: (error, _, context) => {
            // Roll back on error
            queryClient.setQueryData(["todos"], context?.previousTodos);
            alertStore.notify({
                type: EAlertType.ERROR,
                message: error.message || "Failed to update todo",
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    // Delete todo mutation with optimistic updates
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const data: TTodoDeleteFormSchema = { id };
            const result = await deleteTodo(data);

            if (result.error) {
                throw new Error(result.error);
            }

            return result.data;
        },
        onMutate: async (todoId) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["todos"] });

            // Snapshot the previous value
            const previousTodos = queryClient.getQueryData(["todos"]);

            // Optimistically remove from UI
            queryClient.setQueryData(["todos"], (old: TTodo[] = []) => {
                return old.filter((todo) => todo.id !== todoId);
            });

            // Return context
            return { previousTodos };
        },
        onSuccess: () => {
            alertStore.notify({
                type: EAlertType.SUCCESS,
                message: "Todo deleted successfully",
            });
        },
        onError: (error, _, context) => {
            // Roll back on error
            queryClient.setQueryData(["todos"], context?.previousTodos);
            alertStore.notify({
                type: EAlertType.ERROR,
                message: error.message || "Failed to delete todo",
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    // Toggle todo status mutation with optimistic updates
    const toggleMutation = useMutation({
        mutationFn: async ({
            id,
            completed,
        }: {
            id: string;
            completed: boolean;
        }) => {
            const data: TTodoToggleFormSchema = { id, completed };
            const result = await toggleTodoStatus(data);

            if (result.error) {
                throw new Error(result.error);
            }

            return result.data;
        },
        onMutate: async ({ id, completed }) => {
            // Cancel outgoing refetches
            await queryClient.cancelQueries({ queryKey: ["todos"] });

            // Snapshot the previous value
            const previousTodos = queryClient.getQueryData(["todos"]);

            // Optimistically update
            queryClient.setQueryData(["todos"], (old: TTodo[] = []) => {
                return old.map((todo) =>
                    todo.id === id
                        ? { ...todo, completed, updatedAt: new Date() }
                        : todo,
                );
            });

            // Return context
            return { previousTodos };
        },
        onError: (error, _, context) => {
            // Roll back on error
            queryClient.setQueryData(["todos"], context?.previousTodos);
            alertStore.notify({
                type: EAlertType.ERROR,
                message: error.message || "Failed to update todo status",
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    // Handlers
    const handleAddTodo = (data: TTodoCreateFormSchema) => {
        createMutation.mutate(data);
    };

    const handleEditTodo = (id: string) => {
        const todo = find(data, (todo: TTodo) => todo.id === id);

        if (todo) {
            setSelectedTodo(todo);
            onEditOpen();
        }
    };

    const handleUpdateTodo = (data: TTodoUpdateFormSchema) => {
        updateMutation.mutate(data);
    };

    const handleDeleteTodo = (id: string) => {
        deleteMutation.mutate(id);
    };

    const handleToggleTodo = (id: string, completed: boolean) => {
        toggleMutation.mutate({ id, completed });
    };

    // Loading and error states
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen flex-col gap-4">
                <p className="text-danger text-lg">
                    Error loading todos: {error.message}
                </p>
                <Button color="primary" onPress={() => router.refresh()}>
                    Try Again
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Card className="w-full">
                <CardHeader className="flex justify-between items-center pb-0">
                    <h1 className="text-2xl font-semibold">My Todos</h1>
                    <Tooltip content="Add New Todo">
                        <Button
                            isIconOnly
                            className="text-white"
                            color="primary"
                            onPress={onAddOpen}
                        >
                            <Plus size={20} />
                        </Button>
                    </Tooltip>
                </CardHeader>
                <Divider className="my-4" />
                <CardBody>
                    {data && data.length > 0 ? (
                        <div className="grid gap-y-2">
                            {map(data, (todo: TTodo) => (
                                <TodoItem
                                    key={todo.id}
                                    completed={todo.completed}
                                    description={todo.description}
                                    id={todo.id}
                                    isPending={
                                        toggleMutation.isPending ||
                                        updateMutation.isPending ||
                                        deleteMutation.isPending
                                    }
                                    title={todo.title}
                                    userId={todo.userId}
                                    onDelete={handleDeleteTodo}
                                    onEdit={handleEditTodo}
                                    onToggle={handleToggleTodo}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-500">
                                No todos yet. Create one to get started!
                            </p>
                            <Button
                                className="mt-4"
                                color="primary"
                                variant="flat"
                                onPress={onAddOpen}
                            >
                                Add Your First Todo
                            </Button>
                        </div>
                    )}
                </CardBody>
            </Card>

            {/* Add Todo Modal */}
            <AddTodoItem
                isOpen={isAddOpen}
                isPending={createMutation.isPending}
                onClose={onAddClose}
                onSubmit={handleAddTodo}
            />

            {/* Edit Todo Modal */}
            <EditTodoItem
                isOpen={isEditOpen}
                isPending={updateMutation.isPending}
                todo={selectedTodo}
                onClose={onEditClose}
                onSubmit={handleUpdateTodo}
            />
        </div>
    );
}
