import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import MobileNavbar from "@/components/MobileNavbar";
import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const loggedIn = await getLoggedInUser();

if(!loggedIn) redirect('/sign-in');

  return (
    <main className="flex h-screen w-full">
      <Sidebar user={loggedIn}/>

      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/tether_logo.svg" width={40} height={40} alt="logo"/>
          <div>
            <MobileNavbar user={loggedIn}/>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
