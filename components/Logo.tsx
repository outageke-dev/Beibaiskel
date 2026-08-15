import Link from "next/link";
export default function Logo(){
 return <Link href="/" className="logo" aria-label="Bei Baiskeli home">
  <svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="8" cy="23" r="5"/><circle cx="25" cy="23" r="5"/><path d="M8 23 14 11l5 12M14 11h5l6 12M12 15h8M14 11l-3-3"/></svg>
  <b>Bei</b> Baiskeli
 </Link>
}
