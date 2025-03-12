"use client";
// components/AddTodoItem.tsx
import type { TTodoCreateFormSchema } from "@/lib/forms";
import type { z } from "zod";

import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { TodoCreateFormSchema } from "@/lib/forms";

type TAddTodoItemProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: z.infer<typeof TodoCreateFormSchema>) => void;
    isPending: boolean;
};

export default function AddTodoItem({
    isOpen,
    onClose,
    onSubmit,
    isPending,
}: TAddTodoItemProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof TodoCreateFormSchema>>({
        mode: "onTouched",
        resolver: zodResolver(TodoCreateFormSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    async function onSubmitHandler(data: TTodoCreateFormSchema) {
        onSubmit(data);
    }

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
                <ModalHeader className="flex flex-col gap-1">
                    <p className="text-2xl font-semibold">Add New Todo</p>
                </ModalHeader>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <ModalBody>
                        <Input
                            {...register("title")}
                            isRequired
                            className="b-secondary"
                            errorMessage={errors.title?.message}
                            isDisabled={isPending}
                            isInvalid={!!errors.title}
                            label="Title"
                            placeholder="Enter todo title"
                            variant="bordered"
                        />

                        <Textarea
                            {...register("description")}
                            errorMessage={errors.description?.message}
                            isDisabled={isPending}
                            isInvalid={!!errors.description}
                            label="Description"
                            placeholder="Enter todo description (optional)"
                            variant="bordered"
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
                            Add Todo
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}
