import { Outlet } from 'react-router-dom'

export default function GuestLayout() {
    return (
        <div>
            <div className="guest-layout">
                Guest Layout
            </div>
            <Outlet />
        </div>
    )
}
