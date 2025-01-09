'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ArrowDown, Activity, Shield, Zap } from 'lucide-react'

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <div ref={targetRef} className="min-h-screen bg-background text-foreground">
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </div>
  )
}

function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center p-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-primary mb-4">MedConnect</h1>
        <p className="text-2xl text-muted-foreground mb-8">A Smart Blockchain-Driven AI Platform for Hospitals and Patients</p>
        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
          Get Started
        </Button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10"
      >
        <ArrowDown className="animate-bounce" size={32} />
      </motion.div>
    </section>
  )
}

function Features() {
  return (
    <section className="py-20 px-8">
      <h2 className="text-3xl font-semibold text-center mb-12">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Activity className="w-12 h-12 text-primary" />}
          title="AI Health Monitoring"
          description="Periodic health tests with AI analysis for proactive care."
        />
        <FeatureCard
          icon={<Shield className="w-12 h-12 text-primary" />}
          title="Secure Blockchain EMR"
          description="Access and transfer medical records securely across hospitals."
        />
        <FeatureCard
          icon={<Zap className="w-12 h-12 text-primary" />}
          title="Smart Scheduling"
          description="AI-powered appointment booking and queue management."
        />
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section className="py-20 px-8 bg-secondary">
      <h2 className="text-3xl font-semibold text-center mb-12">How It Works</h2>
      <div className="max-w-3xl mx-auto">
        <Timeline />
      </div>
    </section>
  )
}

function Testimonials() {
  return (
    <section className="py-20 px-8">
      <h2 className="text-3xl font-semibold text-center mb-12">What Our Users Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TestimonialCard
          quote="MedConnect has revolutionized how we manage patient care. It's a game-changer!"
          author="Dr. Sarah Johnson"
          role="Chief of Medicine"
        />
        <TestimonialCard
          quote="As a patient, I feel more in control of my health. The AI monitoring is incredible."
          author="Michael Chen"
          role="Patient"
        />
      </div>
    </section>
  )
}

function CallToAction() {
  return (
    <section className="py-20 px-8 bg-primary text-primary-foreground text-center">
      <h2 className="text-3xl font-semibold mb-4">Ready to Transform Healthcare?</h2>
      <p className="text-xl mb-8">Join MedConnect today and experience the future of medical care.</p>
      <Button size="lg" variant="secondary">Get Started Now</Button>
    </section>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card className="h-full">
        <CardHeader>
          <div className="mb-4">{icon}</div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  )
}

function Timeline() {
  const items = [
    { title: "Patient Signs Up", description: "Create an account and set up your health profile." },
    { title: "AI Health Monitoring", description: "Regular health checks and AI analysis of your condition." },
    { title: "Smart Appointment Booking", description: "AI matches you with the best available doctor when needed." },
    { title: "Secure Data Sharing", description: "Your medical records are securely shared with your doctor via blockchain." },
    { title: "Efficient Treatment", description: "Receive personalized care based on your complete medical history." }
  ]

  return (
    <div className="space-y-8">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="flex"
        >
          <div className="flex flex-col items-center mr-4">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
              {index + 1}
            </div>
            {index < items.length - 1 && <div className="w-px h-full bg-primary/30 mt-2" />}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-muted-foreground">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function TestimonialCard({ quote, author, role }: { quote: string, author: string, role: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card>
        <CardContent className="pt-6">
          <p className="text-lg mb-4">"{quote}"</p>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

