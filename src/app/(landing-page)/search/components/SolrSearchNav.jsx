'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { useTranslation } from 'react-i18next';
import '@/i18n'; // cleaner using path alias `@`

export default function SolrSearchNav() {

    const { t, i18n } = useTranslation();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const qParam = searchParams.get('q');

    const isAdvanceSearch = pathname.startsWith('/advance-search');
    const isSavedCatalog = pathname.startsWith('/saved-catalog');
    const isReadHistory = pathname.startsWith('/read-history');

    let links;

    if (isAdvanceSearch) {
        links = [
            { href: '/advance-search/print-collection', label: t('Print Collection') },
            { href: '/advance-search/e-collection', label: t('E Collection') },
            { href: '/advance-search/e-resources', label: t('E Resources') },
            { href: '/advance-search/multimedia', label: t('Multimedia') },
        ];
    } else if (isSavedCatalog) {
        links = [
            { href: '/saved-catalog/print-collection', label: t('Print Collection') },
            { href: '/saved-catalog/e-collection', label: t('E Collection') },
            { href: '/saved-catalog/e-resources', label: t('E Resources') },
            { href: '/saved-catalog/multimedia', label: t('Multimedia') },
        ];
    } else if (isReadHistory){
        links = [
            { href: '/read-history/print-collection', label: t('Print Collection') },
            { href: '/read-history/e-collection', label: t('E Collection') },
            { href: '/read-history/e-resources', label: t('E Resources') },
            { href: '/read-history/multimedia', label: t('Multimedia') },
        ];
    } else {
        links = [
            { href: '/search/print-collection', label: t('Print Collection') },
            { href: '/search/e-collection', label: t('E Collection') },
            { href: '/search/e-resources', label: t('E Resources') },
            { href: '/search/multimedia', label: t('Multimedia') },
        ];
    }
    

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
