import { MdVolumeUp, MdVolumeOff, MdRestartAlt } from "react-icons/md";
import { useVariables } from "@/hooks";
import { Link } from "@/components";

import "./header.css";

export default function Header() {
  const [{ mute }, setVariables] = useVariables();

  const handleMute = () =>
    setVariables((prev) => {
      return { ...prev, mute: !prev.mute };
    });

  return (
    <header className="default no-sel">
      <h4>NUMBLER</h4>
      <nav>
        <Link>
          <MdRestartAlt className="size-l" />
        </Link>
        <Link onClick={handleMute}>
          {mute ? <MdVolumeOff className="size-l" /> : <MdVolumeUp className="size-l" />}
        </Link>
      </nav>
    </header>
  );
}
