import React from "react";

const team = [
  {
    name: "Aarya Patel",
    linkedin: "https://www.linkedin.com/in/aarya-patel-789250279/",
    img: "https://t4.ftcdn.net/jpg/11/83/27/27/360_F_1183272781_n4G0jNdKriy7aKJRwwS6rjVEuIHjFG3i.jpg",
  },
  {
    name: "Samrat Karna",
    linkedin:
      "https://www.linkedin.com/in/samrat-karna-b99033279?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMNSqtXCDtB9vAOExO_6O0HOaEn8faOTKHvA&s",
  },
  {
    name: "Rohit Gupta",
    linkedin: "https://www.linkedin.com/in/rohitgupta1604",
    img: "https://png.pngtree.com/png-clipart/20250123/original/pngtree-professional-male-avatar-in-suit-png-image_20001178.png",
  },
  {
    name: "Abhishek Kamati",
    linkedin: "https://www.linkedin.com/in/abhishek-kamati",
    img: "https://t4.ftcdn.net/jpg/14/05/81/37/360_F_1405813706_e7f6ONwQ8KD8bRbinELfD1jazaXGB5q3.jpg",
  },
  {
    name: "Sweekar Koirala",
    linkedin: "https://www.linkedin.com/in/sweekar-koirala",
    img: "https://static.vecteezy.com/system/resources/thumbnails/015/413/618/small_2x/elegant-man-in-business-suit-with-badge-man-business-avatar-profile-picture-illustration-isolated-vector.jpg",
  },
  {
    name: "Subhash Mehta",
    linkedin: "https://www.linkedin.com/in/subhash-mehta-as21/",
    img: "https://img.freepik.com/premium-vector/man-with-glasses-beard-is-smiling-camera_905719-6870.jpg",
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen text-white pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">About Us</h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-white/90">
            medalert ai — helping you make smarter food choices with fast, simple and
            personalised nutrition insights powered by AI.
          </p>
        </header>

        {/* Info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <section
            className="rounded-3xl p-8 hover:scale-[1.025] transition-transform duration-300 backdrop-blur-md bg-white/6 border border-white/10 shadow-lg"
            style={{ borderTopWidth: 6, borderTopColor: "#4F6FFE" }}
          >
            <h2 className="font-semibold text-2xl text-[#EAF0FF] mb-2">Who We Are</h2>
            <p className="text-white/90 leading-relaxed">
              We are <span className="font-bold">medalert ai</span>, an AI-powered health
              platform dedicated to helping people understand what’s inside the food they
              eat. Scan a nutrition label and get clear, personalised health guidance in
              seconds.
            </p>
          </section>

          <section
            className="rounded-3xl p-8 hover:scale-[1.025] transition-transform duration-300 backdrop-blur-md bg-white/6 border border-white/10 shadow-lg"
            style={{ borderTopWidth: 6, borderTopColor: "#4F6FFE" }}
          >
            <h2 className="font-semibold text-2xl text-[#EAF0FF] mb-2">Our Mission</h2>
            <p className="text-white/90 leading-relaxed">
              Make healthy eating simple and accessible for everyone — whether you're
              managing a condition, tracking macros, or just curious about ingredients.
            </p>
          </section>

          <section
            className="rounded-3xl p-8 hover:scale-[1.025] transition-transform duration-300 backdrop-blur-md bg-white/6 border border-white/10 shadow-lg"
            style={{ borderTopWidth: 6, borderTopColor: "#4F6FFE" }}
          >
            <h2 className="font-semibold text-2xl text-[#EAF0FF] mb-2">What We Do</h2>
            <ul className="list-disc pl-6 space-y-2 text-white/90">
              <li>Scan nutrition labels and extract key facts.</li>
              <li>Provide AI-driven insights tailored to your profile.</li>
              <li>Flag allergens and unsafe ingredients for your health needs.</li>
              <li>Generate downloadable diet reports for tracking progress.</li>
            </ul>
          </section>

          <section
            className="rounded-3xl p-8 hover:scale-[1.025] transition-transform duration-300 backdrop-blur-md bg-white/6 border border-white/10 shadow-lg"
            style={{ borderTopWidth: 6, borderTopColor: "#4F6FFE" }}
          >
            <h2 className="font-semibold text-2xl text-[#EAF0FF] mb-2">Why Choose Us</h2>
            <ul className="list-disc pl-6 space-y-2 text-white/90">
              <li>Fast, accurate nutrition analysis using modern AI.</li>
              <li>Easy — just scan and get clear recommendations.</li>
              <li>Built for varied diets: vegan, diabetic, heart-friendly and more.</li>
            </ul>
          </section>
        </div>

        {/* Story */}
        <section
          className="rounded-3xl p-8 mb-12 backdrop-blur-md bg-white/6 border border-white/10 shadow-lg"
          style={{ borderTopWidth: 6, borderTopColor: "#4F6FFE" }}
        >
          <h2 className="font-semibold text-2xl text-[#EAF0FF] mb-2">Our Story</h2>
          <p className="text-white/90 leading-relaxed">
            We asked ourselves: <strong>why is it so hard to understand what’s in packaged food?</strong>{" "}
            medalert ai was born to simplify label-reading and bring real, personalised
            nutrition help to everyday people — fast.
          </p>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-center text-3xl font-bold text-white mb-6">Our Team</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="w-72 rounded-3xl p-6 flex flex-col items-center transition-transform hover:scale-105 shadow-lg backdrop-blur-md bg-white/5 border border-white/8"
                style={{ borderTopWidth: 6, borderTopColor: "#4F6FFE" }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full shadow-md mb-3 object-cover ring-1 ring-white/10"
                />
                <div className="font-semibold text-lg text-white mb-1">{member.name}</div>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[#D6E4FF] hover:underline mt-1"
                >
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
