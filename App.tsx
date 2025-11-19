import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Waves, 
  Dumbbell, 
  Sun, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle, 
  Instagram, 
  Facebook, 
  Heart,
  ArrowRight
} from 'lucide-react';

// --- Types ---

type ViewState = 'home' | 'contact';

interface Activity {
  id: string;
  title: string;
  time: string;
  location: string;
  description: string[];
  image: string;
  icon: React.ReactNode;
}

// --- Constants ---

const NAV_ITEMS = [
  { label: 'Accueil', id: 'home' },
  { label: 'Activités & Coaching', id: 'activities' },
  { label: 'Yoga', id: 'yoga' },
  { label: 'Planning', id: 'planning' },
  { label: 'À Propos', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

const TESTIMONIALS = [
  {
    text: "Les séances de marche aquatique avec Svetlana sont mon bol d'air hebdomadaire. Elle est motivante et très pro !",
    author: "Marie L."
  },
  {
    text: "J'ai découvert le Yoga Kundalini grâce à Svetlana. Une approche douce mais puissante qui m'a beaucoup aidé.",
    author: "Julien D."
  },
  {
    text: "Un encadrement sécurisant et une énergie incroyable. Je recommande le circuit training du dimanche.",
    author: "Sophie M."
  }
];

// --- Components ---

const Navbar = ({ 
  currentView, 
  setView, 
  scrollToSection 
}: { 
  currentView: ViewState, 
  setView: (v: ViewState) => void, 
  scrollToSection: (id: string) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsOpen(false);
    if (id === 'contact') {
      setView('contact');
      window.scrollTo(0, 0);
    } else {
      if (currentView !== 'home') {
        setView('home');
        // Allow view to change then scroll
        setTimeout(() => scrollToSection(id), 100);
      } else {
        scrollToSection(id);
      }
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo / Brand */}
        <div 
          className={`font-bold text-xl md:text-2xl tracking-wide cursor-pointer flex items-center gap-2 ${scrolled ? 'text-primary' : 'text-white drop-shadow-md'}`}
          onClick={() => handleNavClick('home')}
        >
          <Waves className="w-8 h-8" />
          <span>SVETLANA IAZYKOFF</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium uppercase tracking-wider transition-colors hover:text-cyan-400 ${scrolled ? 'text-slate-700' : 'text-white drop-shadow-sm'}`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => handleNavClick('contact')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-full font-semibold transition-transform hover:scale-105"
          >
            Réserver
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className={scrolled ? 'text-slate-800' : 'text-white'}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg flex flex-col py-4 px-4 space-y-4 border-t">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-left text-slate-700 font-medium py-2 border-b border-gray-100"
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => handleNavClick('contact')}
            className="w-full bg-primary text-white py-3 rounded-lg font-bold mt-2"
          >
            Réserver une séance
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero = ({ onCtaClick }: { onCtaClick: () => void }) => {
  return (
    <header id="home" className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ 
          backgroundImage: 'url("https://picsum.photos/1920/1080?grayscale&blur=2")', // Placeholder
        }}
      >
        {/* Using a custom generic outdoor active image url would be better, simulating via picsum for now */}
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2073&q=80" 
          alt="Svetlana walking on beach" 
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-primary/30"></div>
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center text-white">
        <h2 className="text-lg md:text-xl font-light uppercase tracking-[0.2em] mb-4 text-cyan-300">
          Bienveillance • Sécurité • Énergie
        </h2>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight drop-shadow-lg">
          Coaching, Yoga <br/>& Activités Aquatiques
        </h1>
        <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl drop-shadow-md">
          Retrouvez votre équilibre avec Svetlana Iazykoff à Palavas & Carnon.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => {
                const el = document.getElementById('activities');
                el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg"
          >
            Voir les activités
          </button>
          <button 
            onClick={onCtaClick}
            className="bg-cyan-500 text-white hover:bg-cyan-600 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg"
          >
            Me contacter
          </button>
        </div>

        {/* Badges */}
        <div className="absolute bottom-10 w-full flex flex-wrap justify-center gap-6 md:gap-12 text-sm md:text-base font-medium text-white/90">
          <div className="flex items-center gap-2">
            <CheckCircle className="text-cyan-400" size={20} />
            <span>+10 ans d’expérience</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="text-cyan-400" size={20} />
            <span>Maître Nageuse Diplômée</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="text-cyan-400" size={20} />
            <span>Yoga Certifié 300YTTC</span>
          </div>
        </div>
      </div>
    </header>
  );
};

const ActivitiesSection = ({ onBook }: { onBook: () => void }) => {
  return (
    <section id="activities" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Marche Aquatique & Coaching</h2>
          <div className="w-24 h-1 bg-cyan-400 mx-auto"></div>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Profitez du cadre exceptionnel de Palavas et Carnon pour vous renforcer en douceur ou intensément.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1: Marche Aquatique */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow group">
            <div className="h-64 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1683399262970-00e8c5455911?q=80&w=2070&auto=format&fit=crop" 
                alt="Marche aquatique" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 bg-cyan-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                Dimanche 11h
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <Waves className="w-6 h-6" />
                <h3 className="text-2xl font-bold">Marche Aquatique en Mer</h3>
              </div>
              <p className="text-slate-600 mb-4 font-medium">Palavas-les-Flots</p>
              <p className="text-slate-500 mb-6">
                Une activité accessible à tous pour améliorer l'endurance, la circulation et le tonus musculaire grâce à la résistance de l'eau. Profitez des bienfaits de la mer en toute sécurité.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle size={16} className="text-green-500" /> Encadrement professionnel
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle size={16} className="text-green-500" /> Sécurité garantie
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle size={16} className="text-green-500" /> Convivialité
                </li>
              </ul>
              <button onClick={onBook} className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors">
                S'inscrire pour dimanche
              </button>
            </div>
          </div>

          {/* Card 2: Coaching */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow group">
            <div className="h-64 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1571019614248-3a8d0131b879?q=80&w=2070&auto=format&fit=crop" 
                alt="Coaching plage" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
               <div className="absolute top-4 right-4 bg-orange-400 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                Dimanche 10h
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <Dumbbell className="w-6 h-6" />
                <h3 className="text-2xl font-bold">Renforcement & Circuit Training</h3>
              </div>
              <p className="text-slate-600 mb-4 font-medium">Entre Plage et Mer</p>
              <p className="text-slate-500 mb-6">
                Pour les sportifs en préparation ou toute personne souhaitant se renforcer efficacement. Coaching personnalisé et exercices variés dans un cadre naturel stimulant.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle size={16} className="text-green-500" /> Préparation physique
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle size={16} className="text-green-500" /> Cardio & Musculation
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle size={16} className="text-green-500" /> Conseils personnalisés
                </li>
              </ul>
              <button onClick={onBook} className="w-full border-2 border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                Infos & Tarifs
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const YogaSection = () => {
  const styles = [
    { name: "Hatha Yoga", desc: "La base traditionnelle, équilibre et posture." },
    { name: "Vinyasa Yoga", desc: "Fluidité, mouvement synchronisé au souffle." },
    { name: "Ashtanga Yoga", desc: "Dynamique, structuré, pour la discipline." },
    { name: "Kundalini Yoga", desc: "Éveil de l'énergie, mantras et respiration." },
    { name: "Aquayoga", desc: "Douceur de l'eau pour une souplesse accrue." }
  ];

  return (
    <section id="yoga" className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Yoga sur Terre & Yoga Aquatique</h2>
            <div className="w-20 h-1 bg-orange-300 mb-6"></div>
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              Que ce soit sur le sable, en salle ou dans l'eau, ma pratique est axée sur <strong>l'énergie, la respiration et la fluidité</strong>. Je propose des séances adaptées à tous les niveaux, dans la bienveillance et l'écoute du corps.
            </p>
            <div className="grid gap-4">
              {styles.map((s, i) => (
                <div key={i} className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-orange-300">
                  <Sun className="text-orange-400 shrink-0 mt-1" size={20} />
                  <div>
                    <h4 className="font-bold text-slate-800">{s.name}</h4>
                    <p className="text-sm text-slate-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 h-[500px] w-full relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=2070&auto=format&fit=crop" 
              alt="Session Yoga" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
              <p className="text-white font-medium italic">"Le mouvement est la clé de l'équilibre."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WorkshopSection = ({ onBook }: { onBook: () => void }) => {
  return (
    <section className="py-20 bg-primary text-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="text-sm font-bold tracking-widest uppercase text-cyan-300 mb-2">Événements à venir</h2>
        <h3 className="text-3xl md:text-5xl font-bold mb-12">Ateliers & Journées Thématiques</h3>

        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="bg-white text-primary rounded-xl p-6 flex flex-col items-center justify-center min-w-[150px] text-center shadow-lg">
              <span className="text-5xl font-bold">JAN</span>
              <span className="text-2xl font-light">2026</span>
              <div className="w-full h-px bg-gray-200 my-2"></div>
              <span className="font-bold text-orange-500">Carnon Plage</span>
            </div>
            
            <div className="text-left flex-1">
              <h4 className="text-3xl font-bold mb-4">Atelier Spécial Détox</h4>
              <p className="text-cyan-100 mb-6 text-lg">
                Une journée pour purifier le corps et l'esprit dans ma maison familiale.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2"><CheckCircle size={18} className="text-cyan-300"/> Yoga</div>
                <div className="flex items-center gap-2"><CheckCircle size={18} className="text-cyan-300"/> Méditation</div>
                <div className="flex items-center gap-2"><CheckCircle size={18} className="text-cyan-300"/> Soins énergétiques</div>
                <div className="flex items-center gap-2"><CheckCircle size={18} className="text-cyan-300"/> Pratiques purificatrices</div>
              </div>
              <button onClick={onBook} className="bg-white text-primary hover:bg-cyan-50 px-8 py-3 rounded-full font-bold transition-colors">
                Réserver ma place
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Planning = () => {
  return (
    <section id="planning" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800">Planning Hebdomadaire</h2>
          <p className="text-slate-500 mt-2">Rejoignez-nous chaque semaine</p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 border-b">
                <tr>
                  <th className="py-4 px-6 text-left text-slate-600 font-semibold">Jour</th>
                  <th className="py-4 px-6 text-left text-slate-600 font-semibold">Heure</th>
                  <th className="py-4 px-6 text-left text-slate-600 font-semibold">Activité</th>
                  <th className="py-4 px-6 text-left text-slate-600 font-semibold">Lieu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-cyan-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-primary">Dimanche</td>
                  <td className="py-4 px-6 text-slate-600">10h00 - 11h00</td>
                  <td className="py-4 px-6 font-bold text-slate-700">Renforcement / Circuit Training</td>
                  <td className="py-4 px-6 text-slate-500">Plage / Mer</td>
                </tr>
                <tr className="hover:bg-cyan-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-primary">Dimanche</td>
                  <td className="py-4 px-6 text-slate-600">11h00 - 12h00</td>
                  <td className="py-4 px-6 font-bold text-slate-700">Marche Aquatique</td>
                  <td className="py-4 px-6 text-slate-500">Mer (Palavas)</td>
                </tr>
                {/* Add mock placeholders for other days if needed, based on prompt only Sunday is specific */}
                <tr className="hover:bg-cyan-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-primary">Semaine</td>
                  <td className="py-4 px-6 text-slate-600">Sur demande</td>
                  <td className="py-4 px-6 font-bold text-slate-700">Coaching Privé & Yoga</td>
                  <td className="py-4 px-6 text-slate-500">Domicile / Extérieur</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <div className="relative">
              <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop" 
                  alt="Svetlana Portrait" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent p-6 rounded-xl shadow-lg max-w-[200px]">
                <p className="font-handwriting text-primary font-bold text-xl">"L'eau est mon élément, le mouvement ma passion."</p>
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Qui suis-je ?</h2>
            <h3 className="text-xl text-primary font-medium mb-6">Svetlana Iazykoff</h3>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Passionnée par l'eau et le mouvement depuis toujours, j'ai consacré ma vie professionnelle à transmettre cette énergie. Mon parcours est guidé par une volonté constante de progresser et de faire progresser les autres, dans le respect du corps et de la nature.
              </p>
              <p>
                En tant que <strong>Maître Nageuse Sauveteuse diplômée d'État</strong>, la sécurité est ma priorité absolue lors de nos séances en mer.
              </p>
              <p>
                Ma certification de <strong>Professeure de Yoga 300 YTTC</strong> m'a permis d'enrichir mon approche sportive avec une dimension plus spirituelle et intérieure, alliant la puissance physique à la douceur de la respiration.
              </p>
              <p>
                Mon approche pédagogique repose sur la bienveillance, l'adaptation à chacun et la recherche de l'équilibre.
              </p>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
               <div>
                 <span className="block text-3xl font-bold text-orange-400">300h</span>
                 <span className="text-sm text-slate-500">Formation Yoga YTTC</span>
               </div>
               <div>
                 <span className="block text-3xl font-bold text-orange-400">MNS</span>
                 <span className="text-sm text-slate-500">Diplômée d'État</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-16 bg-blue-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Ils en parlent mieux que moi</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-blue-800 p-8 rounded-xl shadow-lg border border-blue-700 relative">
               <Heart className="absolute top-4 left-4 text-cyan-400 opacity-20 w-8 h-8 fill-current" />
               <p className="text-lg italic mb-6 opacity-90">"{t.text}"</p>
               <p className="font-bold text-cyan-300">- {t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactPage = () => {
  return (
    <div className="pt-24 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Contact & Réservation</h1>
          <p className="text-slate-600 max-w-xl mx-auto">
            Vous souhaitez participer à une séance, obtenir le programme détaillé d'un atelier ou simplement poser une question ? Remplissez le formulaire ci-dessous.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Info Card */}
          <div className="bg-white p-8 rounded-2xl shadow-xl h-fit">
            <h3 className="text-2xl font-bold text-primary mb-8">Informations Pratiques</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-cyan-100 p-3 rounded-full text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Lieux d'activités</h4>
                  <p className="text-slate-600">Palavas-les-Flots & Carnon Plage</p>
                  <p className="text-sm text-slate-500 mt-1">Point de rendez-vous exact communiqué à l'inscription</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-cyan-100 p-3 rounded-full text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Téléphone</h4>
                  <p className="text-slate-600">06 00 00 00 00</p>
                  <p className="text-sm text-slate-500 mt-1">Laissez un message si je suis en séance</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-cyan-100 p-3 rounded-full text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Email</h4>
                  <p className="text-slate-600">svetlana.iazykoff@email.com</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t">
              <h4 className="font-bold text-slate-800 mb-4">Suivez-moi</h4>
              <div className="flex gap-4">
                <a href="#" className="bg-slate-100 p-3 rounded-full hover:bg-cyan-500 hover:text-white transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="bg-slate-100 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                  <Facebook size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message envoyé ! (Simulation)'); }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nom</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="Votre nom" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Prénom</label>
                  <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="Votre prénom" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="votre@email.com" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Objet</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none">
                  <option>Réserver une marche aquatique</option>
                  <option>Réserver un coaching</option>
                  <option>Renseignements Atelier Détox</option>
                  <option>Autre demande</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-cyan-500 outline-none" placeholder="Votre message..." required></textarea>
              </div>

              <button type="submit" className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl">
                Envoyer ma demande
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = ({ onNav }: { onNav: (id: string) => void }) => {
  return (
    <footer className="bg-dark text-slate-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
              <Waves className="text-cyan-400" /> SVETLANA IAZYKOFF
            </h4>
            <p className="text-sm leading-relaxed max-w-xs">
              Coach sportive, maître nageuse et professeure de Yoga. Retrouvez équilibre et vitalité entre terre et mer.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Liens Rapides</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNav('activities')} className="hover:text-cyan-400 transition-colors">Activités Aquatiques</button></li>
              <li><button onClick={() => onNav('yoga')} className="hover:text-cyan-400 transition-colors">Yoga</button></li>
              <li><button onClick={() => onNav('planning')} className="hover:text-cyan-400 transition-colors">Planning</button></li>
              <li><button onClick={() => onNav('contact')} className="hover:text-cyan-400 transition-colors">Contact</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-lg mb-4">Mentions</h4>
            <ul className="space-y-2 text-sm">
              <li>Mentions Légales</li>
              <li>Politique de confidentialité</li>
              <li>© 2024 Svetlana Iazykoff. Tous droits réservés.</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

const App = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  // Function to handle smooth scrolling to sections within the Home view
  const scrollToSection = (id: string) => {
    setCurrentView('home');
    // Simple timeout to allow render if switching back from Contact view
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="font-sans text-slate-800 bg-white min-h-screen flex flex-col">
      <Navbar 
        currentView={currentView} 
        setView={setCurrentView} 
        scrollToSection={scrollToSection} 
      />

      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero onCtaClick={() => setCurrentView('contact')} />
            <ActivitiesSection onBook={() => setCurrentView('contact')} />
            <YogaSection />
            <WorkshopSection onBook={() => setCurrentView('contact')} />
            <Planning />
            <Testimonials />
            <About />
          </>
        )}
        
        {currentView === 'contact' && (
          <ContactPage />
        )}
      </main>

      <Footer onNav={scrollToSection} />
    </div>
  );
};

export default App;