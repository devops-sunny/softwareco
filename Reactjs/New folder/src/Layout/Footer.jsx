import React from 'react';

const Footer = () => {
  const footerSections = [
    {
      title: "Office Locations",
      content: [
        "130058888",
        "300 Barangaroo Ave, Sydney.",
        "35 Collins St, Melbourne."
      ],
      isSocial: true
    },
    {
      title: "About Us",
      links: [
        { name: "About Us", href: "#" },
        { name: "Build A Team", href: "#" },
        { name: "Venture Studio", href: "#" },
        { name: "Careers", href: "#" }
      ]
    },
    {
      title: "Services",
      links: [
        { name: "Product Planning", href: "#" },
        { name: "UX/UI Design", href: "#" },
        { name: "Ecommerce", href: "#" },
        { name: "App Development", href: "#" },
        { name: "Web Development", href: "#" },
        { name: "Software Testing", href: "#" },
        { name: "Software Development", href: "#" }
      ]
    },
    {
      title: "Industries",
      links: [
        { name: "Augmented Reality", href: "#" },
        { name: "Events", href: "#" },
        { name: "Ecommerce Retail", href: "#" },
        { name: "Healthcare", href: "#" },
        { name: "Hospitality", href: "#" },
        { name: "Insurance", href: "#" },
        { name: "Sports Apps", href: "#" },
        { name: "Music", href: "#" }
      ]
    },
    {
      title: "How We Work",
      links: [
        { name: "FAQ", href: "#" },
        { name: "3 ways to get started", href: "#" },
        { name: "Project Based", href: "#" },
        { name: "Scrum Methodology", href: "#" },
        { name: "Waterfall Methodology", href: "#" },
        { name: "Terms and Conditions", href: "#" }
      ]
    }
  ];

  return (
    <footer className="footer">
      {footerSections.map((section, index) => (
        <div key={index} className="footer-section">
          <h3>{section.title}</h3>
          {section.content && section.content.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
          {section.links && (
            <ul>
              {section.links.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          )}
          {section.isSocial && (
            <div className="social-icons">
              {/* Add your social media icons here */}
            </div>
          )}
        </div>
      ))}
    </footer>
  );
};

export default Footer;
