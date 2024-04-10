import nlwUniteIcon from "../assets/nlw-unite-icon.svg";
import { NavLink } from "./nav-link";

export function Header() {
  return (
    <div className="py-2 flex items-center gap-4">
      <img src={nlwUniteIcon} />
      <nav className="flex items-center gap-4 font-medium text-sm">
        <NavLink href="/eventos">Eventos</NavLink>
        <NavLink href="/participantes">Participantes</NavLink>
      </nav>
    </div>
  );
}
