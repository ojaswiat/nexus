"use client";

import type { TUser } from "@/lib/types";

import {
    Avatar,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    useDisclosure,
} from "@heroui/react";
import { includes, isEmpty } from "lodash-es";
import { CircleUser, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { signOutAction } from "@/actions/supabase";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import {
    CLIENT_ROUTES,
    EServerResponseCode,
    NAV_ITEMS,
    PROTECTED_ROUTES,
} from "@/lib/constants";
import { EAlertType } from "@/lib/types";
import useAlertStore from "@/stores/AlertStore";
import useUserStore from "@/stores/UserStore";

type TTopNavbarProps = {
    user: TUser;
};

export default function TopNavbar({ user }: TTopNavbarProps) {
    const router = useRouter();
    const pathName = usePathname();

    const alertStore = useAlertStore();
    const userStore = useUserStore();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    useEffect(() => {
        userStore.fetchUserDetails();
    }, [user]);

    async function onLogout() {
        try {
            const response = await signOutAction();

            if (response.code === EServerResponseCode.SUCCESS) {
                router.push(CLIENT_ROUTES.HOME);
            } else {
                alertStore.notify({
                    type: EAlertType.ERROR,
                    message: response.message,
                });
            }
        } catch (error) {
            console.error(error);
            alertStore.notify({
                type: EAlertType.ERROR,
                message: "Failed to logout! Please try again",
            });
        }
    }

    return (
        <Navbar isBordered>
            {/* Side Navigation Drawer for Mobile */}
            <Button
                disableRipple
                className="sm:hidden px-0 justify-start"
                color="primary"
                size="sm"
                variant="light"
                onPress={onOpen}
            >
                <Menu className="text-foreground" />
            </Button>

            <Drawer
                className="w-48"
                isOpen={isOpen}
                placement="left"
                onOpenChange={onOpenChange}
            >
                <DrawerContent>
                    {(onClose) => (
                        <>
                            <DrawerBody className="mt-8">
                                {NAV_ITEMS.map((item) => {
                                    return (item.key === "dashboard" &&
                                        user?.email) ||
                                        item.key !== "dashboard" ? (
                                        <Link
                                            key={item.key}
                                            href={item.href}
                                            onClick={onClose}
                                        >
                                            <p
                                                className={`${
                                                    pathName === item.href
                                                        ? "text-primary"
                                                        : "text-foreground"
                                                }`}
                                            >
                                                {item.title}
                                            </p>
                                        </Link>
                                    ) : null;
                                })}
                            </DrawerBody>
                        </>
                    )}
                </DrawerContent>
            </Drawer>

            {/* Top Navigation */}
            <NavbarBrand className="flex gap-1">
                <Image
                    alt="Nexus Logo"
                    height={16}
                    src="/images/NexusLogo.svg"
                    width={16}
                />
                <Link
                    className="font-bold text-primary text-xl"
                    href={CLIENT_ROUTES.HOME}
                >
                    Nexus
                </Link>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {NAV_ITEMS.map((item) => {
                    return (includes(PROTECTED_ROUTES, item.href) &&
                        user?.email) ||
                        !includes(PROTECTED_ROUTES, item.href) ? (
                        <NavbarItem
                            key={item.key}
                            isActive={pathName === item.href}
                        >
                            <Link href={item.href}>
                                <p
                                    className={`${
                                        pathName === item.href
                                            ? "text-primary"
                                            : "text-foreground"
                                    }`}
                                >
                                    {item.title}
                                </p>
                            </Link>
                        </NavbarItem>
                    ) : null;
                })}
            </NavbarContent>

            <NavbarContent justify="end">
                {isEmpty(user?.email) ? (
                    <>
                        <NavbarItem>
                            <Button
                                as={Link}
                                color="primary"
                                href={CLIENT_ROUTES.LOGIN}
                                variant="bordered"
                            >
                                <p className="font-semibold">Login</p>
                            </Button>
                        </NavbarItem>
                        <NavbarItem className="hidden sm:block">
                            <Button
                                as={Link}
                                color="primary"
                                href={CLIENT_ROUTES.SIGNUP}
                                variant="solid"
                            >
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                ) : (
                    <>
                        <Dropdown className="bg-background border border-primary">
                            <DropdownTrigger>
                                <Avatar>
                                    <CircleUser />
                                </Avatar>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem
                                    key="profile"
                                    onPress={() =>
                                        router.push(CLIENT_ROUTES.PROFILE)
                                    }
                                >
                                    Profile
                                </DropdownItem>
                                <DropdownItem
                                    key="settings"
                                    onPress={() =>
                                        router.push(CLIENT_ROUTES.SETTINGS)
                                    }
                                >
                                    Settings
                                </DropdownItem>
                                <DropdownItem
                                    key="logout"
                                    className="border-t border-primary mt-4"
                                    onPress={() => onLogout()}
                                >
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </>
                )}
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
