import { FaTools, FaArrowLeft } from "react-icons/fa";

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center font-['Inter'] p-4">
      <div className="max-w-lg w-full text-center bg-white border border-slate-200 rounded-3xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
        
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white">
          <FaTools className="text-2xl" />
        </div>

        <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.3em] text-[#A9814F]">
          System Update
        </span>
        
        <h1 className="mt-3 font-['Fraunces'] text-4xl font-medium tracking-tight text-slate-900">
          Under Maintenance
        </h1>
        
        <p className="mt-4 text-slate-600 leading-relaxed">
          We are currently performing scheduled maintenance to improve your experience. 
          Please check back soon. We apologize for any inconvenience!
        </p>

        <div className="mt-8 pt-8 border-t border-slate-100">
          <p className="text-sm text-slate-500">Need immediate assistance?</p>
          <a 
            href="mailto:support@yourdomain.com" 
            className="mt-2 inline-block font-medium text-slate-900 underline underline-offset-4 hover:text-[#A9814F] transition-colors"
          >
            support@yourdomain.com
          </a>
        </div>
      </div>

      <a 
        href="http://localhost:5174/login" 
        className="mt-8 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-slate-900"
      >
        <FaArrowLeft className="text-[10px]" />
        Admin Login
      </a>
    </div>
  );
};

export default Maintenance;
