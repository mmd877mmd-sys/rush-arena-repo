import Navbar from "./component/application/menubar";
import FooterNav from "./component/application/footer";
import BannerSlider from "./component/application/banner";
import MatchCards from "./component/application/match-card";

export default function Home() {
  return (
    <div className="w-full font-sans min-h-screen flex flex-col items-center gap-16 pt-4">
      <main className="w-full flex flex-col gap-8 items-center sm:items-center mt-16 mb-20">
        <Navbar />

        <div className="w-full p-3 text-md bg-amber-100 rounded text-center sm:text-left">
          lorem in lkjaf fkj lasdkjf
        </div>

        <BannerSlider />
        <MatchCards />

        <FooterNav />
      </main>
    </div>
  );
}
