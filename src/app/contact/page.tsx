import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaSquareBehance,
  FaXTwitter,
} from "react-icons/fa6";

export default function Contact() {
  return (
    <div id="contact">
      <section className="text-gray-600 body-font relative bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-4xl text-3xl font-bold title-font mb-4 text-gray-900">
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-lg text-gray-600">
              {`Feel free to get in touch with us and share your feedback so that
              we can make our website even better.`}
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form action="https://formspree.io/f/xbllpkjq" method="POST">
                <div className="flex flex-wrap -m-2">
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label
                        htmlFor="name"
                        className="leading-7 text-sm text-gray-600">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full bg-gray-100 rounded-lg border border-gray-300 focus:border-lime-400 focus:bg-white focus:ring-2 focus:ring-lime-300 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition duration-200 ease-in-out shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="leading-7 text-sm text-gray-600">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full bg-gray-100 rounded-lg border border-gray-300 focus:border-lime-400 focus:bg-white focus:ring-2 focus:ring-lime-300 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition duration-200 ease-in-out shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="message"
                        className="leading-7 text-sm text-gray-600">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="w-full bg-gray-100 rounded-lg border border-gray-300 focus:border-lime-400 focus:bg-white focus:ring-2 focus:ring-lime-300 h-32 text-base outline-none text-gray-700 py-2 px-4 leading-6 transition duration-200 ease-in-out resize-none shadow-sm"></textarea>
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <button
                      type="submit"
                      className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg shadow-md transition-transform transform hover:scale-105">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>

              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <a href="mailto:example@email.com" className="text-indigo-500">
                  example@email.com
                </a>
                <br />
                <br />
                <div className="inline-flex">
                  <Link href={"https://web.facebook.com"} target="_blank">
                    <FaFacebookF className="ml-4 text-2xl text-gray-500 hover:text-lime-200" />
                  </Link>
                  <Link href={"https://x.com"} target="_blank">
                    <FaXTwitter className="ml-4 text-2xl text-gray-500 hover:text-lime-200" />
                  </Link>
                  <Link href={"https://www.instagram.com/"} target="_blank">
                    <FaInstagram className="ml-4 text-2xl text-gray-500 hover:text-lime-200" />
                  </Link>
                  <Link href={"https://www.behance.net/"} target="_blank">
                    <FaSquareBehance className="ml-4 text-2xl text-gray-500 hover:text-lime-200" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
