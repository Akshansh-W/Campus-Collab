import { useEffect, useState } from "react";
import { Bell, CheckCircle2, XCircle, X, Clock } from "lucide-react";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(false);

  const rollNumber = localStorage.getItem("rollNumber");

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/notification/getNotification?rollNumber=${rollNumber}`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(Array.isArray(data) ? data : [data]);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleOk = async (notificationId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/notification/deleteNotification/${notificationId}`, {
        method: "POST",
      });

      if (response.ok) {
        setNotifications((previous) => previous.filter((notification) => notification.notificationId !== notificationId));
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const getIcon = (type) => {
    if (type === "APPLICATION_ACCEPTED") {
      return (
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle2 size={21} className="text-green-600" />
        </div>
      );
    }

    if (type === "APPLICATION_DECLINED") {
      return (
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
          <XCircle size={21} className="text-red-500" />
        </div>
      );
    }

    return (
      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
        <Bell size={20} className="text-purple-600" />
      </div>
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="relative">
      {/* ================= BELL BUTTON ================= */}

      <button
        type="button"
        onClick={() => setShowNotifications(!showNotifications)}
        className="
          relative
          w-10
          h-10
          rounded-full
          flex
          items-center
          justify-center
          text-gray-600
          hover:bg-purple-50
          hover:text-purple-700
          transition
        "
      >
        <Bell size={21} />

        {/* Notification count */}
        {notifications.length > 0 && (
          <span
            className="
              absolute
              -top-0.5
              -right-0.5
              min-w-5
              h-5
              px-1
              rounded-full
              bg-purple-700
              text-white
              text-[10px]
              font-semibold
              flex
              items-center
              justify-center
              border-2
              border-white
            "
          >
            {notifications.length}
          </span>
        )}
      </button>

      {/* ================= NOTIFICATION PANEL ================= */}

      {showNotifications && (
        <div
          className="
            absolute
            right-0
            top-12
            w-97.5
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-xl
            z-50
            overflow-hidden
          "
        >
          {/* Header */}

          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>

              <p className="text-xs text-gray-400 mt-0.5">Important updates about your applications</p>
            </div>

            <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-gray-700">
              <X size={18} />
            </button>
          </div>

          {/* ================= CONTENT ================= */}

          <div className="max-h-107.5 overflow-y-auto">
            {loading && <div className="px-5 py-10 text-center text-sm text-gray-400">Loading notifications...</div>}

            {!loading && notifications.length === 0 && (
              <div className="px-5 py-12 text-center">
                <div
                  className="
                    mx-auto
                    w-12
                    h-12
                    rounded-full
                    bg-purple-50
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Bell size={21} className="text-purple-500" />
                </div>

                <h4 className="mt-3 text-sm font-medium text-gray-800">No notifications</h4>

                <p className="mt-1 text-xs text-gray-400">You're all caught up.</p>
              </div>
            )}

            {!loading &&
              notifications.map((notification) => (
                <div
                  key={notification.notificationId}
                  className="
                    px-5
                    py-4
                    border-b
                    border-gray-100
                    last:border-b-0
                  "
                >
                  <div className="flex gap-3">
                    {/* Icon */}

                    {getIcon(notification.type)}

                    {/* Notification content */}

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900">{notification.title}</h4>

                      <p className="mt-1 text-xs leading-5 text-gray-500">{notification.message}</p>

                      {/* Date */}

                      <div className="flex items-center gap-1 mt-2">
                        <Clock size={12} className="text-gray-400" />

                        <span className="text-[11px] text-gray-400">{formatDate(notification.createdAt)}</span>
                      </div>

                      {/* OK button */}

                      <div className="flex justify-end mt-3">
                        <button
                          type="button"
                          onClick={() => handleOk(notification.notificationId)}
                          className="
                            px-4
                            py-1.5
                            rounded-lg
                            bg-[#5B1F73]
                            text-white
                            text-xs
                            font-medium
                            hover:bg-[#4A185F]
                            transition
                          "
                        >
                          OK
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
