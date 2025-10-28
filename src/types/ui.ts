import type { Component } from "vue"

export interface FeatureCard {
  id: number
  icon: Component
  title: string
  description: string
}

export interface DemoTrendingRepo {
  id: number
  name: string
  stars: number
  description: string
  language: string
}
