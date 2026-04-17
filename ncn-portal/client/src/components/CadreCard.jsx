import { Link } from 'react-router-dom'

export default function CadreCard({ cadre }) {
  return (
    <div className={`flex flex-col justify-between p-8 md:p-12 min-h-[380px] ${cadre.bg}`}>
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">{cadre.title}</h2>
        <p className="text-gray-200 leading-relaxed text-sm md:text-base">{cadre.description}</p>
      </div>
      <div className="mt-8">
        <Link
          to={`/apply/${cadre.slug}`}
          className="inline-block bg-army-red hover:bg-red-700 text-white font-semibold px-6 py-2.5 rounded transition-colors"
        >
          Candidate Journey →
        </Link>
      </div>
    </div>
  )
}
