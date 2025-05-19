import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Profile Circle Placeholder */}
      <div className="flex justify-center mb-8">
       {/* <div className="w-64 h-64 rounded-full  flex items-center justify-center text-white text-4xl font-bold">
          <img src="/ene.jpeg" alt="ene" className="object-cover w-64 h-64 rounded-full" />
        </div> */}
      </div>

      {/* About Content */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-eco-green mb-6">
          About Sustainably aware
        </h1>
        <div className="prose prose-lg mx-auto text-gray-700 dark:text-gray-300">
          <p className="mb-4">
            Hi there! My name is Eneawan but you can call me Ene. I'm an
            undergraduate studying economics as well as a sustainability
            advocate and creative living in Lagos, Nigeria.
          </p>
          <p className="mb-4">
            The idea to start this blog was borne out of my love for talking
            (which I'm not ashamed to admit) but also, as the name implies,
            Sustainably Aware is a platform dedicated to spreading awareness
            about sustainable practices, environmental issues, possible
            solutions to those issues and every other green-related topic under
            the sun.
          </p>
          <p className="mb-4">
            I'm neither an expert nor am I formally qualified , I'm just very
            passionate about protecting our planet and I truly believe raising
            awareness is one of the most important ways to drive meaningful
            change in the environmental space. Asides the interesting reads, the 
           <a href="/eco-crafts" className="text-blue-500 underline">  eco crafts</a> page of the website is where
            we’ll get our hands dirty and learn how to upcycle our old/
            discarded items into something new and cute.
          </p>
          <p>
Thank you for coming on this journey with me as we become sustainably aware together &lt;3
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
