

export default function Footer() {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 py-6 px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        {/* Copyright Text */}
        <div className="text-gray-700 text-md text-center md:text-left">
          © {currentYear} Havenly Home, Inc. All rights reserved.
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center space-x-6">
          <div className="text-gray-700 text-md text-center md:text-left">
            Developed by chetanpanara
          </div>
        </div>
      </div>
    </footer>
  );
}
