import { FaLinkedinIn } from 'react-icons/fa6'
import { SiGithub } from 'react-icons/si'
import photo from '../assets/photo.png'
import type { Profile, SocialLink } from '../types'

/**
 * Personal information. Everything rendered about you comes from here.
 * Search for "TODO" to find values that still need to be filled in.
 */
export const profile: Profile = {
  name: 'Otávio Mazzutti',
  initials: 'OM',
  role: 'Full Stack Developer',
  location: {
    pt: 'Uberlândia, Minas Gerais — Brasil',
    en: 'Uberlândia, Minas Gerais — Brazil',
  },
  email: 'otaviomazzutti@gmail.com',
  // The download button serves the résumé matching the selected site language.
  resume: {
    pt: '/resume/otavio-mazzutti-cv-pt.pdf',
    en: '/resume/otavio-mazzutti-cv-en.pdf',
  },
  photo,
  availability: {
    open: true,
    label: {
      pt: 'Disponível para oportunidades',
      en: 'Open to opportunities',
    },
  },
  headline: {
    pt: 'Construo produtos web e mobile de ponta a ponta — da interface ao banco de dados.',
    en: 'I build web and mobile products end to end — from the interface to the database.',
  },
  summary: {
    pt: 'Desenvolvedor com experiência em desenvolvimento web e mobile, integração de APIs REST e bancos de dados relacionais. Tenho interesse em desenvolvimento Full Stack, engenharia de software, dados e inteligência artificial.',
    en: 'Developer with experience in web and mobile development, REST API integration and relational databases. Interested in Full Stack development, software engineering, data and artificial intelligence.',
  },
  education: {
    degree: {
      pt: 'Bacharelado em Sistemas de Informação',
      en: 'B.Sc. in Information Systems',
    },
    institution: 'Universidade Federal de Uberlândia',
    institutionShort: 'UFU',
    period: '2023 - 2027',
  },
  interests: [
    { pt: 'Desenvolvimento Full Stack', en: 'Full Stack Development' },
    { pt: 'Engenharia de Software', en: 'Software Engineering' },
    { pt: 'Dados', en: 'Data' },
    { pt: 'Inteligência Artificial', en: 'Artificial Intelligence' },
  ],
  goal: {
    pt: 'Atuar como desenvolvedor Frontend ou Full Stack em um time de produto, entregando software bem construído com React, TypeScript, APIs REST e bancos relacionais.',
    en: 'Work as a Frontend or Full Stack developer on a product team, shipping well-built software with React, TypeScript, REST APIs and relational databases.',
  },
  github: {
    username: 'Otavio-Mazzutti',
    url: 'https://github.com/Otavio-Mazzutti',
    highlightedRepos: ['FazendaInteligenteSD', 'calculadora-financeira', 'PrototipoDataLake'],
  },
  // TODO: replace with your LinkedIn profile URL
  linkedin: 'https://www.linkedin.com/in/YOUR-LINKEDIN',
  siteUrl: 'https://otaviomazzutti.com',
}

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: profile.github.url, icon: SiGithub },
  { label: 'LinkedIn', href: profile.linkedin, icon: FaLinkedinIn },
]
