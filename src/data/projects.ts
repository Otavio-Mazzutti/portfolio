import type { Project } from '../types'

/**
 * Featured projects. The Projects section renders this array as-is:
 * to add a project, append an object here — no component changes needed.
 *
 * Optional cover image: put a file in src/assets/projects/ and import it,
 * e.g. `import cover from '../assets/projects/my-app.png'` → `image: cover`.
 * Without `image`, a typographic cover is generated automatically.
 */
export const projects: Project[] = [
  {
    slug: 'fazenda-inteligente',
    title: { pt: 'Fazenda Inteligente', en: 'Smart Farm' },
    category: 'distributed-systems',
    summary: {
      pt: 'Sistema distribuído de gestão de plantação: terminais de clima, drone e trator trocam eventos via Apache Kafka, com algoritmos clássicos de coordenação e um dashboard em tempo real.',
      en: 'Distributed crop-management system: weather, drone and tractor terminals exchange events over Apache Kafka, with classic coordination algorithms and a real-time dashboard.',
    },
    stack: ['Python', 'Apache Kafka', 'Flask', 'Flask-SocketIO', 'Docker'],
    repo: 'https://github.com/Otavio-Mazzutti/FazendaInteligenteSD',
    details: {
      overview: {
        pt: 'Projeto de Sistemas Distribuídos aplicado à agricultura inteligente. Componentes independentes (clima, drone e trator) se comunicam por meio do Apache Kafka como middleware e tomam decisões condicionadas ao estado do ambiente — por exemplo, chuva bloqueando operações de campo. O sistema foi preparado para execução em várias máquinas.',
        en: 'Distributed Systems project applied to smart agriculture. Independent components (weather, drone and tractor) communicate through Apache Kafka as middleware and make decisions based on environment state — for example, rain blocking field operations. The system was prepared to run across multiple machines.',
      },
      features: [
        {
          pt: 'Terminais interativos: clima (chuva, umidade do solo, alertas), drone (patrulha, varredura, pouso, emergência) e trator (plantio, colheita, silo, combustível).',
          en: 'Interactive terminals: weather (rain, soil moisture, alerts), drone (patrol, scan, land, emergency) and tractor (plant, harvest, silo, fuel).',
        },
        {
          pt: 'Decisões condicionais: comandos de campo respeitam as condições climáticas publicadas.',
          en: 'Conditional decisions: field commands respect the published weather conditions.',
        },
        {
          pt: 'Dashboard web com contadores de componentes ativos, fluxo de mensagens Kafka e estatísticas de comunicação.',
          en: 'Web dashboard with active-component counters, Kafka message stream and communication statistics.',
        },
        {
          pt: 'Tolerância a falhas com reconexão e recuperação automática.',
          en: 'Fault tolerance with reconnection and automatic recovery.',
        },
      ],
      architecture: [
        {
          pt: 'Relógios de Lamport para ordenação causal de eventos.',
          en: 'Lamport clocks for causal ordering of events.',
        },
        {
          pt: 'Relógios vetoriais para detecção de concorrência (happens-before).',
          en: 'Vector clocks for concurrency detection (happens-before).',
        },
        {
          pt: 'Exclusão mútua Ricart-Agrawala para acesso exclusivo ao silo, sem servidor central.',
          en: 'Ricart-Agrawala mutual exclusion for exclusive silo access, without a central server.',
        },
        {
          pt: 'Eleição de líder com o algoritmo Bully.',
          en: 'Leader election with the Bully algorithm.',
        },
        {
          pt: 'Camada de integração com Kafka (adapter + definição de tópicos) separada dos algoritmos e terminais.',
          en: 'Kafka integration layer (adapter + topic definitions) kept separate from algorithms and terminals.',
        },
      ],
      run: ['pip install -r requirements.txt', 'python3 simple_dashboard.py', 'python3 interactive/weather_terminal.py --id weather-01'],
    },
  },
  {
    slug: 'calculadora-financeira',
    title: { pt: 'Calculadora Financeira', en: 'Financial Calculator' },
    category: 'web',
    summary: {
      pt: 'Aplicação web em React e TypeScript para cálculos de matemática financeira: juros simples e compostos, desconto comercial e conversão de taxas.',
      en: 'React and TypeScript web app for financial math: simple and compound interest, commercial discount and rate conversion.',
    },
    stack: ['React', 'TypeScript', 'Vite', 'Oxlint'],
    repo: 'https://github.com/Otavio-Mazzutti/calculadora-financeira',
    details: {
      overview: {
        pt: 'Calculadora de matemática financeira construída com React 19, TypeScript e Vite. Os cálculos ficam isolados em uma camada de serviço tipada, e a interface é composta por campos reutilizáveis para valores monetários, taxas e períodos.',
        en: 'Financial math calculator built with React 19, TypeScript and Vite. Calculations live in a typed service layer, and the interface is composed of reusable fields for money, rates and periods.',
      },
      features: [
        {
          pt: 'Capitalização simples e composta: montante, capital, juros, taxa e prazo.',
          en: 'Simple and compound interest: future value, principal, interest, rate and term.',
        },
        {
          pt: 'Desconto comercial: valor atual, desconto e taxa de desconto.',
          en: 'Commercial discount: present value, discount and discount rate.',
        },
        {
          pt: 'Conversão de taxas entre dia, mês, semestre e ano, e conversão entre taxa nominal e efetiva.',
          en: 'Rate conversion between day, month, semester and year, plus nominal-to-effective conversion.',
        },
        {
          pt: 'Formatação de moeda (BRL), percentuais e prazos no padrão pt-BR.',
          en: 'Currency (BRL), percentage and term formatting in pt-BR locale.',
        },
      ],
      architecture: [
        {
          pt: 'Componentes de UI: Calculator, InputField, RateSelector, UnitField e Result.',
          en: 'UI components: Calculator, InputField, RateSelector, UnitField and Result.',
        },
        {
          pt: 'Camada de serviço (services/financial.ts) com funções puras de cálculo.',
          en: 'Service layer (services/financial.ts) with pure calculation functions.',
        },
        {
          pt: 'Tipos de domínio centralizados (regime, unidade de tempo, tipo de cálculo e configuração de campos).',
          en: 'Centralized domain types (regime, time unit, calculation type and field configuration).',
        },
      ],
      run: ['npm install', 'npm run dev'],
    },
  },
  {
    slug: 'data-lake',
    title: { pt: 'Protótipo de Data Lake', en: 'Data Lake Prototype' },
    category: 'data',
    summary: {
      pt: 'Protótipo acadêmico de Data Lake: armazena arquivos CSV, JSON, XLSX e Parquet no formato original e os interpreta sob demanda (schema-on-read) em uma interface Streamlit.',
      en: 'Academic Data Lake prototype: stores CSV, JSON, XLSX and Parquet files in their original format and interprets them on demand (schema-on-read) in a Streamlit interface.',
    },
    stack: ['Python', 'Pandas', 'Streamlit', 'PyArrow', 'OpenPyXL'],
    repo: 'https://github.com/Otavio-Mazzutti/PrototipoDataLake',
    details: {
      overview: {
        pt: 'Protótipo didático que demonstra o conceito de Data Lake: dados estruturados e semiestruturados em formatos diferentes convivem em um mesmo repositório e só ganham estrutura no momento da leitura. É intencionalmente simples — sem Docker, Hadoop, Spark ou serviços em nuvem.',
        en: 'Didactic prototype demonstrating the Data Lake concept: structured and semi-structured data in different formats live side by side in one repository and only get a structure when read. It is intentionally simple — no Docker, Hadoop, Spark or cloud services.',
      },
      features: [
        {
          pt: 'Página de arquivos: lista o conteúdo do lago, detecta o formato e lê cada arquivo com a função Pandas correspondente.',
          en: 'Files page: lists the lake contents, detects the format and reads each file with the matching Pandas function.',
        },
        {
          pt: 'Página de estatísticas: quantidade de arquivos, formatos, total de registros, colunas e tamanho em disco.',
          en: 'Statistics page: file count, formats, total records, columns and disk size.',
        },
        {
          pt: 'Upload de novos arquivos, salvos exatamente como enviados e disponíveis imediatamente.',
          en: 'Upload of new files, stored exactly as sent and available immediately.',
        },
      ],
      architecture: [
        {
          pt: 'Armazenamento em uma pasta local (dados/) com arquivos em formato bruto.',
          en: 'Storage in a local folder (dados/) holding raw-format files.',
        },
        {
          pt: 'Schema-on-read: a estrutura é inferida pelo Pandas apenas na leitura.',
          en: 'Schema-on-read: structure is inferred by Pandas only at read time.',
        },
        {
          pt: 'Interface multipágina em Streamlit (Início, Arquivos, Estatísticas, Upload).',
          en: 'Multi-page Streamlit interface (Home, Files, Statistics, Upload).',
        },
      ],
      run: ['pip install -r requirements.txt', 'streamlit run app.py'],
    },
  },
]
