import { MdVolumeUp, MdVolumeOff, MdRestartAlt, MdOutlineMusicNote, MdOutlineMusicOff } from "react-icons/md";
import { RiCheckboxMultipleFill, RiCheckboxMultipleBlankLine } from "react-icons/ri";
import { useVariables } from "@/hooks";
import { Link } from "@/components";

import "./header.css";

export default function Header() {
  const [{ muteSound, muteMusic, distinctMode }, setVariables] = useVariables();

  const handleMuteSound = () =>
    setVariables((prev) => {
      return { ...prev, muteSound: !prev.muteSound };
    });

  const handleMuteMusic = () =>
    setVariables((prev) => {
      return { ...prev, muteMusic: !prev.muteMusic };
    });

  const handleDistinctMode = () => {
    setVariables((prev) => {
      return { ...prev, distinctMode: !prev.distinctMode };
    });
  };

  return (
    <header className="default no-sel">
      <h4>NUMBLER</h4>
      <nav>
        <Link>
          <MdRestartAlt className="size-l" />
        </Link>
        <Link onClick={handleDistinctMode}>
          {distinctMode ? (
            <RiCheckboxMultipleBlankLine className="size-l" />
          ) : (
            <RiCheckboxMultipleFill className="size-l" />
          )}
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
