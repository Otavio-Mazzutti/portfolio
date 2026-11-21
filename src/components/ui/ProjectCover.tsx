import type { Project, ProjectCategory } from '../../types'

/**
 * Line-art motifs per category, used when a project has no cover image.
 * Drawn in currentColor so they follow the theme; one accent mark each.
 */
function Motif({ category }: { category: ProjectCategory }) {
  switch (category) {
    case 'distributed-systems': {
      const nodes: [number, number][] = [
        [60, 70],
        [170, 40],
        [280, 80],
        [110, 150],
        [230, 160],
      ]
      const edges: [number, number][] = [
        [0, 1],
        [1, 2],
        [0, 3],
        [3, 4],
        [4, 2],
        [1, 3],
        [1, 4],
      ]
      return (
        <g>
          {edges.map(([a, b]) => (
            <line
              key={`${a}-${b}`}
              x1={nodes[a][0]}
              y1={nodes[a][1]}
              x2={nodes[b][0]}
              y2={nodes[b][1]}
              stroke="currentColor"
              strokeOpacity="0.35"
              strokeDasharray="3 4"
            />
          ))}
          {nodes.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="13" fill="var(--c-surface)" stroke="currentColor" strokeOpacity="0.6" />
              <circle cx={x} cy={y} r="3" fill={i === 1 ? 'var(--c-accent)' : 'currentColor'} />
            </g>
          ))}
        </g>
      )
    }
    case 'data':
      return (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(0 ${i * 30})`}>
              <ellipse cx="170" cy="55" rx="90" ry="18" fill="var(--c-surface)" stroke="currentColor" strokeOpacity="0.55" />
            </g>
          ))}
          <path d="M80 55v90M260 55v90" stroke="currentColor" strokeOpacity="0.55" />
          <path d="M80 145a90 18 0 0 0 180 0" fill="none" stroke="currentColor" strokeOpacity="0.55" />
          {['csv', 'json', 'xlsx', 'parquet'].map((label, i) => (
            <text
              key={label}
              x={i % 2 === 0 ? 290 : 20}
              y={58 + i * 30}
              fontFamily="var(--font-mono)"
              fontSize="10"
              fill={i === 3 ? 'var(--c-accent)' : 'currentColor'}
              fillOpacity={i === 3 ? 1 : 0.6}
            >
              .{label}
            </text>
          ))}
        </g>
      )
    case 'web':
    default:
      return (
        <g>
          <rect x="100" y="25" width="140" height="150" rx="14" fill="var(--c-surface)" stroke="currentColor" strokeOpacity="0.55" />
          <rect x="114" y="40" width="112" height="30" rx="6" fill="none" stroke="currentColor" strokeOpacity="0.35" />
          <text x="218" y="61" textAnchor="end" fontFamily="var(--font-mono)" fontSize="13" fill="currentColor">
            VF = VP(1+i)ⁿ
          </text>
          {Array.from({ length: 12 }, (_, i) => (
            <rect
              key={i}
              x={114 + (i % 4) * 29}
              y={82 + Math.floor(i / 4) * 30}
              width="23"
              height="22"
              rx="5"
              fill={i === 11 ? 'var(--c-accent)' : 'none'}
              fillOpacity={i === 11 ? 0.9 : 1}
              stroke="currentColor"
              strokeOpacity={i === 11 ? 0 : 0.3}
            />
          ))}
        </g>
      )
  }
}

export function ProjectCover({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt=""
        loading="lazy"
        decoding="async"
        width={1200}
        height={675}
        className="size-full object-cover"
      />
    )
  }

  return (
    <div className="relative size-full bg-elevated/40 text-fg" aria-hidden="true">
      <div className="bg-grid absolute inset-0 [mask-image:none] opacity-70" />
      <svg viewBox="0 0 340 200" className="absolute inset-0 m-auto h-[78%] w-auto transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]">
        <Motif category={project.category} />
      </svg>
    </div>
  )
}
