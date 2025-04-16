'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function SolrSearchNav() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const qParam = searchParams.get('q');

    const isAdvanceSearch = pathname.startsWith('/advance-search');

    const links = isAdvanceSearch
        ? [
              { href: '/advance-search/print-collection', label: 'Print Collection' },
              { href: '/advance-search/e-collection', label: 'E Collection' },
              { href: '/advance-search/e-resources', label: 'E Resources' },
              { href: '/advance-search/multimedia', label: 'Multimedia' },
          ]
        : [
              { href: '/search/print-collection', label: 'Print Collection' },
              { href: '/search/e-collection', label: 'E Collection' },
              { href: '/search/e-resources', label: 'E Resources' },
              { href: '/search/multimedia', label: 'Multimedia' },
          ];

    return (
        <>
            {links.map(link => {
                const isActive = pathname === link.href;
                const fullHref = qParam ? `${link.href}?q=${encodeURIComponent(qParam)}` : link.href;

                return (
                    <Link
                        key={link.href}
                        href={fullHref}
                        className={`cursor-pointer search_nav ${isActive ? 'active_nav' : ''}`}
                    >
                        {link.label}
                    </Link>
                );
            })}
        </>
    );
}

