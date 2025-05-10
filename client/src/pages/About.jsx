import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Profile Circle Placeholder */}
      <div className="flex justify-center mb-8">
        <div className="w-64 h-64 rounded-full bg-eco-teal flex items-center justify-center text-white text-4xl font-bold">
          EC
        </div>
      </div>

      {/* About Content */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-eco-green mb-6">
          About EcoChronicle
        </h1>
        <div className="prose prose-lg mx-auto text-gray-700 dark:text-gray-300">
          <p className="mb-4">
            EcoChronicle is a passion project dedicated to sharing environmental
            awareness and sustainable living tips. Our mission is to educate and
            inspire action through well-researched articles.
          </p>
          <p className="mb-4">
            Founded in 2023, we've grown to become a trusted resource for
            eco-conscious individuals looking to make a positive impact on our
            planet.
          </p>
          <p>
            All content is carefully curated by our team of environmental
            experts and passionate writers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
