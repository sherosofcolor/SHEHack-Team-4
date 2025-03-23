"use client"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ChatbotButton from "@/components/ChatbotButton"
import { PiggyBank, TrendingUp, CreditCard, BarChart4, MessageCircle } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function Home() {
  const { user, isLoading } = useAuth()

  // Wait for auth to be checked before rendering
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary-600 rounded-full border-t-transparent"></div>
      </div>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      {user && <ChatbotButton />}

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Women managing finances"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600/30 to-accent-500/30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-900 leading-tight mb-6">
                Take Control of Your Finances Today!
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Finova helps women build financial confidence through personalized tools, education, and community
                support.
              </p>
              {!user && (
                <div className="flex flex-wrap gap-4">
                  <Link href="/signup" className="btn-primary">
                    Sign Up Now
                  </Link>
                  <Link href="/resources" className="btn-secondary">
                    Explore Financial Tips
                  </Link>
                  <Link href="/chatbot" className="btn-accent">
                    Chat with Our AI Advisor
                  </Link>
                </div>
              )}
              {user && (
                <div className="flex flex-wrap gap-4">
                  <Link href="/dashboard" className="btn-primary">
                    Go to Dashboard
                  </Link>
                  <Link href="/resources" className="btn-secondary">
                    Explore Financial Tips
                  </Link>
                  <Link href="/chatbot" className="btn-accent">
                    Chat with Our AI Advisor
                  </Link>
                </div>
              )}
            </div>

            <div className="hidden md:block animate-slide-up">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Financial planning illustration"
                width={600}
                height={600}
                className="w-full h-auto max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Financial Literacy Matters */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Why Financial Literacy Matters</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="card animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="text-accent-500 mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Wage gap infographic"
                  width={400}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-2">The Wage Gap</h3>
              <p className="text-gray-600">
                Women earn 82 cents for every dollar earned by men, making financial literacy even more crucial.
              </p>
            </div>

            <div className="card animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="text-primary-500 mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Retirement savings infographic"
                  width={400}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-2">Retirement Gap</h3>
              <p className="text-gray-600">
                Women's retirement savings are 30% less than men's on average, highlighting the need for better
                planning.
              </p>
            </div>

            <div className="card animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="text-secondary-500 mb-4">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Financial confidence infographic"
                  width={400}
                  height={200}
                  className="w-full h-auto rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary-800 mb-2">Confidence Gap</h3>
              <p className="text-gray-600">
                Only 26% of women feel confident about their financial knowledge compared to 44% of men.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">Our Platform Features</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-12">
            {[
              {
                icon: <BarChart4 className="h-10 w-10" />,
                title: "Budgeting",
                description: "Create and manage your budget with easy-to-use tools",
                delay: "0.1s",
              },
              {
                icon: <TrendingUp className="h-10 w-10" />,
                title: "Investing",
                description: "Learn investment basics and track your portfolio growth",
                delay: "0.2s",
              },
              {
                icon: <PiggyBank className="h-10 w-10" />,
                title: "Savings",
                description: "Set savings goals and track your progress",
                delay: "0.3s",
              },
              {
                icon: <CreditCard className="h-10 w-10" />,
                title: "Debt Management",
                description: "Strategies to reduce debt and improve credit score",
                delay: "0.4s",
              },
              {
                icon: <MessageCircle className="h-10 w-10" />,
                title: "AI Chatbot",
                description: "Get personalized financial advice anytime",
                delay: "0.5s",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-primary-50 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: feature.delay }}
              >
                <div className="text-primary-600 mb-4 animate-bounce-light">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-primary-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">What Our Users Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="card animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center mb-4">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt="Sarah J."
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-primary-800">Sarah J.</h3>
                  <p className="text-sm text-gray-500">Marketing Executive</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Finova helped me understand investing in a way that actually made sense. I've increased my retirement
                savings by 15% in just six months!"
              </p>
            </div>

            <div className="card animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center mb-4">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt="Michelle T."
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-primary-800">Michelle T.</h3>
                  <p className="text-sm text-gray-500">Small Business Owner</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The debt management tools helped me create a plan to pay off my student loans 3 years earlier than
                expected. Life changing!"
              </p>
            </div>

            <div className="card animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center mb-4">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt="Jessica R."
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="font-semibold text-primary-800">Jessica R.</h3>
                  <p className="text-sm text-gray-500">Healthcare Professional</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The AI chatbot is like having a financial advisor in my pocket. It's helped me make smarter decisions
                about my money every day."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Only show if not logged in */}
      {!user && (
        <section className="py-16 bg-primary-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Ready to Transform Your Financial Future?
            </h2>
            <p className="text-lg md:text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Join thousands of women who are taking control of their finances with Finova's personalized tools and
              resources.
            </p>
            <Link href="/signup" className="btn-accent inline-block">
              Get Started for Free
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}

