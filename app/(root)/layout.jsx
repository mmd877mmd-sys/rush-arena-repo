import FooterNav from "../component/application/footer";
import Navbar from "../component/application/menubar";

export default function adminLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <FooterNav />
    </>
  );
}
