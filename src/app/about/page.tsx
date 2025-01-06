"use client";
import { ButtonOutline } from "@/components/button";
import Link from "next/link";
import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-white to-blue-100 py-16 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-6xl font-extrabold text-gray-800 mb-6 transition duration-500 transform hover:scale-105 hover:text-blue-600">
          {`About Us`}
        </h2>
        <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          {`Welcome to`}{" "}
          <span className="font-semibold text-blue-600">{`Metablog`}</span>
          {`! I'm`}{" "}
          <span className="font-semibold text-blue-600">{`Muhammad Moaz`}</span>
          {`,
          the author and creator of this blog. This is a space where I share my
          thoughts, insights, and ideas on a wide range of topics, from
          technology to personal growth and beyond.`}
        </p>

        <div className="bg-white shadow-xl rounded-lg p-8 space-y-8 transition duration-500 hover:scale-105 hover:shadow-2xl">
          <h3 className="text-3xl font-semibold text-gray-700 mb-6">
            {`Our Mission`}
          </h3>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            {`At`}{" "}
            <span className="font-semibold text-blue-600">{`Metablog`}</span>
            {`, my
            mission is to inspire and engage readers with meaningful content
            that encourages learning, growth, and exploration. I believe that
            words have the power to make a positive impact, and this blog is my
            way of sharing my thoughts with the world.`}
          </p>

          <h3 className="text-3xl font-semibold text-gray-700 mb-6">
            {`Who I Am`}
          </h3>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            {`I am a passionate writer and explorer. As someone who loves to learn
            about new topics and share insights, I created`}{" "}
            <span className="font-semibold text-blue-600">Metablog</span>{" "}
            {`to
            document my journey and thoughts. Whether it’s technology, personal
            experiences, or simple life reflections, this space allows me to
            share what excites me with you.`}
          </p>

          <h3 className="text-3xl font-semibold text-gray-700 mb-6">
            {`What You Can Expect`}
          </h3>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            {`On`}{" "}
            <span className="font-semibold text-blue-600">{`Metablog`}</span>,
            {`you will find a variety of content, including:`}
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 text-lg justify-start items-start">
            <li>{`In-depth articles on various topics.`}</li>
            <li>{`Personal stories and reflections.`}</li>
            <li>{`Practical tips and advice for everyday life.`}</li>
            <li>{`A blend of humor and creativity to keep things interesting.`}</li>
          </ul>

          <h3 className="text-3xl font-semibold text-gray-700 mb-6">
            {`Let's Connect`}
          </h3>
          <p className="text-gray-600 mb-6 text-lg leading-relaxed">
            {` I love to hear from my readers! Feel free to reach out, share your
            thoughts in the comments, or connect with me on social media. Your
            feedback and suggestions are always appreciated.`}
          </p>

          <Link href={"/contact"}>
            <ButtonOutline buttonText="Contact" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
