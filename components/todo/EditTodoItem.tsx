// components/EditTodoItem.tsx
import type { z } from "zod";

import {
    Button,
    Checkbox,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { TodoUpdateFormSchema } from "@/lib/forms";

type Todo = {
    id: string;
    title: string;
    description?: string | null;
    completed: boolean;
};

type TEditTodoItemProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: z.infer<typeof TodoUpdateFormSchema>) => void;
    todo: Todo | null;
    isPending: boolean;
};

export default function EditTodoItem({
    isOpen,
    onClose,
    onSubmit,
    todo,
    isPending,
}: TEditTodoItemProps) {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof TodoUpdateFormSchema>>({
        mode: "onTouched",
        resolver: zodResolver(TodoUpdateFormSchema),
        defaultValues: {
            id: "",
            title: "",
            description: "",
            completed: false,
        },
    });

    // Reset form when todo changes
    React.useEffect(() => {
        if (todo && isOpen) {
            reset({
                id: todo.id,
                title: todo.title,
                description: todo.description || "",
                completed: todo.completed,
            });
        }
    }, [todo, isOpen, reset]);

    const onSubmitHandler = (data: z.infer<typeof TodoUpdateFormSchema>) => {
        onSubmit(data);
    };

    if (!todo) return null;

    return (
        <Modal
            isOpen={isOpen}
            placement="center"
            onClose={onClose}
            onOpenChange={(open) => {
                if (!open) reset();
            }}
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Edit Todo
                        </ModalHeader>
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                            <ModalBody>
                                <Controller
                                    control={control}
                                    name="title"
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            isRequired
                                            errorMessage={errors.title?.message}
                                            isDisabled={isPending}
                                            isInvalid={!!errors.title}
                                            label="Title"
                                            placeholder="Enter todo title"
                                            variant="bordered"
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="description"
                                    render={({ field }) => (
                                        <Textarea
                                            {...field}
                                            errorMessage={
                                                errors.description?.message
                                            }
                                            isDisabled={isPending}
                                            isInvalid={!!errors.description}
                                            label="Description"
                                            placeholder="Enter todo description (optional)"
                                            value={field.value || ""}
                                            variant="bordered"
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="completed"
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <Checkbox
                                            isDisabled={isPending}
                                            isSelected={value}
                                            onValueChange={onChange}
                                        >
                                            Mark as completed
                                        </Checkbox>
                                    )}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    isDisabled={isPending}
                                    variant="flat"
                                    onPress={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    isLoading={isPending}
                                    type="submit"
                                >
                                    Update Todo
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
