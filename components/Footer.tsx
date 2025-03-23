import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold">Finova</h3>
            <p className="text-primary-100 text-sm">
              Empowering women to take control of their financial future through education, tools, and community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-primary-100 hover:text-white transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-100 hover:text-white transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-100 hover:text-white transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-100 hover:text-white transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-primary-100 hover:text-white transition-colors duration-300 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-primary-100 hover:text-white transition-colors duration-300 text-sm"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/budgeting"
                  className="text-primary-100 hover:text-white transition-colors duration-300 text-sm"
                >
                  Budgeting
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-primary-100 hover:text-white transition-colors duration-300 text-sm"
                >
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services/investing"
                  className="text-primary-100 hover:text-white transition-colors duration-300 text-sm"
                >
                  Investing
                </Link>
              </li>
              <li>
                <Link
                  href="/services/savings"
                  className="text-primary-100 hover:text-white transition-colors duration-300 text-sm"
                >
                  Savings
                </Link>
              </li>
              <li>
                <Link
                  href="/services/debt"
                  className="text-primary-100 hover:text-white transition-colors duration-300 text-sm"
                >
                  Debt Management
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-primary-100 hover:text-white transition-colors duration-300 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-primary-100 hover:text-white transition-colors duration-300 text-sm"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-primary-100 hover:text-white transition-colors duration-300 text-sm">
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-primary-100 hover:text-white transition-colors duration-300 text-sm"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-800 text-center text-primary-100 text-sm">
          <p>&copy; {new Date().getFullYear()} Finova. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

