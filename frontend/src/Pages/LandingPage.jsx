import React from "react";

import AeroShards from "../components/LandingPage-Component/AeroShards";
import ShinyText from "../components/LandingPage-Component/ShinyText";
import TextType from "../components/LandingPage-Component/TextType";
import CurvedLoop from "../components/LandingPage-Component/CurvedLoop";
import ScrollExpand from "../components/LandingPage-Component/ScrollExpand";
import DriftWall from "../components/LandingPage-Component/DriftWall";
import ScrollStack, { ScrollStackItem } from "../components/LandingPage-Component/ScrollStack";
import AnimatedContent from "../components/LandingPage-Component/AnimatedContent";
import SpecularButton from "../components/LandingPage-Component/SpecularButton";
import FlowingMenu from "../components/LandingPage-Component/FlowingMenu";
import GhostCursor from "../components/LandingPage-Component/GhostCursor";
import LandingNavbar from "../components/LandingPage-Component/LandingNavbar";

import { VscArrowRight, VscRocket, VscOrganization, VscCommentDiscussion } from "react-icons/vsc";

import a from "../assets/landingpage.png";

const flowingItems = [
  {
    link: "#projects",
    text: "Find Projects",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    link: "#community",
    text: "Meet Teammates",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
  },
  {
    link: "#features",
    text: "Share Ideas",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    link: "#projects",
    text: "Build Together",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
  },
];

const galleryItems = [
  {
    image: "https://i.pinimg.com/1200x/cd/76/d7/cd76d793c30eb1d8afdb9193ce0b8984.jpg",
    title: "Campus Labs",
  },
  {
    image: "https://i.pinimg.com/236x/99/b8/1f/99b81f8b1d131880693bb174ce8d62b2.jpg",
    title: "Student Teams",
  },
  {
    image: "https://i.pinimg.com/736x/b1/a1/dc/b1a1dcadcbb23237a6c9aa94cea07683.jpg",
    title: "New Ideas",
  },
  {
    image: "https://i.pinimg.com/736x/f8/35/93/f83593fdaa4ff30543b5f655b9ad26e0.jpg",
    title: "Creative Work",
  },
  {
    image: "https://i.pinimg.com/736x/f8/c0/04/f8c004cf04f41be77d2d8cefe29841f3.jpg",
    title: "Build Sessions",
  },
  {
    image: "https://i.pinimg.com/1200x/78/c1/89/78c1892d9ef64d7de35583251bd127e1.jpg",
    title: "Collaboration",
  },
  {
    image: "https://i.pinimg.com/1200x/f6/a4/46/f6a4467c0d2a8f4add8da23cde304bfd.jpg",
    title: "Collaboration",
  },
  {
    image: "https://i.pinimg.com/736x/b3/05/56/b30556f0c92fb5f9ea36299eb2356611.jpg",
    title: "Collaboration",
  },
];

const tabs = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Teams", href: "/teams" },
  { name: "Tasks", href: "/tasks" },
  { name: "Community", href: "/community" },
];
const featureCards = [
  {
    eyebrow: "01 — Discover",
    title: "Find projects that feel worth building.",
    body: "Browse ideas, opportunities and campus projects where your skills can actually make a difference.",
    icon: <VscRocket size={22} />,
  },
  {
    eyebrow: "02 — Connect",
    title: "Meet people who complement your skills.",
    body: "Find teammates, exchange feedback and build stronger teams without the awkward cold start.",
    icon: <VscOrganization size={22} />,
  },
  {
    eyebrow: "03 — Collaborate",
    title: "Turn a good idea into a real project.",
    body: "Keep teams aligned with tasks, requests, notifications and shared project spaces.",
    icon: <VscCommentDiscussion size={22} />,
  },
];

export default function LandingPage() {
  return (
    <main id="home" className="min-h-screen w-full overflow-x-hidden bg-[#07050d] text-white selection:bg-purple-500/30">
      <LandingNavbar tabs={tabs} />
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative isolate min-h-195 overflow-hidden bg-[#120F17]">
        <div className="absolute inset-0 z-0">
          <AeroShards
            backgroundColor="#120F17"
            shardColor="#896ABD"
            accentColor="#A855F7"
            placement="right"
            flow="stream"
            material="chrome"
            detail="balanced"
            effect="none"
            scale={0.95}
            spread={1.1}
            depth={1}
            speed={0.5}
            spin={1.05}
            interaction="attract"
            density={4}
            shardSize={1.1}
            stretch={1}
            turbulence={1.45}
            glow={1.8}
            edgeSoftness={2}
            bloom={0.5}
            grain={0.05}
            chromaticAberration={0.0075}
            transitionDuration={1}
            interactionRadius={1.5}
            interactionStrength={0.5}
            rippleIntensity={1.05}
            holdToGather
            paused={false}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-1 bg-[radial-gradient(circle_at_72%_42%,rgba(168,85,247,0.13),transparent_32%),linear-gradient(90deg,rgba(7,5,13,0.99)_0%,rgba(7,5,13,0.82)_34%,rgba(7,5,13,0.12)_72%,rgba(7,5,13,0.3)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-56 bg-linear-to-t from-[#07050d] via-[#07050d]/65 to-transparent" />

        <div className="relative z-10 flex min-h-195 items-end px-6 pb-28 pt-36 sm:px-10 sm:pb-32 lg:px-16 lg:pb-36">
          <div className="w-full max-w-200">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.9)]" />
              AI Powered
            </div>

            <div className="font-sans text-[clamp(4rem,8vw,7.6rem)] font-semibold leading-[0.88] tracking-[-0.065em]">
              <ShinyText
                text="Campus Collab"
                speed={2}
                delay={0}
                color="#a855f7"
                shineColor="#ffffff"
                spread={120}
                direction="left"
                yoyo={true}
                pauseOnHover={true}
                disabled={false}
              />
            </div>

            <h1 className="mt-7 max-w-190 font-sans text-[clamp(2.15rem,4.5vw,4rem)] font-medium leading-[1.02] tracking-[-0.045em] text-white">
              Find your people.
              <br />
              <span className="text-white/45">Build something worth sharing.</span>
            </h1>

            <div className="mt-6 max-w-162.5 text-base leading-7 text-white/65 sm:text-lg">
              <TextType
                text={[
                  "Discover ideas, teammates and projects around your campus.",
                  "Build teams around complementary skills.",
                  "Turn student ideas into meaningful work.",
                ]}
                typingSpeed={52}
                pauseDuration={3200}
                showCursor
                cursorCharacter="|"
                deletingSpeed={28}
                variableSpeedEnabled={false}
                variableSpeedMin={45}
                variableSpeedMax={70}
                cursorBlinkDuration={1.1}
              />
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#projects"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#120F17] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Explore projects
                <VscArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              {/* React Bits Specular Button */}
              <SpecularButton>
                <span className="inline-flex items-center justify-center px-[-1px] py-0 text-sm font-semibold">See how it works</span>
              </SpecularButton>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs font-medium uppercase tracking-[0.18em] text-white/35">
              <span>Projects</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>Teams</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>Tasks</span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span>Community</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CURVED LOOP
          Pushed down ~15px so the curve is not clipped by the hero.
      ========================================================= */}

      <section className="relative z-10 -mt-1 overflow-hidden border-y border-white/6 bg-[#07050d] pb-5 pt-10 sm:pb-7 sm:pt-12">
        <div className="mx-auto flex h-37.5 w-full max-w-375 translate-y-15 items-center justify-center overflow-hidden sm:h-32.5">
          <div className="w-full scale-[0.78] sm:scale-[0.86]">
            <CurvedLoop
              marqueeText="DISCOVER ✦ CONNECT ✦ BUILD ✦ SHARE ✦ LEARN ✦"
              speed={2}
              curveAmount={72}
              direction="right"
              interactive
              className="custom-text-style"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURES / ANIMATED CONTENT
      ========================================================= */}
      <section id="features" className="relative overflow-hidden bg-[#07050d] px-6 py-28 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <AnimatedContent
            distance={70}
            direction="vertical"
            reverse={false}
            duration={0.8}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={0.96}
            threshold={0.15}
            delay={0}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">Why Campus Collab</p>
              <h2 className="mt-5 max-w-xl font-sans text-4xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl">
                Your campus has the people.
                <span className="text-white/35"> We connect the dots.</span>
              </h2>
            </div>
          </AnimatedContent>

          <p className="max-w-2xl text-lg leading-8 text-white/55 sm:text-xl sm:leading-9">
            Great student projects rarely start with a perfect plan. They start with a question, an idea, or two people realizing they should build
            something together. Campus Collab makes that moment easier to find.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-7xl gap-px overflow-hidden rounded-[30px] border border-white/8 bg-white/6 md:grid-cols-3">
          {featureCards.map((feature) => (
            <AnimatedContent
              key={feature.eyebrow}
              distance={55}
              direction="vertical"
              reverse={false}
              duration={0.7}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={0.98}
              threshold={0.1}
              delay={0}
            >
              <article className="h-full bg-[#0b0812] p-7 transition-colors duration-300 hover:bg-[#100b19] sm:p-9">
                <div className="mb-14 flex h-11 w-11 items-center justify-center rounded-2xl border border-purple-400/20 bg-purple-500/10 text-purple-300">
                  {feature.icon}
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/30">{feature.eyebrow}</p>
                <h3 className="mt-4 font-sans text-2xl font-semibold leading-tight tracking-tight-[-0.025em]">{feature.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/50">{feature.body}</p>
              </article>
            </AnimatedContent>
          ))}
        </div>
      </section>

      {/* =========================================================
          FLOWING MENU — immediately after the animated content area
      ========================================================= */}
      <section className="relative overflow-hidden border-y border-white/6 bg-[#07050d] py-20 sm:py-28">
        <div className="mx-auto mb-10 max-w-7xl px-6 sm:px-10 lg:px-16">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">Everything starts somewhere</p>
          <h2 className="mt-4 max-w-3xl font-sans text-4xl font-semibold leading-NONE tracking tighter sm:text-6xl">
            One campus.
            <span className="text-white/35"> A thousand ways to collaborate.</span>
          </h2>
        </div>

        <div className="h-130 w-full sm:h-150">
          <FlowingMenu items={flowingItems} />
        </div>
      </section>

      {/* =========================================================
          SCROLL EXPAND
          The trigger is intentionally isolated and has generous
          lead-in space. Shorter expansion distance means the user
          reaches the section before the visual transformation begins.
      ========================================================= */}
      <section id="community" className="relative bg-[#07050d] px-4 pt-24 sm:px-8 lg:px-12">
        <div className="mx-auto mb-12 max-w-7xl px-2 sm:px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">Meet the people behind the ideas</p>
          <h2 className="mt-4 max-w-4xl font-sans text-4xl font-semibold leading-none tracking tighter sm:text-6xl">
            Collaboration gets better when perspectives collide.
          </h2>
        </div>

        <div className="mx-auto max-w-375">
          <ScrollExpand
            src={`${a}`}
            alt="Students collaborating on a project"
            title="Ideas become better together."
            scrollHint="Keep scrolling"
            useWindowScroll
            startWidth={48}
            startHeight={52}
            startPosition={{ x: 50, y: 10 }}
            startRadius={28}
            scrollDistance={0.72}
            holdDistance={0.18}
            smoothing={0.06}
            overlayScrim={0.35}
          >
            <h2>One idea. Multiple perspectives.</h2>
            <p>Find people who bring a different skill, perspective or energy to the table.</p>
          </ScrollExpand>
        </div>

        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <p className="text-lg leading-8 text-white/45 sm:text-xl">
            From the first message to the final demo, Campus Collab is designed to make the distance between “we should build this” and “we built
            this” feel much smaller.
          </p>
        </div>
      </section>

      {/* =========================================================
          DRIFT WALL
      ========================================================= */}
      <section id="projects" className="relative overflow-hidden bg-[#07050d] py-28">
        <div className="mx-auto mb-10 flex max-w-7xl flex-col gap-4 px-6 sm:px-10 lg:flex-row lg:items-end lg:justify-between lg:px-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">The campus feed</p>
            <h2 className="mt-3 font-sans text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">See what people are building.</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-white/40">
            Projects, experiments, clubs and ideas — a moving wall of the things happening around your campus.
          </p>
        </div>

        <div className="h-130 w-full sm:h-155">
          <DriftWall
            items={galleryItems}
            columns={4}
            tileWidth={220}
            tileHeight={145}
            gap={20}
            tilt={31}
            turn={-17}
            perspective={1300}
            depth={130}
            speed={38}
            direction="up"
            variance={0.45}
            parallax={0.6}
            lift={64}
            fade={0.05}
            dim={0.78}
            overlayColor="#07050d"
            radius={18}
            roll={0}
            pauseOnHover={false}
            grayscale={false}
          />
        </div>
      </section>

      {/* =========================================================
          SCROLL STACK
          Stabilized: no rotation/blur, zero interpolation duration,
          smaller scale change and longer spacing. More cards/content.
      ========================================================= */}
      <section className="relative bg-[#07050d] px-4 py-28 sm:px-8 lg:px-16">
        <div className="mx-auto mb-14 max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">From idea to outcome</p>
          <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <h2 className="max-w-3xl font-sans text-4xl font-semibold leading-nonetracking-tighter sm:text-6xl">
              Collaboration should feel
              <span className="text-white/35"> effortless.</span>
            </h2>
            <p className="max-w-sm text-sm leading-7 text-white/40">
              A simple journey from discovering an idea to finding teammates, organizing the work and sharing the result.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl">
          <ScrollStack
            useWindowScroll
            itemDistance={115}
            itemScale={0.012}
            itemStackDistance={34}
            stackPosition="18%"
            scaleEndPosition="8%"
            baseScale={0.93}
            scaleDuration={0}
            rotationAmount={0}
            blurAmount={0}
            className="h-auto! overflow-visible!"
          >
            <ScrollStackItem itemClassName="!rounded-[32px] !border !border-purple-400/25 !bg-gradient-to-br !from-[#281344] !via-[#151020] !to-[#0c0912] !p-8 !text-white !shadow-[0_30px_100px_rgba(168,85,247,0.15)] sm:!p-14">
              <div className="flex min-h-107.5 flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">01 — Discover</p>
                  <h3 className="mt-6 max-w-3xl font-sans text-4xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                    Start with an idea.
                  </h3>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
                    Post a project, describe what you are trying to solve, add the skills you need, and let the right people discover it.
                  </p>

                  <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                      <p className="text-xs text-white/30">Share</p>
                      <p className="mt-1 text-sm text-white/75">Your concept</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                      <p className="text-xs text-white/30">Define</p>
                      <p className="mt-1 text-sm text-white/75">What you need</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                      <p className="text-xs text-white/30">Open</p>
                      <p className="mt-1 text-sm text-white/75">The invitation</p>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-white/30">Projects · Ideas · Opportunities</div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="!rounded-[32px] !border !border-fuchsia-400/25 !bg-gradient-to-br !from-[#3b123e] !via-[#1b1022] !to-[#0c0912] !p-8 !text-white !shadow-[0_30px_100px_rgba(217,70,239,0.13)] sm:!p-14">
              <div className="flex min-h-107.5 flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-fuchsia-300">02 — Connect</p>
                  <h3 className="mt-6 max-w-3xl font-sans text-4xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                    Build the right team.
                  </h3>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
                    Find teammates by interests and strengths, send join requests, talk through the idea and give everyone a clear place in the
                    project.
                  </p>

                  <div className="mt-10 flex flex-wrap gap-2">
                    {["Frontend", "Backend", "Design", "AI / ML", "Research", "Marketing"].map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-fuchsia-300/15 bg-fuchsia-400/[0.07] px-4 py-2 text-xs text-fuchsia-100/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-white/30">Teams · Roles · Join requests</div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="!rounded-[32px] !border !border-violet-400/25 !bg-gradient-to-br !from-[#171a45] !via-[#111126] !to-[#090910] !p-8 !text-white !shadow-[0_30px_100px_rgba(99,102,241,0.13)] sm:!p-14">
              <div className="flex min-h-107.5 flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-300">03 — Build</p>
                  <h3 className="mt-6 max-w-3xl font-sans text-4xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                    Give the work somewhere to go.
                  </h3>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
                    Break the project into tasks, keep conversations attached to the work, track progress and make sure nobody wonders what happens
                    next.
                  </p>

                  <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                      <p className="text-xs text-white/30">Tasks</p>
                      <p className="mt-1 text-sm text-white/75">Clear ownership</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/4 p-4">
                      <p className="text-xs text-white/30">Updates</p>
                      <p className="mt-1 text-sm text-white/75">Everyone stays aligned</p>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-white/30">Tasks · Notifications · Workspaces</div>
              </div>
            </ScrollStackItem>

            <ScrollStackItem itemClassName="!rounded-[32px] !border !border-cyan-300/20 !bg-gradient-to-br !from-[#102c3b] !via-[#0e1720] !to-[#090b10] !p-8 !text-white !shadow-[0_30px_100px_rgba(34,211,238,0.1)] sm:!p-14">
              <div className="flex min-h-107.5 flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">04 — Share</p>
                  <h3 className="mt-6 max-w-3xl font-sans text-4xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
                    Finish with something real.
                  </h3>
                  <p className="mt-6 max-w-2xl text-base leading-8 text-white/55 sm:text-lg">
                    A project becomes more valuable when the campus can see it. Share what you learned, what you built and what you want to build
                    next.
                  </p>

                  <div className="mt-10 flex items-center gap-3 text-sm text-white/55">
                    <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.8)]" />
                    Built on campus. Shared with everyone.
                  </div>
                </div>

                <div className="text-sm text-white/30">Demos · Results · Knowledge</div>
              </div>
            </ScrollStackItem>
          </ScrollStack>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA + GHOST CURSOR
      ========================================================= */}
      <section className="relative isolate min-h-155 overflow-hidden border-t border-white/6 bg-[#05040a] px-6 py-32 text-center sm:px-10">
        <GhostCursor zIndex={0} />

        <div className="pointer-events-none absolute left-1/2 top-1/2 z-1 h-125 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-[140px]" />

        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={0.9}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={0.92}
          threshold={0.2}
          delay={0}
        >
          <div className="relative z-10 mx-auto max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-300">Your next collaboration starts here</p>

            <h2 className="mt-5 font-sans text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl lg:text-8xl">
              Don&apos;t build
              <br />
              <span className="text-white/35">alone.</span>
            </h2>

            <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-white/45 sm:text-lg">Find the idea. Find the people. Build the thing.</p>

            <a
              href="#projects"
              className="group mt-9 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#120F17] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Start exploring
              <VscArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </AnimatedContent>
      </section>

      <footer className="border-t border-white/6 bg-[#05040a] px-6 py-7 text-center text-xs text-white/25">
        Campus Collab · Build together, learn together.
      </footer>
    </main>
  );
}
