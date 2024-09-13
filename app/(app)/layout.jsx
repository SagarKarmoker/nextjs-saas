import React from 'react'

export default function AppLayout({ children }) {
    return (
        <div>
            contains all of the sidebar or navbar
            <div>
                {children}
            </div>
        </div>
    )
}