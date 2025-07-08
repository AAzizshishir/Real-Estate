const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1 */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">PropEase</h2>
          <p>Your trusted property partner for all your real estate needs.</p>
        </div>
        {/* Column 2 */}
        <div>
          <h3 className="font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-primary transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition">
                All Properties
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition">
                Dashboard
              </a>
            </li>
          </ul>
        </div>
        {/* Column 3 */}
        <div>
          <h3 className="font-semibold text-white mb-4">Contact Us</h3>
          <p>Email: support@propease.com</p>
          <p>Phone: +880 123-456-789</p>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4 text-sm">
        © 2025 PropEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
