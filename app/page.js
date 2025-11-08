import Navbar from "./component/application/menubar";
import FooterNav from "./component/application/footer";
import BannerSlider from "./component/application/banner";
import MatchCards from "./component/application/match-card";
import MarqueeText from "./component/application/marqueeText";
import PopupNotice from "./component/application/PopupNotice";

export default function Home() {
  return (
    <div className="w-full font-sans min-h-screen flex flex-col items-center ">
      <Navbar />
      <main className="w-full flex flex-col gap-6 items-center sm:items-center my-24   ">
        <PopupNotice />
        <MarqueeText />

        <BannerSlider />
        <MatchCards />
      </main>
      <FooterNav />
    </div>
  );
}
