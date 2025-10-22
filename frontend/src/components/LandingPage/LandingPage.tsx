"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import ArchitectureImg from "@/assets/images/smartnode_architecture.png";
import DashboardImg from "@/assets/images/dashboard.png";
import NodesImg from "@/assets/images/nodes.png";
import Link from "next/link";
import { useUserContext } from "@/contexts/UserContext";
import LogoIcon from "@/assets/icons/logo.svg";
import DashboardIcon from "@/assets/icons/dashboardIcon.svg";
import CircuitIcon from "@/assets/icons/circuiitIcon.svg";
import ReactGA from "react-ga4";

const techStack: {
  [key: string]: {
    name: string;
    library: string;
  }[];
} = {
  backend: [
    { name: "Node.js", library: "Express" },
    { name: "MongoDB", library: "Postgres" },
  ],
  frontend: [
    { name: "React", library: "Hooks, Context" },
    { name: "State", library: "Context API" },
    { name: "Styling", library: "SCSS + Tailwind CSS" },
  ],
  hardware: [
    { name: "Design", library: "Fusion360" },
    { name: "Microcontroller", library: "ESP8266" },
    { name: "Peripherals", library: "Relays" },
  ],
};

const features = [
  {
    title: "Add & Manage Multiple Smart Nodes",
    description: "Register devices, group them by room, and view device state.",
  },
  {
    title: "Admin Dashboard",
    description: "Admin interface for creating and managing nodes and users.",
  },
  {
    title: "Real-time Device Toggling",
    description:
      "Low-latency control via WebSocket with UI updates and immediate state feedback on the dashboard.",
  },
  {
    title: "Secure Authentication (JWT)",
    description:
      "Secure authentication and device registration to ensure nodes can only be toggled by their authorized owners.",
  },
];

const hyperlinks: {
  title: string;
  href: string;
}[] = [
  {
    title: "What I built",
    href: "#built",
  },
  {
    title: "Skills",
    href: "#skills",
  },
  {
    title: "Features",
    href: "#features",
  },
  {
    title: "Demo",
    href: "#demo",
  },
];

const githubLink = "https://github.com/usmahm/smartnode";

const TechBadge = ({ name, library }: { name: string; library: string }) => (
  <div className="flex items-center justify-between">
    <span>{name}</span>
    <span className="text-xs border border-grey-100 p-2 rounded-md">
      {library}
    </span>
  </div>
);

const LandingPage = () => {
  const { token } = useUserContext();

  useEffect(() => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_G_ID);
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <>
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 flex items-center">
                {/* <i data-feather="cpu" className="text-blue-600 w-8 h-8"></i> */}
                {/* <span className="ml-2 text-lg font-bold">SmartNode</span> */}
                <LogoIcon className="h-[30px] md:h-[44px]" />
              </div>
              {/* <div className="hidden sm:flex items-center">
                <span className="ribbon">Prototype — Personal project</span>
              </div> */}
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              {hyperlinks.map((h) => (
                <a
                  key={h.href}
                  href={h.href}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  {h.title}
                </a>
              ))}

              <Link
                className="bg-white text-primary px-4 py-2 rounded-md text-sm font-medium border border-primary hover:bg-gray-50"
                href={token ? "/dashboard" : "/login"}
              >
                {token ? "Dashboard" : "Log in"}
              </Link>
              <a
                href={githubLink}
                target="_blank"
                className="bg-white text-primary px-4 py-2 rounded-md text-sm font-medium border border-primary hover:bg-gray-50"
              >
                View on GitHub
              </a>
            </div>

            <div className="-mr-2 flex items-center lg:hidden">
              <Link
                className="bg-white text-primary px-4 py-2 rounded-md text-sm font-medium border border-primary hover:bg-gray-50"
                href={token ? "/dashboard" : "/login"}
              >
                {token ? "Dashboard" : "Log in"}
              </Link>
              {/* <a
                href={githubLink}
                target="_blank"
                className="bg-white text-primary px-4 py-2 rounded-md text-sm font-medium border border-primary hover:bg-gray-50"
              >
                View on GitHub
              </a> */}
            </div>
          </div>
        </div>
      </nav>

      <header className="relative bg-primary pt-28 pb-20 px-4 sm:px-6 lg:pt-36 lg:pb-28 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-5xl">
            <span className="block">SmartNode</span>

            <span className="block text-blue-200">
              A personal home automation prototype
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-blue-100 sm:text-lg md:mt-5 md:text-xl">
            A full-stack system integrating IoT hardware, real-time backend, and
            a web dashboard. Built as a personal engineering exploration of
            device communication, firmware, and scalable architecture.
          </p>

          <div className="mt-8 flex justify-center space-x-4">
            <a
              href={githubLink}
              target="_blank"
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 shadow-md"
            >
              View code
              {/* <i data-feather="arrow-right" className="ml-2 w-4 h-4"></i> */}
            </a>
            {/* <a
              href="#project"
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-blue-800 bg-opacity-60 hover:bg-opacity-70"
            >
              Read notes
            </a> */}
          </div>

          {/* <p className="mt-4 text-sm text-blue-100">
            See the README in the repo for setup, block diagram, and wiring
            diagrams.
          </p> */}
        </div>
      </header>

      <section id="built" className="py-16 bg-white bg-opacity-90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              What I built
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-gray-50 rounded-lg px-6 py-8 text-center">
              <div className="flex items-center justify-center h-12 w-12 px-2 py-2 rounded-md bg-blue-500 text-white mx-auto">
                <CircuitIcon />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                IoT Node Design & Integration
              </h3>
              <p className="mt-3 text-sm text-gray-500">
                Designed and fabricated IoT nodes to be remotely controlled
                through the system, with each node communicating its state and
                receiving control commands from the backend server.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg px-6 py-8 text-center">
              <div className="flex items-center justify-center h-12 w-12 px-2 py-2 rounded-md bg-blue-500 text-white mx-auto">
                <DashboardIcon />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">
                Full-Stack Control Platform
              </h3>
              <p className="mt-3 text-sm text-gray-500">
                A full-stack web dashboard that powers both the admin and user
                interfaces; admins can create and manage users and IoT nodes,
                while users can add their own nodes, monitor real-time device
                states, and control them through intuitive on/off toggles.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-16 bg-gray-50 ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Skills & Tech
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {Object.keys(techStack).map((k) => {
              const stack = techStack[k];

              return (
                <div key={k} className="bg-white shadow-md p-4 rounded-lg">
                  <div className="font-semibold mb-2">{k.toUpperCase()}</div>
                  <div className="text-sm space-y-2">
                    {techStack[k].map((st) => (
                      <TechBadge
                        key={st.name}
                        name={st.name}
                        library={st.library}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="features"
        className="mb-10 pt-5 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-lg font-semibold mb-3">Key Features</h2>
        <ul className="grid gap-3 md:grid-cols-2">
          {features.map((f) => (
            <li
              key={f.title}
              className="p-4 flex items-start gap-3 border border-grey-100 p-2 rounded-md"
            >
              <div>
                <div className="font-medium">{f.title}</div>
                <div className="text-sm mt-1">{f.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="architecture"
        className="mb-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-lg font-semibold mb-3">System Architecture</h2>
        <div className="diagram p-4 flex justify-center">
          <Image
            src={ArchitectureImg}
            alt="SmartNode System Architectures"
            // height={200}
            className="w-full h-auto md:h-[800px] md:w-auto object-contain"
          />
        </div>
      </section>

      <section id="hardware" className="relative py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Dashboard and Hardware
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto flex items-center justify-center w-auto mb-4">
                {/* <img src="/static/central-hub.jpg" alt="Central Hub" className="h-16 w-16 object-contain"> */}
                <Image
                  src={DashboardImg}
                  alt="SmartNode System Architectures"
                  // height={200}
                  className="w-full h-auto md:h-[300px] md:w-auto object-contain"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Control Dashboard
              </h3>
              <p className="text-gray-500">
                Web interface built with React for monitoring device states and
                controlling nodes in real time.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="mx-auto flex items-center justify-center w-auto mb-4">
                {/* <img src="/static/switch-node.jpg" alt="Switch Node" className="h-16 w-16 object-contain"> */}
                <Image
                  src={NodesImg}
                  alt="SmartNode System Architectures"
                  // height={200}
                  className="w-full h-auto md:h-[300px] md:w-auto object-contain"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Switch Node
              </h3>
              <p className="text-gray-500">
                Relay-based IoT nodes used to control lights and outlets.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="demo" className="relative py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-extrabold text-gray-900">Demo</h2>
          <p className="mt-3 text-gray-500">
            Demo of the SmartNode system in action, showing device control,
            real-time updates, and admin management. Watch below.
          </p>

          <div className="mt-8 rounded-xl overflow-hidden shadow-xl border border-gray-200 w-full">
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/vR_PxUNKaV8?autoplay=1&mute=1"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Interested in the code?</span>
            <span className="block text-blue-200">
              Explore the repository and notes.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href={githubLink}
                target="_blank"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-blue-50"
              >
                View repo
              </a>
            </div>
            {/* <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#project"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 bg-opacity-60 hover:bg-opacity-70"
              >
                Read notes
              </a>
            </div> */}
          </div>
        </div>
      </section>

      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div>
              <p className="text-base text-gray-400">
                © 2025 Ahmad Usman — Personal project. Not a commercial product.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Built by Ahmad Usman. Feedback welcome via the GitHub repo.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
