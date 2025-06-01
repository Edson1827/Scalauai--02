import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export const Header = () => {
  return (
    <header className="bg-white dark:bg-darkbg shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-2xl font-bold text-primary">ScalaUai</a>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="/">
              <a className="text-textmain dark:text-white hover:text-primary transition-colors">Planos</a>
            </Link>
            <Link href="/institucional">
              <a className="text-textmain dark:text-white hover:text-primary transition-colors">Sobre</a>
            </Link>
            <Link href="/contato">
              <a className="text-textmain dark:text-white hover:text-primary transition-colors">Contato</a>
            </Link>
          </nav>
          <div className="flex items-center">
            <ThemeToggle />
            <button 
              className="md:hidden ml-4 relative group"
              aria-label="Menu"
              title="Menu"
            >
              <span className="sr-only">Abrir menu</span>
              <div className="w-6 h-0.5 bg-gray-600 dark:bg-gray-300 mb-1.5 transition-all"></div>
              <div className="w-6 h-0.5 bg-gray-600 dark:bg-gray-300 mb-1.5 transition-all"></div>
              <div className="w-6 h-0.5 bg-gray-600 dark:bg-gray-300 transition-all"></div>
              
              {/* Menu dropdown - implementação futura */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 hidden group-focus:block">
                <Link href="/">
                  <a className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Planos</a>
                </Link>
                <Link href="/institucional">
                  <a className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Sobre</a>
                </Link>
                <Link href="/contato">
                  <a className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Contato</a>
                </Link>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
