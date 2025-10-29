// Footer Component
function Footer() {
  const phoneNumber = "+2348100337199";
  const message = "Hello SwiftTech! I saw your work on the Assignment Portal. I would like your services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  const handleClick = () => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm md:text-base">
          Designed & Developed by{" "}
          <button
            onClick={handleClick}
            className="font-bold underline underline-offset-4 hover:text-yellow-300 transition-colors duration-300"
          >
            SwiftTech
          </button>
        </p>
        <p className="text-xs mt-2 opacity-75">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
