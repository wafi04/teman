import { Trash2, CheckCircle } from "lucide-react";
import {
  deleteNotifications,
  deleteNotificationsUser,
  getNotificationSeller,
  getNotificationUser,
  MarkAsRead,
  MarkAsReadUser,
} from "../../api/notifications/selllerNotifications";
import { HeaderDashboard } from "./components/Header";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { useAuth } from "../../provider/AuthProvider";

export function DashboardNotifications() {
  const { isAdmin } = useAuth();
  const { data } = getNotificationSeller();
  const { data: user } = getNotificationUser();
  const notifications = isAdmin ? data?.data ?? [] : user?.data ?? [];
  const update = MarkAsRead();
  const updateNotifuser = MarkAsReadUser();
  const deleteUserNotif = deleteNotificationsUser();
  const deletes = deleteNotifications();
  const updated = isAdmin ? update : updateNotifuser;
  const deleted = isAdmin ? deletes : deleteUserNotif;

  return (
    <div className="p-6 space-y-6 h-[80vh] overflow-y-auto">
      <HeaderDashboard
        title="Notifications"
        subTitle={`You have ${notifications.length} notifications`}
      />

      <div className="space-y-4">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-lg p-4 flex justify-between items-center hover:shadow-sm transition-shadow">
            <div className="flex-grow">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                {item.is_read === 0 && (
                  <Badge variant="default" className="ml-2">
                    New
                  </Badge>
                )}
              </div>
              <p className="text-gray-600">{item.message}</p>
              <span className="text-xs text-gray-500 mt-1 block">
                {new Date(item.created_at).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-green-500 hover:text-green-600"
                title="Mark as Read"
                onClick={() => updated.mutate(item.id)}>
                <CheckCircle className="w-5 h-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-600"
                title="Delete Notification"
                onClick={() => deleted.mutate(item.id)}>
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            No notifications found
          </div>
        )}
      </div>
    </div>
  );
}
