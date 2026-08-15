import React from 'react';
import { 
  BarChart3, 
  Coins, 
  TrendingUp, 
  BookOpen, 
  Code2, 
  ArrowRight 
} from 'lucide-react';
import { servicesData } from '../data/services';
import { useData } from '../context/DataContext';

interface ServicesProps {
  onSelectService?: (serviceId: string) => void;
  onContactClick: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onContactClick }) => {
  const { services: dbServices } = useData();
  const activeServices = dbServices && dbServices.length > 0 ? dbServices : servicesData;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-white" />;
      case 'Coins':
        return <Coins className="w-5 h-5 text-white" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-white" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-white" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-white" />;
      default:
        return <BarChart3 className="w-5 h-5 text-white" />;
    }
  };

  const getIconBg = (id: string) => {
    switch (id) {
      case 'data-analytics':
        return 'bg-[#0D6EFD]';
      case 'financial-analytics':
        return 'bg-[#10B981]';
      case 'econometrics-economic-analysis':
        return 'bg-[#8B5CF6]';
      case 'research-evaluation':
        return 'bg-[#F59E0B]';
      case 'web-software-development':
        return 'bg-[#F97316]';
      default:
        return 'bg-[#0D6EFD]';
    }
  };

  return (
    <section 
      id="services" 
      className="py-20 md:py-28 bg-[#040E1E] relative border-t border-blue-900/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching reference image ("WHAT I DO") */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold tracking-widest text-[#00D4FF] uppercase">
            SPECIALIZED SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
            WHAT I DO
          </h2>
          <div className="w-16 h-1 bg-[#0D6EFD] mx-auto rounded-full mt-3" />
        </div>

        {/* 5 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {activeServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="rounded-2xl p-6 bg-[#081B35]/90 border border-blue-900/40 hover:border-[#00D4FF]/60 transition-all duration-300 shadow-xl shadow-black/40 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(0,212,255,0.2)]"
            >
              <div>
                {/* Icon Badge */}
                <div className={`w-12 h-12 rounded-xl ${getIconBg(service.id)} flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform`}>
                  {getIcon(service.iconName)}
                </div>

                {/* Service Title */}
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#00D4FF] transition-colors leading-snug">
                  {service.title}
                </h3>

                {/* Service Deliverable Bullets */}
                <ul className="mt-4 space-y-2 text-xs sm:text-sm text-slate-300">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#00D4FF] mt-0.5">•</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-blue-900/30">
                <button
                  onClick={onContactClick}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00D4FF] group-hover:text-white transition-colors"
                >
                  <span>Request Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
