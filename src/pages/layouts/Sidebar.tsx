import React, { ReactNode, useState, useEffect } from "react";
import { PanelLeft, PanelRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getFilteredMenuItems, menuItems } from "./Sidebar_data";
import { MenuItem } from "./Sidebar_Menu";
import { useAuth } from "../../provider/AuthProvider";

const ANIMATION_DURATION = 0.3;
const MOBILE_BREAKPOINT = 768;

const Sidebar: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { isAdmin } = useAuth();
  const filteredMenuItems = getFilteredMenuItems(isAdmin);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (mobile) {
        setIsExpanded(false);
      } else {
        setIsExpanded(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      <div
        className={`flex ${isMobile ? "flex-col" : "flex-row"} h-full w-full`}>
        {/* Sidebar for Desktop */}
        {!isMobile && (
          <motion.div
            className={`
              h-screen bg-white shadow-xl
              sticky top-0 left-0
              transition-all duration-300
              border-r border-gray-100
              z-40
              ${isExpanded ? "w-64" : "w-20"}
            `}
            initial={{ width: 256 }}
            animate={{ width: isExpanded ? 256 : 80 }}
            transition={{ duration: ANIMATION_DURATION }}>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="
                absolute top-4 -right-4
                bg-white shadow-md
                rounded-full p-1
                border border-gray-200
                z-50
                hover:bg-gray-50
                transition-colors
              ">
              {isExpanded ? (
                <PanelLeft className="w-5 h-5 text-gray-600" />
              ) : (
                <PanelRight className="w-5 h-5 text-gray-600" />
              )}
            </button>

            <nav className="px-4 space-y-2 mt-6">
              <AnimatePresence>
                {filteredMenuItems.map((item) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      duration: ANIMATION_DURATION,
                    }}>
                    <MenuItem {...item} isExpanded={isExpanded} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </nav>
          </motion.div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto w-full pb-40 container">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        {isMobile && (
          <nav
            className="
            fixed bottom-0 left-0 right-0
            bg-white border-t border-gray-200
            shadow-lg z-50
            px-4 py-2
          ">
            <div className="flex justify-around items-center">
              {filteredMenuItems.map((item) => (
                <MenuItem key={item.path} {...item} isExpanded={false} />
              ))}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
