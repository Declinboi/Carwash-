import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

export function Breadcrumbs({ className }: { className?: string }) {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(segment => segment !== '')

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className=" hidden  sm:flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto whitespace-nowrap">
        {/* <li>
          <Link href="/admin" className="text-gray-500 hover:text-gray-700">
            Front End Store
          </Link>
        </li> */}
        {pathSegments.map((segment, index) => {
          const href = `/admin/${pathSegments.slice(0, index + 1).join('/')}`
          return (
            <li key={segment} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <Link href={href} className="ml-2 text-gray-500 hover:text-gray-700 capitalize">
                {segment}
              </Link>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

