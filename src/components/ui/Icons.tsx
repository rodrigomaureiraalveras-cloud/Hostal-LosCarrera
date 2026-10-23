import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
      width="1em"
      height="1em"
      {...props}
    >
      {children}
    </svg>
  );
}

export const InstagramIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="3" width="14" height="14" rx="4" />
    <circle cx="10" cy="10" r="3.2" />
    <path d="M14.2 5.8h.01" />
  </Base>
);

export const YoutubeIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.5" y="4.5" width="15" height="11" rx="3.5" />
    <path d="M8.5 7.6v4.8l4-2.4-4-2.4Z" />
  </Base>
);

export const XIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 4l12 12M16 4L4 16" />
  </Base>
);

export const ArrowElbowIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6h8v8" />
    <path d="M14 6L5.5 14.5" />
  </Base>
);

export const MenuIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 7h14M3 13h14" />
  </Base>
);

export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 5l10 10M15 5L5 15" />
  </Base>
);

export const ArrowUpRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 14L14 6M7 6h7v7" />
  </Base>
);

export const ArrowLeftIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M16 10H4M9 5l-5 5 5 5" />
  </Base>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 10h12M11 5l5 5-5 5" />
  </Base>
);

export const PlusIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M10 4v12M4 10h12" />
  </Base>
);

export const CheckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4.5 10.5l3.5 3.5 7.5-8" />
  </Base>
);

export const LinkedinIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="3" y="3" width="14" height="14" rx="3" />
    <path d="M7 9v4.5M7 6.6h.01M10 13.5V9M10 11c0-1.2.9-2 2-2s2 .8 2 2v2.5" />
  </Base>
);

export const ReportIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 3h6l3 3v11H6z" />
    <path d="M12 3v3h3M8.5 10h4M8.5 13h4" />
  </Base>
);

export const ListIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="3.5" width="12" height="13" rx="2" />
    <path d="M7 7.5h6M7 10.5h6M7 13.5h3.5" />
  </Base>
);

export const SyncIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M15.5 8A6 6 0 0 0 5 6.2L4 7.5M4.5 12A6 6 0 0 0 15 13.8l1-1.3" />
    <path d="M4 4.5v3h3M16 15.5v-3h-3" />
  </Base>
);

export const UserIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="10" cy="7" r="3" />
    <path d="M4.5 16.5c.8-2.8 3-4.2 5.5-4.2s4.7 1.4 5.5 4.2" />
  </Base>
);

export const CloudOffIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M7 15H6a3.5 3.5 0 0 1-.5-7A5 5 0 0 1 14 6.2M15.5 8.6A3.2 3.2 0 0 1 14 15h-4" />
    <path d="M3.5 3.5l13 13" />
  </Base>
);

export const CameraIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6h2l1.2-2h4.6l1.2 2h2A1.5 1.5 0 0 1 17 7.5v7a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5z" />
    <circle cx="10" cy="11" r="2.8" />
  </Base>
);

export const PinIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M10 17s5-4.6 5-9a5 5 0 0 0-10 0c0 4.4 5 9 5 9z" />
    <circle cx="10" cy="8" r="1.8" />
  </Base>
);

export const ShieldIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M10 2.8l6 2.2v4.6c0 3.7-2.6 6.4-6 7.6-3.4-1.2-6-3.9-6-7.6V5z" />
    <path d="M7.3 10l1.9 1.9 3.6-3.8" />
  </Base>
);

export const SignalIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 15v-2M8 15v-5M12 15V7M16 15V4" />
  </Base>
);

export const PhoneIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6.2 3.5h-2a1 1 0 0 0-1 1.1A13 13 0 0 0 15.4 16.8a1 1 0 0 0 1.1-1v-2l-3.2-1.3-1.6 1.6a9 9 0 0 1-4.8-4.8l1.6-1.6z" />
  </Base>
);

export const WhatsappIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M10 3a7 7 0 0 0-6 10.6L3 17l3.5-1A7 7 0 1 0 10 3z" />
    <path d="M7.6 7.4c.2-.4.6-.4.8 0l.6 1.3-.6.8a4.3 4.3 0 0 0 2.1 2.1l.8-.6 1.3.6c.4.2.4.6 0 .8-1.6 1.2-5.7-2.7-5-5z" />
  </Base>
);

export const FacebookIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M11.5 17v-6h2.2l.3-2.5h-2.5V7c0-.7.3-1.2 1.3-1.2H14V3.6c-.4-.1-1.2-.1-1.9-.1-1.9 0-3.1 1.1-3.1 3.2v1.8H7V11h2v6" />
  </Base>
);

export const WifiIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.8 7.6a10.3 10.3 0 0 1 14.4 0M5.3 10.2a6.7 6.7 0 0 1 9.4 0M7.8 12.8a3.1 3.1 0 0 1 4.4 0" />
    <path d="M10 15.5h.01" />
  </Base>
);

export const TvIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="2.5" y="4.5" width="15" height="10" rx="1.5" />
    <path d="M7 17.5h6M10 14.5v3" />
  </Base>
);

export const BedIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.5 15.5v-10M2.5 12.5h15v3M17.5 12.5V10a2 2 0 0 0-2-2H9v4.5" />
    <circle cx="5.7" cy="9.6" r="1.6" />
  </Base>
);

export const BathIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 10.5h14v1.5a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
    <path d="M5 10.5V5a1.8 1.8 0 0 1 3.5-.6M6 16l-.8 1.5M14 16l.8 1.5" />
  </Base>
);

export const AccessIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="10" cy="3.8" r="1.3" />
    <path d="M9.5 6.5v4.5h4l1.5 4M9.5 8.5h3.5" />
    <path d="M7.2 9.5a3.8 3.8 0 1 0 5.3 5" />
  </Base>
);

export const BusIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="4" y="3" width="12" height="12" rx="2" />
    <path d="M4 9.5h12M7 15v2M13 15v2M7 12.5h.01M13 12.5h.01" />
  </Base>
);

export const CartIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M2.5 3.5h2l1.8 8.5h8.8l1.7-6H5.4" />
    <circle cx="7.5" cy="15.5" r="1.2" />
    <circle cx="13.8" cy="15.5" r="1.2" />
  </Base>
);
