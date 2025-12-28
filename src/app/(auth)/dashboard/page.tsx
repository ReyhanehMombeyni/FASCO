// import { createClient } from "@/src/supabase/server";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { CartStatCard } from "../components";

// export default async function DashboardPage() {
//   const supabase = await createClient();
  
//   const { data: { user } } = await supabase.auth.getUser();

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-3xl font-serif font-medium tracking-tight">Welcome back!</h1>
//         <p className="text-muted-foreground">Here&apos;s what is happening with your account.</p>
//       </div>

//       <Card className="bg-white border-none shadow-sm">
//         <CardContent className="pt-6">
//           <div className="flex items-center gap-4">
//             <div>
//               <h3 className="text-lg font-medium">{user?.user_metadata?.full_name || "User"}</h3>
//               <p className="text-sm text-muted-foreground">{user?.email}</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="grid gap-4 md:grid-cols-3">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">12</div>
//           </CardContent>
//         </Card>
//         <CartStatCard />
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Recent Ticket</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="text-sm text-green-600 font-medium">No active tickets</div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }


import { createClient } from "@/src/supabase/server";
import { redirect } from "next/navigation";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger 
} from "@/components/ui";
import { User, Package, Settings, LogOut } from "lucide-react";
import { LogoutButton } from "../components/LogoutButton";
import { CartStatCard } from "../components";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto py-10 px-5 md:px-20 lg:px-30">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-serif">Welcome, {user.user_metadata?.username || "User"}</h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
        <div className="flex items-center gap-2">
        <LogOut />
        <LogoutButton />
        </div>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100 p-1">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <Package className="w-4 h-4" /> Orders
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" /> Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Full Name</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold">{user.user_metadata?.full_name || "N/A"}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Username</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-bold">{user.user_metadata?.username}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Joined At</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">{new Date(user.created_at).toLocaleDateString()}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="flex gap-2 items-start w-full">
          <Card className="w-full">
            <CartStatCard />
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 py-10 text-center border-2 border-dashed rounded-lg">
                You have not placed any orders yet.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
           <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">Manage your security and personal information.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}