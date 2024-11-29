import { Bell, HelpCircle, LogOut, ShoppingBag, User } from "lucide-react";
import {
  getNotificationSeller,
  getNotificationUser,
} from "../../api/notifications/selllerNotifications";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../../components/ui/dropdown-menu";
import SearchInput from "../../components/ui/search/SearchInput";
import { useAuth } from "../../provider/AuthProvider";

export function Navbar() {
  const { user, isAdmin, logout } = useAuth();

  const { data } = getNotificationSeller();
  const { data: usernotif } = getNotificationUser();

  const notifications = isAdmin ? data : usernotif;
  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow-sm">
      {user && (
        <div className="bg-gray-50 py-2 px-4 md:px-10">
          <div className="max-w-7xl mx-auto flex justify-end items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </div>
            <span className="text-gray-300">|</span>
            <span>Welcome, {user.name}</span>
            <span className="text-gray-300">|</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="flex items-center space-x-2">
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a
            href="/"
            className="text-3xl font-bebas md:text-4xl font-bold text-primary hover:text-primary/90 transition-colors">
            NextStore
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6 items-center font-bebas">
            <a
              href="/dashboard"
              className="text-lg font-medium text-gray-700 hover:text-primary transition-colors">
              Dashboard
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block">
              <SearchInput />
            </div>

            {/* Cart */}
            <a
              href="/dashboard/cart"
              className="relative hover:text-primary transition-colors">
              <ShoppingBag className="w-6 h-6" />
              {/* {cartItemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">
                  {cartItemCount}
                </Badge>
              )} */}
            </a>

            {/* Notifications */}
            <a
              href="/dashboard/notifications"
              className="relative hover:text-primary transition-colors">
              <Bell className="w-6 h-6" />
              {user && (notifications?.total_unread as number) > 0 && (
                <Badge
                  variant="default"
                  className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs">
                  {notifications?.total_unread}
                </Badge>
              )}
            </a>

            {/* User Profile Dropdown */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="rounded-full p-0 hover:bg-transparent">
                    <Avatar>
                      <AvatarImage
                        src={user.image || undefined}
                        alt={user.name}
                      />
                      <AvatarFallback>
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage
                          src={user.image || undefined}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a href="/dashboard/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
