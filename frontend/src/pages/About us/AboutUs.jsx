import React from "react";
const team = [
  {
    name: "Aarya Patel",
    linkedin: "https://www.linkedin.com/in/aarya-patel-789250279/",
    img: "https://t4.ftcdn.net/jpg/11/83/27/27/360_F_1183272781_n4G0jNdKriy7aKJRwwS6rjVEuIHjFG3i.jpg",
  },
  {
    name: "Samrat Karna",
    linkedin: "https://www.linkedin.com/in/samrat-karna-b99033279?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
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
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-indigo-100 to-purple-100 py-10 px-2">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-10 text-indigo-800 animate-fade-in-down">
          About Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Who We Are */}
          <section className="rounded-3xl shadow-xl bg-white p-8 hover:scale-[1.025] transition-transform duration-300 animate-fade-in-left border-t-8 border-indigo-300">
            <h2 className="font-semibold text-2xl text-indigo-700 mb-2">Who We Are</h2>
            <p>
              We are <span className="font-bold text-indigo-500">medalert ai</span>,
              an AI-powered health platform dedicated to helping people make smarter food choices.
              Our goal is to empower you with instant, personalized health insights based on the nutrition labels you scan.
            </p>
          </section>

          {/* Our Mission */}
          <section className="rounded-3xl shadow-xl bg-white p-8 hover:scale-[1.025] transition-transform duration-300 animate-fade-in-right border-t-8 border-purple-300">
            <h2 className="font-semibold text-2xl text-purple-700 mb-2">Our Mission</h2>
            <p>
              To make healthy eating simple, accessible, and personalized for everyone whether you're managing a medical condition,
              aiming for a balanced diet, or just curious about what’s in your food.
            </p>
          </section>

          {/* What We Do */}
          <section className="rounded-3xl shadow-xl bg-white p-8 hover:scale-[1.025] transition-transform duration-300 animate-fade-in-left border-t-8 border-blue-300">
            <h2 className="font-semibold text-2xl text-blue-700 mb-2">What We Do</h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-800">
              <li><b>Scan Nutrition Labels :–</b> Instantly analyze ingredients and nutrition facts.</li>
              <li><b>Get Personalized Insights :–</b> Receive AI-powered advice tailored to your health profile.</li>
              <li><b>Stay Safe :–</b> Identify allergens and unsafe ingredients for your health needs.</li>
              <li><b>Download Diet Reports :–</b> Keep track of your nutrition habits with detailed reports.</li>
            </ul>
          </section>

          {/* Why Choose Us */}
          <section className="rounded-3xl shadow-xl bg-white p-8 hover:scale-[1.025] transition-transform duration-300 animate-fade-in-right border-t-8 border-pink-300">
            <h2 className="font-semibold text-2xl text-green-700 mb-2">Why Choose Us</h2>
            <ul className="list-disc pl-6 space-y-1 text-gray-800">
              <li>Accurate, AI-driven health analysis.</li>
              <li>Fast and easy to use just scan and get insights.</li>
              <li>Designed for all dietary needs vegan, diabetic, heart-healthy, and more.</li>
            </ul>
          </section>
        </div>

        {/* Our Story */}
        <section className="rounded-3xl shadow-xl bg-white p-8 mb-12 animate-fade-in-up border-t-8 border-indigo-400">
          <h2 className="font-semibold text-2xl text-indigo-700 mb-2">Our Story</h2>
          <p>
            Our journey began with a simple question: <b>Why isn’t it easier to understand the food we eat?</b>
            <br></br>
            We built medalert ai to bridge the gap between complex food labels and everyday health decisions,
            using the power of AI to guide people toward healthier lives.
           
          </p>
        </section>

        {/* Team Section */}
        <section className="animate-fade-in-up">
          <h2 className="text-center text-3xl font-bold text-purple-700 mb-6">Our Team</h2>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {team.map((member, idx) => (
              <div
                key={idx}
                className="w-72 bg-gradient-to-tr from-white via-indigo-50 to-purple-50 rounded-3xl shadow-lg p-6 flex flex-col items-center transition-transform hover:scale-105 border-t-8 border-indigo-200"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full shadow-lg mb-3 object-cover"
                />
                <div className="font-semibold text-lg text-gray-800 mb-1">{member.name}</div>
                <div className="text-indigo-700 text-sm mb-2">{member.role}</div>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 mt-1 hover:underline text-sm"
                >
                  LinkedIn
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Tailwind Animations (add this style block or put these in globals) */}
      <style>{`
        .animate-fade-in-down {
          animation: fadeInDown 1s;
        }
        .animate-fade-in-left {
          animation: fadeInLeft 1s;
        }
        .animate-fade-in-right {
          animation: fadeInRight 1s;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s;
        }
        @keyframes fadeInDown {
          0% { opacity: 0; transform: translateY(-30px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        @keyframes fadeInLeft {
          0% { opacity: 0; transform: translateX(-30px);}
          100% { opacity: 1; transform: translateX(0);}
        }
        @keyframes fadeInRight {
          0% { opacity: 0; transform: translateX(30px);}
          100% { opacity: 1; transform: translateX(0);}
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px);}
          100% { opacity: 1; transform: translateY(0);}
        }
      `}</style>
    </div>
  );
}
