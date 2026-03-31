'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as MenuIcon, X, ChevronDown, Search, Globe, Phone, Mail } from 'lucide-react';

interface NavbarProps {
    lang: 'es' | 'en';
    t: any;
}

export default function Navbar({ lang: currentLang, t }: NavbarProps) {
    const d = {
        about: t['nav.about'],
        catalog: t['navbar.catalog'],
        sustainability: t['navbar.sustainability'],
        contact: t['nav.contact'],
        products: t['navbar.products'],
        services: t['navbar.services'],
        products_services_title: t['navbar.products_services_title'],
        work_with_us: t['navbar.work_with_us'],
        who_we_are: t['navbar.who_we_are'],
        who_we_are_desc: t['navbar.who_we_are_desc'],
        our_history: t['navbar.our_history'],
        our_history_desc: t['navbar.our_history_desc'],
        industry_solutions: t['navbar.industry_solutions'],
        learn_more_vision: t['navbar.learn_more_vision'],
        view_about_page: t['navbar.view_about_page'],
        balik: t['navbar.balik'],
        balik_desc: t['navbar.balik_desc'],
        ceprobio: t['navbar.ceprobio'],
        ceprobio_desc: t['navbar.ceprobio_desc'],
        planta: t['navbar.planta'],
        planta_desc: t['navbar.planta_desc'],
        proveeduria: t['navbar.proveeduria'],
        proveeduria_desc: t['navbar.proveeduria_desc'],
        proyectos: t['navbar.proyectos'],
        proyectos_desc: t['navbar.proyectos_desc'],
    };

    const prefixPath = (path: string) => {
        if (currentLang === 'es') return path;
        return `/${currentLang}${path}`;
    };

    const navLinks = [
        { name: d.about, href: prefixPath('/nosotros') },
        { name: d.sustainability, href: prefixPath('/impacto-circular') },
    ];

    const productsMenu = [
        {
            category: t['navbar.products_services_title'],
            items: [
                { name: t['navbar.ceprobio'], desc: t['navbar.ceprobio_desc'], href: prefixPath('/lineas-de-negocio/ceprobio') },
                { name: t['navbar.proveeduria'], desc: t['navbar.proveeduria_desc'], href: prefixPath('/lineas-de-negocio/proveeduria') },
                { name: t['navbar.balik'], desc: t['navbar.balik_desc'], href: prefixPath('/lineas-de-negocio/balik') },
                { name: t['navbar.proyectos'], desc: t['navbar.proyectos_desc'], href: prefixPath('/nuestros-proyectos') },
                { name: t['navbar.planta'], desc: t['navbar.planta_desc'], href: prefixPath('/lineas-de-negocio/planta-de-tratamiento') },
            ]
        }
    ];

    const aboutMenu = {
        main: [
            { name: d.who_we_are, desc: d.who_we_are_desc, href: prefixPath('/nosotros') },
            { name: d.our_history, desc: d.our_history_desc, href: prefixPath('/impacto-circular') }
        ],
        sidebar: [
            { name: d.work_with_us, href: prefixPath('/contacto'), icon: Phone },
            { name: d.contact, href: prefixPath('/contacto'), icon: Mail }
        ]
    };

    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(window.location.pathname);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > window.innerHeight * 0.10);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const rawPath = currentPath.replace(`/${currentLang}`, "") || "/";
    const isTransparentPage =
        rawPath === "/" ||
        rawPath === "/en/" ||
        rawPath.includes("/ceprobio") ||
        rawPath.includes("/nosotros");
    const isSolid = isScrolled || !isTransparentPage || isOpen;

    // Dynamic styles based on scroll state
    const isHeaderColored = isSolid && !isTransparentPage;
    const textColorClass = isHeaderColored ? 'text-white' : (isSolid ? 'text-slate-900' : 'text-white');
    const hoverColorClass = isHeaderColored ? 'hover:text-white/80' : (isSolid ? 'hover:text-brand-blue' : 'hover:text-brand-green');
    const iconColorClass = isHeaderColored ? 'text-white' : (isSolid ? 'text-slate-600' : 'text-white');

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = (dropdownStr: string) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setActiveDropdown(dropdownStr);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 300);
    };

    return (
        <>
            <AnimatePresence>
                {(activeDropdown === 'productos' || activeDropdown === 'nosotros') && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 bg-brand-green/10 backdrop-blur-md pointer-events-none"
                    />
                )}
            </AnimatePresence>

            <header
                className={`fixed top-0 z-50 w-full transition-all duration-700 ${isSolid
                    ? (isTransparentPage ? 'bg-white border-b border-slate-100' : 'bg-brand-blue border-none')
                    : 'bg-transparent'
                    }`}
                onMouseLeave={handleMouseLeave}
            >
                {/* Top Bar - High Visibility Options */}
                <div className={`hidden md:flex justify-end items-center px-8 py-2 text-xs transition-colors duration-700 ${isSolid ? 'text-slate-500' : 'text-slate-200 font-bold'}`}>
                    <div className="flex items-center gap-6">
                        <a href={prefixPath('/contacto')} className="flex items-center gap-2 hover:text-brand-green transition-colors">
                            <Mail className="h-3 w-3" /> {d.contact}
                        </a>
                        <a href={currentLang === 'es' ? '/en' : '/'} className="flex items-center gap-2 hover:text-brand-green transition-colors cursor-pointer">
                            <Globe className="h-3 w-3" /> {currentLang === 'es' ? 'English (EN)' : 'Español (ES)'}
                        </a>
                    </div>
                </div>

                {/* Main Nav */}
                <div className={`mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isSolid ? 'h-20' : 'h-24'}`}>
                    <a href={currentLang === 'es' ? '/' : '/en'} className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                        <div className="relative transition-all duration-700 h-14 w-36 md:h-16 md:w-48">
                            <img
                                src={(!isSolid || isHeaderColored) ? "/images/greenprod-blanco.png" : "/images/greenprod.png"}
                                alt="Green Prod & Sustainable Logo"
                                className="h-full w-auto object-contain transition-all duration-700"
                            />
                        </div>
                    </a>

                    <nav className="hidden md:flex items-center h-full gap-1 lg:gap-2 relative">
                        <div
                            className="h-full flex items-center"
                            onMouseEnter={() => handleMouseEnter('nosotros')}
                        >
                            <button
                                className={`px-4 lg:px-6 h-full flex items-center gap-1 text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${activeDropdown === 'nosotros' ? (!isSolid ? 'text-brand-green' : 'text-brand-blue') : textColorClass} ${hoverColorClass}`}
                            >
                                {d.about} <ChevronDown className={`h-4 w-4 transition-transform duration-700 ${activeDropdown === 'nosotros' ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        <div
                            className="h-full flex items-center"
                            onMouseEnter={() => handleMouseEnter('productos')}
                        >
                            <button
                                className={`px-4 lg:px-6 h-full flex items-center gap-1 text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${activeDropdown === 'productos' ? (!isSolid ? 'text-brand-green' : 'text-brand-blue') : textColorClass} ${hoverColorClass}`}
                            >
                                {d.products_services_title} <ChevronDown className={`h-4 w-4 transition-transform duration-700 ${activeDropdown === 'productos' ? 'rotate-180' : ''}`} />
                            </button>
                        </div>

                        <a
                            href={prefixPath('/impacto-circular')}
                            className={`px-4 lg:px-6 h-full flex items-center text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${textColorClass} ${hoverColorClass}`}
                        >
                            {t['nav.activities']}
                        </a>

                        <a
                            href={prefixPath('/nuestros-proyectos')}
                            className={`px-4 lg:px-6 h-full flex items-center text-sm font-semibold tracking-wide uppercase transition-colors duration-300 ${textColorClass} ${hoverColorClass}`}
                        >
                            {d.catalog}
                        </a>

                        <div className="ml-4 flex items-center gap-4 border-l border-slate-300/30 pl-6">
                            <button className={`p-2 transition-colors duration-300 ${!isSolid ? 'text-white hover:text-brand-green' : 'text-slate-600 hover:text-brand-blue'}`}>
                                <Search className="h-5 w-5" />
                            </button>
                        </div>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <div className="flex md:hidden items-center gap-4">
                        <button className={`p-2 transition-colors duration-700 ${!isSolid ? 'text-white hover:text-brand-green' : 'text-slate-600 hover:text-brand-blue'}`}>
                            <Search className="h-5 w-5" />
                        </button>
                        <button
                            className={`p-2 transition-colors duration-700 ${!isSolid ? 'text-white hover:text-brand-green' : 'text-slate-600 hover:text-brand-blue'}`}
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                        </button>
                    </div>
                </div>

                {/* Mega Menu Dropdown - Productos */}
                <AnimatePresence>
                    {activeDropdown === 'productos' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="hidden md:block absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100/50"
                            onMouseEnter={() => handleMouseEnter('productos')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="mx-auto max-w-7xl px-8 py-10">
                                <div className="grid  gap-12">
                                    {productsMenu.map((column) => (
                                        <div key={column.category} className="flex flex-col">
                                            {/* Encabezado de categoría mejorado visualmente */}
                                            <h3 className="text-sm font-black text-brand-blue mb-4 pb-2 border-b border-slate-100 uppercase tracking-widest">
                                                {column.category}
                                            </h3>

                                            {/* Cambiamos a <ul> para mejor semántica SEO/Accesibilidad */}
                                            <ul className="grid grid-cols-3 line-clamp-2 gap-x-6 gap-y-2">
                                                {column.items.map((item) => (
                                                    <li key={item.name}>
                                                        <a
                                                            href={item.href}
                                                            onClick={() => setActiveDropdown(null)}
                                                            // Ampliamos el área de clic (hitbox) y agregamos fondo al hacer hover
                                                            className="group flex flex-col p-3 -mx-3 rounded-xl hover:bg-slate-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-green/20"
                                                        >
                                                            <h4 className="text-base font-bold text-black group-hover:text-brand-green transition-colors mb-1 flex items-center justify-between">
                                                                {item.name}
                                                                {/* Flecha indicadora que aparece sutilmente al hacer hover */}
                                                                <span className="text-brand-green opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                                                    <i className="fas fa-arrow-right text-sm [text-stroke:1px_currentColor] [-webkit-text-stroke:1px_currentColor] color"></i>
                                                                </span>
                                                            </h4>
                                                            {/* line-clamp-2 evita que el diseño se rompa si la descripción es muy larga */}
                                                            <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                                                                {item.desc}
                                                            </p>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-slate-50 border-t border-slate-100 px-8 py-4">
                                <div className="mx-auto max-w-7xl flex justify-between items-center text-sm">
                                    <span className="text-slate-600 font-medium">{d.industry_solutions}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeDropdown === 'nosotros' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="hidden md:block absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100/50"
                            onMouseEnter={() => handleMouseEnter('nosotros')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="mx-auto max-w-7xl px-8 py-10">
                                <div className="flex gap-12">
                                    <div className="flex-1 border-r border-slate-100 pr-12">
                                        <h3 className="text-xl font-bold text-brand-blue mb-6 pb-2 border-b border-slate-100">Green Prod & Sustainable</h3>
                                        <div className="grid grid-cols-2 gap-8">
                                            {aboutMenu.main.map((item, idx) => (
                                                <a
                                                    key={idx}
                                                    href={item.href}
                                                    className="group block"
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    <h4 className="text-base font-bold text-slate-800 group-hover:text-brand-green transition-colors mb-2">{item.name}</h4>
                                                    <p className="text-sm text-slate-500 leading-snug">{item.desc}</p>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="w-64 shrink-0 pl-12 flex flex-col justify-center space-y-4">
                                        {aboutMenu.sidebar.map((item, idx) => {
                                            const Icon = item.icon;
                                            return (
                                                <a
                                                    key={idx}
                                                    href={item.href}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-brand-blue transition-colors"
                                                    onClick={() => setActiveDropdown(null)}
                                                >
                                                    <div className="p-2 bg-slate-100 rounded-md text-slate-500">
                                                        <Icon className="h-4 w-4" />
                                                    </div>
                                                    <span className="text-sm font-semibold">{item.name}</span>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-50 border-t border-slate-100 px-8 py-4">
                                <div className="mx-auto max-w-7xl flex justify-between items-center text-sm">
                                    <span className="text-slate-600 font-medium">{d.learn_more_vision}</span>
                                    <a href={prefixPath('/nosotros')} className="text-brand-blue font-bold hover:text-brand-green flex items-center gap-1 transition-colors" onClick={() => setActiveDropdown(null)}>
                                        {d.view_about_page} <ChevronDown className="h-4 w-4 -rotate-90" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Nav */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white absolute w-full shadow-xl left-0 top-full overflow-hidden"
                        >
                            <div className="flex flex-col h-[calc(100vh-80px)] overflow-y-auto">
                                <div className="bg-slate-50 flex justify-between px-6 py-4 border-b border-slate-100 text-sm font-medium text-slate-600">
                                    <a href={prefixPath('/contacto')} onClick={() => setIsOpen(false)} className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" /> {d.contact}
                                    </a>
                                    <a href={currentLang === 'es' ? '/en' : '/'} className="flex items-center gap-2">
                                        <Globe className="h-4 w-4" /> {currentLang === 'es' ? 'EN' : 'ES'}
                                    </a>
                                </div>

                                <div className="flex-1 py-4">
                                    <div className="border-b border-slate-50">
                                        <button
                                            className={`w-full px-6 py-4 flex justify-between items-center text-lg font-bold uppercase tracking-wide text-slate-800`}
                                            onClick={() => setActiveDropdown(activeDropdown === 'mobile-nosotros' ? null : 'mobile-nosotros')}
                                        >
                                            {d.about}
                                            <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${activeDropdown === 'mobile-nosotros' ? 'rotate-180 text-brand-green' : 'text-slate-400'}`} />
                                        </button>

                                        <AnimatePresence>
                                            {activeDropdown === 'mobile-nosotros' && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden bg-slate-50"
                                                >
                                                    <div className="px-6 py-2 pb-6 space-y-6">
                                                        <div>
                                                            <h3 className="text-sm font-bold text-brand-blue uppercase tracking-wider mb-3">CONOCE MÁS</h3>
                                                            <div className="space-y-4 pl-2 border-l-2 border-slate-200">
                                                                {aboutMenu.main.map((item, idx) => (
                                                                    <a
                                                                        key={idx}
                                                                        href={item.href}
                                                                        className="block pl-3"
                                                                        onClick={() => setIsOpen(false)}
                                                                    >
                                                                        <div className="font-bold text-slate-700">{item.name}</div>
                                                                        <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                                                                    </a>
                                                                ))}
                                                                {aboutMenu.sidebar.map((item, idx) => (
                                                                    <a
                                                                        key={`sb-${idx}`}
                                                                        href={item.href}
                                                                        className="block pl-3"
                                                                        onClick={() => setIsOpen(false)}
                                                                    >
                                                                        <div className="font-bold text-slate-700">{item.name}</div>
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <div className="border-b border-slate-50">
                                        <button
                                            className={`w-full px-6 py-4 flex justify-between items-center text-lg font-bold uppercase tracking-wide text-slate-800`}
                                            onClick={() => setActiveDropdown(activeDropdown === 'mobile-productos' ? null : 'mobile-productos')}
                                        >
                                            {d.products_services_title}
                                            <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${activeDropdown === 'mobile-productos' ? 'rotate-180 text-brand-green' : 'text-slate-400'}`} />
                                        </button>

                                        <AnimatePresence>
                                            {activeDropdown === 'mobile-productos' && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden bg-slate-50"
                                                >
                                                    <div className="px-6 py-2 pb-6 space-y-6">
                                                        {productsMenu.map((column, idx) => (
                                                            <div key={idx}>
                                                                <h3 className="text-sm font-bold text-brand-blue uppercase tracking-wider mb-3">{column.category}</h3>
                                                                <div className="space-y-4 pl-2 border-l-2 border-slate-200">
                                                                    {column.items.map((item, idxi) => (
                                                                        <a
                                                                            key={idxi}
                                                                            href={item.href}
                                                                            className="block pl-3"
                                                                            onClick={() => setIsOpen(false)}
                                                                        >
                                                                            <div className="font-bold text-slate-700">{item.name}</div>
                                                                            <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <div className="border-b border-slate-50">
                                        <a
                                            href={prefixPath('/impacto-circular')}
                                            className="w-full px-6 py-4 flex items-center text-lg font-bold uppercase tracking-wide text-slate-800 hover:bg-slate-50 transition-colors"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {t['nav.activities']}
                                        </a>
                                    </div>
                                </div>

                                <div className="bg-slate-900 px-6 py-8 mt-auto">
                                    <a
                                        href={prefixPath('/contacto')}
                                        onClick={() => setIsOpen(false)}
                                        className="w-full flex justify-center items-center py-4 rounded-xl bg-brand-green text-white font-bold text-lg hover:bg-brand-blue transition-colors"
                                    >
                                        <Phone className="h-5 w-5 mr-2" />
                                        {d.work_with_us}
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}
