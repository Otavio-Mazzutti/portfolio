import { Layers } from 'lucide-react'
import { FaJava } from 'react-icons/fa6'
import {
  SiApachekafka,
  SiCss,
  SiDocker,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJetpackcompose,
  SiKotlin,
  SiLaravel,
  SiMysql,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSwift,
  SiTypescript,
} from 'react-icons/si'
import { TbApi, TbBrandKotlin } from 'react-icons/tb'
import type { SkillCategory } from '../types'

/**
 * Tech stack grouped by category. `featured: true` renders a larger tile.
 * Icons come from react-icons (Simple Icons set = official brand marks).
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: { pt: 'Frontend', en: 'Frontend' },
    description: {
      pt: 'Interfaces tipadas, componentizadas e acessíveis.',
      en: 'Typed, component-driven and accessible interfaces.',
    },
    skills: [
      { name: 'React', icon: SiReact, featured: true },
      { name: 'TypeScript', icon: SiTypescript, featured: true },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'HTML', icon: SiHtml5 },
      { name: 'CSS', icon: SiCss },
    ],
  },
  {
    id: 'backend',
    title: { pt: 'Backend', en: 'Backend' },
    description: {
      pt: 'Serviços, regras de negócio e APIs.',
      en: 'Services, business logic and APIs.',
    },
    skills: [
      { name: 'Python', icon: SiPython, featured: true },
      { name: 'Java', icon: FaJava },
      { name: 'PHP', icon: SiPhp },
      { name: 'Laravel', icon: SiLaravel },
      { name: 'REST APIs', icon: TbApi },
    ],
  },
  {
    id: 'mobile',
    title: { pt: 'Mobile', en: 'Mobile' },
    description: {
      pt: 'Apps nativos e multiplataforma.',
      en: 'Native and cross-platform apps.',
    },
    skills: [
      { name: 'Kotlin', icon: SiKotlin },
      { name: 'Kotlin Multiplatform', icon: TbBrandKotlin },
      { name: 'SwiftUI', icon: SiSwift },
      { name: 'Compose Multiplatform', icon: SiJetpackcompose },
      { name: 'MVVM', icon: Layers },
    ],
  },
  {
    id: 'database',
    title: { pt: 'Banco de dados', en: 'Database' },
    description: {
      pt: 'Modelagem e consultas em bancos relacionais.',
      en: 'Modeling and querying relational databases.',
    },
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, featured: true },
      { name: 'MySQL', icon: SiMysql, featured: true },
    ],
  },
  {
    id: 'tools',
    title: { pt: 'Ferramentas & Infra', en: 'Tools & Infrastructure' },
    description: {
      pt: 'Versionamento, containers, mensageria e design.',
      en: 'Version control, containers, messaging and design.',
    },
    skills: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Docker', icon: SiDocker },
      { name: 'Apache Kafka', icon: SiApachekafka },
      { name: 'Figma', icon: SiFigma },
    ],
  },
]
