import { MdVolumeUp, MdVolumeOff, MdRestartAlt, MdOutlineMusicNote, MdOutlineMusicOff } from "react-icons/md";
import { useVariables } from "@/hooks";
import { Link } from "@/components";

import "./header.css";

export default function Header() {
  const [{ muteSound, muteMusic }, setVariables] = useVariables();

  const handleMuteSound = () =>
    setVariables((prev) => {
      return { ...prev, muteSound: !prev.muteSound };
    });
  const handleMuteMusic = () =>
    setVariables((prev) => {
      return { ...prev, muteMusic: !prev.muteMusic };
    });

  return (
    <header className="default no-sel">
      <h4>NUMBLER</h4>
      <nav>
        <Link>
          <MdRestartAlt className="size-l" />
        </Link>
        <Link onClick={handleMuteSound}>
          {muteSound ? <MdVolumeOff className="size-l" /> : <MdVolumeUp className="size-l" />}
        </Link>
        <Link onClick={handleMuteMusic}>
          {muteMusic ? <MdOutlineMusicOff className="size-l" /> : <MdOutlineMusicNote className="size-l" />}
        </Link>
      </nav>
    </header>
  );
}
