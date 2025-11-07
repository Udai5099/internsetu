import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { User, Building2, Cpu, BarChart3 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import ResumeUploadButton from "@/components/ResumeUpload";
import InteractiveMap from "@/components/InteractiveMap";

// Import your LogoLoop component and partner logos
import LogoLoop from './LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

export default function Index() {
  const slides = useMemo(
    () => [
      {
        bg: "bg-[url('/modi1.png')] bg-contain bg-center bg-no-repeat",
      },
      {
        bg: "bg-[url('/modi2.png')] bg-contain bg-center bg-no-repeat",
      },
      {
        bg: "bg-[url('/modi3.png')] bg-contain bg-center bg-no-repeat",
      },
    ],
    [],
  );
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);
    const id = setInterval(() => api.scrollNext(), 5000);
    return () => {
      api.off("select", onSelect);
      clearInterval(id);
    };
  }, [api]);

  const [galleryFilter, setGalleryFilter] = useState<
    "All" | "Events" | "Internships" | "Awards"
  >("All");
  const images = [
    { url: "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/5A83/production/_120717132_mediaitem120717131.jpg", cat: "Events" },
    { url: "https://static.pib.gov.in/WriteReadData/userfiles/image/image002PAL5.jpg", cat: "Internships" },
    { url: "https://images.hindustantimes.com/img/2022/10/03/550x309/cda447b0-42c8-11ed-b45c-96b88fd91a1d_1664767334215.jpg", cat: "Awards" },
    { url: "https://pbs.twimg.com/media/C5wmyv1UYAEyuHN.jpg", cat: "Events" },
    { url: "https://www.thestatesman.com/wp-content/uploads/2024/08/IMG_3771-jpeg.webp", cat: "Internships" },
    { url: "https://indiaeducationdiary.in/wp-content/uploads/2018/10/T2018102156312.jpg", cat: "Awards" },
    { url: "https://www.deccanchronicle.com/h-upload/2024/01/23/1072130-aa-1405384.webp", cat: "Events" },
    { url: "https://cdn.dnaindia.com/sites/default/files/styles/full/public/2014/09/05/265249-modi-with-people.jpg", cat: "Internships" },
    { url: "https://images.news18.com/ibnlive/uploads/2024/11/students-with-pm-modi-2024-11-35f5083055596718379df74a159a4748-16x9.jpg", cat: "Awards" },
  ];
  const filtered = images.filter((i) => galleryFilter === "All" || i.cat === galleryFilter);

  // Partner data array with new logos
  const partners = [
    { name: "MCA", src: "/mca.png" },
    { name: "AICTE", src: "/aicte.png" },
    { name: "NIC", src: "/nic.png" },
    { name: "IIT", src: "/iit.png" },
    { name: "IIM", src: "/iim.png" },
    { name: "PSU", src: "/psu.png" },
    { name: "Cisco", src: "/cisco.png" },
    { name: "Accenture", src: "/accenture.png" },
    { name: "TCS", src: "/tcs.png" },
    { name: "Microsoft", src: "/micro.png" },
  ];
  
  const upcoming = [
    { date: "Nov 20, 2025", title: "AI Readiness Workshop", desc: "Hands-on session for resume scoring and profile completion.", cta: "Register" },
    { date: "Dec 05, 2025", title: "Employer Onboarding", desc: "Guidelines for fair postings and explainable shortlisting.", cta: "Register" },
  ];
  const past = [
    { date: "Oct 02, 2025", title: "Gandhi Jayanti Hackathon", desc: "Innovation sprint on civic-tech internships." },
    { date: "Sep 15, 2025", title: "Engineers Day Drive", desc: "Nationwide internship awareness campaign." },
  ];

  return (
    <main>
      {/* Slideshow */}
      <section className="bg-white">
        <div className="container mx-auto pt-8 md:pt-10">
          <div className="relative">
            <Carousel setApi={setApi} opts={{ loop: true, align: "start" }}>
              <CarouselContent>
                {slides.map((s, i) => (
                  <CarouselItem key={i}>
                    <Link to="/login">
                      <div className={`rounded-2xl ${s.bg} shadow-lg border overflow-hidden h-[400px] md:h-[500px]`}>
                        {/* Only the background image will show */}
                      </div>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-white/90 text-primary border-white/70 hover:bg-white" />
              <CarouselNext className="bg-white/90 text-primary border-white/70 hover:bg-white" />
            </Carousel>
            <div className="mt-4 flex items-center justify-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => api?.scrollTo(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    selected === i ? "bg-accent" : "bg-primary/20 hover:bg-primary/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl leading-tight">
              InternSetu : AI-Based Smart Allocation Engine
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-prose">
              InternSetu ensures every student gets a fair shot at internships using explainable AI. Companies can recruit smarter, students apply confidently, and admins maintain complete transparency.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ResumeUploadButton />
            </div>
            <div className="mt-6 flex items-center justify-around py-4 px-2 border-y border-gray-300">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Fair Allocation
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Secure & Compliant
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Explainable AI
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-white shadow-lg border p-6 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_30%_20%,#FF7A00_0,transparent_40%),radial-gradient(circle_at_80%_60%,#0052A5_0,transparent_40%)]" />
              
              <div className="relative grid grid-cols-2 gap-4">
                <InfoCard
                  title="Students"
                  text="Smarter matches, personalized recommendations."
                  icon={User}
                  iconColor="text-accent"
                />
                <InfoCard
                  title="Companies"
                  text="Post roles, shortlist faster with AI insights."
                  icon={Building2}
                  iconColor="text-accent"
                />
                <InfoCard
                  title="AI Engine"
                  text="Explain how fairness + explainability works."
                  icon={Cpu}
                  iconColor="text-accent"
                />
                <InfoCard
                  title="Analytics"
                  text="Transparent reports, readiness scores, and skill charts."
                  icon={BarChart3}
                  iconColor="text-accent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners - Infinitely Scrolling */}
      <section className="container mx-auto py-16">
        <h2 className="subheading text-center">Partners</h2>
        <div className="mt-8">
          <LogoLoop
            logos={partners}
            speed={100}
            direction="left"
            logoHeight={48}
            gap={40}
            pauseOnHover
            scaleOnHover
            ariaLabel="Partners"
          />
        </div>
      </section>

      {/* Replaced Scheme Overview with new components */}
      <section className="container mx-auto py-16">
        <div className="bg-gray-100/60 p-6 md:p-12 rounded-2xl shadow-inner">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Left Section: Eligibility */}
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-semibold mb-6">Are you <span className="text-primary">Eligible?</span></h2>
              <div className="grid sm:grid-cols-2 gap-6 w-full">
                <EligibilityCard
                  icon="/age.svg"
                  title="Age"
                  text="21-24 Years"
                />
                <EligibilityCard
                  icon="/job.svg"
                  title="Job Status"
                  text="Not Employed Full Time"
                />
                <EligibilityCard
                  icon="/education.svg"
                  title="Education"
                  text="Not Enrolled Full Time"
                />
                <EligibilityCard
                  icon="/family.svg"
                  title="Family (Self/ Spouse / Parents)"
                  text={
                    <ul className="list-disc ml-4">
                      <li>No one is earning more than ₹6 Lakhs PA.</li>
                      <li>No Member has a Govt. Job</li>
                    </ul>
                  }
                />
              </div>
            </div>

            {/* Right Section: Core Benefits */}
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-semibold mb-6">Core Benefits for <span className="text-accent">PM Internship Scheme</span></h2>
              <div className="grid sm:grid-cols-2 gap-6 w-full">
                <BenefitsCard
                  icon="/time.svg"
                  title="12 months real-life experience in India's top companies"
                />
                <BenefitsCard
                  icon="/stipend.svg"
                  title="Monthly assistance of ₹4500 by Government of India and ₹500 by Industry"
                />
                <BenefitsCard
                  icon="/grant.svg"
                  title="One-time Grant of ₹6000 for incidentals"
                />
                <BenefitsCard
                  icon="/selectors.svg"
                  title="Select from various sectors and from top Companies of India"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container mx-auto py-16">
        <div className="flex items-center justify-between">
          <h2 className="subheading">Gallery</h2>
          <div className="flex gap-2">
            {(["All","Events","Internships","Awards"] as const).map(cat => (
              <button key={cat} onClick={()=>setGalleryFilter(cat)} className={`px-4 py-2 rounded-full text-sm border ${galleryFilter===cat?"bg-accent text-white border-accent":"bg-white hover:bg-secondary"}`}>{cat}</button>
            ))}
          </div>
        </div>
        <div className="mt-8 columns-1 sm:columns-2 md:columns-3 gap-4 [column-fill:_balance]">
          {filtered.map((img, idx) => (
            <Dialog key={idx}>
              <DialogTrigger asChild>
                <img src={img.url} alt="gallery" className="mb-4 w-full rounded-xl shadow-sm border hover:opacity-90 cursor-pointer break-inside-avoid" />
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 overflow-hidden">
                <img src={img.url} alt="expanded" className="w-full h-full object-contain" />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="container mx-auto py-16">
        <h2 className="subheading">Events</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg text-primary font-semibold">Upcoming</h3>
            <div className="mt-4 space-y-4">
              {upcoming.map((e, i) => (
                <div key={i} className="rounded-xl border shadow-sm p-5 bg-white relative">
                  <span className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-accent" />
                  <p className="text-sm text-muted-foreground">{e.date}</p>
                  <h4 className="text-xl mt-1">{e.title}</h4>
                  <p className="mt-1 text-muted-foreground">{e.desc}</p>
                  <Link to="#" className="btn btn-accent mt-3 w-fit">{e.cta}</Link>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg text-primary font-semibold">Past</h3>
            <div className="mt-4 space-y-4">
              {past.map((e, i) => (
                <div key={i} className="rounded-xl border shadow-sm p-5 bg-white">
                  <p className="text-sm text-muted-foreground">{e.date}</p>
                  <h4 className="text-xl mt-1">{e.title}</h4>
                  <p className="mt-1 text-muted-foreground">{e.desc}</p>
                  <Link to="#" className="btn bg-secondary mt-3 w-fit">Details</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-16">
        <div className="container mx-auto">
          <h2 className="subheading text-center">Internship Opportunities Across India</h2>
          <p className="mt-2 text-center text-muted-foreground">Click on a state to explore available roles and statistics.</p>
        </div>
        <InteractiveMap />
      </section>

      {/* Help & Contact */}
      <section className="container mx-auto py-16">
        <h2 className="subheading">Help & Contact</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="card">
            <h3 className="text-lg">Support</h3>
            <p className="mt-2 text-muted-foreground">For portal help and technical queries.</p>
            <a href="mailto:support@internsetu.gov.in" className="mt-4 inline-block text-primary font-semibold hover:underline">support@internsetu.gov.in</a>
          </div>
          <div className="card">
            <h3 className="text-lg">Helpline</h3>
            <p className="mt-2 text-muted-foreground">Mon–Fri, 9:00 AM – 6:00 PM IST</p>
            <p className="mt-4 font-semibold">1800-000-000</p>
          </div>
          <div className="card">
            <h3 className="text-lg">Reference</h3>
            <p className="mt-2 text-muted-foreground">Styling inspired by the official portal.</p>
            <a href="https://pminternship.mca.gov.in/login/" target="_blank" rel="noreferrer" className="mt-4 inline-block text-primary font-semibold hover:underline">Visit reference website</a>
          </div>
        </div>
      </section>
    </main>
  );
}

// InfoCard and ActionCard functions
function InfoCard({ title, text, icon: Icon, iconColor }: { title: string; text: string; icon: any; iconColor?: string }) {
  return (
    <div className="group rounded-xl border bg-card p-5 shadow-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg cursor-pointer">
      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 transition-colors duration-300 group-hover:bg-primary/20 ${iconColor}`}>
        {Icon && <Icon className="h-5 w-5 transition-all duration-300" />}
      </div>
      <h3 className="mt-3 text-lg font-semibold transition-colors duration-300 group-hover:text-primary">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function ActionCard({ title, desc, link, btn }: { title: string; desc: string; link: string; btn: string }) {
  return (
    <div className="card flex flex-col transition-all duration-300 transform hover:translate-y-[-4px] active:translate-y-0 hover:shadow-lg cursor-pointer">
      <h3 className="text-xl">{title}</h3>
      <p className="mt-2 text-muted-foreground flex-1">{desc}</p>
      <Link to={link} className="mt-4 btn btn-accent w-fit">{btn}</Link>
    </div>
  );
}

// New component for the Eligibility section
function EligibilityCard({ icon, title, text }: { icon: string; title: string; text: string | JSX.Element }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-lg group hover:bg-accent hover:text-white h-60 w-56">
      <div className="h-16 w-16 mb-4 flex-shrink-0">
        <img src={icon} alt={title} className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110" />
      </div>
      <h4 className="text-base font-semibold text-primary transition-colors duration-300 group-hover:text-white">{title}</h4>
      <p className="mt-1 text-sm text-muted-foreground transition-colors duration-300 group-hover:text-white">{text}</p>
    </div>
  );
}

// New component for the Core Benefits section
function BenefitsCard({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-lg group hover:bg-accent hover:text-white h-60 w-56">
      <div className="h-16 w-16 mb-4 flex-shrink-0">
        <img src={icon} alt={title} className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110" />
      </div>
      <h4 className="text-base font-semibold transition-colors duration-300 group-hover:text-white">{title}</h4>
    </div>
  );
}