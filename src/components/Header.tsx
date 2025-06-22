import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo/Title */}
        <Link to="/" className="text-4xl font-bold text-red-600 hover:text-yellow-600 transition-colors cur">
          Fastoos
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link
            to="/about"
            className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
          >
            About
          </Link>
          <Link
            to="/photo"
            className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
          >
            Photo
          </Link>
          <Link
            to="/3d"
            className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
          >
            3D
          </Link>
        </nav>

        {/* Mobile menu button (optional) */}
        <button className="md:hidden text-gray-700 focus:outline-none">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu (optional) */}
      {/* <div className="md:hidden bg-white py-2 px-4 shadow-lg">
        <Link to="/about" className="block py-2 text-gray-700 hover:text-indigo-600">About</Link>
        <Link to="/photo" className="block py-2 text-gray-700 hover:text-indigo-600">Photo</Link>
        <Link to="/3d" className="block py-2 text-gray-700 hover:text-indigo-600">3D</Link>
      </div> */}
    </header>
  );
};