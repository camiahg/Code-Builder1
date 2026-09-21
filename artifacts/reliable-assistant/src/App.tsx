import { type FormEvent, type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import aboutPhoto from '@assets/0_IMG_2303_1789909271019.jpeg';
import logoMark from '@assets/reliable-assistant-logo.png';
import {
  ArrowDownRight,
  ArrowRight,
  BadgeDollarSign,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  ClipboardPenLine,
  Inbox,
  ListChecks,
  Mail,
  Menu,
  MoveUpRight,
  PackageCheck,
  Sparkles,
  X,
  type LucideIcon,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const services: { title: string; body: string; icon: LucideIcon; tag: string }[] = [
  {
    title: 'Inbox, made lighter',
    body: 'Sort messages, create folders and labels, clear backlogs, and flag priority emails so your inbox stops being the place where good intentions go to wait.',
    icon: Inbox,
    tag: 'Communication',
  },
  {
    title: 'A calendar you can trust',
    body: 'Organize appointments, spot conflicts, and keep the week legible. No more hunting through tabs to remember what comes next.',
    icon: CalendarDays,
    tag: 'Organization',
  },
  {
    title: 'The careful details',
    body: 'Data entry, list cleanup, spreadsheet updates, and the small repeatable tasks that are easy to postpone and hard to catch up on.',
    icon: ListChecks,
    tag: 'Admin',
  },
  {
    title: 'Customer replies',
    body: 'Handle routine FAQ inquiries, order status checks, and polite customer follow-ups with the care that comes from 6+ years of real customer service experience.',
    icon: Mail,
    tag: 'Customer care',
  },
  {
    title: 'Basic administrative support',
    body: 'Follow step-by-step instructions, handle basic web forms, organize files, and keep routine operations moving smoothly behind the scenes.',
    icon: PackageCheck,
    tag: 'No coding required',
  },
  {
    title: 'Support that grows with me',
    body: 'As I build my digital and AI skills, I may use responsible AI assistance for research, organization, drafting, and repetitive admin work—always reviewed before it reaches you.',
    icon: Sparkles,
    tag: 'Developing',
  },
];

const faqs = [
  {
    question: 'Is there a minimum commitment?',
    answer:
      'No monthly contract is required. Hourly support starts at $20, tracked in 15-minute increments, with a $25 minimum for flat-rate tasks.',
  },
  {
    question: 'What happens if a task takes longer than expected?',
    answer:
      'The scope is confirmed before extra work begins. If something changes, you will know what changed and what it is likely to cost before I continue.',
  },
  {
    question: 'Do I have to know exactly what to delegate?',
    answer:
      'Not at all. Tell me what keeps getting pushed to tomorrow, and I can turn that list into a clear first step with you.',
  },
  {
    question: 'Can you work with my existing tools?',
    answer:
      'Usually, yes. I can talk through the email, calendar, spreadsheet, shop, or task tools you already use and decide what makes sense for the work.',
  },
  {
    question: 'Are you offering AI services right now?',
    answer:
      'Not AI training or standalone AI services. I am continuing to build those skills and may use AI responsibly as a support tool for research, organization, drafting, and repetitive work. I review AI-assisted work before it is given to you.',
  },
];

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    contactMethod: '',
    supportType: '',
    timeline: '',
    tools: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    document.title = 'Your Reliable Assistant — practical admin help';
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = `A question for Your Reliable Assistant from ${formState.name || 'a new inquiry'}`;
    const body = `Name: ${formState.name}\nEmail: ${formState.email}\nBest way to reach me: ${formState.contactMethod}\nSupport needed: ${formState.supportType}\nTimeline: ${formState.timeline}\nTools/platforms: ${formState.tools}\n\nProject overview:\n${formState.message}`;
    setSent(true);
    window.location.href = `mailto:hello.yourreliableassistant@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const updateField = (field: keyof typeof formState, value: string) =>
    setFormState((current) => ({ ...current, [field]: value }));

  return (
    <div className="site-shell grain min-h-[100dvh]">
      <header className="sticky top-0 z-40 border-b border-[hsl(var(--border)/.72)] bg-[hsl(var(--background)/.88)] backdrop-blur-xl">
        <div className="container-wide flex h-[76px] items-center justify-between">
          <a href="#top" className="focus-ring flex items-center gap-3 rounded-lg" onClick={closeMenu} data-testid="link-brand">
            <span className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[hsl(var(--primary))] p-1 shadow-[0_8px_18px_rgba(29,79,73,.18)]">
              <img src={logoMark} alt="" className="h-full w-full object-contain" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[1.05rem] font-semibold tracking-[-.03em]">Your Reliable</span>
              <span className="block font-mono text-[.57rem] uppercase tracking-[.16em] text-[hsl(var(--accent))]">Assistant</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-[.83rem] font-semibold md:flex" aria-label="Primary navigation">
            <a href="#services" className="nav-link focus-ring rounded-sm" data-testid="link-services">Services</a>
            <a href="#pricing" className="nav-link focus-ring rounded-sm" data-testid="link-pricing">Pricing</a>
            <a href="#about" className="nav-link focus-ring rounded-sm" data-testid="link-about">About</a>
            <a href="#contact" className="button-primary ml-2 !px-5 !py-3" data-testid="link-contact">Let&apos;s talk <ArrowRight size={15} /></a>
          </nav>

          <button type="button" className="focus-ring rounded-lg p-2 md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} data-testid="button-mobile-menu">
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-menu container-wide border-t border-[hsl(var(--border)/.72)] py-4 md:hidden" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1">
              {[
                ['Services', '#services'],
                ['Pricing', '#pricing'],
                ['About', '#about'],
                ['Let’s talk', '#contact'],
              ].map(([label, href]) => (
                <a key={href} href={href} onClick={closeMenu} className="focus-ring rounded-xl px-3 py-3 text-sm font-semibold hover:bg-[hsl(var(--muted))]" data-testid={`mobile-link-${label.toLowerCase().replace(/[^a-z]+/g, '-')}`}>
                  {label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="container-wide grid min-h-[calc(100dvh-76px)] items-center gap-14 py-16 md:grid-cols-[1.03fr_.97fr] md:gap-10 md:py-20">
          <div className="relative z-10 max-w-[650px]">
            <div className="reveal eyebrow mb-6 flex items-center gap-3"><span className="h-px w-8 bg-[hsl(var(--accent))]" />Human execution for digital work</div>
            <h1 className="reveal reveal-delay-1 display-title text-[clamp(3.55rem,8vw,7.8rem)] text-[hsl(var(--primary))]">
              AI built your drafts?<br />
              <span className="text-[hsl(var(--accent))]">Smart tech needs smarter execution.</span>
            </h1>
            <p className="reveal reveal-delay-2 mt-7 max-w-[530px] text-[1.06rem] leading-8 text-[hsl(var(--muted-foreground))]">
              Software generates the noise, but execution takes human precision. I combine computer science literacy, pharmacy accuracy, and real-world operational experience to handle the client messages and back-office cleanups your tech stack leaves behind.
            </p>
            <div className="reveal reveal-delay-3 mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a href="#contact" className="button-primary focus-ring" data-testid="button-hero-inquiry">Tell me what&apos;s taking your time <ArrowRight size={16} /></a>
              <a href="#pricing" className="button-secondary focus-ring" data-testid="button-hero-pricing">See straightforward pricing <ArrowDownRight size={16} /></a>
            </div>
            <div className="reveal reveal-delay-3 mt-12 flex flex-wrap gap-x-7 gap-y-3 text-[.76rem] font-semibold text-[hsl(var(--muted-foreground))]">
              <span className="flex items-center gap-2"><Check size={14} className="text-[hsl(var(--accent))]" /> $20/hour to start</span>
              <span className="flex items-center gap-2"><Check size={14} className="text-[hsl(var(--accent))]" /> 15-minute increments</span>
              <span className="flex items-center gap-2"><Check size={14} className="text-[hsl(var(--accent))]" /> No mystery scope</span>
            </div>
          </div>

          <div className="reveal reveal-delay-2 relative mx-auto w-full max-w-[510px]">
            <div className="absolute -right-4 -top-8 h-28 w-28 rounded-full bg-[hsl(var(--secondary))] opacity-70 blur-[1px]" />
            <div className="absolute -bottom-7 -left-7 h-32 w-32 rounded-full border border-[hsl(var(--accent)/.45)]" />
            <div className="relative rotate-[2.5deg] overflow-hidden rounded-[28px] border border-[hsl(var(--primary)/.16)] bg-[hsl(var(--primary))] p-5 text-[hsl(var(--primary-foreground))] shadow-[var(--shadow-lg)]">
              <div className="ink-grid absolute inset-0 opacity-10" />
              <div className="relative">
                <div className="mb-12 flex items-center justify-between">
                  <span className="font-mono text-[.62rem] uppercase tracking-[.16em] text-[hsl(var(--secondary))]">The calm corner</span>
                  <span className="rounded-full border border-[hsl(var(--secondary)/.4)] px-3 py-1 font-mono text-[.6rem] text-[hsl(var(--secondary))]">open for work</span>
                </div>
                <div className="mb-8 max-w-[350px]">
                  <p className="font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[.98] tracking-[-.04em]">A little order can change the whole week.</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-[hsl(var(--primary-foreground)/.1)] p-4">
                    <Clock3 size={18} className="mb-8 text-[hsl(var(--secondary))]" />
                    <p className="font-mono text-[.65rem] uppercase tracking-[.13em] text-[hsl(var(--secondary)/.8)]">your time back</p>
                    <p className="mt-1 font-display text-2xl">one task at a time</p>
                  </div>
                  <div className="mt-7 rounded-2xl bg-[hsl(var(--accent))] p-4 text-[hsl(var(--accent-foreground))]">
                    <ClipboardPenLine size={18} className="mb-8" />
                    <p className="font-mono text-[.65rem] uppercase tracking-[.13em] opacity-80">today&apos;s note</p>
                    <p className="mt-1 font-display text-2xl">handled.</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-[hsl(var(--primary-foreground)/.2)] pt-4 text-[.68rem] text-[hsl(var(--primary-foreground)/.65)]">
                  <span>Personal help. No hand-offs.</span><ArrowRight size={15} />
                </div>
              </div>
            </div>
            <div className="float absolute -bottom-9 -right-1 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 shadow-[var(--shadow-md)]">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"><BadgeDollarSign size={18} /></span>
                <span><span className="block font-mono text-[.56rem] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">starts at</span><strong className="font-display text-xl">$20/hour</strong></span>
              </div>
            </div>
          </div>
        </section>

        <div className="border-y border-[hsl(var(--border))] bg-[hsl(var(--secondary)/.3)]">
          <div className="container-wide grid gap-4 py-6 text-sm font-semibold text-[hsl(var(--primary))] sm:grid-cols-3 sm:gap-8">
            <div className="flex items-center gap-3"><span className="font-mono text-xs text-[hsl(var(--accent))]">01</span> One person, on your side.</div>
            <div className="flex items-center gap-3"><span className="font-mono text-xs text-[hsl(var(--accent))]">02</span> Clear scope before extra work.</div>
            <div className="flex items-center gap-3"><span className="font-mono text-xs text-[hsl(var(--accent))]">03</span> Help that fits a small business.</div>
          </div>
        </div>

        <section className="container-wide py-28 md:py-36" id="services">
          <div className="grid gap-14 md:grid-cols-[.8fr_1.2fr] md:gap-20">
            <div className="md:sticky md:top-32 md:h-fit">
              <p className="eyebrow">What I can take off your desk</p>
              <h2 className="display-title mt-5 text-5xl text-[hsl(var(--primary))] md:text-6xl">The work behind the work.</h2>
              <p className="mt-6 max-w-[390px] leading-7 text-[hsl(var(--muted-foreground))]">No spreadsheets to build and no coding to learn. You get one thoughtful person to make the moving pieces easier to hold.</p>
              <a href="#contact" className="focus-ring mt-8 inline-flex items-center gap-2 border-b border-[hsl(var(--accent))] pb-2 text-sm font-bold text-[hsl(var(--primary))]" data-testid="link-services-inquiry">Talk through a task <MoveUpRight size={15} /></a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <article key={service.title} className={`service-card soft-card rounded-[22px] p-6 ${index === 0 ? 'sm:col-span-2 sm:max-w-[78%]' : ''}`} data-testid={`card-service-${index}`}>
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--secondary))] text-[hsl(var(--primary))]"><Icon size={20} strokeWidth={1.8} /></span>
                      <span className="font-mono text-[.62rem] uppercase tracking-[.12em] text-[hsl(var(--muted-foreground))]">{service.tag}</span>
                    </div>
                    <h3 className="mt-8 font-display text-3xl leading-none text-[hsl(var(--primary))]">{service.title}</h3>
                    <p className="mt-4 text-[.92rem] leading-7 text-[hsl(var(--muted-foreground))]">{service.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[hsl(var(--primary))] py-28 text-[hsl(var(--primary-foreground))] md:py-36">
          <div className="container-wide grid gap-12 md:grid-cols-[1fr_.9fr] md:items-end">
            <div>
              <p className="eyebrow !text-[hsl(var(--secondary))]">For the business owner doing too much</p>
              <h2 className="display-title mt-5 max-w-[720px] text-5xl md:text-7xl">You can be capable <span className="text-[hsl(var(--secondary))]">and still need help.</span></h2>
            </div>
            <div className="md:pb-2">
              <p className="max-w-[420px] text-[1rem] leading-8 text-[hsl(var(--primary-foreground)/.7)]">If you are replying to customers between errands, keeping inventory in your head, or doing admin after everyone else has gone to bed, that is not a character flaw. It is a capacity problem.</p>
              <a href="#contact" className="focus-ring mt-8 inline-flex items-center gap-2 font-bold text-[hsl(var(--secondary))]" data-testid="link-relief-cta">Let&apos;s make a little room <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="container-wide py-28 md:py-36" id="pricing">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">Pricing without the fog</p>
              <h2 className="display-title mt-5 text-5xl text-[hsl(var(--primary))] md:text-6xl">Small-business sized.</h2>
            </div>
            <p className="max-w-[350px] text-sm leading-6 text-[hsl(var(--muted-foreground))]">Start with a single task or set aside hours each month. Either way, the scope is clear before extra work begins.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
            <div className="soft-card rounded-[24px] p-7 md:p-9">
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[hsl(var(--accent)/.16)] text-[hsl(var(--accent))]"><Clock3 size={21} /></span>
                <span className="eyebrow !text-[hsl(var(--muted-foreground))]">Pay as you go</span>
              </div>
              <h3 className="mt-10 font-display text-4xl text-[hsl(var(--primary))]">$20<span className="font-sans text-base font-semibold text-[hsl(var(--muted-foreground))]"> / hour</span></h3>
              <p className="mt-4 max-w-[350px] leading-7 text-[hsl(var(--muted-foreground))]">Tracked in 15-minute increments, so small jobs stay small. That is $5 per 15 minutes.</p>
              <div className="my-8 section-rule" />
              <div className="space-y-3 text-sm">
                <p className="flex gap-3"><Check size={17} className="mt-0.5 shrink-0 text-[hsl(var(--accent))]" /> Flat-rate tasks start at $25</p>
                <p className="flex gap-3"><Check size={17} className="mt-0.5 shrink-0 text-[hsl(var(--accent))]" /> Larger projects generally start at $50+</p>
                <p className="flex gap-3"><Check size={17} className="mt-0.5 shrink-0 text-[hsl(var(--accent))]" /> Complexity and scope confirmed first</p>
              </div>
              <a href="#contact" className="button-secondary focus-ring mt-9 w-full" data-testid="button-pricing-task">Ask about a task <ArrowRight size={15} /></a>
            </div>
            <div className="rounded-[24px] bg-[hsl(var(--secondary))] p-7 md:p-9">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div><span className="eyebrow !text-[hsl(var(--primary))]">Monthly hours</span><h3 className="font-display mt-3 text-4xl text-[hsl(var(--primary))]">A little rhythm.</h3></div>
                <p className="text-sm text-[hsl(var(--primary)/.7)]">For ongoing support</p>
              </div>
              <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ['10', '$175', 'a month'],
                  ['25', '$450', 'a month'],
                  ['50', '$850', 'a month'],
                  ['Custom', 'Let’s talk', 'based on your needs'],
                ].map(([hours, price, detail], index) => (
                  <div key={hours} className={`price-card rounded-2xl border p-5 ${index === 1 ? 'border-[hsl(var(--primary))] bg-[hsl(var(--background)/.55)]' : 'border-[hsl(var(--primary)/.2)] bg-[hsl(var(--background)/.25)]'}`} data-testid={`card-monthly-${hours}`}>
                    <p className="font-mono text-[.62rem] uppercase tracking-[.13em] text-[hsl(var(--primary)/.65)]">{hours} hours</p>
                    <p className="mt-5 font-display text-3xl text-[hsl(var(--primary))]">{price}</p>
                    <p className="mt-1 text-xs text-[hsl(var(--primary)/.65)]">{detail}</p>
                  </div>
                ))}
              </div>
              <div className="mt-9 flex gap-3 border-t border-[hsl(var(--primary)/.18)] pt-6 text-sm leading-6 text-[hsl(var(--primary)/.75)]">
                <BadgeDollarSign size={18} className="mt-1 shrink-0 text-[hsl(var(--primary))]" />
                <p>Custom packages are available when your needs do not fit a set hour bundle.</p>
              </div>
              <a href="#contact" className="button-primary focus-ring mt-7 !bg-[hsl(var(--primary))] !text-[hsl(var(--primary-foreground))]" data-testid="button-pricing-monthly">Find your fit <ArrowRight size={15} /></a>
            </div>
          </div>
        </section>

        <section className="border-y border-[hsl(var(--border))] bg-[hsl(var(--muted)/.45)] py-28 md:py-36" id="about">
          <div className="container-wide grid gap-14 md:grid-cols-[.9fr_1.1fr] md:items-center md:gap-24">
            <div className="relative mx-auto w-full max-w-[400px]">
              <div className="absolute inset-5 rounded-full border border-[hsl(var(--accent)/.45)]" />
              <div className="absolute -right-2 top-5 h-20 w-20 rounded-full bg-[hsl(var(--secondary))] opacity-80" />
              <div className="relative mx-auto aspect-square w-[min(100%,360px)] overflow-hidden rounded-full border-[10px] border-[hsl(var(--background))] bg-[hsl(var(--primary))] shadow-[0_18px_45px_rgba(29,79,73,.18)] ring-1 ring-[hsl(var(--accent)/.55)]">
                <img src={aboutPhoto} alt="Camiah looking out over the water at sunset" className="h-full w-full object-cover object-[68%_50%]" />
              </div>
              <div className="relative mx-auto mt-5 flex max-w-[260px] items-center justify-center gap-3 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background)/.8)] px-4 py-3 text-center text-xs font-semibold text-[hsl(var(--primary))] shadow-[var(--shadow-sm)]">
                <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
                Camiah · behind the scenes
              </div>
            </div>
            <div>
              <p className="eyebrow">A note from me</p>
              <h2 className="display-title mt-5 text-5xl text-[hsl(var(--primary))] md:text-6xl">Organized. Detail-oriented. Built on real-world trust.</h2>
              <div className="mt-7 max-w-[600px] space-y-5 leading-7 text-[hsl(var(--muted-foreground))]">
                <p>Hi, I&apos;m Camiah. I am a Virtual Assistant based in Memphis, combining real-world operational experience with a strong foundation in customer service, system compliance, and basic tech literacy.</p>
                <p>My background includes introductory Computer Science and IT coursework at UT Martin, basic web building, and a Pharmacy Technician license built around strict confidentiality and regulatory compliance. Across more than six years in retail, pharmacy management, customer service, and logistics with Walgreens, Walmart, and FedEx, I&apos;ve been trusted to manage inventory records, execute quality checks, handle customer communications, and work within high-volume systems.</p>
                <p>I bring those principles—accuracy, data privacy, and systematic problem-solving—to remote administrative support. I am also continuing to build my digital and AI skills. I am not offering AI training right now, but I may use AI responsibly for research, organization, drafting, and repetitive admin work, with every AI-assisted result reviewed before it reaches you.</p>
                <p>When I&apos;m not solving operational puzzles or studying for my next IT certification, I enjoy local art museums, new cultural food spots, the gym, good music, and road trips with my son.</p>
              </div>
              <div className="mt-9 flex flex-wrap gap-3 text-xs font-semibold">
                <span className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-2">Personal attention</span>
                <span className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-2">Clear communication</span>
                <span className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-2">Always learning</span>
              </div>
            </div>
          </div>
        </section>

        <section className="container-wide grid gap-14 py-28 md:grid-cols-[.72fr_1.28fr] md:gap-24 md:py-36" id="process">
          <div>
            <p className="eyebrow">Simple from the start</p>
            <h2 className="display-title mt-5 text-5xl text-[hsl(var(--primary))] md:text-6xl">A good handoff feels easy.</h2>
            <p className="mt-6 max-w-[360px] leading-7 text-[hsl(var(--muted-foreground))]">You do not need a polished brief. A messy list is a perfectly good place to begin.</p>
          </div>
          <div className="divide-y divide-[hsl(var(--border))]">
            {[
              ['01', 'Tell me what is taking too long', 'Send a note about the task, the backlog, or the part of your week that keeps getting squeezed.'],
              ['02', 'I make the scope clear', 'I will talk through the details, tools, timing, and the right way to price it before work starts.'],
              ['03', 'You get breathing room', 'I take on the agreed work, keep you updated when needed, and flag anything that needs your call.'],
            ].map(([number, title, body]) => (
              <div key={number} className="grid gap-4 py-7 sm:grid-cols-[70px_1fr] sm:gap-8" data-testid={`step-${number}`}>
                <span className="font-mono text-sm text-[hsl(var(--accent))]">{number}</span>
                <div><h3 className="font-display text-3xl text-[hsl(var(--primary))]">{title}</h3><p className="mt-3 max-w-[520px] leading-7 text-[hsl(var(--muted-foreground))]">{body}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section className="container-wide border-t border-[hsl(var(--border))] py-28 md:py-32" id="faq">
          <div className="grid gap-12 md:grid-cols-[.7fr_1.3fr] md:gap-24">
            <div><p className="eyebrow">Before you write</p><h2 className="display-title mt-5 text-5xl text-[hsl(var(--primary))]">A few useful answers.</h2></div>
            <div className="divide-y divide-[hsl(var(--border))]">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.question} className="py-2" data-testid={`faq-${index}`}>
                    <button type="button" className="focus-ring flex w-full items-center justify-between gap-6 rounded-lg py-5 text-left font-semibold" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen} data-testid={`button-faq-${index}`}>
                      <span>{faq.question}</span><ChevronDown size={18} className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[hsl(var(--accent))]' : ''}`} />
                    </button>
                    {isOpen && <p className="max-w-[650px] pb-5 pr-8 text-sm leading-7 text-[hsl(var(--muted-foreground))]">{faq.answer}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-[hsl(var(--secondary)/.46)] py-24 md:py-32" id="contact">
          <div className="container-wide grid gap-14 md:grid-cols-[.9fr_1.1fr] md:items-start md:gap-24">
            <div>
              <p className="eyebrow">Your next small step</p>
              <h2 className="display-title mt-5 text-5xl text-[hsl(var(--primary))] md:text-7xl">Let&apos;s make your list feel possible.</h2>
              <p className="mt-7 max-w-[400px] leading-7 text-[hsl(var(--muted-foreground))]">Tell me what is on your plate. You will get a thoughtful reply, not a sales funnel.</p>
              <div className="mt-10 flex items-center gap-3 text-sm font-semibold text-[hsl(var(--primary))]"><Mail size={17} className="text-[hsl(var(--accent))]" /><a className="focus-ring rounded-sm underline decoration-[hsl(var(--accent))] underline-offset-4" href="mailto:hello.yourreliableassistant@gmail.com" data-testid="link-email">hello.yourreliableassistant@gmail.com</a></div>
            </div>
            <form onSubmit={handleSubmit} className="rounded-[24px] border border-[hsl(var(--border))] bg-[hsl(var(--background)/.76)] p-6 shadow-[var(--shadow-sm)] md:p-8" data-testid="form-inquiry">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">Your name</span><input required value={formState.name} onChange={(event) => updateField('name', event.target.value)} className="focus-ring w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm outline-none transition-colors focus:border-[hsl(var(--accent))]" placeholder="What should I call you?" data-testid="input-name" /></label>
                <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">Your email</span><input required type="email" value={formState.email} onChange={(event) => updateField('email', event.target.value)} className="focus-ring w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm outline-none transition-colors focus:border-[hsl(var(--accent))]" placeholder="you@yourbusiness.com" data-testid="input-email" /></label>
                <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">Best way to reach you</span><select required value={formState.contactMethod} onChange={(event) => updateField('contactMethod', event.target.value)} className="focus-ring w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm outline-none transition-colors focus:border-[hsl(var(--accent))]" data-testid="select-contact-method"><option value="" disabled>Choose one</option><option>Email</option><option>Phone call</option><option>Text message</option></select></label>
                <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">What support do you need?</span><select required value={formState.supportType} onChange={(event) => updateField('supportType', event.target.value)} className="focus-ring w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm outline-none transition-colors focus:border-[hsl(var(--accent))]" data-testid="select-support-type"><option value="" disabled>Choose one</option><option>Inbox cleanup</option><option>Customer support replies</option><option>Basic administrative task</option><option>Research or organization</option><option>Something else</option></select></label>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">Timeline</span><select required value={formState.timeline} onChange={(event) => updateField('timeline', event.target.value)} className="focus-ring w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm outline-none transition-colors focus:border-[hsl(var(--accent))]" data-testid="select-timeline"><option value="" disabled>Choose one</option><option>ASAP</option><option>This week</option><option>Flexible</option></select></label>
                <label className="block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">Tools or platforms</span><input value={formState.tools} onChange={(event) => updateField('tools', event.target.value)} className="focus-ring w-full rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm outline-none transition-colors focus:border-[hsl(var(--accent))]" placeholder="Gmail, Outlook, Shopify, etc." data-testid="input-tools" /></label>
              </div>
              <label className="mt-5 block"><span className="mb-2 block text-xs font-bold uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">Project overview</span><textarea required value={formState.message} onChange={(event) => updateField('message', event.target.value)} className="focus-ring min-h-[148px] w-full resize-y rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm leading-6 outline-none transition-colors focus:border-[hsl(var(--accent))]" placeholder="A messy list is welcome. Tell me what keeps getting pushed back." data-testid="input-message" /></label>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><button type="submit" className="button-primary focus-ring" data-testid="button-submit-inquiry">Open an email draft <ArrowRight size={16} /></button><span className="text-xs leading-5 text-[hsl(var(--muted-foreground))]">This opens your email app—no account needed.</span></div>
              {sent && <p role="status" className="mt-5 rounded-xl bg-[hsl(var(--secondary))] px-4 py-3 text-sm font-semibold text-[hsl(var(--primary))]" data-testid="status-inquiry-sent">Your email draft is ready to send. I look forward to reading it.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[hsl(var(--primary))] py-12 text-[hsl(var(--primary-foreground))]">
        <div className="container-wide grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <a href="#top" className="focus-ring inline-flex items-center gap-3 rounded-lg" data-testid="link-footer-brand">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[hsl(var(--primary-foreground))] p-1"><img src={logoMark} alt="" className="h-full w-full object-contain" /></span>
              <span className="font-display text-2xl">Your Reliable Assistant</span>
            </a>
            <p className="mt-5 max-w-[370px] text-sm leading-6 text-[hsl(var(--primary-foreground)/.65)]">Personal, affordable admin help for the people building something of their own.</p>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold">
            <a href="#services" className="focus-ring rounded-sm hover:text-[hsl(var(--secondary))]" data-testid="footer-link-services">Services</a>
            <a href="#pricing" className="focus-ring rounded-sm hover:text-[hsl(var(--secondary))]" data-testid="footer-link-pricing">Pricing</a>
            <a href="#about" className="focus-ring rounded-sm hover:text-[hsl(var(--secondary))]" data-testid="footer-link-about">About</a>
            <a href="#contact" className="focus-ring rounded-sm hover:text-[hsl(var(--secondary))]" data-testid="footer-link-contact">Contact</a>
          </div>
        </div>
        <div className="container-wide mt-10 border-t border-[hsl(var(--primary-foreground)/.15)] pt-5 text-xs text-[hsl(var(--primary-foreground)/.48)]">© {new Date().getFullYear()} Your Reliable Assistant. Clear help for busy people.</div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;