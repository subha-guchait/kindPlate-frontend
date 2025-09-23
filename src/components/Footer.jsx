import { CodeXml, Github, Linkedin, X, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 text-sm py-4 mt-6 border-t">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center">
        <p className="mb-3 sm:mb-0">
          Made with ❤️ by <span className="font-semibold">Subhankar</span>
        </p>

        <div className="flex gap-4 px-4">
          <a
            href="https://github.com/subha-guchait/kindPlate-backend"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#9c27b0]"
          >
            <CodeXml size={20} />
          </a>
          <a
            href="https://github.com/subha-guchait"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/subhankarguchait/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://x.com/subhaguchait"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black"
          >
            <X size={20} />
          </a>
          <a
            href="mailto:guchaitsubhankar@gmail.com"
            className="hover:text-red-600"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
