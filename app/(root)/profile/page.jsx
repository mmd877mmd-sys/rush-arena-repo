import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  User,
  Wallet,
  Award,
  CreditCard,
  ClipboardList,
  Share2,
  LogOut,
} from "lucide-react";
import Navbar from "@/app/component/application/menubar";
import FooterNav from "@/app/component/application/footer";
import { depositPage, transection, withdrawPage } from "@/config";

export default function ProfileSidebar() {
  return (
    <>
      <Navbar />
      <div className="max-w-md mx-auto p-4 my-16">
        <Card className="bg-[#0f0720] text-white shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold">manik222</h3>
              </div>

              <div className="w-full mt-3 bg-white/8 rounded-xl py-3 px-2 flex justify-between text-center">
                <div className="flex-1">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-xs text-white/70">Match Played</div>
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-xs text-white/70">Total Kill</div>
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold">0</div>
                  <div className="text-xs text-white/70">Won</div>
                </div>
              </div>
            </div>
          </CardContent>

          <div className="divide-y divide-white/6">
            <MenuItem
              href="wallet"
              icon={<Wallet size={20} />}
              label="Wallet"
            />
            <MenuItem
              href={depositPage}
              icon={<CreditCard size={20} />}
              label="Diposit"
            />
            <MenuItem
              href={withdrawPage}
              icon={<Award size={20} />}
              label="Withdraw"
            />
            <MenuItem
              href={transection}
              icon={<CreditCard size={20} />}
              label="Transection history"
            />

            <MenuItem
              href="profile/my-profile"
              icon={<User size={20} />}
              label="My Profile"
            />
            <MenuItem
              href="profile/rules"
              icon={<ClipboardList size={20} />}
              label="All Rules"
            />

            <MenuItem
              href="profile/share"
              icon={<Share2 size={20} />}
              label="Share This App"
            />

            <div className="p-4">
              <Button className="w-full rounded-full bg-red-600 hover:bg-red-700">
                <div className="flex items-center justify-center gap-2 w-full">
                  <LogOut size={18} />
                  <span>Logout</span>
                </div>
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <FooterNav />
    </>
  );
}

function MenuItem({ icon, label, href }) {
  return (
    <Link href={href} className="w-full block">
      <button className="w-full text-left p-4 flex items-center gap-4 hover:bg-white/3 ">
        <div className="w-10 h-10 flex items-center justify-center rounded-md bg-white/6">
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium">{label}</div>
        </div>
        <ChevronRight size={18} className="text-white/70" />
      </button>
    </Link>
  );
}
