"use client"

import { useState } from "react"
import Header from "../components/vendor/header"
import MainCards from "../components/vendor/main-cards"
import QuickShortcuts from "../components/vendor/quick-shortcuts"
import NavigationFooter from "../components/vendor/navigation-footer"
import SalesStatistics from "../components/vendor/sales-statistics"

export default function VendorHome() {
  const [activeNav, setActiveNav] = useState("home")

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pb-24 pt-20">
        <div className="max-w-md mx-auto px-4">
          {/* Main Cards Section */}
          <div className="mt-6 space-y-4">
            <MainCards />
            <SalesStatistics />
          </div>

          {/* Quick Shortcuts */}
          <div className="mt-8">
            <QuickShortcuts />
          </div>
        </div>
      </main>

      {/* Navigation Footer */}
      <NavigationFooter activeNav={activeNav} setActiveNav={setActiveNav} />
    </div>
  )
}
