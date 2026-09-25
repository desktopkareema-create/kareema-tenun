import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buildWhatsAppLink } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { SiWhatsapp } from "react-icons/si";

const NAV_LINKS = [
  { to: "/", label: "Beranda" },
  { to: "/koleksi", label: "Koleksi" },
  { to: "/tentang", label: "Tentang Kami" },
  { to: "/kontak", label: "Kontak" },
] as const;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <header
      data-ocid="header"
      className="bg-card/95 border-border sticky top-0 z-50 border-b backdrop-blur supports-[backdrop-filter]:bg-card/80"
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-6 px-5 lg:px-8">
        <Link
          to="/"
          aria-label="KAREEMA — Beranda"
          data-ocid="header.logo_link"
          className="focus-visible:ring-ring shrink-0 focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
        >
          <Logo variant="horizontal" className="h-10" />
        </Link>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-9 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
              className={cn(
                "font-display relative py-2 text-xs tracking-[0.2em] uppercase transition-colors",
                "after:bg-accent after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:transition-transform",
                "hover:text-foreground hover:after:scale-x-100",
                isActive(link.to)
                  ? "text-foreground after:scale-x-100"
                  : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            className="hidden rounded-none border-primary/25 font-display text-[0.7rem] tracking-[0.18em] uppercase lg:inline-flex"
          >
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="header.whatsapp_button"
            >
              <SiWhatsapp className="size-4" aria-hidden="true" />
              Pesan Sekarang
            </a>
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Buka menu navigasi"
                data-ocid="header.menu_button"
                className="rounded-none lg:hidden"
              >
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-card w-72 border-l">
              <SheetHeader className="border-border border-b pb-5">
                <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
                <Logo variant="horizontal" className="h-10" />
              </SheetHeader>
              <nav aria-label="Navigasi seluler" className="flex flex-col px-4">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.to}>
                    <Link
                      to={link.to}
                      data-ocid={`mobile_nav.${link.label.toLowerCase().replace(/\s+/g, "_")}_link`}
                      className={cn(
                        "font-display border-border border-b py-4 text-sm tracking-[0.18em] uppercase transition-colors",
                        isActive(link.to)
                          ? "text-accent"
                          : "text-foreground hover:text-accent",
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <Button
                  asChild
                  className="w-full rounded-none font-display text-xs tracking-[0.18em] uppercase"
                >
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="mobile_nav.whatsapp_button"
                  >
                    <SiWhatsapp className="size-4" aria-hidden="true" />
                    Pesan via WhatsApp
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
