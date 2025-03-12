import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Checkbox,
    Tooltip,
} from "@heroui/react";
import { Pencil, Trash } from "lucide-react";

import { cn } from "@/lib/utils";

type TTodoItemProps = {
    id: string;
    title: string;
    description?: string | null;
    completed: boolean;
    userId: string;
    onToggle: (id: string, completed: boolean) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    isPending?: boolean;
};

export default function TodoItem({
    id,
    title,
    description,
    completed,
    onToggle,
    onEdit,
    onDelete,
    isPending = false,
}: TTodoItemProps) {
    return (
        <Card
            className={cn("w-full", "slide-down", {
                "bg-gray-50": completed,
                "opacity-70": isPending,
            })}
            shadow="sm"
        >
            <CardBody className="flex flex-row items-start gap-2 py-4">
                <Checkbox
                    className="m-0 p-0"
                    isDisabled={isPending}
                    isSelected={completed}
                    size="lg"
                    onChange={() => onToggle(id, !completed)}
                />
                <div className="flex-1">
                    <h3
                        className={cn("text-md font-semibold", {
                            "line-through": completed,
                            "text-gray-500": completed,
                        })}
                    >
                        {title}
                    </h3>
                    {description && (
                        <p
                            className={cn("text-sm mt-1 text-gray-600", {
                                "text-gray-400": completed,
                            })}
                        >
                            {description}
                        </p>
                    )}
                </div>
            </CardBody>
            <CardFooter className="flex justify-end gap-2 py-2">
                <Tooltip content="Edit">
                    <Button
                        isIconOnly
                        isDisabled={isPending}
                        size="sm"
                        variant="light"
                        onPress={() => onEdit(id)}
                    >
                        <Pencil size={16} />
                    </Button>
                </Tooltip>
                <Tooltip color="danger" content="Delete">
                    <Button
                        isIconOnly
                        color="danger"
                        isDisabled={isPending}
                        size="sm"
                        variant="light"
                        onPress={() => onDelete(id)}
                    >
                        <Trash size={16} />
                    </Button>
                </Tooltip>
            </CardFooter>
        </Card>
    );
}
