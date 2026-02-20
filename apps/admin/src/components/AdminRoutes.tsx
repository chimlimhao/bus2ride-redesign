import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "@/pages/AdminLogin";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminFleet from "@/pages/AdminFleet";
import AdminEvents from "@/pages/AdminEvents";
import AdminTestimonials from "@/pages/AdminTestimonials";
import AdminFAQ from "@/pages/AdminFAQ";
import AdminContent from "@/pages/AdminContent";
import AdminInquiries from "@/pages/AdminInquiries";
import AdminSettings from "@/pages/AdminSettings";

import { useAuth } from "@/contexts/AuthContext";

const AdminRoutes = () => {
    const { session, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    return (
        <Routes>
            {/* Login route - redirect to dashboard if already logged in */}
            <Route
                path="/login"
                element={session ? <Navigate to="/dashboard" replace /> : <AdminLogin />}
            />

            {/* Protected routes wrapped in Layout */}
            <Route
                path="/"
                element={session ? <AdminLayout /> : <Navigate to="/login" replace />}
            >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="fleet" element={<AdminFleet />} />
                <Route path="events" element={<AdminEvents />} />
                <Route path="testimonials" element={<AdminTestimonials />} />
                <Route path="faq" element={<AdminFAQ />} />
                <Route path="content" element={<AdminContent />} />
                <Route path="inquiries" element={<AdminInquiries />} />
                <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Catch-all - redirect to login or dashboard */}
            <Route path="*" element={<Navigate to={session ? "/dashboard" : "/login"} replace />} />
        </Routes>
    );
};


export default AdminRoutes;
