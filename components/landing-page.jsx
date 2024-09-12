"'use client'"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Image, Video, Zap } from "lucide-react";

export function LandingPage() {
  return (
    (<div className="flex flex-col min-h-screen bg-[#16325B] text-white">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-[#227B94]">
        <a className="flex items-center justify-center" href="#">
          <Zap className="h-6 w-6 text-[#FFDC7F]" />
          <span className="ml-2 text-xl font-bold text-[#FFDC7F]">AI Transform</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <a
            className="text-sm font-medium hover:text-[#FFDC7F] transition-colors"
            href="#features">
            Features
          </a>
          <a
            className="text-sm font-medium hover:text-[#FFDC7F] transition-colors"
            href="#pricing">
            Pricing
          </a>
          <a
            className="text-sm font-medium hover:text-[#FFDC7F] transition-colors"
            href="#testimonials">
            Testimonials
          </a>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-[#FFDC7F]">
                  Transform Your Media with AI
                </h1>
                <p className="mx-auto max-w-[700px] text-[#78B7D0] md:text-xl">
                  Powerful image transformation, video compression, and more. All powered by cutting-edge AI.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-[#227B94] border-[#78B7D0] text-white placeholder-[#78B7D0]"
                    placeholder="Enter your email"
                    type="email" />
                  <Button type="submit" className="bg-[#FFDC7F] text-[#16325B] hover:bg-[#78B7D0]">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="text-xs text-[#78B7D0]">
                  Start your free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-[#227B94]">
          <div className="container px-4 md:px-6">
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-[#FFDC7F]">Our Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: Image, title: "Image Transformation", description: "Resize, crop, and enhance images automatically with our AI-powered tools." },
                { icon: Video, title: "Video Compression", description: "Reduce file sizes without compromising quality using advanced AI algorithms." },
                { icon: Zap, title: "Smart Optimization", description: "Let AI analyze and optimize your media for the best performance across all devices." }
              ].map((feature) => (
                <Card key={feature.title} className="bg-[#16325B] border-[#78B7D0]">
                  <CardHeader>
                    <feature.icon className="w-10 h-10 mb-2 text-[#FFDC7F]" />
                    <CardTitle className="text-[#FFDC7F]">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-[#78B7D0]">
                    {feature.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-[#FFDC7F]">Simple Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Starter", price: "$29", features: ["100GB Storage", "10,000 Transformations/mo", "API Access"] },
                { name: "Pro", price: "$99", features: ["500GB Storage", "50,000 Transformations/mo", "Priority Support"] },
                { name: "Enterprise", price: "Custom", features: ["Unlimited Storage", "Custom Transformations", "Dedicated Account Manager"] }
              ].map((plan) => (
                <Card key={plan.name} className="flex flex-col bg-[#227B94] border-[#78B7D0]">
                  <CardHeader>
                    <CardTitle className="text-[#FFDC7F]">{plan.name}</CardTitle>
                    <p className="text-4xl font-bold text-white">{plan.price}</p>
                    {plan.name === "Pro" && <Badge className="w-fit bg-[#FFDC7F] text-[#16325B]">Most Popular</Badge>}
                  </CardHeader>
                  <CardContent className="flex-1 text-[#78B7D0]">
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4 text-[#FFDC7F]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardContent>
                    <Button className="w-full bg-[#FFDC7F] text-[#16325B] hover:bg-[#78B7D0]">
                      {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-[#227B94]">
          <div className="container px-4 md:px-6">
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-[#FFDC7F]">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: "Alex Johnson", role: "Marketing Director", content: "AI Transform has revolutionized our content creation process. The image transformations are incredible!" },
                { name: "Sam Lee", role: "Video Producer", content: "The video compression tool is a game-changer. We're saving so much bandwidth without losing quality." },
                { name: "Jamie Smith", role: "Web Developer", content: "The API is so easy to use, and the smart optimization has significantly improved our site's performance." }
              ].map((testimonial) => (
                <Card key={testimonial.name} className="bg-[#16325B] border-[#78B7D0]">
                  <CardContent className="mt-4">
                    <p className="mb-4 text-[#78B7D0]">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div className="ml-4">
                        <p className="text-lg font-semibold text-[#FFDC7F]">{testimonial.name}</p>
                        <p className="text-sm text-[#78B7D0]">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#227B94]">
        <p className="text-xs text-[#78B7D0]">© 2023 AI Transform. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:text-[#FFDC7F] transition-colors" href="#">
            Terms of Service
          </a>
          <a className="text-xs hover:text-[#FFDC7F] transition-colors" href="#">
            Privacy
          </a>
        </nav>
      </footer>
    </div>)
  );
}