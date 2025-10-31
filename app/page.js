import Navbar from "./component/application/menubar";
import FooterNav from "./component/application/footer";
import BannerSlider from "./component/application/banner";
import MatchCards from "./component/application/match-card";
import MarqueeText from "./component/application/marqueeText";

export default function Home() {
  return (
    <div className="w-full font-sans min-h-screen flex flex-col items-center ">
      <main className="w-full flex flex-col gap-6 items-center sm:items-center ">
        <Navbar />

        <MarqueeText text="🚀 Rush Arena — The Ultimate Battle Arena! ⚔️ Join Now • Play Fast • Win Big •" />

        <BannerSlider />
        <MatchCards />

        <FooterNav />
      </main>
    </div>
  );
}
