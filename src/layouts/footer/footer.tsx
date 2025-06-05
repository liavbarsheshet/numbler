import { Link } from "@/components";

import "./footer.css";

export default function Footer() {
  return (
    <footer className="default no-sel">
      <small>
        <Link href="https://github.com/liavbarsheshet" target="_blank">
          Liav Barsheshet, LB Developments
        </Link>{" "}
        © 2025
      </small>
    </footer>
  );
}
