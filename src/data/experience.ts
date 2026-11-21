import type { Experience } from '../types'

/**
 * Professional experience, most recent first.
 * Dates use "YYYY-MM", "present", or null (rendered as "dates to be added").
 */
export const experiences: Experience[] = [
  {
    id: 'septaworks',
    company: 'SeptaWorks',
    role: {
      pt: 'Estagiário em Desenvolvimento de Software',
      en: 'Software Development Intern',
    },
    start: '2025-03',
    end: '2025-07',
    highlights: [
      { pt: 'Desenvolvimento web com React e TypeScript.', en: 'Web development with React and TypeScript.' },
      { pt: 'Integração com APIs REST.', en: 'Integration with REST APIs.' },
      { pt: 'Uso de Docker nos ambientes de desenvolvimento.', en: 'Docker in development environments.' },
      { pt: 'Versionamento de código com Git e GitHub.', en: 'Version control with Git and GitHub.' },
    ],
    stack: ['React', 'TypeScript', 'REST APIs', 'Docker', 'Git', 'GitHub'],
  },
  {
    id: 'rcdnc',
    company: 'RCDNC',
    role: {
      pt: 'Estagiário em Desenvolvimento Mobile & Web',
      en: 'Mobile & Web Development Intern',
    },
    start: '2025-08',
    end: '2026-06',
    highlights: [
      {
        pt: 'Participação na migração de uma aplicação para Kotlin Multiplatform.',
        en: 'Took part in migrating an application to Kotlin Multiplatform.',
      },
      {
        pt: 'Desenvolvimento de interfaces com Compose Multiplatform e SwiftUI.',
        en: 'Built interfaces with Compose Multiplatform and SwiftUI.',
      },
      { pt: 'Arquitetura MVVM.', en: 'MVVM architecture.' },
      {
        pt: 'Desenvolvimento web e integração com APIs REST.',
        en: 'Web development and REST API integration.',
      },
      {
        pt: 'Uso de Docker, PHP, Laravel e MySQL.',
        en: 'Worked with Docker, PHP, Laravel and MySQL.',
      },
    ],
    stack: ['Kotlin Multiplatform', 'Compose Multiplatform', 'SwiftUI', 'MVVM', 'PHP', 'Laravel', 'MySQL', 'Docker'],
  },
]
