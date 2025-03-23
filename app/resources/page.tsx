"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ChatbotButton from "@/components/ChatbotButton"
import { FileText, Calendar, Download, ArrowRight, PenLine, X, UploadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function Resources() {
  const [showBlogForm, setShowBlogForm] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    image: "/placeholder.svg?height=400&width=800",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [communityBlogs, setCommunityBlogs] = useState([
    {
      title: "How I Paid Off $50,000 in Student Loans",
      excerpt: "My personal journey to becoming debt-free and the strategies that worked for me.",
      image: "/placeholder.svg?height=200&width=400",
      category: "Debt Management",
      date: "May 18, 2023",
      author: "Jennifer K.",
    },
    {
      title: "Investing in Index Funds: My 5-Year Results",
      excerpt: "A breakdown of my investment strategy and the results I've seen over the past five years.",
      image: "/placeholder.svg?height=200&width=400",
      category: "Investing",
      date: "May 12, 2023",
      author: "Michael T.",
    },
    {
      title: "My Minimalist Budget System",
      excerpt: "How I simplified my finances with a minimalist approach to budgeting and saving.",
      image: "/placeholder.svg?height=200&width=400",
      category: "Budgeting",
      date: "May 8, 2023",
      author: "Sarah L.",
    },
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleImageChange = () => {
    // In a real implementation, this would handle file uploads
    alert("In a production environment, this would open a file picker to upload your image")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real implementation, this would send data to an API
      // For demo purposes, we'll add the new blog to our local state
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newBlog = {
        title: formData.title,
        excerpt: formData.content.substring(0, 120) + (formData.content.length > 120 ? "..." : ""),
        image: formData.image,
        category: formData.category || "Uncategorized",
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        author: "You",
      }

      setCommunityBlogs([newBlog, ...communityBlogs])

      // Reset form
      setFormData({
        title: "",
        category: "",
        content: "",
        image: "/placeholder.svg?height=400&width=800",
      })
      setShowBlogForm(false)
      setPreviewMode(false)

      alert("Your blog post has been published successfully!")
    } catch (error) {
      console.error("Error publishing blog post:", error)
      alert("There was an error publishing your blog post. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePreview = () => {
    setPreviewMode(!previewMode)
  }

  const formatDate = () => {
    return new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <ChatbotButton />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary-800 mb-8">Financial Resources</h1>

          {/* Blog Creation Form */}
          {showBlogForm && (
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8 animate-slide-up">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-primary-800">
                  {previewMode ? "Preview Your Blog Post" : "Create Your Blog Post"}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowBlogForm(false)
                    setPreviewMode(false)
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {previewMode ? (
                <div className="mb-6">
                  <Card className="overflow-hidden">
                    <Image
                      src={formData.image || "/placeholder.svg"}
                      alt={formData.title}
                      width={800}
                      height={400}
                      className="w-full h-64 object-cover"
                    />
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                          {formData.category || "Uncategorized"}
                        </span>
                        <span className="text-sm text-gray-500">{formatDate()}</span>
                      </div>
                      <h2 className="text-2xl font-semibold text-primary-800 mb-4">
                        {formData.title || "Untitled Blog Post"}
                      </h2>
                      <div className="prose max-w-none">
                        {formData.content ? (
                          <p className="text-gray-700">{formData.content}</p>
                        ) : (
                          <p className="text-gray-400 italic">No content added yet...</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="mt-6 flex justify-end space-x-4">
                    <Button onClick={togglePreview} variant="outline">
                      Return to Editor
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="bg-primary-600 hover:bg-primary-700"
                    >
                      {isSubmitting ? "Publishing..." : "Publish Blog Post"}
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Blog Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter your blog title"
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={handleCategoryChange} value={formData.category}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Investing">Investing</SelectItem>
                        <SelectItem value="Budgeting">Budgeting</SelectItem>
                        <SelectItem value="Debt Management">Debt Management</SelectItem>
                        <SelectItem value="Retirement">Retirement</SelectItem>
                        <SelectItem value="Saving">Saving</SelectItem>
                        <SelectItem value="Financial Planning">Financial Planning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Cover Image</Label>
                    <div className="flex items-center space-x-4">
                      <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-gray-200">
                        <Image
                          src={formData.image || "/placeholder.svg"}
                          alt="Cover image preview"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <Button type="button" variant="outline" onClick={handleImageChange}>
                        <UploadIcon className="h-4 w-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Blog Content</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      placeholder="Write your blog content here..."
                      required
                      className="min-h-[200px] w-full"
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={togglePreview}>
                      Preview
                    </Button>
                    <Button type="submit" disabled={isSubmitting} className="bg-primary-600 hover:bg-primary-700">
                      {isSubmitting ? "Publishing..." : "Publish Blog Post"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Blogs & Articles */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-primary-800">Blogs & Articles</h2>
              <Button className="bg-primary-600 hover:bg-primary-700" onClick={() => setShowBlogForm(true)}>
                <PenLine className="h-4 w-4 mr-2" />
                Create Your Blog
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Investing 101: A Beginner's Guide",
                  excerpt: "Learn the basics of investing and how to get started with just a small amount of money.",
                  image: "/placeholder.svg?height=200&width=400",
                  category: "Investing",
                  date: "May 15, 2023",
                },
                {
                  title: "How to Create a Budget That Actually Works",
                  excerpt:
                    "Discover practical tips for creating a budget you can stick to and that helps you reach your financial goals.",
                  image: "/placeholder.svg?height=200&width=400",
                  category: "Budgeting",
                  date: "May 10, 2023",
                },
                {
                  title: "Debt Payoff Strategies That Actually Work",
                  excerpt:
                    "Learn about the snowball and avalanche methods for paying off debt, and which one might be right for you.",
                  image: "/placeholder.svg?height=200&width=400",
                  category: "Debt Management",
                  date: "May 5, 2023",
                },
              ].map((article, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500">{article.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-primary-800 mb-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                    <Link
                      href="#"
                      className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
                    >
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="#" className="btn-primary">
                View All Articles
              </Link>
            </div>
          </div>

          {/* Community Blogs Section */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 animate-slide-up" style={{ animationDelay: "0.05s" }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-primary-800">Community Blogs</h2>
              <Button
                variant="outline"
                className="border-primary-600 text-primary-600 hover:bg-primary-50"
                onClick={() => setShowBlogForm(true)}
              >
                Share Your Knowledge
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {communityBlogs.map((article, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500">{article.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-primary-800 mb-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{article.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">By {article.author}</span>
                      <Link
                        href="#"
                        className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center"
                      >
                        Read More <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="#" className="btn-primary">
                View All Community Blogs
              </Link>
            </div>
          </div>

          {/* Free Courses & Webinars */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-xl font-semibold text-primary-800 mb-6">Free Courses & Webinars</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Financial Independence for Women",
                  description:
                    "A comprehensive 4-week course covering budgeting, investing, retirement planning, and more.",
                  date: "Starts June 1, 2023",
                  instructor: "Sarah Johnson, CFP",
                  image: "/placeholder.svg?height=100&width=100",
                },
                {
                  title: "Investing in the Stock Market",
                  description:
                    "Learn the basics of stock market investing, including how to research stocks and build a portfolio.",
                  date: "May 25, 2023 | 7:00 PM EST",
                  instructor: "Michelle Rodriguez, Investment Advisor",
                  image: "/placeholder.svg?height=100&width=100",
                },
                {
                  title: "Mastering Your Credit Score",
                  description: "Understand what affects your credit score and actionable steps to improve it.",
                  date: "June 10, 2023 | 6:30 PM EST",
                  instructor: "David Chen, Credit Specialist",
                  image: "/placeholder.svg?height=100&width=100",
                },
                {
                  title: "Real Estate Investing 101",
                  description: "Explore different ways to invest in real estate, from REITs to rental properties.",
                  date: "June 15, 2023 | 7:00 PM EST",
                  instructor: "Jessica Williams, Real Estate Investor",
                  image: "/placeholder.svg?height=100&width=100",
                },
              ].map((course, index) => (
                <div
                  key={index}
                  className="flex border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-300"
                >
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.instructor}
                    width={100}
                    height={100}
                    className="w-20 h-20 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-primary-800 mb-1">{course.title}</h3>
                    <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{course.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700">{course.instructor}</span>
                      <Link href="#" className="text-primary-600 hover:text-primary-800 text-sm font-medium">
                        Register
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="#" className="btn-primary">
                View All Courses
              </Link>
            </div>
          </div>

          {/* Downloadable Resources */}
          <div className="bg-white rounded-2xl shadow-md p-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h2 className="text-xl font-semibold text-primary-800 mb-6">Downloadable Resources</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Monthly Budget Template",
                  description: "A comprehensive Excel template to track your income, expenses, and savings goals.",
                  type: "Excel",
                  color: "bg-green-100 text-green-600",
                },
                {
                  title: "Debt Payoff Tracker",
                  description: "Track your debt payoff journey with this printable PDF worksheet.",
                  type: "PDF",
                  color: "bg-red-100 text-red-600",
                },
                {
                  title: "Investment Comparison Tool",
                  description: "Compare different investment options and their potential returns over time.",
                  type: "Excel",
                  color: "bg-green-100 text-green-600",
                },
                {
                  title: "Emergency Fund Calculator",
                  description: "Determine how much you should have in your emergency fund based on your situation.",
                  type: "Excel",
                  color: "bg-green-100 text-green-600",
                },
                {
                  title: "Financial Goal Setting Worksheet",
                  description: "Define your short-term and long-term financial goals with this structured worksheet.",
                  type: "PDF",
                  color: "bg-red-100 text-red-600",
                },
                {
                  title: "Retirement Planning Guide",
                  description: "A comprehensive guide to planning for retirement at any age.",
                  type: "PDF",
                  color: "bg-red-100 text-red-600",
                },
              ].map((resource, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start mb-3">
                    <div className={`p-2 rounded-lg ${resource.color} mr-3`}>
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-800 mb-1">{resource.title}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${resource.color}`}>{resource.type}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                  <Link
                    href="#"
                    className="flex items-center text-primary-600 hover:text-primary-800 text-sm font-medium"
                  >
                    <Download className="h-4 w-4 mr-1" /> Download
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

