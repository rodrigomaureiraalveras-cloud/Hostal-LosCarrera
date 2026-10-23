import { SOCIALS } from "@/lib/content";
import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon, YoutubeIcon } from "@/components/ui/Icons";

const ICONS = {
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  x: XIcon,
  facebook: FacebookIcon,
} as const;

export function SocialRow({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-[17px] ${className}`}>
      {SOCIALS.map((s) => {
        const Icon = ICONS[s.id];
        return (
          <li key={s.id}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="flex size-[38px] items-center justify-center rounded-full border border-white/29 text-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-night"
            >
              <Icon className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
