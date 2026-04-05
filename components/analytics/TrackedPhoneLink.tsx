"use client";

import { usePathname } from "next/navigation";
import { pushDataLayer } from "@/lib/analytics";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function TrackedPhoneLink({ href, children, className }: Props) {
  const pathname = usePathname();

  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        pushDataLayer({ event: "phone_click", page: pathname ?? "" });
      }}
    >
      {children}
    </a>
  );
}
