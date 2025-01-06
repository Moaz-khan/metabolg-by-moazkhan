import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            
            <span className="ml-3 text-xl font-bold">METABLOG</span>
          </a>
          <p className="text-sm text-black sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
            © 2020 METABLOG —
            <a
              href="https://twitter.com/knyttneve"
              className="text-black ml-1"
              rel="noopener noreferrer"
              target="_blank">
              @metablogs
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
