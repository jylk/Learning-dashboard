import React from "react";

export const Contact = () => {
  const sections = [
    {
      title: "Learners",
      links: [
        { text: "Visit our Help Center", href: "#" },
        { text: "How to reach our support team", href: "#" },
      ],
    },
    {
      title: "Acumen Business",
      links: [
        { text: "Visit our Help Center", href: "#" },
        { text: "Enterprise New Customer Inquiry", href: "#" },
      ],
    },
    {
      title: "Instructors",
      links: [
        { text: "Visit our Help Center", href: "#" },
        { text: "Explore our Teaching Center", href: "#" },
      ],
    },
    {
      title: "Partners, Resellers & Affiliates",
      links: [{ text: "Visit our Help Center", href: "#" }],
    },
    {
      title: "Investors",
      links: [
        { text: "Learn more here", href: "#" },
        { text: "Contact our Investor Relations team", href: "#" },
      ],
    },
    {
      title: "Press",
      links: [
        { text: "View general information", href: "#" },
        { text: "Email press@acumen.com", href: "#" },
      ],
    },
    {
      title: "Privacy",
      links: [
        { text: "View privacy policy", href: "#" },
        { text: "Email privacy@acumen.com", href: "#" },
      ],
      extra: (
        <div className="mt-4 text-sm text-gray-700">
          <p>Mail:</p>
          <p>Acumen, Inc.</p>
          <p>Attn: Legal</p>
          <p>Lane 9,Toc-H road</p>
          <p>Kochi,Kerala 682019</p>
        </div>
      ),
    },
    {
      title: "European Union Authorities & Trusted Flaggers",
      links: [
        { text: "View Digital Services Act Information", href: "#" },
        { text: "Report Illegal Content Form", href: "#" },
        { text: "Email dsacompliance@acumen.com", href: "#" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-8 animate-fade-in">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600 text-center mb-16 animate-slide-up">
          The quickest way to get in touch with us is by using the contact
          information below.
        </p>

        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-500 rounded-lg p-6 border-t-4 border-indigo-400 hover:border-purple-500 animate-fade-in-delay"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                {section.title}
                <span className="ml-2 text-indigo-400 hover:text-purple-500 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </h2>
              <ul>
                {section.links.map((link, i) => (
                  <li key={i} className="mb-3">
                    <a
                      href={link.href}
                      className="text-blue-600 hover:text-purple-600 hover:underline transition duration-300"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
              {section.extra && section.extra}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
