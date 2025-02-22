import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    const location = useLocation();
    return (
        <div className=" container w-full mx-auto ">
        {location.pathname !== '/' && <Navbar />}
        <div className="min-h-[calc(100vh-321px)]">
            <Outlet />
        </div>

        {/* Footer */}
        {location.pathname !== '/' && <Footer />}
    </div>
    );
};

export default MainLayout;