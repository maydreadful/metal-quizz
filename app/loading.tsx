export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="text-white font-black text-9xl uppercase italic animate-pulse opacity-10">
          LOADING
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 border-8 border-white border-t-red-700 animate-spin"></div>
        </div>
      </div>
      <p className="mt-8 font-black uppercase tracking-[0.5em] text-red-700 animate-pulse">
        Aqueça os amplificadores...
      </p>
    </div>
  );
}