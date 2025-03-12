// app/actions/todo.ts
"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
    TodoCreateFormSchema,
    TodoDeleteFormSchema,
    TodoToggleFormSchema,
    TodoUpdateFormSchema,
} from "@/lib/forms";
import db from "@/utils/prisma/client";
import { createClient } from "@/utils/supabase/server";

// Response type for consistent error handling
type ActionResponse<T> = {
    data?: T;
    error?: string;
};

// Helper to get the current authenticated user
async function getCurrentUserId(): Promise<string> {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Unauthorized: Please sign in to manage todos");
    }

    // Find profile in our database based on Supabase auth
    const profile = await db.profile.findUnique({
        where: { id: user.id },
    });

    if (!profile) {
        throw new Error("User profile not found");
    }

    return profile.id;
}

/**
 * Creates a new todo for the authenticated user
 */
export async function createTodo(
    data: z.infer<typeof TodoCreateFormSchema>,
): Promise<ActionResponse<any>> {
    try {
        // Validate input
        const validatedData = TodoCreateFormSchema.parse(data);

        // Get current user
        const userId = await getCurrentUserId();

        // Create todo in database
        const todo = await db.todo.create({
            data: {
                title: validatedData.title,
                description: validatedData.description,
                userId: userId,
            },
        });

        revalidatePath("/todos");

        return { data: todo };
    } catch (error) {
        console.error("Failed to create todo:", error);
        if (error instanceof z.ZodError) {
            return { error: error.errors[0].message };
        }

        return {
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to create todo. Please try again.",
        };
    }
}

/**
 * Updates an existing todo
 */
export async function updateTodo(
    data: z.infer<typeof TodoUpdateFormSchema>,
): Promise<ActionResponse<any>> {
    try {
        // Validate input
        const validatedData = TodoUpdateFormSchema.parse(data);

        // Get current user
        const userId = await getCurrentUserId();

        // Ensure the todo belongs to the user
        const existingTodo = await db.todo.findUnique({
            where: { id: validatedData.id },
        });

        if (!existingTodo || existingTodo.userId !== userId) {
            return {
                error: "Todo not found or you do not have permission to update it",
            };
        }

        // Update todo in database
        const todo = await db.todo.update({
            where: { id: validatedData.id },
            data: {
                title: validatedData.title,
                description: validatedData.description,
                completed: validatedData.completed,
            },
        });

        revalidatePath("/todos");

        return { data: todo };
    } catch (error) {
        console.error("Failed to update todo:", error);
        if (error instanceof z.ZodError) {
            return { error: error.errors[0].message };
        }

        return {
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to update todo. Please try again.",
        };
    }
}

/**
 * Deletes a todo
 */
export async function deleteTodo(
    data: z.infer<typeof TodoDeleteFormSchema>,
): Promise<ActionResponse<any>> {
    try {
        // Validate input
        const validatedData = TodoDeleteFormSchema.parse(data);

        // Get current user
        const userId = await getCurrentUserId();

        // Ensure the todo belongs to the user
        const existingTodo = await db.todo.findUnique({
            where: { id: validatedData.id },
        });

        if (!existingTodo || existingTodo.userId !== userId) {
            return {
                error: "Todo not found or you do not have permission to delete it",
            };
        }

        // Delete todo from database
        await db.todo.delete({
            where: { id: validatedData.id },
        });

        revalidatePath("/todos");

        return { data: { success: true } };
    } catch (error) {
        console.error("Failed to delete todo:", error);
        if (error instanceof z.ZodError) {
            return { error: error.errors[0].message };
        }

        return {
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to delete todo. Please try again.",
        };
    }
}

/**
 * Toggles the completed status of a todo
 */
export async function toggleTodoStatus(
    data: z.infer<typeof TodoToggleFormSchema>,
): Promise<ActionResponse<any>> {
    try {
        // Validate input
        const validatedData = TodoToggleFormSchema.parse(data);

        // Get current user
        const userId = await getCurrentUserId();

        // Ensure the todo belongs to the user
        const existingTodo = await db.todo.findUnique({
            where: { id: validatedData.id },
        });

        if (!existingTodo || existingTodo.userId !== userId) {
            return {
                error: "Todo not found or you do not have permission to update it",
            };
        }

        // Update todo status in database
        const todo = await db.todo.update({
            where: { id: validatedData.id },
            data: {
                completed: validatedData.completed,
            },
        });

        revalidatePath("/todos");

        return { data: todo };
    } catch (error) {
        console.error("Failed to toggle todo status:", error);
        if (error instanceof z.ZodError) {
            return { error: error.errors[0].message };
        }

        return {
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to update todo status. Please try again.",
        };
    }
}

/**
 * Fetches all todos for the authenticated user
 */
export async function getTodosByUser(): Promise<ActionResponse<any>> {
    try {
        // Get current user
        const userId = await getCurrentUserId();

        // Fetch todos from database
        const todos = await db.todo.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });

        return { data: todos };
    } catch (error) {
        console.error("Failed to fetch todos:", error);

        return {
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to load todos. Please try again.",
        };
    }
}
