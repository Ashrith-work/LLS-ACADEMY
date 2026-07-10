import { PlayCircle, Award, Users, Radio, MessageSquare, Star, type LucideIcon } from "lucide-react";

/** Maps a Guarantee.icon name (see lib/data/site GUARANTEES) to a lucide icon. */
const ICONS: Record<string, LucideIcon> = {
  "play-circle": PlayCircle,
  award: Award,
  users: Users,
  radio: Radio,
  "message-square": MessageSquare,
  star: Star,
};

export function GuaranteeIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Star;
  return <Icon className={className} aria-hidden />;
}
