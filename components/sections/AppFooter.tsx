import Image from "next/image";
import Link from "next/link";

export default function AppFooter() {
    return (
        <footer className="sticky bottom-0 z-12 bg-background w-full text-center pt-8 border-t border-primary flex gap-2 justify-center">
            <Image
                alt="Nexus Logo"
                height={16}
                src="/images/NexusLogo.svg"
                width={16}
            />
            <p className="font-semibold">Nexus</p>
            <p className="text-md">by</p>
            <Link
                className="font-bold hover:underline text-primary"
                href="https://ojaswiat.com"
                rel="noreferrer"
                target="_blank"
            >
                Ojas
            </Link>
        </footer>
    );
}
